// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"process-pixels/Cargo.toml":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__wbindgen_throw = exports.__wbindgen_debug_string = exports.__wbindgen_is_undefined = exports.__wbg_global_2c090b42ef2744b9 = exports.__wbg_window_425d3fa09c43ece4 = exports.__wbg_self_937dd9f384d2384a = exports.__wbg_globalThis_8df2c73db5eac245 = exports.__wbg_newnoargs_368b05293a3f44de = exports.__wbindgen_object_clone_ref = exports.__wbg_call_1fc553129cb17c3c = exports.__widl_f_document_Window = exports.__widl_f_data_ImageData = exports.__widl_f_new_with_u8_clamped_array_and_sh_ImageData = exports.__widl_f_get_context_HTMLCanvasElement = exports.__widl_instanceof_HTMLCanvasElement = exports.__widl_f_get_element_by_id_Document = exports.__widl_f_fill_rect_CanvasRenderingContext2D = exports.__widl_f_put_image_data_CanvasRenderingContext2D = exports.__widl_f_get_image_data_CanvasRenderingContext2D = exports.__widl_f_set_fill_style_CanvasRenderingContext2D = exports.__widl_f_create_radial_gradient_CanvasRenderingContext2D = exports.__widl_f_create_linear_gradient_CanvasRenderingContext2D = exports.__widl_f_set_global_composite_operation_CanvasRenderingContext2D = exports.__widl_instanceof_CanvasRenderingContext2D = exports.__widl_f_add_color_stop_CanvasGradient = exports.__widl_instanceof_Window = exports.__wbg_error_4bb6c2a97407129a = exports.__wbg_stack_558ba5917b466edd = exports.__wbg_new_59cb74e423758ede = exports.__wbindgen_object_drop_ref = exports.trans = exports.toast = exports.frame = exports.bandw = exports.dimmen = exports.frost = exports.roast = exports.default = void 0;

var _process_pixels_bg = _interopRequireDefault(require("./pkg/process_pixels_bg.wasm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _process_pixels_bg.default;
exports.default = _default;
var roast = _process_pixels_bg.default.roast;
exports.roast = roast;
var frost = _process_pixels_bg.default.frost;
exports.frost = frost;
var dimmen = _process_pixels_bg.default.dimmen;
exports.dimmen = dimmen;
var bandw = _process_pixels_bg.default.bandw;
exports.bandw = bandw;
var frame = _process_pixels_bg.default.frame;
exports.frame = frame;
var toast = _process_pixels_bg.default.toast;
exports.toast = toast;
var trans = _process_pixels_bg.default.trans;
exports.trans = trans;
var __wbindgen_object_drop_ref = _process_pixels_bg.default.__wbindgen_object_drop_ref;
exports.__wbindgen_object_drop_ref = __wbindgen_object_drop_ref;
var __wbg_new_59cb74e423758ede = _process_pixels_bg.default.__wbg_new_59cb74e423758ede;
exports.__wbg_new_59cb74e423758ede = __wbg_new_59cb74e423758ede;
var __wbg_stack_558ba5917b466edd = _process_pixels_bg.default.__wbg_stack_558ba5917b466edd;
exports.__wbg_stack_558ba5917b466edd = __wbg_stack_558ba5917b466edd;
var __wbg_error_4bb6c2a97407129a = _process_pixels_bg.default.__wbg_error_4bb6c2a97407129a;
exports.__wbg_error_4bb6c2a97407129a = __wbg_error_4bb6c2a97407129a;
var __widl_instanceof_Window = _process_pixels_bg.default.__widl_instanceof_Window;
exports.__widl_instanceof_Window = __widl_instanceof_Window;
var __widl_f_add_color_stop_CanvasGradient = _process_pixels_bg.default.__widl_f_add_color_stop_CanvasGradient;
exports.__widl_f_add_color_stop_CanvasGradient = __widl_f_add_color_stop_CanvasGradient;
var __widl_instanceof_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_instanceof_CanvasRenderingContext2D;
exports.__widl_instanceof_CanvasRenderingContext2D = __widl_instanceof_CanvasRenderingContext2D;
var __widl_f_set_global_composite_operation_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_f_set_global_composite_operation_CanvasRenderingContext2D;
exports.__widl_f_set_global_composite_operation_CanvasRenderingContext2D = __widl_f_set_global_composite_operation_CanvasRenderingContext2D;
var __widl_f_create_linear_gradient_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_f_create_linear_gradient_CanvasRenderingContext2D;
exports.__widl_f_create_linear_gradient_CanvasRenderingContext2D = __widl_f_create_linear_gradient_CanvasRenderingContext2D;
var __widl_f_create_radial_gradient_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_f_create_radial_gradient_CanvasRenderingContext2D;
exports.__widl_f_create_radial_gradient_CanvasRenderingContext2D = __widl_f_create_radial_gradient_CanvasRenderingContext2D;
var __widl_f_set_fill_style_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_f_set_fill_style_CanvasRenderingContext2D;
exports.__widl_f_set_fill_style_CanvasRenderingContext2D = __widl_f_set_fill_style_CanvasRenderingContext2D;
var __widl_f_get_image_data_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_f_get_image_data_CanvasRenderingContext2D;
exports.__widl_f_get_image_data_CanvasRenderingContext2D = __widl_f_get_image_data_CanvasRenderingContext2D;
var __widl_f_put_image_data_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_f_put_image_data_CanvasRenderingContext2D;
exports.__widl_f_put_image_data_CanvasRenderingContext2D = __widl_f_put_image_data_CanvasRenderingContext2D;
var __widl_f_fill_rect_CanvasRenderingContext2D = _process_pixels_bg.default.__widl_f_fill_rect_CanvasRenderingContext2D;
exports.__widl_f_fill_rect_CanvasRenderingContext2D = __widl_f_fill_rect_CanvasRenderingContext2D;
var __widl_f_get_element_by_id_Document = _process_pixels_bg.default.__widl_f_get_element_by_id_Document;
exports.__widl_f_get_element_by_id_Document = __widl_f_get_element_by_id_Document;
var __widl_instanceof_HTMLCanvasElement = _process_pixels_bg.default.__widl_instanceof_HTMLCanvasElement;
exports.__widl_instanceof_HTMLCanvasElement = __widl_instanceof_HTMLCanvasElement;
var __widl_f_get_context_HTMLCanvasElement = _process_pixels_bg.default.__widl_f_get_context_HTMLCanvasElement;
exports.__widl_f_get_context_HTMLCanvasElement = __widl_f_get_context_HTMLCanvasElement;
var __widl_f_new_with_u8_clamped_array_and_sh_ImageData = _process_pixels_bg.default.__widl_f_new_with_u8_clamped_array_and_sh_ImageData;
exports.__widl_f_new_with_u8_clamped_array_and_sh_ImageData = __widl_f_new_with_u8_clamped_array_and_sh_ImageData;
var __widl_f_data_ImageData = _process_pixels_bg.default.__widl_f_data_ImageData;
exports.__widl_f_data_ImageData = __widl_f_data_ImageData;
var __widl_f_document_Window = _process_pixels_bg.default.__widl_f_document_Window;
exports.__widl_f_document_Window = __widl_f_document_Window;
var __wbg_call_1fc553129cb17c3c = _process_pixels_bg.default.__wbg_call_1fc553129cb17c3c;
exports.__wbg_call_1fc553129cb17c3c = __wbg_call_1fc553129cb17c3c;
var __wbindgen_object_clone_ref = _process_pixels_bg.default.__wbindgen_object_clone_ref;
exports.__wbindgen_object_clone_ref = __wbindgen_object_clone_ref;
var __wbg_newnoargs_368b05293a3f44de = _process_pixels_bg.default.__wbg_newnoargs_368b05293a3f44de;
exports.__wbg_newnoargs_368b05293a3f44de = __wbg_newnoargs_368b05293a3f44de;
var __wbg_globalThis_8df2c73db5eac245 = _process_pixels_bg.default.__wbg_globalThis_8df2c73db5eac245;
exports.__wbg_globalThis_8df2c73db5eac245 = __wbg_globalThis_8df2c73db5eac245;
var __wbg_self_937dd9f384d2384a = _process_pixels_bg.default.__wbg_self_937dd9f384d2384a;
exports.__wbg_self_937dd9f384d2384a = __wbg_self_937dd9f384d2384a;
var __wbg_window_425d3fa09c43ece4 = _process_pixels_bg.default.__wbg_window_425d3fa09c43ece4;
exports.__wbg_window_425d3fa09c43ece4 = __wbg_window_425d3fa09c43ece4;
var __wbg_global_2c090b42ef2744b9 = _process_pixels_bg.default.__wbg_global_2c090b42ef2744b9;
exports.__wbg_global_2c090b42ef2744b9 = __wbg_global_2c090b42ef2744b9;
var __wbindgen_is_undefined = _process_pixels_bg.default.__wbindgen_is_undefined;
exports.__wbindgen_is_undefined = __wbindgen_is_undefined;
var __wbindgen_debug_string = _process_pixels_bg.default.__wbindgen_debug_string;
exports.__wbindgen_debug_string = __wbindgen_debug_string;
var __wbindgen_throw = _process_pixels_bg.default.__wbindgen_throw;
exports.__wbindgen_throw = __wbindgen_throw;
},{"./pkg/process_pixels_bg.wasm":"process-pixels/pkg/process_pixels_bg.wasm"}],"yeet.js":[function(require,module,exports) {
"use strict";

var _Cargo = _interopRequireDefault(require("./process-pixels/Cargo.toml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Middle = {
  x: function x(_ref) {
    var same = _ref.same,
        wide = _ref.wide,
        long = _ref.long,
        difference = _ref.difference;
    if (same) return 0;
    if (wide) return difference / 2;
    if (long) return 0;
    throw new Error("ratio must be one of: same, wide, long");
  },
  y: function y(_ref2) {
    var same = _ref2.same,
        wide = _ref2.wide,
        long = _ref2.long,
        difference = _ref2.difference;
    if (same) return 0;
    if (wide) return 0;
    if (long) return difference / 2;
    throw new Error("ratio must be one of: same, wide, long");
  },
  h: function h(_ref3) {
    var same = _ref3.same,
        wide = _ref3.wide,
        long = _ref3.long,
        difference = _ref3.difference,
        height = _ref3.height;
    if (same) return height;
    if (wide) return height;
    if (long) return height - difference;
    throw new Error("ratio must be one of: same, wide, long");
  },
  w: function w(_ref4) {
    var same = _ref4.same,
        wide = _ref4.wide,
        long = _ref4.long,
        difference = _ref4.difference,
        width = _ref4.width;
    if (same) return width;
    if (wide) return width - difference;
    if (long) return width;
    throw new Error("ratio must be one of: same, wide, long");
  }
};

var load = function load() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width = imageElement.naturalWidth;
  var height = imageElement.naturalHeight;
  var wide = width > height;
  var long = width < height;
  var same = width == height;
  var difference = Math.abs(width - height);
  var measurements = {
    width: width,
    height: height,
    wide: wide,
    long: long,
    same: same,
    difference: difference
  };
  context.drawImage(imageElement, Middle.x(measurements), Middle.y(measurements), Middle.w(measurements), Middle.h(measurements), 0, 0, 500, 500);
};

var filterHistory = [];
var filterFuture = [];

var applyHistory = function applyHistory() {
  load();
  filterHistory.forEach(function (filter) {
    _Cargo.default[filter]();
  });
};

var undo = function undo() {
  var last = filterHistory.pop();
  if (!last) return;
  filterFuture.push(last);
  applyHistory();
};

var redo = function redo() {
  var last = filterFuture.pop();
  if (!last) return;
  filterHistory.push(last);
  applyHistory();
};

var filter = function filter(_filter) {
  if (_filter == "undo") {
    return undo();
  } else if (_filter == "redo") {
    return redo();
  }

  _Cargo.default[_filter]();

  filterHistory.push(_filter);
};

document.querySelectorAll(".filters button").forEach(function (button) {
  button.addEventListener("click", function () {
    return filter(button.id);
  });
});
var reader = new window.FileReader();
var imageElement = document.createElement("img");
reader.addEventListener("load", function (event) {
  var imageLabel = document.getElementById("image_label");
  imageLabel.style.display = "none";
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.globalCompositeOperation = "copy";
  imageElement.src = event.target.result;
  imageElement.addEventListener("load", load);
});
var fileElement = document.getElementById("file");

var readFile = function readFile() {
  return reader.readAsDataURL(fileElement.files[0]);
};

fileElement.addEventListener("change", readFile);

if (fileElement.files[0]) {
  readFile();
}

document.body.addEventListener("dragover", function (event) {
  document.documentElement.classList.add("drag-her");
  event.preventDefault();
});
document.body.addEventListener("drop", function (event) {
  document.documentElement.classList.remove("drag-her");
  event.preventDefault();
  fileElement.files = event.dataTransfer.files;
  readFile();
});
document.getElementById("yeet").addEventListener("click", function (event) {
  event.preventDefault();
  var canvas = document.getElementById("canvas");
  canvas.toBlob(function (blob) {
    var data = new window.FormData();
    var titleInput = document.getElementById("titleInput");
    var secretInput = document.getElementById("secretInput");
    data.append("photo", blob, "photo.jpg");
    data.append("title", titleInput.value);
    data.append("secret", secretInput.value);

    var destroy = function destroy() {
      var good = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      document.getElementById("main").remove();
      var next = document.createElement("main");
      next.classList.add(good ? "yay" : "no");
      document.documentElement.classList.add("yay");
      var tick = document.createElement("i");
      tick.textContent = good ? "✓" : "✗";
      next.append(tick);
      document.body.append(next);
    };

    fetch("post", {
      method: "POST",
      body: data
    }).then(function () {
      destroy("good");
    }).catch(function () {
      destroy(false);
    });
  }, "image/jpeg", 1);
});
},{"./process-pixels/Cargo.toml":"process-pixels/Cargo.toml"}],"../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53459" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/parcel-plugin-wasm.rs/wasm-loader.js":[function(require,module,exports) {
var global = arguments[3];
var __dirname = "/Users/chee/Projects/chee.snoot.club/boops/telecam/node_modules/parcel-plugin-wasm.rs";
var wasm;const __exports = {};

/**
*/
__exports. roast = function() {
    wasm.roast();
}

/**
*/
__exports. frost = function() {
    wasm.frost();
}

/**
*/
__exports. dimmen = function() {
    wasm.dimmen();
}

/**
*/
__exports. bandw = function() {
    wasm.bandw();
}

/**
*/
__exports. frame = function() {
    wasm.frame();
}

/**
*/
__exports. toast = function() {
    wasm.toast();
}

/**
*/
__exports. trans = function() {
    wasm.trans();
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetUint8ClampedMemory = null;
function getUint8ClampedMemory() {
    if (cachegetUint8ClampedMemory === null || cachegetUint8ClampedMemory.buffer !== wasm.memory.buffer) {
        cachegetUint8ClampedMemory = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachegetUint8ClampedMemory;
}

function getClampedArrayU8FromWasm(ptr, len) {
    return getUint8ClampedMemory().subarray(ptr / 1, ptr / 1 + len);
}

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

__exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

__exports.__wbg_new_59cb74e423758ede = function() {
    const ret = new Error();
    return addHeapObject(ret);
};

__exports.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ret0 = passStringToWasm(ret);
    const ret1 = WASM_VECTOR_LEN;
    getInt32Memory()[arg0 / 4 + 0] = ret0;
    getInt32Memory()[arg0 / 4 + 1] = ret1;
};

__exports.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
    const v0 = getStringFromWasm(arg0, arg1).slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);
    console.error(v0);
};

__exports.__widl_instanceof_Window = function(arg0) {
    const ret = getObject(arg0) instanceof Window;
    return ret;
};

__exports.__widl_f_add_color_stop_CanvasGradient = function(arg0, arg1, arg2, arg3) {
    try {
        getObject(arg0).addColorStop(arg1, getStringFromWasm(arg2, arg3));
    } catch (e) {
        handleError(e)
    }
};

__exports.__widl_instanceof_CanvasRenderingContext2D = function(arg0) {
    const ret = getObject(arg0) instanceof CanvasRenderingContext2D;
    return ret;
};

__exports.__widl_f_set_global_composite_operation_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
    try {
        getObject(arg0).globalCompositeOperation = getStringFromWasm(arg1, arg2);
    } catch (e) {
        handleError(e)
    }
};

__exports.__widl_f_create_linear_gradient_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
    const ret = getObject(arg0).createLinearGradient(arg1, arg2, arg3, arg4);
    return addHeapObject(ret);
};

__exports.__widl_f_create_radial_gradient_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    try {
        const ret = getObject(arg0).createRadialGradient(arg1, arg2, arg3, arg4, arg5, arg6);
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__widl_f_set_fill_style_CanvasRenderingContext2D = function(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
};

__exports.__widl_f_get_image_data_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
    try {
        const ret = getObject(arg0).getImageData(arg1, arg2, arg3, arg4);
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__widl_f_put_image_data_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3) {
    try {
        getObject(arg0).putImageData(getObject(arg1), arg2, arg3);
    } catch (e) {
        handleError(e)
    }
};

__exports.__widl_f_fill_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
};

__exports.__widl_f_get_element_by_id_Document = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).getElementById(getStringFromWasm(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

__exports.__widl_instanceof_HTMLCanvasElement = function(arg0) {
    const ret = getObject(arg0) instanceof HTMLCanvasElement;
    return ret;
};

__exports.__widl_f_get_context_HTMLCanvasElement = function(arg0, arg1, arg2) {
    try {
        const ret = getObject(arg0).getContext(getStringFromWasm(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__widl_f_new_with_u8_clamped_array_and_sh_ImageData = function(arg0, arg1, arg2, arg3) {
    try {
        const ret = new ImageData(getClampedArrayU8FromWasm(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__widl_f_data_ImageData = function(arg0, arg1) {
    const ret = getObject(arg1).data;
    const ret0 = passArray8ToWasm(ret);
    const ret1 = WASM_VECTOR_LEN;
    getInt32Memory()[arg0 / 4 + 0] = ret0;
    getInt32Memory()[arg0 / 4 + 1] = ret1;
};

__exports.__widl_f_document_Window = function(arg0) {
    const ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

__exports.__wbg_call_1fc553129cb17c3c = function(arg0, arg1) {
    try {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

__exports.__wbg_newnoargs_368b05293a3f44de = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm(arg0, arg1));
    return addHeapObject(ret);
};

__exports.__wbg_globalThis_8df2c73db5eac245 = function() {
    try {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__wbg_self_937dd9f384d2384a = function() {
    try {
        const ret = self.self;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__wbg_window_425d3fa09c43ece4 = function() {
    try {
        const ret = window.window;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__wbg_global_2c090b42ef2744b9 = function() {
    try {
        const ret = global.global;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

__exports.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

__exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ret0 = passStringToWasm(ret);
    const ret1 = WASM_VECTOR_LEN;
    getInt32Memory()[arg0 / 4 + 0] = ret0;
    getInt32Memory()[arg0 / 4 + 1] = ret1;
};

__exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm(arg0, arg1));
};



      function init(wasm_path) {
          const fetchPromise = fetch(wasm_path);
          let resultPromise;
          if (typeof WebAssembly.instantiateStreaming === 'function') {
              resultPromise = WebAssembly.instantiateStreaming(fetchPromise, { './process_pixels.js': __exports });
          } else {
              resultPromise = fetchPromise
              .then(response => response.arrayBuffer())
              .then(buffer => WebAssembly.instantiate(buffer, { './process_pixels.js': __exports }));
          }
          return resultPromise.then(({instance}) => {
              wasm = init.wasm = instance.exports;
              return;
          });
      };
      function init_node(wasm_path) {
          const fs = require('fs');
          return new Promise(function(resolve, reject) {
              fs.readFile(__dirname + wasm_path, function(err, data) {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(data.buffer);
                  }
              });
          })
          .then(data => WebAssembly.instantiate(data, { './process_pixels': __exports }))
          .then(({instance}) => {
              wasm = init.wasm = instance.exports;
              return;
          });
      }
      const wasm_bindgen = Object.assign(false ? init_node : init, __exports);
      module.exports = function loadWASMBundle(bundle) {
            return wasm_bindgen(bundle).then(() => __exports)
      }
    
},{"fs":"../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/_empty.js"}],0:[function(require,module,exports) {
var b=require("../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("wasm",require("../node_modules/parcel-plugin-wasm.rs/wasm-loader.js"));b.load([["process_pixels_bg.92604f23.wasm","process-pixels/pkg/process_pixels_bg.wasm"]]).then(function(){require("yeet.js");});
},{}]},{},["../../../../../.local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/telecam/yeet.bfcf0526.js.map