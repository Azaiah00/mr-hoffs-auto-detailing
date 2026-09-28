/* Mr. Hoff's Auto Detailing — site behaviour (vanilla, no dependencies) */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector(".menu-btn");
  var panel = document.getElementById("mobile-nav");
  if (btn && panel) {
    var setOpen = function (open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
      panel.hidden = !open;
      document.body.classList.toggle("menu-open", open);
    };
    btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
    });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960) setOpen(false); });
  }

  /* ---------- Reveal on view ---------- */
  var revealEls = document.querySelectorAll(".reveal, .streak, .rosette");
  if (!("IntersectionObserver" in window) || reduce) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var numEl = el.querySelector(".n") || el;
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var t = clamp((ts - start) / dur, 0, 1);
      numEl.textContent = (target * easeOut(t)).toFixed(dec);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight) { // only zero-out counters that start off-screen
        var numEl = el.querySelector(".n") || el;
        numEl.textContent = (0).toFixed(parseInt(el.getAttribute("data-decimals") || "0", 10));
      }
      cio.observe(el);
    });
  }

  if (reduce) return;

  /* ---------- Scroll-linked effects ---------- */
  var sheens = Array.prototype.slice.call(document.querySelectorAll(".sheen"));
  var glare = document.querySelector(".hero-photo");
  var rosette = document.querySelector(".rosette");
  var ceramic = document.querySelector("[data-ceramic]");
  var ceramicWrap = ceramic ? ceramic.closest(".panel-wrap") : null;
  var drops = ceramic ? Array.prototype.slice.call(ceramic.querySelectorAll(".drop")) : [];
  var stateLabel = ceramic ? ceramic.querySelector("[data-drop-state]") : null;
  var dropData = drops.map(function (d, i) {
    return {
      el: d,
      delay: parseFloat(d.getAttribute("data-d") || (i % 7) / 7),
      dx: parseFloat(d.getAttribute("data-dx") || 0)
    };
  });

  // intro sweep for headline sheen
  var introStart = null, introDone = false;
  function intro(ts) {
    if (!introStart) introStart = ts;
    var t = clamp((ts - introStart) / 1800, 0, 1);
    var pos = 115 - 55 * easeOut(t); // 115% -> 60%
    sheens.forEach(function (s) { s.style.setProperty("--sheen", pos + "%"); });
    if (t < 1) requestAnimationFrame(intro); else { introDone = true; update(); }
  }
  if (sheens.length) requestAnimationFrame(intro);

  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    var y = window.scrollY || window.pageYOffset;

    if (introDone) {
      sheens.forEach(function (s) {
        var r = s.getBoundingClientRect();
        var p = clamp(1 - (r.top + r.height) / (vh + r.height), 0, 1);
        s.style.setProperty("--sheen", (60 - 60 * p) + "%");
      });
    }
    if (glare) {
      var gp = clamp(y / (vh * 0.9), 0, 1);
      glare.style.setProperty("--glare", (-60 + 160 * gp) + "%");
    }
    if (rosette && rosette.classList.contains("is-in")) {
      rosette.style.setProperty("--rot", (-6 + clamp(y / vh, 0, 1) * 10) + "deg");
    }
    if (ceramic) {
      // Sticky layout (desktop): drive by section progress. Stacked layout: drive by the panel crossing the viewport.
      var sticky = ceramicWrap && getComputedStyle(ceramicWrap).position === "sticky";
      var host = sticky ? ceramicWrap.closest("section") : ceramic;
      var cr = host.getBoundingClientRect();
      var p2 = clamp((vh - cr.top) / (vh + cr.height), 0, 1);
      var ph = sticky ? [0.08, 0.2, 0.36, 0.2] : [0.08, 0.28, 0.5, 0.26];
      var bead = easeOut(clamp((p2 - ph[0]) / ph[1], 0, 1));
      var rolling = false;
      dropData.forEach(function (d) {
        var r = clamp((p2 - ph[2] - d.delay * 0.1) / ph[3], 0, 1);
        if (r > 0) rolling = true;
        var s = 0.15 + 0.85 * clamp(bead * 1.15 - d.delay * 0.15, 0, 1);
        var ty = r * r * 520;
        var tx = r * r * d.dx;
        var stretch = 1 + r * 0.55;
        d.el.style.transform = "translate(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px) scale(" + (s / Math.sqrt(stretch)).toFixed(3) + "," + (s * stretch).toFixed(3) + ")";
        d.el.style.opacity = (bead * (1 - r * 0.4)).toFixed(3);
      });
      if (stateLabel) {
        var txt = bead < 0.6 ? "Water lands" : (rolling ? "Rolls right off" : "Beads up");
        if (stateLabel.textContent !== txt) stateLabel.textContent = txt;
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();

/* ---------- Quote form (Netlify) ---------- */
(function () {
  "use strict";
  var form = document.querySelector("form[data-quote-form]");
  if (!form) return;
  var success = document.getElementById("form-success");
  var status = document.getElementById("form-status");

  function fieldOf(input) { return input.closest(".field"); }
  function validate(input) {
    var f = fieldOf(input);
    if (!f) return true;
    var ok = input.checkValidity();
    if (input.type === "tel" && input.value) {
      ok = ok && input.value.replace(/\D/g, "").length >= 10;
    }
    f.classList.toggle("invalid", !ok);
    input.setAttribute("aria-invalid", ok ? "false" : "true");
    return ok;
  }
  form.setAttribute("novalidate", "");
  form.querySelectorAll("input[required], select[required], input[type=email], input[type=tel]").forEach(function (el) {
    el.addEventListener("blur", function () { if (el.value) validate(el); });
    el.addEventListener("input", function () { if (fieldOf(el) && fieldOf(el).classList.contains("invalid")) validate(el); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    form.querySelectorAll("input[required], select[required], input[type=email], input[type=tel]").forEach(function (el) {
      if (!validate(el) && !firstBad) firstBad = el;
    });
    var file = form.querySelector("input[type=file]");
    if (file && file.files && file.files[0] && file.files[0].size > 8 * 1024 * 1024) {
      fieldOf(file).classList.add("invalid");
      if (!firstBad) firstBad = file;
    }
    if (firstBad) {
      status.textContent = "Please check the highlighted fields.";
      firstBad.focus();
      return;
    }
    status.textContent = "Sending your request...";
    var submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    fetch(form.getAttribute("action") || "/", { method: "POST", body: new FormData(form) })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        form.hidden = true;
        success.hidden = false;
        success.focus();
        status.textContent = "";
      })
      .catch(function () {
        submitBtn.disabled = false;
        status.textContent = "Sorry, the form could not be sent right now. Please call (804) 355-4633 and we will take care of you.";
      });
  });
})();
