#!/usr/bin/env node
let command = process.argv[2] || process.env.npm_lifecycle_event

if (command != "build" && command != "watch" && command != "install") {
	throw new Error(
		"you must run this as `boop <build | watch | install> or run this in one of those npm lifecycles"
	)
}

require("./library/commands.js")[command]()
