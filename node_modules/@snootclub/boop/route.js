let checkFileExists = require("./library/check-file-existence.js")
let path = require("path")
let augment = require("./library/augment.js")
let symbols = require("./symbols.js")
let boopRoot = "boops"

let getName = request =>
	request.url.split("/")[1]

let getNextUrl = request =>
	request.url.slice(getName(request).length + 1) || '/'

let getNextRequest = request =>
	augment(request, {
		url: getNextUrl(request)
	})

module.exports = async (request, response) => {
	let boopName = getName(request)

	let boopDirectory = boopName && path.resolve(boopRoot, boopName)

	if (boopName && await checkFileExists(boopDirectory)) {
		let boopManifestPath = path.resolve(boopDirectory, "package.json")
		let boopWebsitePath = path.resolve(boopDirectory, "website")

		if (await checkFileExists(boopManifestPath)) {
			let {main} = require(boopManifestPath)
			let nextRequest = getNextRequest(request)
			if (main && main.endsWith(".js")) {
				// we found a javascript module, hopefully can handle (request, repons)
				let boop = require(boopDirectory)
				return {
					type: symbols.module,
					module: boop,
					request: nextRequest,
					response: response,
					result: boop(nextRequest, response)
				}
			} else if (await checkFileExists(boopWebsitePath)) {
				// no javascript module, but we have some static files maybe?
				return {
					type: symbols.static,
					request: nextRequest,
					response: response,
					websiteDirectory: boopWebsitePath
				}
			}
		}
	}

	// found nothing
	return {
		type: symbols.nothing
	}
}
