// ==UserScript==
// @name        GitHub: Navbar and Expand all
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*/*/pull/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-navbar.user.js
// @grant       none
// @version     1.2
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
  '                  border: 1px solid gray; border-width: 0 2px 2px 0; border-bottom-right-radius: 10px; z-index: 999; } ' +
  '#own-expandall { border-top: 2px solid gray !important; margin: 3px 0; }');

function expandAll() {
  for (var list = document.querySelectorAll(".js-expand.directional-expander"), i = 0;
       i < list.length;
       ++i, list = document.querySelectorAll(".js-expand.directional-expander")) {
    console.log(i, list[i]);
    list[i].click();
  }
}

let tabnavTabs = document.querySelector(".tabnav-tabs")
let clonedTabs = tabnavTabs.cloneNode(true)
clonedTabs.setAttribute("id", "own-clonedtabs");

function addExpandButton() {
  let expandSvg = '<svg class="octicon octicon-file-diff d-none d-md-inline-block" width=16 height=16>' +
    '<path d="M8.177.677l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25a.75.75 0 01-1.5 0V4H5.104a.25.25 0 01-.177-.427L7.823.677a.25.25' +
    ' 0 01.354 0zM7.25 10.75a.75.75 0 011.5 0V12h2.146a.25.25 0 01.177.427l-2.896 2.896a.25.25 0 01-.354 0l-2.896-2.896A.25.25 0 015.104 12H7.25v-1.25zm-5-2a.75.75' +
    ' 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75' +
    ' 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z"></path></svg>' +
    'Expand all diffs';

  let expander = document.createElement("a");
  expander.setAttribute('class', 'tabnav-tab flex-shrink-0 js-pjax-history-navigate js-turbo-history-navigateff selected');
  expander.setAttribute('id', 'own-expandall')
  expander.setAttribute('href', 'javascript:void(0)');
  expander.addEventListener("click", expandAll);
  expander.innerHTML = expandSvg;
  clonedTabs.appendChild(expander);
}

addExpandButton();

function appendCloneIfNeeded() {
  if (!document.getElementById("own-clonedtabs")) {
    document.querySelector('body').appendChild(clonedTabs);
  }
}

appendCloneIfNeeded()
setInterval(appendCloneIfNeeded, 1000)

