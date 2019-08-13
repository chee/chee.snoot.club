use super::{
    F_IMAGE_SIZE,
    U32_IMAGE_SIZE,
    U_IMAGE_SIZE,
    dom
};

#[derive(Copy, Clone, Debug)]
pub struct Pixel {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
    pub alpha: u8
}

impl Pixel {
    pub fn new(red: u8, green: u8, blue: u8, alpha: u8) -> Pixel {
	   Pixel {
	       red,
	       green,
	       blue,
	       alpha
	   }
    }

    pub fn mean(&self) -> u8 {
	   let mean = (i32::from(self.red) + i32::from(self.green) + i32::from(self.blue)) / 3;
	   if mean > 255 {255} else {mean as u8}
    }

    pub fn new_grey(shade: u8) -> Pixel {
	   Pixel::new(shade, shade, shade, 255)
    }
}

#[derive(Copy, Clone, Debug)]
pub struct Point {
    pub row: usize,
    pub column: usize
}

impl Point {
    pub fn new(row: usize, column: usize) -> Point {
	   Point{row, column}
    }

    pub fn to_pixel_index(&self) -> usize {
	   ((self.row * (U_IMAGE_SIZE * 4)) + (self.column * 4))
    }

    pub fn from_pixel_index(index: usize) -> Point {
	   Point::new(
	       index / (U_IMAGE_SIZE),
	       index % (U_IMAGE_SIZE)
	   )
    }
}

pub fn get_image_data (context: &web_sys::CanvasRenderingContext2d) -> Box<[u8]> {
    let data: &[u8] = &context
	   .get_image_data(0.0, 0.0, F_IMAGE_SIZE, F_IMAGE_SIZE)
	   .expect("couldnt get image data")
	   .data();

    Box::from(data)
}

pub fn put_image_data (context: &web_sys::CanvasRenderingContext2d, data: &mut [u8]) {
    let image_data = web_sys::ImageData::new_with_u8_clamped_array_and_sh(
	   wasm_bindgen::Clamped(data),
	   U32_IMAGE_SIZE,
	   U32_IMAGE_SIZE
    ).expect("should have made image data but dint");

    context
	   .put_image_data(&image_data, 0.0, 0.0)
	   .expect("couldnt write image data");
}

pub struct Pixels<'a> {
    pixels: &'a mut [u8]
}

impl Pixels<'_> {
    pub fn new(pixels: &mut [u8]) -> Pixels {
	   Pixels {
	       pixels
	   }
    }

    pub fn get(&self, point: Point) -> Pixel {
	   let start = point.to_pixel_index();
	   let range = &self.pixels[start..start+4];
	   Pixel::new(range[0], range[1], range[2], range[3])
    }

    pub fn set(&mut self, point: Point, value: Pixel) {
	   let start = point.to_pixel_index();
	   self.pixels[start] = value.red;
	   self.pixels[start + 1] = value.green;
	   self.pixels[start + 2] = value.blue;
	   self.pixels[start + 3] = value.alpha;
    }

    pub fn put_image_data(&mut self) {
	   put_image_data(&dom::get_context(), &mut self.pixels);
    }

    pub fn process<Processor>(&mut self, function: Processor) where Processor: Fn(Pixel, Point) -> Pixel {
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
