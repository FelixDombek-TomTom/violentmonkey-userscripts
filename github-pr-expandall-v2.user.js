// ==UserScript==
// @name        GitHub: PR Expand all v2
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://github.com/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-expandall-v2.user.js
// @downloadURL https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-expandall-v2.user.js
// @grant       none
// @version     2.0
// @author      Felix Dombek
// @description Auto‑expand all hidden hunks in GitHub PR diffs (Feb 2026 update for new React diff layout).
// ==/UserScript==

let evtListener;

// --- Core expansion logic adapted to new layout ---
function expandAllUnexpanded() {
  let clicked = 0;

  // New GitHub layout: expand buttons live inside diff-hunk-cell
  document.querySelectorAll("td.diff-hunk-cell").forEach((cell) => {
    const btnDown = cell.querySelector("button .octicon-fold-down");
    const btnUp = cell.querySelector("button .octicon-fold-up");
    const btnBoth = cell.querySelector("button .octicon-unfold");

    if (btnBoth) {
      btnBoth.closest("button").click();
      clicked++;
    } else {
      if (btnDown) {
        btnDown.closest("button").click();
        clicked++;
      }
      if (btnUp) {
        btnUp.closest("button").click();
        clicked++;
      }
    }
  });

  console.log(`ExpandAll: expanded ${clicked} diff locations.`);
  return clicked > 0;
}

// --- Button click handler ---
function onExpandAllClicked() {
  const expandAllButton = document.querySelector(
    "#expand-all-diffs-container button",
  );
  if (!expandAllButton) return;

  expandAllButton.textContent = "(All diffs expanded)";
  expandAllButton.removeEventListener("click", evtListener);
  expandAllButton.removeAttribute("onclick");

  let chain = () => {
    if (expandAllUnexpanded()) {
      setTimeout(chain, 1);
    }
  };
  setTimeout(chain, 1);
}

// --- Inject the Expand-all button into new GitHub PR file toolbar ---
function injectButton() {
  // The "file controls" container in the PR files toolbar
  const controls = document.querySelector(
    'div[class*="PullRequestFilesToolbar-module__file-controls"]',
  );
  if (!controls) return;

  if (document.querySelector("#expand-all-diffs-container")) return;

  const container = document.createElement("div");
  container.id = "expand-all-diffs-container";
  container.style.marginRight = "8px";

  const button = document.createElement("button");
  button.innerHTML = "<strong>Expand all diffs</strong>";
  button.className = "btn-link btn-muted";
  button.style.cursor = "pointer";

  evtListener = button.addEventListener("click", onExpandAllClicked);

  container.appendChild(button);
  controls.prepend(container);
}

function injectButtonIfNeeded() {
  if (!document.querySelector("#expand-all-diffs-container")) {
    injectButton();
  }
}

// Run immediately, then poll to handle PJAX navigation
injectButtonIfNeeded();
setInterval(injectButtonIfNeeded, 1000);
