// ==UserScript==
// @name        GitHub: Compact file tree
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://github.com/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-compact-filetree.user.js
// @downloadURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-compact-filetree.user.js
// @grant       none
// @version     1.5
// @author      Felix Dombek
// @description 7/20/2022, 5:34:29 PM
// ==/UserScript==

function addGlobalStyle(css) {
  var head = document.querySelector('head');
  if (!head) return;
  var style = document.createElement('style');
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle(`
  .ActionList-content { padding-top: 1px !important; padding-bottom: 0 !important; font-size: small !important }
  diff-layout .Layout-sidebar { margin-left: -30px !important }
  diff-layout .Layout-sidebar, diff-layout file-tree { width: 320px !important }
  .merge-status-list { max-height: inherit !important; }
  .merge-status-item { padding: 1px 8px 1px 1px !important; }
`);