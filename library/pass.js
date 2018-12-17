let fs = require("fs-extra")
let http = require("http")
let path = require("path")
let createServe = require("./serve")

let assignEntry = (object, [key, value]) => (
	object[key] = value,
	object
)

let createRequest = (...data) =>
	Object
		.entries(Object.assign({}, ...data))
		.reduce(
			assignEntry,
			new http.IncomingMessage(data[0].socket)
		)

module.exports = appsRoot => async (request, response) => {
	let appName = request.url.split("/")[1]

	let appDirectory = appName && path.resolve(appsRoot, appName)

	let notFoundRejection = Promise.reject({
		status: 404,
		message: `no such app ${appName}`
	})

	if (!appName || !await fs.exists(appDirectory)) {
		return notFoundRejection
	}

	let nextUrl = request.url.slice(appName.length + 1) || '/'
	let nextRequest = createRequest(
		request,
		{url: nextUrl}
	)

	let appManifest = require(path.resolve(appDirectory, "package.json"))

	if (!appManifest.main || !appManifest.main.endsWith(".js")) {
		let websiteDirectory = path.resolve(appDirectory, "website")
		console.log("in here", websiteDirectory)
		if (!await fs.pathExists(websiteDirectory)) {
			return notFoundRejection
		}

		let serve = createServe(websiteDirectory)
		return serve(nextRequest, response)
	}

	return require(appDirectory)(nextRequest, response)
}
