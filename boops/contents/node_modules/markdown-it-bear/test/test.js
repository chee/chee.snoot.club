var path = require("path")
var generate = require("markdown-it-testgen")

describe("markdown-it-polar-bear", function () {
	var md = require("markdown-it")("zero")
		.use(require("../"))
	generate(path.join(__dirname, "fixtures/bear.txt"), md)
});
