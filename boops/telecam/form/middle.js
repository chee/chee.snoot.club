export default {
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
