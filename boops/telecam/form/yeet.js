import Pixels from "./process-pixels/Cargo.toml"

window.Pixels = Pixels

let Middle = {
	x({same, wide, long, difference}) {
		if (same) return 0
		if (wide) return difference / 2
		if (long) return 0
		throw new Error("ratio must be one of: same, wide, long")
	},
	y({same, wide, long, difference}) {
		if (same) return 0
		if (wide) return 0
		if (long) return difference / 2
		throw new Error("ratio must be one of: same, wide, long")
	},
	h({same, wide, long, difference, height}) {
		if (same) return height
		if (wide) return height
		if (long) return height - difference
		throw new Error("ratio must be one of: same, wide, long")
	},
	w({same, wide, long, difference, width}) {
		if (same) return width
		if (wide) return width - difference
		if (long) return width
		throw new Error("ratio must be one of: same, wide, long")
	},
}

let filterHistory = []
let filterFuture = []

let load = () => {
	filterHistory = []
	filterFuture = []

	let canvas = document.getElementById("canvas")
	let context = canvas.getContext("2d")

	let width = imageElement.naturalWidth
	let height = imageElement.naturalHeight

	let wide = width > height
	let long = width < height
	let same = width == height

	let difference = Math.abs(width - height)
	let measurements = {width, height, wide, long, same, difference}

	context.drawImage(
		imageElement,
		Middle.x(measurements),
		Middle.y(measurements),
		Middle.w(measurements),
		Middle.h(measurements),
		0,
		0,
		1000,
		1000
	)
}

let applyHistory = () => {
	load()
	filterHistory.forEach(filter => {
		Pixels[filter]()
	})
}

let undo = () => {
	let last = filterHistory.pop()
	if (!last) return
	filterFuture.push(last)
	applyHistory()
}

let redo = () => {
	let last = filterFuture.pop()
	if (!last) return
	filterHistory.push(last)
	applyHistory()
}
let filter = filter => {
	if (filter == "undo") {
		return undo()
	} else if (filter == "redo") {
		return redo()
	}
	Pixels[filter]()
	filterHistory.push(filter)
}

document.querySelectorAll(".filters button").forEach(button => {
	button.addEventListener("click", () => filter(button.id))
})

document.querySelectorAll(".filters [type='range']").forEach(range => {
	range.addEventListener("mousemove", () => {
		Pixels[range.id](range.value)
	})
})

let reader = new window.FileReader()
let imageElement = document.createElement("img")

reader.addEventListener("load", event => {
	let imageLabel = document.getElementById("image_label")
	imageLabel.style.display = "none"
	let canvas = document.getElementById("canvas")
	let context = canvas.getContext("2d")
	context.imageSmoothingEnabled = true
	context.imageSmoothingQuality = "high"
	context.globalCompositeOperation = "copy"
	imageElement.src = event.target.result
	imageElement.addEventListener("load", load)
})

let fileElement = document.getElementById("file")

let readFile = () => reader.readAsDataURL(fileElement.files[0])

fileElement.addEventListener("change", readFile)

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

document.getElementById("yeet").addEventListener("click", event => {
	event.preventDefault()
	let canvas = document.getElementById("canvas")
	canvas.toBlob(
		blob => {
			let data = new window.FormData()
			let titleInput = document.getElementById("titleInput")
			let secretInput = document.getElementById("secretInput")
			data.append("photo", blob, "photo.jpg")
			data.append("title", titleInput.value)
			data.append("secret", secretInput.value)
			let destroy = (good = true) => {
				document.getElementById("main").remove()
				let next = document.createElement("main")
				next.classList.add(good ? "yay" : "no")
				document.documentElement.classList.add("yay")
				let tick = document.createElement("i")
				tick.textContent = good ? "✓" : "✗"
				next.append(tick)
				document.body.append(next)
				next.addEventListener("click", () => {
					location.reload("yeet")
				})
			}
			fetch("post", {
				method: "POST",
				body: data,
			})
				.then(response =>
					response.ok || Promise.reject()
				)
				.then(() => {
					destroy("good")
				})
				.catch(() => {
					destroy(false)
				})
		},
		"image/jpeg",
		1
	)
})
