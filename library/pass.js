let fs = require("fs-extra")
let http = require("http")
let path = require("path")

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

	if (!appName || !await fs.exists(appDirectory)) {
		return Promise.reject({
			status: 404,
			message: 'no such app'
		})
	}

	let app = require(appDirectory)

	let nextUrl = request.url.slice(appName.length + 1)

	let nextRequest = createRequest(
		request,
		{url: nextUrl}
	)

	return app(nextRequest, response)
}
