/* Shared behavior for every page. Each effect is isolated in safe() so one failure never breaks the rest. */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var safe = function (fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); } };

  function splash() {
    var s = $("[data-splash]"); if (!s) return;
    var hide = function () { s.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 900); else addEventListener("load", function () { setTimeout(hide, 900); });
    setTimeout(hide, 3000);
  }

  function nav() {
    var n = $("[data-nav]"), t = $("[data-nav-toggle]"); if (!n) return;
    var f = function () { n.classList.toggle("is-solid", scrollY > 20); }; f(); addEventListener("scroll", f, { passive: true });
    if (!t) return;
    t.addEventListener("click", function () { t.setAttribute("aria-expanded", n.classList.toggle("is-open")); });
    $$("a", n).forEach(function (a) { a.addEventListener("click", function () { n.classList.remove("is-open"); t.setAttribute("aria-expanded", "false"); }); });
  }

  function progress() {
    var p = $("[data-progress]"); if (!p) return;
    var f = function () { var h = document.documentElement.scrollHeight - innerHeight; p.style.transform = "scaleX(" + (h > 0 ? scrollY / h : 0) + ")"; };
    f(); addEventListener("scroll", f, { passive: true });
  }

  function reveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }); },
      { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add("is-visible"); }); }, 6000);   // safety net
  }

  // Gradient follows the cursor; on touch screens it drifts on its own.
  function mesh() {
    var m = $("[data-mesh]"); if (!m) return;
    var hover = matchMedia("(hover:hover)").matches, tx = 50, ty = 40, x = 50, y = 40;
    if (hover) addEventListener("pointermove", function (e) { tx = e.clientX / innerWidth * 100; ty = e.clientY / innerHeight * 100; });
    (function loop(t) {
      if (!hover) { tx = 50 + Math.sin(t / 4000) * 25; ty = 40 + Math.cos(t / 5300) * 20; }
      x += (tx - x) * 0.06; y += (ty - y) * 0.06;
      m.style.setProperty("--mx", x + "%"); m.style.setProperty("--my", y + "%");
      requestAnimationFrame(loop);
    })(0);
  }

  // Delegated: works for cards rendered by JS after load.
  function cards() {
    if (!matchMedia("(hover:hover)").matches) return;
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest("[data-tilt]"); if (!c) return;
      var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty("--x", px * 100 + "%"); c.style.setProperty("--y", py * 100 + "%");
      c.style.transform = "perspective(900px) rotateX(" + (0.5 - py) * 7 + "deg) rotateY(" + (px - 0.5) * 7 + "deg)";
    });
    document.addEventListener("pointerout", function (e) {
      var c = e.target.closest && e.target.closest("[data-tilt]"); if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
    });
    document.addEventListener("pointermove", function (e) {
      $$("[data-magnetic]").forEach(function (b) {
        var r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = Math.hypot(dx, dy) < 110 ? "translate(" + dx * 0.25 + "px," + dy * 0.25 + "px)" : "";
      });
    });
  }

  function counters() {
    $$("[data-count]").forEach(function (el) {
      var to = +el.dataset.count;
      var run = function () { var s = performance.now(); (function f(n) { var p = Math.min((n - s) / 1200, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(s); };
      if (!("IntersectionObserver" in window)) { el.textContent = to; return; }
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.01 });
      io.observe(el);
    });
  }

  function filters() { $$("[data-year]").forEach(function (y) { y.textContent = new Date().getFullYear(); }); }

  function boot() {
    [[splash, "splash"], [nav, "nav"], [progress, "progress"], [reveal, "reveal"], [mesh, "mesh"], [cards, "cards"], [counters, "counters"], [filters, "year"]]
      .forEach(function (p) { safe(p[0], p[1]); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
