let serveHandler = require("serve-handler")

module.exports = async ({request, response, websiteDirectory}) =>
	serveHandler(request, response, {
		public: websiteDirectory,
		directoryListing: false,
		cleanUrls: true
	})
