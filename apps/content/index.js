let serve = require("serve-handler")
let path = require("path")
let pass = require("../../library/pass.js")(path.resolve(
	__dirname,
	"apps"
))

let serveOptions = {
	public: "website",
	cleanUrls: true,
	renderSingle: true
}

module.exports = async (request, response) => {
	return pass(request, response)
		.catch(error => {
			if (error.status != 404) {
				return Promise.reject(error)
			}

			console.log("no such content sub-app. serving files")

			return serve(request, response, serveOptions)
		})
}
