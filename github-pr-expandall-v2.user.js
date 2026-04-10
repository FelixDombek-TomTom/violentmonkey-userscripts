// ==UserScript==
// @name        GitHub: PR Expand all v2
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://github.com/**
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-expandall-v2.user.js
// @downloadURL https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/github-pr-expandall-v2.user.js
// @grant       none
// @version     2.0.1
// @author      Felix Dombek
// @description Auto‑expand all hidden hunks in GitHub PR diffs (Feb 2026 update for new React diff layout).
// ==/UserScript==

let evtListener;

// --- Snapshot all currently visible expansion buttons ---
function snapshotExpansionButtons() {
  const buttons = [];

  // New GitHub layout: expand buttons live inside diff-hunk-cell
  document.querySelectorAll("td.diff-hunk-cell").forEach((cell) => {
    const btnDown = cell.querySelector("button .octicon-fold-down");
    const btnUp = cell.querySelector("button .octicon-fold-up");
    const btnBoth = cell.querySelector("button .octicon-unfold");

    if (btnBoth) {
      buttons.push(btnBoth.closest("button"));
    } else {
      if (btnDown) buttons.push(btnDown.closest("button"));
      if (btnUp) buttons.push(btnUp.closest("button"));
    }
  });

  return buttons;
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

  // Snapshot buttons visible in the initial state before clicking any
  const buttonsToClick = snapshotExpansionButtons();
  console.log(`ExpandAll: expanding ${buttonsToClick.length} diff locations.`);

  let i = 0;
  let clickNext = () => {
    if (i < buttonsToClick.length) {
      buttonsToClick[i].click();
      i++;
      setTimeout(clickNext, 1);
    }
  };
  setTimeout(clickNext, 1);
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
