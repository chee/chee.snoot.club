import * as wasm from './process_pixels_bg.wasm';

/**
*/
export function greet() {
    wasm.greet();
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export const __wbg_alert_9e6ab8c67719abc1 = function(arg0, arg1) {
    alert(getStringFromWasm(arg0, arg1));
};

