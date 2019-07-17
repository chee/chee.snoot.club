module.exports = (source, ...augmentations) =>
	Object.assign(
		new source.constructor,
		...augmentations
	)
