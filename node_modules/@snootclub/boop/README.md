# snoot.club/boop
## routes for snoots

`boop` is a library and program for handling routes in snoots.

given a snoot like `cute.snoot.club`, `boop` takes care of the routing of little sub-apps (or boops) (such as that created by [@snootclub/create-canvas-sketch](https://github.com/snootclub/create-canvas-sketch)).

the contract `boop` relies on is that each of those sub-apps has a `build` script and a `watch` script available.
if the sub-app does not handle a `(request, response)` it is expected to produce a `website` directory when built or watched.
you can run `boop watch` in your main snoot directory, and all the boops in the `boops/` directory will have their `watch` script run too. same goes for `build`.

### boop(1)

the boop command takes one argument, the `command`. the command can be `watch`, `install`, or `build`. all this does is run the matching npm command in each of the snoot's boops.

the boop command has a little tiny optional magic. if it is run inside an npm lifecycle, it can be run with no command argument and will take the current lifecycle as its command. this lets your snoot's `package.json`'s scripts node look like this:

```json
"scripts": {
	"install": "boop",
	"build": "boop",
	"watch": "boop",
	"start": "micro index.js -l tcp://0.0.0.0:80"
}
```

and i think that's beautiful

### boop(3)

the boop library exports a function that takes `(request, response)`, so if you're not doing anything else in your snoot but boops then your `index.js` file can be as smol as:

```js
module.exports = require("@snootclub/boop")
```

then it tries its hardest to boop your snoot. here's what it does, given a request like: `get chee.snoot.club/smile`:

first it will check if there is a `boops/smile/` directory in your snoot.

if there is a `boops/smile/`, it will check if that directory has a `package.json` with a `main` javascript file.

if there is a `package.json#main`, it will import the package and pass it `(request, response)` where `request` is a clone of the original `request`, with the `url` updated to remove `/smile`.

if there is not a `package.json#main`, it will check for a `boops/smile/website` directory and try to serve the request statically.

if all of these fail, then it will try to serve statically from the snoot's main `website/` directory.

if that fails, `404`.

### advanced usage!!

so if you want to take tighter control of your snoot, but still use `boop`, there are plenty of options.

in the simplest case you could do something like:

```js
// index.js
let boop = require("@snootclub/boop")

module.exports = (request, response) => {
	if (request.url == "/something-i-can-handle-alone") {
		return something(request, response)
	}

	return boop(request, response)
}
```

lower level, there are `route.js` and `symbols.js`.

```js
// index.js
let route = require("@snootclub/boop/route")
let symbols = require("@snootclub/boop/symbols")

module.exports = (request, response) => {
	let booped = route(request, response)

	switch (booped.type) {
		case symbols.static:
			let {
				// the boop's fully resolved website directory
				websiteDirectory,
				// the new request object with boop name removed from the url
				request,
				response
			} = booped
			return "this resolved to a static boop"
		case symbols.module:
			let {
				// the imported module
				module,
				// the result of calling module with (request, response)
				result,
				request,
				response
			} = booped
			return "this resolved to a module boop"
		case symbols.none:
			return "not a boop"
	}
}
```

### example

here's how a booped snoot might look:

`index.js`:

```js
let boop = require("@snootclub/boop")

module.exports = (request, response) =>
	boop(request, response)
```

`package.json`:
```json
{
	"name": "booper",
	"dependencies": {
		"micro": "latest",
		"@snootclub/boop": "latest"
	},
	"scripts": {
		"build": "boop",
		"watch": "boop",
		"install": "boop",
		"start": "micro index.js -l tcp://0.0.0.0:80"
	}
}
```

`website/index.html`:
```html
<!doctype html>
<h1>i am snoot</h1>
```

`boops/honk/package.json`:
```json
{
	"name": "honk",
	"dependencies": {
		"parcel-bundler": "latest",
		"@snootclub/boop": "latest"
	},
	"scripts": {
		"build": "parcel build index.html -d website",
		"watch": "parcel watch index.html -d website"
	}
}
```

`boops/honk/index.html`:
```html
<!doctype html>
<link rel=stylesheet href=./cascade.styl>
<h1>
	i am honk
</h1>
```

`boops/honk/cascade.styl`
```stylus
body
	background #f88
	color #e46
	text-align center

h1
	font-size 2em
```
