export default class Timeline {
	constructor() {
		this.history = []
		this.future = []
	}

	add(event) {
		this.history.push(event)
	}

	clear() {
		this.history = []
		this.future = []
	}

	undo() {
		let undone = this.history.pop()
		if (!undone) return

		this.future.unshift(undone)
	}

	redo() {
		let redone = this.future.shift()
		if (!redone) return

		this.history.push(redone)
	}
}
