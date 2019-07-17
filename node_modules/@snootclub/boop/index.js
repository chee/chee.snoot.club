let symbols = require("./symbols.js")
let serve = require("./library/serve.js")
let route = require("./route.js")
let checkFileExists = require("./library/check-file-existence.js")
let websiteDirectory = "website"

module.exports = async (request, response) => {
	let boop = await route(request, response)

	if (boop.type == symbols.module) {
		return boop.result
	}

	if (boop.type == symbols.static) {
		return serve(boop)
	}

	if (boop.type == symbols.nothing) {
		let websiteExists = await checkFileExists(websiteDirectory)

		return websiteExists
			? serve({request, response, websiteDirectory})
			: new Error(`i couldnt boop such a snoot and your website directory (${websiteDirectory}) did not exist`)
	}

	return new Error(`i refuse to apply to a snoot a boop of a type i don't know`)
}
