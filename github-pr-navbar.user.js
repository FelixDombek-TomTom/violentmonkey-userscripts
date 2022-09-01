// ==UserScript==
// @name        GitHub: PR Navbar
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://github.com/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-navbar.user.js
// @downloadURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-navbar.user.js
// @grant       none
// @version     1.6
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

addGlobalStyle(`
  #own-clonedtabs .tabnav-tab { padding: 5px 2px; max-width: 20px; height: 22px; white-space: nowrap;
                                overflow: hidden; border: 0; border-radius: 0px !important; display: flex; }
  #own-clonedtabs { margin: -5px 0 0 10px; background-color: rgba(255, 255, 255, 1.0); }
`);

let tabnavTabs = document.querySelector(".tabnav-tabs");
let clonedTabs = tabnavTabs.cloneNode(true);
clonedTabs.querySelectorAll("a").forEach(elem => {
  elem.classList.add("tooltipped");
  elem.classList.add("tooltipped-s");
  elem.setAttribute("aria-label", elem.textContent.trim());
});
clonedTabs.setAttribute("id", "own-clonedtabs");

function appendCloneIfNeeded() {
  if (!document.getElementById("own-clonedtabs")) {
    document.querySelector('.diffbar.details-collapse h1').appendChild(clonedTabs);
  }
}

appendCloneIfNeeded()
setInterval(appendCloneIfNeeded, 1000)
