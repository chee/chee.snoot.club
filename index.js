let boop = require("@snootclub/boop")
let {readFile} = require("fs").promises
let {exec} = require("child_process")

module.exports = async (request, response) => {
	let rebuildUrl = await readFile(__dirname + "/.rebuild-url")
		.catch(() => null)

	if (rebuildUrl && request.url == rebuildUrl) {
		exec("git pull")
		return 200
	}

	return boop(request, response)
}
