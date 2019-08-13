let inclusivity = require("@11ty/eleventy-plugin-inclusive-language")
let highlight = require("@11ty/eleventy-plugin-syntaxhighlight")
let rss = require("@11ty/eleventy-plugin-rss")
let toc = require("eleventy-plugin-toc")
let pathPrefix = require("./source/data/pathPrefix")
let fs = require("fs")
let md = require("markdown-it")("zero")
let bear = require("markdown-it-bear")
let footnote = require("markdown-it-footnote")

bear(md)

md.enable([
	"html_inline"
])

md.set({
	breaks: false,
	linkify: true,
	html: true
})

footnote(md)

let unescapeRegex = /\\(.)/g;

function getInputFile (page) {
	return fs.readFileSync(page.inputPath, "utf-8")
}

function getFirstLine (input) {
	let lines = input.trim().split("\n")
	if (lines[0] == "---") {
		let frontmatterend = lines.slice(1).indexOf("---")
		lines = lines.slice(2 + frontmatterend)
	}

	let match = lines[0] && lines[0].match(/^(?:#\s+)?(.*)/)

	return (
		match
			? match[1]
			: lines[0]
	).replace(unescapeRegex, "$1")
}

let getFirstLineFromFile = page => {
	let firstLine = getFirstLine(getInputFile(page))
	page.data.title = firstLine
	return firstLine
}

let makeDatePretty = (type = "") => date =>
	new Date(date)[`toLocale${type}String`]("en-ca")

let makeDateString = (type = "") => {
	if (type == "Date" || type == "Time") {
		return makeDatePretty(type)
	}

	if (type == "GMT" || type == "ISO" || type == "") {
		return date =>
			new Date(date)[`to${type}String`]()
	}

	throw new Error("date string type must be one of: Date, Time, ISO, \"\"")
}


module.exports = eleventy => {
	let addPlugins = (...plugins) => {
		for (let plugin of plugins) eleventy.addPlugin(plugin)
	}

	addPlugins(
		inclusivity,
		highlight,
		rss,
		toc
	)

	eleventy.addPassthroughCopy("source/stylesheets")
	eleventy.addFilter("firstline", getFirstLineFromFile)
	eleventy.addFilter("prettydate", makeDateString("Date"))
	eleventy.addFilter("prettytime", makeDateString("Time"))
	eleventy.addFilter("isodate", makeDateString("ISO"))
	eleventy.addFilter("toGmtString", makeDateString("GMT"))
	eleventy.addFilter("log", console.error)
	eleventy.setLibrary("md", md)

	return {
		dir: {
			data: "data",
			includes: "includes",
			input: "source",
			output: "website"
		},
		pathPrefix,
		jsDataFileSuffix: ".11"
	}
}
