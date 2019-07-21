let serve = require("serve-handler")
let {promises: fs, createWriteStream} = require("fs")
let resolvePath = require("path").resolve
let feedFile = resolvePath(__dirname, "website/index.xml")
let secretFile = resolvePath(__dirname, "secret")
let photoDirectory = resolvePath(__dirname, "website/photos")
let {send} = require("micro")
let Busboy = require("busboy")

let feedEnd = `
	</channel>
</rss>
`

let createId = () =>
	Math.random()
		.toString(36)
		.slice(2) +
	Math.random()
		.toString(36)
		.slice(2)

module.exports = (request, response) => (async (request, response) => {
	if (request.url === "/post" && request.method == "POST") {
		console.log(request.headers)
		let guid = createId()
		let photoFile = resolvePath(photoDirectory, `${guid}.jpg`)

		let form = await new Promise((succeed, fail) => {
			let form = {}
			let boy = new Busboy({
				headers: request.headers,
			})
			boy.on(
				"file",
				(field, stream, _originalFilename, _encoding, _mimetype) => {
					console.log({field, _mimetype})
					let out = createWriteStream(photoFile)
					stream.pipe(out)
				}
			)
			boy.on("field", (key, value) => {
				form[key] = value.toString()
			})
			boy.on("finish", () => {
				succeed(form)
			})
			request.pipe(boy)
		})


		let secret = await fs.readFile(secretFile, "utf-8").catch(() => NaN)

		if (form.secret !== secret) {
			return send(response, 444, "yeet")
		}

		let feed = await fs.readFile(feedFile, "utf-8")

		let title = form.title || guid
		let date = new Date().toGMTString()

		let entry = `
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
				width="500"
				height="500"
				src="https://chee.snoot.club/telecam/photos/${guid}.jpg"
			/>
		</item>`

		await fs.writeFile(
			feedFile,
			feed.replace(feedEnd, entry + feedEnd),
			"utf-8"
		)

		return send(response, 200, entry)
	}

	return serve(request, response, {
		public: __dirname + "/website",
		rewrites: [{source: "/", destination: "/index.xml"}],
	})
})(request, response).catch(console.error)
