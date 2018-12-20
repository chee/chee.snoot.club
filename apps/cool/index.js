
import canvasSketch from "canvas-sketch"
import sketch, {settings} from "./sketch.js"

let manager = canvasSketch(sketch, {
  ...settings,
  canvas: document.getElementById("canvas")
})

if (module.hot) {
	module.hot.dispose(() => {
		manager.then(manager => {
			manager.dispatch(props => {
				props.canvas.remove()
				console.log(props.context)
				console.log(props)
			})
			manager.destroy()
		})
	})
}
 