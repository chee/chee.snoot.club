extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

pub fn get_document () -> Option<web_sys::Document> {
    web_sys::window()?.document()
}

pub fn get_canvas () -> Option<web_sys::HtmlCanvasElement> {
    match get_document()?.get_element_by_id("canvas")?
        .dyn_into::<web_sys::HtmlCanvasElement>() {
            Ok(canvas) => {
                Some(canvas)
            },
            Err(_) => None
        }
}

pub fn get_context () -> web_sys::CanvasRenderingContext2d {
    let canvas = get_canvas().expect("where is canvas?");

    canvas
	.get_context("2d")
	.expect("where's the context?")
	.expect("now what?")
	.dyn_into::<web_sys::CanvasRenderingContext2d>()
	.expect("couldn't dyn into context")
}

#[wasm_bindgen]
pub fn get_image_element() -> Result<web_sys::HtmlImageElement, JsValue> {
    Ok(get_document()
        .expect("where's doc?")
        .get_element_by_id("imageElement")
        .expect("where's id=imageElement ?")
        .dyn_into::<web_sys::HtmlImageElement>()
        .expect("id=imageElement isn't an image"))
}

#[wasm_bindgen]
pub fn get_image_label_element() -> Result<web_sys::HtmlElement, JsValue> {
    Ok(get_document()
       .expect("where's doc?")
       .get_element_by_id("imageLabel")
       .expect("where's id=imageLabel?")
       .dyn_into::<web_sys::HtmlElement>()
       .expect("id=imageLabel isn't an element (somehow?)"))
}

#[wasm_bindgen]
pub fn get_file_element() -> Result<web_sys::HtmlInputElement, JsValue> {
    Ok(get_document()
        .expect("where's doc?")
        .get_element_by_id("file")
        .expect("where's id=file ?")
        .dyn_into::<web_sys::HtmlInputElement>()
        .expect("id=file isn't an input"))
}
