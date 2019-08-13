export let settings = {
	dimensions: [
		2048,
		2048
	],
	animate: true,
	duration: 4
}

export default () => ({context, width, height, playhead}) => {
	let margin = 200
	context.fillStyle = "hsl(200, 70%, 10%)"
	context.strokeStyle = context.fillStyle
	context.strokeWidth = 4
	context.fillRect(0, 0, width, height)

	let gradient = context.createLinearGradient(
		7,
		30,
		95,
		height / 1.75
	)
	gradient.addColorStop(0, `hsl(100, 100%, ${100 * playhead}%)`)
	gradient.addColorStop(1, `hsl(220, 100%, ${100 * playhead}%)`)
	context.fillStyle = gradient
	context.fillRect(
		margin,
		margin,
		width - margin * 2,
		height - margin * 2,
	)

	context.moveTo(playhead * width, 0)
	context.lineTo(0, playhead * Math.sin(playhead * width) * height)
}
