let size = 300

export let settings = {
	animate: true,
	duration: 4,
	fps: 100,
	dimensions: [
		size,
		size
	]
}

let rando = Math.random()

export default () => ({context, width, height, playhead}) => {
	context.fillStyle = "#55cc99"
	context.fillRect(0, 0, width, height)
	context.beginPath()
	context.lineWidth = 2

	let y = x => (Math.sin(x) * height / 4) + height / 2

	for (let x = 0; x < size; x += 1) {

		context.moveTo(x, y(x * playhead))
		context.lineTo(x, y(x))

	}

	context.strokeStyle = Math.random() > 0.5 ? "white" : "pink"
	context.stroke()
}