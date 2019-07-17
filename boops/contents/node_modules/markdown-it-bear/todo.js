// task list is based on this https://github.com/revin/markdown-it-task-lists
let getTrio = (tokens, index) => [
	tokens[index - 1],
	tokens[index],
	tokens[index + 1]
]

module.exports = (state, startLine, endLine, silent) => {
	let {tokens} = state
	if (silent) return
	for (let i = 2; i < tokens.length; i++) {
		let [prev, current, next] = getTrio(tokens, i)
		if (isBulletListClose(current)) {
			if (next && isBulletList(next)) {
				let listies = new Set(["-", "+"])
				if (listies.has(next.markup) && listies.has(current.markup)) {
					next.hidden = true
					current.hidden = true
				}
			}
		}
		let todoType = getTodoType(tokens, i)
		if (todoType) {
			todoify(tokens, i, state.Token, todoType)
			let hotdog = tokens[i - 3]
			if (isBulletList(hotdog)) {
				attrSet(hotdog, "class", "todo-list")
			}
		}
	}
}

function attrSet(token, name, value) {
	var index = token.attrIndex(name)
	var attr = [name, value]

	if (index < 0) {
		token.attrPush(attr)
	} else {
		token.attrs[index] = attr
	}
}

function getTodoType(tokens, index) {
	if (
		tokens[index].content &&
		isInline(tokens[index]) &&
		isParagraph(tokens[index - 1]) &&
		isListItem(tokens[index - 2])
	) {
		let {markup} = tokens[index - 2]
		switch (markup) {
			case "-":
				return "todo"
			case "+":
				return "done"
			default:
				return null
		}
	}
	return null
}

function todoify(tokens, index, TokenConstructor, todoType) {
	var checkbox = new TokenConstructor("html_inline", "", 0);
	let classname = `todo-checkbox ${todoType == "done" ? "todo-checked" : ""}`

	checkbox.content = `<span class="${classname}"></span><span class="todo-text"> ${tokens[index].content}</span>`
	tokens[index] = checkbox
	// token.children.unshift(checkbox)
	return checkbox
}

function isInline (token) {
	return token.type == "inline"
}

function isParagraph (token) {
	return token.type == "paragraph_open"
}

function isListItem (token) {
	return token.type == "list_item_open"
}

function isBulletList (token) {
	return token.type == "bullet_list_open"
}

function isBulletListClose (token) {
	return token.type == "bullet_list_close"
}
