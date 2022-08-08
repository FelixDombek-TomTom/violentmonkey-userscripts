// ==UserScript==
// @name        GitHub: Compact file tree
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*/*/pull/*/files
// @grant       none
// @version     1.0
// @author      -
// @description 7/20/2022, 5:34:29 PM
// ==/UserScript==

function addGlobalStyle(css) {
    var head = document.querySelector('head');
    if (!head) { return; }
    var style = document.createElement('style');
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.ActionList-content { padding-top: 1px !important; padding-bottom: 0 !important; font-size: small !important }' +
               'diff-layout .Layout-sidebar { margin-left: -30px !important }' +
               '.Layout-sidebar, file-tree { width: 320px !important }');