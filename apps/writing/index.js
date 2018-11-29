let {send} = require("micro")
let fs = require("fs-extra")
let path = require("path")

module.exports = async (request, response) => {
	return `in writing~! ${request.url}`
}
