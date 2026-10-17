/* Renders certificate cards from data/certificates.js + filter chips + stats. */
(function () {
  "use strict";
  var data = window.__CERTS__ || [];
  var grid = document.querySelector("[data-certs]");
  if (!grid || grid.children.length > 0) return;           // idempotent mount
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  grid.innerHTML = data.map(function (c, i) {
    return '<article class="cert reveal" data-tilt data-type="' + esc(c.type) + '" style="--d:' + (i % 3) * 0.08 + 's">' +
      '<div class="cert-top"><span class="mono tag">' + (c.type === "degree" ? "Degree" : "Certificate") + '</span>' +
      '<span class="mono">' + esc(c.year) + (c.placeholder ? ' · <span class="sample">Sample</span>' : "") + '</span></div>' +
      '<h3>' + esc(c.title) + '</h3><p class="issuer">' + esc(c.issuer) + '</p>' +
      '<ul class="skills" style="padding:0">' + (c.skills || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + '</ul>' +
      (c.url ? '<a class="link" href="' + esc(c.url) + '" target="_blank" rel="noopener"><span class="ul">View credential ↗</span></a>' : "") +
      '</article>';
  }).join("");

  var count = function (t) { return data.filter(function (c) { return c.type === t; }).length; };
  var issuers = {}; data.forEach(function (c) { issuers[c.issuer] = 1; });
  [["degrees", count("degree")], ["certificates", count("certificate")], ["issuers", Object.keys(issuers).length]].forEach(function (p) {
    var el = document.querySelector('[data-stat="' + p[0] + '"]');
    if (el) { el.dataset.count = p[1]; el.textContent = p[1]; }
  });

  document.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", b === btn); });
      grid.querySelectorAll(".cert").forEach(function (c) { c.hidden = !(f === "all" || c.dataset.type === f); });
    });
  });
})();
