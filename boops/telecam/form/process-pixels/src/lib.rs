#[macro_use]
extern crate cfg_if;

extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;
extern crate colorsys;

use std::convert::TryInto;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use colorsys::{Rgb, Hsl};

const F_IMAGE_SIZE: f64 = 1000.0;
const U_IMAGE_SIZE: usize = F_IMAGE_SIZE as usize;
const U32_IMAGE_SIZE: u32 = F_IMAGE_SIZE as u32;
const PIXEL_ARRAY_LENGTH: usize = U_IMAGE_SIZE * U_IMAGE_SIZE * 4;

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function to get better error messages if we ever panic.
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        fn set_panic_hook() {}
    }
}

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[derive(Copy, Clone, Debug)]
struct Pixel {
	red: u8,
	green: u8,
	blue: u8,
	alpha: u8
}

impl Pixel {
	fn new(red: u8, green: u8, blue: u8, alpha: u8) -> Pixel {
		Pixel {
			red,
			green,
			blue,
			alpha
		}
	}

	fn mean(&self) -> u8 {
		let mean = (i32::from(self.red) + i32::from(self.green) + i32::from(self.blue)) / 3;
		if mean > 255 {255} else {mean as u8}
	}

	fn new_grey(shade: u8) -> Pixel {
		Pixel::new(shade, shade, shade, 255)
	}
}

#[derive(Copy, Clone, Debug)]
struct Point {
	row: usize,
	column: usize
}

impl Point {
	fn new(row: usize, column: usize) -> Point {
		Point{row, column}
	}

	fn to_pixel_index(&self) -> usize {
		((self.row * (U_IMAGE_SIZE * 4)) + (self.column * 4))
	}

	fn from_pixel_index(index: usize) -> Point {
		Point::new(
			index / (U_IMAGE_SIZE),
			index % (U_IMAGE_SIZE)
		)
	}
}

fn get_context () -> web_sys::CanvasRenderingContext2d {
	let document = web_sys::window().expect("window not present").document().expect("document not present");
	let canvas = document.get_element_by_id("canvas").expect("where is canvas?");
	let canvas: web_sys::HtmlCanvasElement = canvas
		.dyn_into::<web_sys::HtmlCanvasElement>()
		.map_err(|_| ())
		.expect("yeet");

	canvas
		.get_context("2d")
		.expect("where's the context?")
		.expect("now what?")
		.dyn_into::<web_sys::CanvasRenderingContext2d>()
		.expect("couldn't dyn into context")
}

fn get_image_data (context: &web_sys::CanvasRenderingContext2d) -> Box<[u8]> {
	let data: &[u8] = &context
		.get_image_data(0.0, 0.0, F_IMAGE_SIZE, F_IMAGE_SIZE)
		.expect("couldnt get image data")
		.data();

	Box::from(data)
}

fn put_image_data (context: &web_sys::CanvasRenderingContext2d, data: &mut [u8]) {
	let image_data = web_sys::ImageData::new_with_u8_clamped_array_and_sh(
		wasm_bindgen::Clamped(data),
		U32_IMAGE_SIZE,
		U32_IMAGE_SIZE
	).expect("should have made image data but dint");

	context
		.put_image_data(&image_data, 0.0, 0.0)
		.expect("couldnt write image data");
}

struct Pixels<'a> {
	pixels: &'a mut [u8]
}

impl Pixels<'_> {
	fn new(pixels: &mut [u8]) -> Pixels {
		Pixels {
			pixels
		}
	}

	fn get(&self, point: Point) -> Pixel {
		let start = point.to_pixel_index();
		let range = &self.pixels[start..start+4];
		Pixel::new(range[0], range[1], range[2], range[3])
	}

	fn set(&mut self, point: Point, value: Pixel) {
		let start = point.to_pixel_index();
		self.pixels[start] = value.red;
		self.pixels[start + 1] = value.green;
		self.pixels[start + 2] = value.blue;
		self.pixels[start + 3] = value.alpha;
	}

	fn put_image_data(&mut self) {
		put_image_data(&get_context(), &mut self.pixels);
	}

	fn process<Processor>(&mut self, function: Processor) where Processor: Fn(Pixel, Point) -> Pixel {
		let mut result = vec![];
		for (index, rgba) in self.pixels.chunks(4).enumerate() {
			match rgba {
				&[red, green, blue, alpha] => {
					let pixel = Pixel {
						red,
						green,
						blue,
						alpha
					};
					let point = Point::from_pixel_index(index);
					let next_pixel = function(pixel, point);
					result.push((point, next_pixel))
				},
				_ => {}
			}
		}
		for (point, pixel) in result {
			self.set(point, pixel)
		}
		self.put_image_data()
	}
}

struct ContrastOptions {
	contrast: f32,
	rgb_offset: (f32, f32, f32)
}

fn contrast(pixels: &mut Pixels, options: ContrastOptions) {
	pixels.process(|pixel, _point| -> Pixel {
		let intercept = 128.0 * (1.0 - options.contrast);
		let red = f32::from(pixel.red) * options.contrast + intercept / options.rgb_offset.0;
		let green = f32::from(pixel.green) * options.contrast + intercept / options.rgb_offset.1;
		let blue = f32::from(pixel.blue) * options.contrast + intercept / options.rgb_offset.2;

		Pixel::new(
			if red > 255.0 {255} else {red as u8},
			if green > 255.0 {255} else {green as u8},
			if blue > 255.0 {255} else {blue as u8},
			pixel.alpha
		)
	});
}

#[wasm_bindgen]
pub fn roast() -> Result<(), JsValue> {
	set_panic_hook();

	let mut data = get_image_data(&get_context());
	let mut pixels = Pixels::new(&mut data);

	contrast(&mut pixels, ContrastOptions{
		contrast: 1.1,
		rgb_offset: (2.2, 1.1, 1.0)
	});

	Ok(())
}

#[wasm_bindgen]
pub fn frost() -> Result<(), JsValue> {
	set_panic_hook();

	let mut data = get_image_data(&get_context());
	let mut pixels = Pixels::new(&mut data);

	contrast(&mut pixels, ContrastOptions{
		contrast: 1.2,
		rgb_offset: (0.5, 0.7, 1.0)
	});

	Ok(())
}

#[wasm_bindgen]
pub fn dimmen() -> Result<(), JsValue> {
	set_panic_hook();

	let mut data = get_image_data(&get_context());
	let mut pixels = Pixels::new(&mut data);

	contrast(&mut pixels, ContrastOptions{
		contrast: 0.9,
		rgb_offset: (1.0, 1.0, 1.0)
	});

	Ok(())
}

#[wasm_bindgen]
pub fn bandw() -> Result<(), JsValue> {
    set_panic_hook();

	let mut data = get_image_data(&get_context());
	let mut pixels = Pixels::new(&mut data);

	pixels.process(|pixel, _point| {
		Pixel::new_grey(pixel.mean())
	});

	Ok(())
}

#[wasm_bindgen]
pub fn frame() -> Result<(), JsValue> {
    set_panic_hook();

	let context = get_context();
	let mut data = get_image_data(&context);
	let mut pixels = Pixels::new(&mut data);

	let inner_width = 15;
	let width = inner_width / 2;

	pixels.process(|pixel, point| {
		let row = point.row;
		let column = point.column;

		if
			row < inner_width ||
			row > U_IMAGE_SIZE - inner_width ||
			column < inner_width ||
			column > U_IMAGE_SIZE - inner_width
		{
			return Pixel::new(pixel.red - 200, pixel.blue - 200, pixel.green - 200, 255);
		} else { pixel }
	});

	pixels.process(|pixel, point| {
		let row = point.row;
		let column = point.column;

		if row < width || row > U_IMAGE_SIZE - width {
			if row == column {
				Pixel::new(0, 0, 0, 25)
			} else {
				Pixel::new(pixel.red + 240, pixel.green + 240, pixel.blue + 240, 255)
			}
		} else if column < width || column > U_IMAGE_SIZE - width {
			if row == column {
				Pixel::new(0, 0, 0, 255)
			} else {
				Pixel::new(pixel.red + 220, pixel.green + 220, pixel.blue + 220, 255)
			}
		} else { pixel }
	});

	pixels.process(|pixel, point| {
		let row = point.row;
		let column = point.column;

		if row <= 2 || row >= 498 || column <= 2 || column >= 498 {
			return Pixel::new(22, 22, 22, 255);
		} else { pixel }
	});


	Ok(())
}

#[wasm_bindgen]
pub fn toast() -> Result<(), JsValue> {
	set_panic_hook();

	let context = get_context();

	context.set_global_composite_operation("screen")
		.expect("couldn't set globalCompositeOperation");

	let gradient = context.create_radial_gradient(
		F_IMAGE_SIZE / 2.0, F_IMAGE_SIZE / 2.0, 0.0,
		F_IMAGE_SIZE / 2.0, F_IMAGE_SIZE / 2.0,
		F_IMAGE_SIZE / 3.0
	).expect("unable to create a gradient? lol");

	gradient.add_color_stop(0.0, "#804e0f")
		.expect("couldn't set color stop");
	gradient.add_color_stop(1.0, "#3b003b")
		.expect("couldn't set color stop");

	context.set_fill_style(&gradient);
	context.fill_rect(0.0, 0.0, F_IMAGE_SIZE, F_IMAGE_SIZE);

	context.set_global_composite_operation("copy")
		.expect("couldn't set globalCompositeOperation");

	Ok(())
}

#[wasm_bindgen]
pub fn trans() -> Result<(), JsValue> {
	set_panic_hook();

	let context = get_context();

	context.set_global_composite_operation("overlay")
		.expect("couldn't set globalCompositeOperation");

	let blue = "#55cdfc";
	let pink = "#f7a8b8";
	let white = "#eeeeee";

	let colors = [blue, pink, white, white, pink, blue];

	let gradient = context.create_linear_gradient(
		F_IMAGE_SIZE / 2.0, 0.0,
		F_IMAGE_SIZE / 2.0, F_IMAGE_SIZE
	);

	for (index, color) in colors.iter().enumerate() {
		let step = index as f32 / colors.len() as f32;
		match colors.get(index - 1) {
			Some(last) => {
				gradient.add_color_stop(step - 0.001, last)
					.expect("couldn't set color stop");
				gradient.add_color_stop(step, color)
					.expect("couldn't set color stop");
			}
			_ => {}
		}
		match colors.get(index + 1) {
			Some(_next) => {
				gradient.add_color_stop(step, color)
					.expect("couldn't set color stop");
				gradient.add_color_stop(step + 0.001, color)
					.expect("couldn't set color stop");
			}
			_ => {}
		}
	}

	context.set_fill_style(&gradient);
	context.fill_rect(0.0, 0.0, F_IMAGE_SIZE, F_IMAGE_SIZE);

	context.set_global_composite_operation("copy");

	Ok(())
}

