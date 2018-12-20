export let settings = {
	dimensions: [
		2048,
		2048
	],
	animate: true,
	duration: 4,
	fps: 120
}

export default () => ({context, width, height, playhead}) => {
	let margin = 400

	context.fillStyle = "hsl(5, 37%, 94%)"
	context.strokeStyle = context.fillStyle
	context.strokeWidth = 4
	context.fillRect(0, 0, width, height)

	let gradient = context.createLinearGradient(
		7,
		30,
		95,
		height / 1.75
	)
	gradient.addColorStop(0, `hsl(220, 100%, ${100 * playhead}%)`)
	gradient.addColorStop(1, "hsl(340, 100%, 50%)")
	context.fillStyle = gradient
	context.fillRect(
		margin,
		margin,
		width - margin * 2,
		height - margin * 2,
	)

	context.moveTo(playhead * width, height / 2)
	context.lineTo(10, playhead * Math.sin(playhead * height) * height)
	context.stroke()
}
