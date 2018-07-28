'use strict';

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

function addLoadEvent(func) {
    if (typeof func !== 'function' || !func) return false;
    // log("debug before add");
    let oldFunc = window.onload;

    if (typeof oldFunc !== 'function') {
        window.onload = func;
        // log("debug after add 1")

    } else {
        window.onload = function() {
            oldFunc();
            func();
        };
        // log("debug after add 2")
    }
}

function insertAfter(newElement, targetElement) {
    let parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        let oldClassName = element.className;
        element.className = oldClassName + ' ' + value;
    }
}

