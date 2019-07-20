let serve = require("serve-handler")
let cheerio = require("cheerio")
let fs = require("fs").promises
let resolvePath = require("path").resolve
let feedFile = resolvePath(__dirname, "website/index.xml")
let secretFile = resolvePath(__dirname, "secret")
let photoDirectory = resolvePath(__dirname, "photos")
let {send} = require("micro")
let parseBody = require("urlencoded-body-parser")

module.exports = async (request, response) => {
	if (request.url === "/post" && request.method == "POST") {
		let secret = await fs.readFile(secretFile, "utf-8").catch(() => NaN)

		let body = await parseBody(request)

		if (body.secret.toString() !== secret) {
			send(response, 444, "yeet")
		}

		let xmlMode = {xml: {xmlMode: true}}

		let feed = cheerio.load(await fs.readFile(feedFile, "utf-8"), xmlMode)

		let guid =
			Math.random()
				.toString(36)
				.slice(2) +
			Math.random()
				.toString(36)
				.slice(2)

		let title = body.title || guid
		let date = new Date().toGMTString()
		let photoFile = resolvePath(photoDirectory, `${guid}.jpg`)

		await s.writeFile(photoFile, body.photo)

		let entry = cheerio.load(
			`
		<item id="${guid}">
			<title>
				${title}
			</title>
			<pubDate>
				${date}
			</pubDate>
			<link href="https://chee.snoot.club/telecam/#${guid}"/>
			<guid>${guid}</guid>
			<description>
				&lt;img src="https://chee.snoot.club/telecam/photos/${guid}.jpg"&gt;
			</description>
			<xhtml:img
				xmlns:xhtml="http://www.w3.org/1999/xhtml"
				src="https://chee.snoot.club/telecam/photos/${guid}.jpg"
			/>
		</item>`,
			xmlMode
		)

		await fs.writeFile(
			feedFile,
			feed("channel")
				.append(entry)
				.xml(),
			"utf-8"
		)

		return send(response, 200, entry.html())
	}

	return serve(request, response, {
		public: __dirname + "/website",
		rewrites: [{source: "/", destination: "/index.xml"}],
	})
}
