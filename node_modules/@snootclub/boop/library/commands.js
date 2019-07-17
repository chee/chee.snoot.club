let path = require("path")
let readdir = require("util").promisify(require("fs").readdir)
let checkFileExists = require("./check-file-existence.js")
let execa = require("execa")

let boopsDirectory = "boops"

let directoryReducer = (names, entry) =>
	entry.isDirectory()
		? names.concat(entry.name)
		: names

let getBoopNames = async () =>
	await checkFileExists(boopsDirectory)
		? (await readdir(boopsDirectory, {withFileTypes: true}))
			.reduce(directoryReducer, [])
		: []

let getBoopPathFromName = name =>
	path.resolve(boopsDirectory, name)

let npm = async (commandName, boopName) => {
	let manifestPath = path.resolve(boopsDirectory, boopName, "package.json")
	let isInstall = commandName == "install"
	let hasManifest = await checkFileExists(manifestPath)

	if (hasManifest) {
		let manifest = require(manifestPath)
		let hasScript = manifest.scripts && commandName in manifest.scripts
		if (!hasScript && !isInstall) {
			console.info(`${boopName} doesn't have a ${commandName} script 🐁`)
			return
		}
	} else {
		console.info(`no package.json in ${boopName} 🐇`)
		return
	}

	let command = isInstall
		? ["install"]
		: [
			"run-script",
			"--scripts-prepend-node-path=true",
			commandName
		]

	let prefix = [
		"--prefix",
		getBoopPathFromName(boopName)
	]

	console.log(`running ${commandName} in ${boopName} 🐕`)

	return execa("npm", [
		...prefix,
		...command
	], {
		extendEnv: true,
		env: {
			BOOP_WEBSITE_DIRECTORY: "website",
			BOOP_PUBLIC_URL: `/${boopName}`,
			// deprecated, but for old canvas sketches
			SNOOT_OUTPUT_DIRECTORY: "website",
			SNOOT_PUBLIC_URL: `/${boopName}`
		}
	}).then(result => (console.log(`completed ${commandName} in ${boopName} 🦔`), result))
}

let boopInParallel = async fn => {
	let names = await getBoopNames()
	let promises = names.map(name => fn(name))
	return Promise.all(promises)
}

let createTask = taskName => () =>
	boopInParallel(async name =>
		npm(taskName, name)
	)

exports.build = createTask("build")
exports.watch = createTask("watch")
exports.install = createTask("install")
