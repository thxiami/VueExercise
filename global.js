function log() {
    console.log.apply(window, arguments);
}

function qs(sel) {
    // log("rest", rest);
    return document.querySelector(sel);
}

function qsa(sel) {
    return document.querySelectorAll(sel);
}