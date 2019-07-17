let todo = require("./todo")

// wrapping rule is based on markdown-it-mark
let createWrappingRule = ({tag, name = tag, character, before = "emphasis", repeats = 1, classname = null}) => md => {
	let targetCharacterCode = character.charCodeAt(0)

	function tokenize (state, silent) {
		let startCharacter = state.src.charAt(state.pos)
		let marker = startCharacter.charCodeAt(0)

		if (silent) {
			return false
		}

		if (marker != targetCharacterCode) {
			return false
		}

		let scanned = state.scanDelims(state.pos, true)
		let scanLength = scanned.length

		if (scanLength < repeats) {
			return false
		}

		let token

		if (repeats > 1 && scanLength % repeats) {
			token = state.push("text", "", 0)
			token.content = startCharacter
			scanLength--
		}

		for (let index = 0; index < scanLength; index += repeats) {
			token = state.push("text", "", 0)
			token.content = startCharacter.repeat(repeats)

			state.delimiters.push({
				marker,
				jump: index,
				token: state.tokens.length - 1,
				level: state.level,
				end: -1,
				open: scanned.can_open,
				close: scanned.can_close
			})
		}

		state.pos += scanned.length

		return true
	}


	function postProcess(state) {
		let startDelim
		let endDelim
		let {delimiters} = state
		let loneMarkers = []
		let token
		for (let i = 0; i < state.delimiters.length; i++) {
			startDelim = delimiters[i]

			if (startDelim.marker !== targetCharacterCode) {
				continue
			}

			if (startDelim.end === -1) {
				continue
			}

			endDelim = delimiters[startDelim.end]

			token = state.tokens[startDelim.token]
			token.type = `${name}_open`
			if (classname) {
				token.attrs = token.attrs || []
				classname && token.attrs.push(["class", classname])
			}
			token.tag = tag
			token.nesting = 1
			token.markup = character.repeat(repeats)
			token.content = ""

			token = state.tokens[endDelim.token]
			token.type = `${name}_close`
			token.tag = tag
			token.nesting = -1
			token.markup = character.repeat(repeats)
			token.content = ""

			if (state.tokens[endDelim.token - 1].type == "text" &&
			state.tokens[endDelim.token - 1].content == character) {

				loneMarkers.push(endDelim.token - 1)
			}
		}

		while (loneMarkers.length) {
			let i = loneMarkers.pop()
			let j = i + 1

			while (j < state.tokens.length && state.tokens[j].type === `${name}_close`) {
				j++
			}

			j--

			if (i !== j) {
				token = state.tokens[j]
				state.tokens[j] = state.tokens[i]
				state.tokens[i] = token
			}
		}
	}

	md.inline.ruler.before(before, name, tokenize)
	md.inline.ruler2.before(before, name, postProcess)
}

// this is here because `/` was not a terminator char
let createTextRuler = () => {
	function isTerminatorChar(ch) {
		switch (ch) {
			case 0x0A/* \n */:
			case 0x21/* ! */:
			case 0x23/* # */:
			case 0x24/* $ */:
			case 0x25/* % */:
			case 0x26/* & */:
			case 0x2A/* * */:
			case 0x2B/* + */:
			case 0x2D/* - */:
			case 0x2F/* / */:
			case 0x3A/* : */:
			case 0x3C/* < */:
			case 0x3D/* = */:
			case 0x3E/* > */:
			case 0x40/* @ */:
			case 0x5B/* [ */:
			case 0x5C/* \ */:
			case 0x5D/* ] */:
			case 0x5E/* ^ */:
			case 0x5F/* _ */:
			case 0x60/* ` */:
			case 0x7B/* { */:
			case 0x7D/* } */:
			case 0x7E/* ~ */:
				return true;
			default:
				return false;
		}
	}

	return function text(state, silent) {
		var pos = state.pos

		while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
			pos++
		}

		if (pos === state.pos) {
			return false
		}

		if (!silent) {
			state.pending += state.src.slice(state.pos, pos)
		}

		state.pos = pos

		return true
	}
}

module.exports = md => {
	md.enable([
		"paragraph",
		"reference",
		"blockquote",
		"linkify",
		"heading",
		"hr",
		"link",
		"code",
		"fence",
		"image",
		"backticks",
		"list",
		"escape"
	])

	md.set({
		linkify: true,
		breaks: true,
		typographer: true
	})

	md.inline.ruler.at(
		"text",
		createTextRuler()
	)
	let addWrappingRule = rule => createWrappingRule(rule)(md)

	let wrappingRules = [
		{
			character: ":",
			repeats: 2,
			tag: "mark"
		},
		{
			character: "*",
			tag: "b"
		},
		{
			character: "/",
			tag: "i",
			before: "mark"
		},
		{
			character: "_",
			tag: "u"
		},
		{
			character: "-",
			tag: "s"
		}
	]
	wrappingRules.forEach(addWrappingRule)
	md.core.ruler.after("inline", "todo", todo)
}
