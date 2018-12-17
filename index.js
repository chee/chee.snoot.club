let path = require("path")

let appsRoot = path.resolve(__dirname, "apps")
let pass = require("./library/pass.js")(appsRoot)

let websiteDirectory = path.resolve(__dirname, "website")
let serve = require("./library/serve.js")(websiteDirectory)

module.exports = async (request, response) => {
	return pass(request, response)
		.catch(error => {
			if (error.status != 404) {
				console.log({error})
				return Promise.reject(error)
			}

			console.log("no such app! trying files")

			return serve(request, response)
		})
}
