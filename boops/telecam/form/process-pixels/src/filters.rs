extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

use super::{F_IMAGE_SIZE, U_IMAGE_SIZE, U32_IMAGE_SIZE};
use super::pixels;
use super::dom;
use pixels::{Pixel, Pixels, Point};

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
    let mut data = pixels::get_image_data(&dom::get_context());
    let mut pixels = Pixels::new(&mut data);

    contrast(&mut pixels, ContrastOptions{
	contrast: 1.1,
	rgb_offset: (2.2, 1.1, 1.0)
    });

    Ok(())
}

#[wasm_bindgen]
pub fn frost() -> Result<(), JsValue> {
    let mut data = pixels::get_image_data(&dom::get_context());
    let mut pixels = Pixels::new(&mut data);

    contrast(&mut pixels, ContrastOptions{
	contrast: 1.2,
	rgb_offset: (0.5, 0.7, 1.0)
    });

    Ok(())
}

#[wasm_bindgen]
pub fn dimmen() -> Result<(), JsValue> {
    let mut data = pixels::get_image_data(&dom::get_context());
    let mut pixels = Pixels::new(&mut data);

    contrast(&mut pixels, ContrastOptions{
	contrast: 0.9,
	rgb_offset: (1.0, 1.0, 1.0)
    });

    Ok(())
}

#[wasm_bindgen]
pub fn bandw() -> Result<(), JsValue> {
    let mut data = pixels::get_image_data(&dom::get_context());
    let mut pixels = Pixels::new(&mut data);

    pixels.process(|pixel, _point| {
	Pixel::new_grey(pixel.mean())
    });

    Ok(())
}

#[wasm_bindgen]
pub fn frame() -> Result<(), JsValue> {
    let context = dom::get_context();
    let mut data = pixels::get_image_data(&context);
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
	    return Pixel::new(
		pixel.red.saturating_sub(200),
		pixel.blue.saturating_sub(200),
		pixel.green.saturating_sub(200),
		255
	    );
	} else { pixel }
    });

    pixels.process(|pixel, point| {
	let row = point.row;
	let column = point.column;

	if row < width || row > U_IMAGE_SIZE - width {
	    if row == column {
		Pixel::new(0, 0, 0, 25)
	    } else {
		Pixel::new(
		    pixel.red.saturating_add(240),
		    pixel.green.saturating_add(240),
		    pixel.blue.saturating_add(240),
		    255
		)
	    }
	} else if column < width || column > U_IMAGE_SIZE - width {
	    if row == column {
		Pixel::new(0, 0, 0, 255)
	    } else {
		Pixel::new(
		    pixel.red.saturating_add(220),
		    pixel.green.saturating_add(220),
		    pixel.blue.saturating_add(220),
		    255
		)
	    }
	} else { pixel }
    });

    pixels.process(|pixel, point| {
	let row = point.row;
	let column = point.column;

	if row <= 2 || row >= U_IMAGE_SIZE - 2 || column <= 2 || column >= U_IMAGE_SIZE - 2 {
	    return Pixel::new(22, 22, 22, 255);
	} else { pixel }
    });


    Ok(())
}

#[wasm_bindgen]
pub fn toast() -> Result<(), JsValue> {
    let context = dom::get_context();

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
    let context = dom::get_context();

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

    context.set_global_composite_operation("copy")
	.expect("couldn't set globalCompositeOperation");

    Ok(())
}

#[wasm_bindgen]
pub fn flip_v() -> Result<(), JsValue> {
    let mut data = pixels::get_image_data(&dom::get_context());
    let mut pixels = Pixels::new(&mut data);
    let mut original_data = pixels::get_image_data(&dom::get_context());
    let original_pixels = Pixels::new(&mut original_data);

    pixels.process(|_pixel, point| {
	original_pixels.get(Point::new(
	    U_IMAGE_SIZE - point.row - 1,
	    point.column
	))
    });

    Ok(())
}

#[wasm_bindgen]
pub fn flip_h() -> Result<(), JsValue> {
    let mut data = pixels::get_image_data(&dom::get_context());
    let mut pixels = Pixels::new(&mut data);
    let mut original_data = pixels::get_image_data(&dom::get_context());
    let original_pixels = Pixels::new(&mut original_data);

    pixels.process(|_pixel, point| {
	original_pixels.get(Point::new(
	    point.row,
	    U_IMAGE_SIZE - point.column - 1
	))
    });

    Ok(())
}

#[wasm_bindgen]
pub fn rotate_90() -> Result<(), JsValue> {
    let mut data = pixels::get_image_data(&dom::get_context());
    let mut pixels = Pixels::new(&mut data);
    let mut original_data = pixels::get_image_data(&dom::get_context());
    let original_pixels = Pixels::new(&mut original_data);

    pixels.process(|_pixel, point| {
	original_pixels.get(Point::new(
	    point.column,
	    point.row
	))
    });
    flip_h()?;

    Ok(())
}
