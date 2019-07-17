let serve = require("serve-handler")

module.exports = (request, response) => {
	console.log(request.url)
	return serve(request, response, {
		public: __dirname + "/website",
		rewrites: [
			{ source: "/", destination: "/index.xml" }
		]
	})
}
