import Pixels from "./process-pixels/Cargo.toml"
import Timeline from "./timeline"

let fileElement = Pixels.get_file_element()
let imageElement = Pixels.get_image_element()
let reader = new FileReader()
let timeline = new Timeline()

Pixels.setup_canvas()

async function replayTimeline(timeline) {
	let replaying = document.documentElement.classList.contains("replaying")
	if (!replaying) {
		Pixels.draw_image_element_to_canvas(imageElement)
		document.documentElement.classList.add("replaying")
		let index = 0
		let filter = ""
		while ((filter = timeline.history[index++])) {
			await new Promise(resolve => {
				requestAnimationFrame(() => {
					Pixels[filter]()
					resolve()
				})
			})
		}
		document.documentElement.classList.remove("replaying")
	}
}

document.querySelectorAll(".filters button").forEach(button => {
	button.addEventListener("click", async () => {
		let filter = button.id
		if (filter == "undo" || filter == "redo") {
			timeline[filter]()
			return replayTimeline(timeline)
		}
		timeline.add(filter)
		Pixels[filter]()
	})
})

reader.addEventListener("load", () => {
	let imageLabel = document.getElementById("imageLabel")
	imageLabel.style.display = "none"

	imageElement.src = reader.result
	imageElement.addEventListener("load", () => {
		Pixels.draw_image_element_to_canvas(imageElement)
	})
})

function readFile() {
	reader.readAsDataURL(fileElement.files[0])
}

fileElement.addEventListener("change", () => {
	timeline.clear()
	readFile()
})

if (fileElement.files[0]) {
	readFile()
}

document.body.addEventListener("dragover", event => {
	document.documentElement.classList.add("drag-her")
	event.preventDefault()
})

document.body.addEventListener("drop", event => {
	document.documentElement.classList.remove("drag-her")
	event.preventDefault()
	fileElement.files = event.dataTransfer.files
	readFile()
})

async function getForm({canvas}) {
	return new Promise(resolve => {
		canvas.toBlob(
			blob => {
				let data = new FormData()
				let titleInput = document.getElementById("titleInput")
				let secretInput = document.getElementById("secretInput")
				data.append("photo", blob, "photo.jpg")
				data.append("title", titleInput.value)
				data.append("secret", secretInput.value)
				resolve(data)
			},
			"image/jpeg",
			1
		)
	})
}

function createOverlay({color, content}) {
	let element = document.createElement("main")
	element.id = "main"
	element.style.background = color
	element.classList.add("overlay")
	let symbol = document.createElement("i")
	symbol.textContent = content
	element.append(symbol)
	element.addEventListener("click", () => location.reload("yeet"))
	return element
}

function setOverlay(overlay) {
	document.documentElement.classList.add("overlay")
	document.getElementById("main").remove()
	document.body.append(overlay)
}

let overlays = {
	yes: createOverlay({
		color: "lightseagreen",
		content: "✓",
	}),
	no: createOverlay({
		color: "lightcoral",
		content: "✗",
	}),
	maybe: createOverlay({
		color: "grey",
		content: "%",
	}),
}

async function sendForm(form) {
	setOverlay(overlays.maybe)
	let response = await fetch("post", {
		method: "POST",
		body: form,
	})
	setOverlay(response.ok ? overlays.yes : overlays.no)
}

document.getElementById("yeet").addEventListener("click", async event => {
	event.preventDefault()
	let canvas = document.getElementById("canvas")
	sendForm(await getForm({canvas}))
})


window.Pixels = Pixels
