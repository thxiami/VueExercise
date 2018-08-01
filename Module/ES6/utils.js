"use strict";

function log() {
    console.log.apply(window, arguments)
}

export default function() {
    console.log("default import ok")
}
export {log};
