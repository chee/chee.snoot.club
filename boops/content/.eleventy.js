let inclusivity = require("@11ty/eleventy-plugin-inclusive-language")
let highlight = require("@11ty/eleventy-plugin-syntaxhighlight")
let rss = require("@11ty/eleventy-plugin-rss")

module.exports = eleventy => {
	eleventy.addPlugin(inclusivity)
	eleventy.addPlugin(highlight)
	eleventy.addPlugin(rss)
	eleventy.addPassthroughCopy("css")

	return {
		dir: {
			input: ".",
			output: "website"
		},
		pathPrefix: "/content/"
	}
}
