/* ==========================================================================
   Site behaviour: builds the menu and footer, fills in text from content.js,
   draws the project cards and handles the small animations.
   You normally don't need to edit this file.
   ========================================================================== */
(function () {
  "use strict";

  var P = PORTFOLIO;
  var page = document.body.getAttribute("data-page") || "home";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function youtubeInfo(url) {
    var m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    if (!m) return null;
    return { id: m[1], vertical: /\/shorts\//.test(url) };
  }

  function placeholder(label) {
    return '<div class="media media-placeholder"><span>' + esc(label || "Media goes here") + "</span></div>";
  }

  /* ---------- media renderers ---------- */
  function renderMedia(m) {
    var url = (m && m.url) || "";
    var type = (m && m.type) || "image";

    if (!url) {
      var labels = {
        youtube: "Add a YouTube link", instagram: "Add an Instagram link",
        soundcloud: "Add a SoundCloud link", audio: "Add an audio file",
        sketchfab: "Add a Sketchfab link", image: "Add an image"
      };
      return placeholder(labels[type]);
    }

    if (type === "youtube") {
      var yt = youtubeInfo(url);
      if (!yt) return placeholder("That YouTube link looks wrong");
      return '<div class="media media-video' + (yt.vertical ? " vertical" : "") + '">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' + yt.id + '" title="' + esc(m.title || "Video") + '" loading="lazy" ' +
        'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    }

    if (type === "instagram") {
      var clean = url.split("?")[0];
      return '<div class="media media-instagram"><blockquote class="instagram-media" data-instgrm-permalink="' + esc(clean) +
        '" data-instgrm-version="14"><a href="' + esc(clean) + '" target="_blank" rel="noopener">View on Instagram</a></blockquote></div>';
    }

    if (type === "soundcloud") {
      return '<div class="media media-audio"><iframe title="' + esc(m.title || "Audio") + '" loading="lazy" ' +
        'src="https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) +
        '&color=%23111111&hide_related=true&show_comments=false&visual=false"></iframe></div>';
    }

    if (type === "audio") {
      return '<div class="media media-audio-file"><audio controls preload="none" src="' + esc(url) + '"></audio></div>';
    }

    if (type === "sketchfab") {
      var sk = url.match(/([0-9a-f]{32})/i);
      if (!sk) return placeholder("That Sketchfab link looks wrong");
      return '<div class="media media-video"><iframe title="' + esc(m.title || "3D model") + '" loading="lazy" ' +
        'src="https://sketchfab.com/models/' + sk[1] + '/embed" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen></iframe></div>';
    }

    /* default: image */
    return '<div class="media media-image"><img src="' + esc(url) + '" alt="' + esc(m.alt || m.title || "") + '" loading="lazy"></div>';
  }

  function renderItem(item) {
    var list = Array.isArray(item.media) ? item.media : [item.media || {}];
    var media = list.map(function (m) { return renderMedia(Object.assign({ title: item.title }, m)); }).join("");
    var tags = (item.tags || []).map(function (t) { return '<li>' + esc(t) + "</li>"; }).join("");
    return '<article class="card reveal">' + media +
      '<div class="card-body"><h3>' + esc(item.title) + "</h3>" +
      (item.description ? "<p>" + esc(item.description) + "</p>" : "") +
      (tags ? '<ul class="tags">' + tags + "</ul>" : "") + "</div></article>";
  }

  /* ---------- header ---------- */
  function buildHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    var inDesign = ["design", "virtual", "models", "sound"].indexOf(page) > -1;
    var links = P.nav.map(function (n) {
      var current = n.key === page || (n.key === "design" && inDesign);
      return '<li><a href="' + esc(n.href) + '"' + (current ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
    }).join("");
    el.innerHTML =
      '<header class="site-header"><div class="container header-row">' +
      '<a class="brand" href="index.html">' + esc(P.site.name) + "</a>" +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Menu"><span></span><span></span></button>' +
      '<nav id="main-nav" class="main-nav"><ul>' + links + "</ul></nav></div></header>";

    var btn = el.querySelector(".nav-toggle");
    var nav = el.querySelector(".main-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- footer ---------- */
  function buildFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var s = P.site;
    var socials = (s.socials || []).filter(function (x) { return x.url; }).map(function (x) {
      return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.label) + "</a></li>";
    }).join("");
    el.innerHTML =
      '<footer class="site-footer"><div class="container footer-grid">' +
      '<div><p class="footer-title">Let\'s talk</p>' +
      (s.email ? '<a class="footer-mail" href="mailto:' + esc(s.email) + '">' + esc(s.email) + "</a>" : "") + "</div>" +
      (socials ? '<ul class="footer-links">' + socials + "</ul>" : "") +
      '<p class="footer-note">&copy; ' + new Date().getFullYear() + " " + esc(s.name) + "</p></div></footer>";
  }

  /* ---------- text from content.js ---------- */
  function fillText() {
    document.querySelectorAll("[data-site]").forEach(function (node) {
      var v = P.site[node.getAttribute("data-site")];
      if (v) node.textContent = v;
    });
    var pageTitle = document.body.getAttribute("data-title");
    document.title = (pageTitle ? pageTitle + " | " : "") + P.site.name;

    var photo = document.querySelector("[data-photo]");
    if (photo) {
      photo.innerHTML = P.site.photo
        ? '<img src="' + esc(P.site.photo) + '" alt="Photo of ' + esc(P.site.name) + '">'
        : "<span>Add your photo</span>";
    }
  }

  /* ---------- big link cards (home + design hub) ---------- */
  function buildCards() {
    document.querySelectorAll("[data-cards]").forEach(function (box) {
      var list = P[box.getAttribute("data-cards")] || [];
      box.innerHTML = list.map(function (c, i) {
        return '<a class="path-card reveal" href="' + esc(c.href) + '">' +
          '<span class="path-num">0' + (i + 1) + "</span>" +
          "<h2>" + esc(c.title) + "</h2><p>" + esc(c.text) + "</p>" +
          '<span class="path-arrow" aria-hidden="true">&rarr;</span></a>';
      }).join("");
    });
  }

  /* ---------- small menu on the design pages ---------- */
  function buildSubnav() {
    document.querySelectorAll("[data-subnav]").forEach(function (box) {
      box.innerHTML = '<ul>' + P.designPaths.map(function (c) {
        return '<li><a href="' + esc(c.href) + '"' + (c.key === page ? ' aria-current="page"' : "") + ">" + esc(c.title) + "</a></li>";
      }).join("") + "</ul>";
    });
  }

  /* ---------- project lists ---------- */
  function buildLists() {
    var hasInstagram = false;
    document.querySelectorAll("[data-list]").forEach(function (box) {
      var items = P[box.getAttribute("data-list")] || [];
      box.innerHTML = items.map(renderItem).join("");
      items.forEach(function (it) {
        [].concat(it.media || []).forEach(function (m) { if (m.type === "instagram" && m.url) hasInstagram = true; });
      });
    });
    if (hasInstagram) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      s.onload = function () { if (window.instgrm) window.instgrm.Embeds.process(); };
      document.body.appendChild(s);
    }
  }

  /* ---------- scroll animation ---------- */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    document.documentElement.classList.add("anim");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    items.forEach(function (n, i) {
      n.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      io.observe(n);
    });
  }

  buildHeader();
  buildFooter();
  fillText();
  buildCards();
  buildSubnav();
  buildLists();
  setupReveal();
})();
