// ==UserScript==
// @name        GitHub: PR Navbar
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://github.com/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-navbar.user.js
// @downloadURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-navbar.user.js
// @grant       none
// @version     1.8
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
  #own-clonedtabs { margin: -5px 0 0 10px; background-color: rgba(255, 255, 255, 1.0); min-width: 80px; }
`);

function createClone() {
  let tabnavTabs = document.querySelector(".tabnav-tabs");
  if (!tabnavTabs) { return null; }
  let clonedTabs = tabnavTabs.cloneNode(true);
  clonedTabs.querySelectorAll("a").forEach(elem => {
    elem.classList.add("tooltipped");
    elem.classList.add("tooltipped-s");
    elem.setAttribute("aria-label", elem.textContent.trim());
  });
  clonedTabs.setAttribute("id", "own-clonedtabs");
  return clonedTabs;
}

function appendCloneIfNeeded() {
  if (!document.getElementById("own-clonedtabs")) {
    let clonedTabs = createClone();
    if (clonedTabs) {
      let appendTo = document.querySelector('.js-sticky h1')
      if (appendTo) appendTo.appendChild(clonedTabs);
    }
  }
}

appendCloneIfNeeded()
setInterval(appendCloneIfNeeded, 1000)
