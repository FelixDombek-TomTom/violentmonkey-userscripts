// ==UserScript==
// @name        estargmbh.de: immediate 'next' button
// @namespace   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts
// @match       https://tomtom-germany.estargmbh.de/admin/render.php
// @updateURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/estar-next.user.js
// @downloadURL   https://github.com/FelixDombek-TomTom/violentmonkey-userscripts/raw/main/estar-next.user.js
// @grant       none
// @version     1.1
// @author      -
// @description 4/8/2021, 6:28:24 PM
// ==/UserScript==

setTimeout(function(){ $('#btnNext').prop('disabled',false); }, 10);