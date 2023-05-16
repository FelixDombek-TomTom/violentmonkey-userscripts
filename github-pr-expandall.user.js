// ==UserScript==
// @name        GitHub: PR Expand all
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://github.com/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-expandall.user.js
// @downloadURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-expandall.user.js
// @grant       none
// @version     1.6
// @author      Felix Dombek
// @description Thu Sep 1 2022. Based on https://gist.github.com/mdziekon/a71c46091b716d57136791fe22672f7e
// ==/UserScript==

let evtListener;

function expandAllUnexpanded() {
  let clicked = 0;
  document.querySelectorAll(".diff-table .js-expandable-line").forEach(elem => {
    let shouldExpandDown = false, shouldExpandUp = false;
    if ((elem.previousElementSibling && (shouldExpandDown = elem.previousElementSibling.hasAttribute("data-hunk")))
        | (elem.nextElementSibling && (shouldExpandUp = elem.nextElementSibling.hasAttribute("data-hunk")))) {
      let expandAllClicked = false;
      if (shouldExpandDown) {
        let downElem = elem.querySelector("[aria-label='Expand All'], [aria-label='Expand Down']");
        expandAllClicked = downElem.getAttribute("aria-label") == "Expand All";
        downElem.click();
        ++clicked;
      }
      if (!expandAllClicked && shouldExpandUp) {
        let upElem = elem.querySelector("[aria-label='Expand All'], [aria-label='Expand Up']");
        upElem.click();
        ++clicked;
      }
    }
  })
  console.log(`ExpandAll: expanded ${clicked} diff locations.`)
  return clicked > 0;
}

function onExpandAllClicked() {
  const expandAllButton = document.querySelector("#expand-all-diffs-container button");
  expandAllButton.textContent = "(All diffs expanded)";
  expandAllButton.removeEventListener("click", evtListener);
  expandAllButton.removeAttribute("onclick");

  let chain = () => { if (expandAllUnexpanded()) setTimeout(chain, 1); };
  setTimeout(chain, 1)
}

function injectButton() {
  const codeStats = document.querySelector("span.diffbar-item");

  if (codeStats === null) {
    //console.log("element to append to not found")
    return;
  }

  const expandAllContainer = document.createElement("div");
  expandAllContainer.className = "diffbar-item";
  expandAllContainer.id = "expand-all-diffs-container";
  const expandAllButton = document.createElement("button");
  expandAllButton.innerHTML = "<strong>Expand all diffs</strong>";
  expandAllButton.className = "btn-link btn-muted m-1 mr-4";
  expandAllButton.setAttribute("data-toggle", "button");
  evtListener = expandAllButton.addEventListener("click", onExpandAllClicked);

  expandAllContainer.appendChild(expandAllButton);

  codeStats.parentNode.insertBefore(expandAllContainer, codeStats);
}

function injectButtonIfNeeded() {
  if (document.querySelector("#expand-all-diffs-container") === null) injectButton();
}

injectButtonIfNeeded();
setInterval(injectButtonIfNeeded, 1000);