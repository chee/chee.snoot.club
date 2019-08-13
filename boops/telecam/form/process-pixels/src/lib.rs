#[macro_use]
extern crate cfg_if;

extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

use wasm_bindgen::prelude::*;

mod dom;
mod filters;
mod pixels;

cfg_if! {
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        fn set_panic_hook() {}
    }
}

cfg_if! {
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[allow(unused_macros)]
macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

const F_IMAGE_SIZE: f64 = 1000.0;
const U_IMAGE_SIZE: usize = F_IMAGE_SIZE as usize;
const U32_IMAGE_SIZE: u32 = F_IMAGE_SIZE as u32;

#[wasm_bindgen]
pub fn setup_canvas() -> Result<(), JsValue> {
    set_panic_hook();
    let context = dom::get_context();
    context.set_global_composite_operation("copy")?;
    context.set_image_smoothing_enabled(true);

    Ok(())
}

struct Measurements {
    width: u32,
    height: u32,
    same: bool,
    wide: bool,
    long: bool,
    difference: u32
}

struct Middle {
    x: f64,
    y: f64,
    w: f64,
    h: f64
}

impl Middle {
    fn new(measurements: Measurements) -> Option<Middle> {
        let (
            width,
            height,
            same,
            wide,
            long,
            difference
        ) = (
            measurements.width,
            measurements.height,
            measurements.same,
            measurements.wide,
            measurements.long,
            measurements.difference
        );
        if !same && !long && !wide {
            return None;
        }

        let x: f64 = if wide {(difference / 2).into()} else {0.0};
        let y: f64 = if long {(difference / 2).into()} else {0.0};
        let h: f64 = if long {(height - difference).into()} else {height.into()};
        let w: f64 = if wide {(width - difference).into()} else {width.into()};

        Some(Middle {
            x,
            y,
            w,
            h
        })
    }
}

#[wasm_bindgen]
pub fn draw_image_element_to_canvas(image_element: web_sys::HtmlImageElement) -> Result<(), JsValue> {
    let context = dom::get_context();
    let width = image_element.natural_width();
    let height = image_element.natural_height();

    let wide = width > height;
    let long = width < height;
    let same = width == height;

    let difference = if long {height - width} else {width - height};

    let middle = match Middle::new(Measurements {
        wide, long, same, difference, width, height
    }) {
        Some(middle) => {middle},
        None => panic!("ratio must be one of: same, wide, long")
    };

    context.draw_image_with_html_image_element_and_sw_and_sh_and_dx_and_dy_and_dw_and_dh(
        &image_element,
        middle.x,
        middle.y,
        middle.w,
        middle.h,
        0.0,
        0.0,
        F_IMAGE_SIZE,
        F_IMAGE_SIZE
    )?;

    Ok(())
}
