let inclusivity = require("@11ty/eleventy-plugin-inclusive-language")
let highlight = require("@11ty/eleventy-plugin-syntaxhighlight")
let rss = require("@11ty/eleventy-plugin-rss")
let toc = require("eleventy-plugin-toc")
let pathPrefix = require("./source/data/pathPrefix")
let fs = require("fs")
let md = require("markdown-it")("zero")
let bear = require("markdown-it-bear")

bear(md)

md.enable([
	"html_inline"
])

md.set({
	breaks: false,
	linkify: true,
	html: true
})

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
	date[`toLocale${type}String`]("en-ca")

let makeDateIso = date =>
	date.toISOString()

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
	eleventy.addFilter("prettydatetime", makeDatePretty())
	eleventy.addFilter("prettydate", makeDatePretty("Date"))
	eleventy.addFilter("prettytime", makeDatePretty("Time"))
	eleventy.addFilter("isodate", makeDateIso)
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
