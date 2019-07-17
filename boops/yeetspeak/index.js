var {send} = require('micro');
var q = require(`micro-query`)
var {speak: yeet} = require("espeak")

module.exports = function (request, response) {
	var {text} = q(request)
	
	yeet(text, (error, wave) => {
		send(response, error ? 555 : 200, wave && wave.buffer)
	})
}
