let fs = require("fs")

module.exports = async path => {
	return new Promise(resolve => {
		fs.stat(path, error => resolve(!error))
	})
}
