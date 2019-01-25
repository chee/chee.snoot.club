let boop = require("@snootclub/boop")
let {readFile} = require("fs").promises
let {exec} = require("child_process")
let {resolve} = require("path")

let rebuildUrlFilePath = resolve(__dirname, ".rebuild-url")

module.exports = async (request, response) => {
	let rebuildUrl = await readFile(rebuildUrlFilePath, "utf-8")
		.catch(() => null)

	if (rebuildUrl && request.url == rebuildUrl) {
		exec("git pull")
		return 200
	}

	return boop(request, response)
}
