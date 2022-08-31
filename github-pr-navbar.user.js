// ==UserScript==
// @name        GitHub: PR Navbar
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://github.com/*/*/pull/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-navbar.user.js
// @downloadURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-navbar.user.js
// @grant       none
// @version     1.4
// @author      Felix Dombek
// @description 8/1/2022, 3:01:57 PM
// ==/UserScript==

function addGlobalStyle(css) {
  let head = document.querySelector('head');
  if (!head) { return; }
  let style = document.createElement('style');
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle('#own-clonedtabs .tabnav-tab { padding: 5px 2px; max-width: 20px; height: 24px; white-space: nowrap; ' +
  '                              overflow: hidden; border: 0; border-radius: 0px !important; display: flex; transition: 0.2s ease-out; } ' +
  '#own-clonedtabs:hover .tabnav-tab { max-width: 500px; }' +
  '#own-clonedtabs { flex-direction: column; position: fixed; top: 0px; margin: 0px auto; background-color: rgba(255, 255, 255, 1.0); ' +
  '                  border: 1px solid gray; border-width: 0 2px 2px 0; border-bottom-right-radius: 10px; z-index: 999; } ');

let tabnavTabs = document.querySelector(".tabnav-tabs")
let clonedTabs = tabnavTabs.cloneNode(true)
clonedTabs.setAttribute("id", "own-clonedtabs");

function appendCloneIfNeeded() {
  if (!document.getElementById("own-clonedtabs")) {
    document.querySelector('body').appendChild(clonedTabs);
  }
}

appendCloneIfNeeded()
setInterval(appendCloneIfNeeded, 1000)

