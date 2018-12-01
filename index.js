let path = require("path")
let serve = require("serve-handler")
let appsRoot = path.resolve(
	__dirname,
	"apps"
)
let pass = require("./library/pass.js")(appsRoot)

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

			console.log('no such app, trying files!')
			return serve(request, response, serveOptions)
		})
}
