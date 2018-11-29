let {send} = require("micro")
let fs = require("fs-extra")
let path = require("path")
let http = require("http")
let serve = require("serve-handler")

let serveOptions = {
	public: "website",
	cleanUrls: true,
	renderSingle: true
}

let getAppDirectory = appName =>
	path.resolve(
		__dirname,
		"apps",
		appName
	)

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

module.exports = async (request, response) =>
	(async function () {
		let appName = request.url.split("/")[1]

		let appDirectory = getAppDirectory(appName)

		if (!appName || !await fs.exists(appDirectory)) {
			console.log('no such app, trying files!')
			return serve(request, response, serveOptions)
		}

		let app = require(appDirectory)

		let nextUrl = request.url.slice(appName.length + 1)

		let nextRequest = createRequest(
			request,
			{url: nextUrl}
		)

		return app(nextRequest, response)
	})().catch(error => {
		console.error(error)
		return send(response, error.status || 500, "<body bgcolor=pink>sorry")
	})
