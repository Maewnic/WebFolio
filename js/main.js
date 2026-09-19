/* ==========================================================================
   Site behaviour. Reads everything from content.js and builds the pages.
   You normally don't need to edit this file.
   ========================================================================== */
(function () {
  "use strict";

  var P = PORTFOLIO;
  var S = P.site;
  var page = document.body.getAttribute("data-page") || "home";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function paras(text) {
    return String(text || "").split(/\n\s*\n/).map(function (t) { return t.trim(); })
      .filter(Boolean).map(function (t) { return "<p>" + esc(t).replace(/\n/g, "<br>") + "</p>"; }).join("");
  }
  function arr(v) { return Array.isArray(v) ? v : (v ? [v] : []); }

  var projects = (P.projects || []).filter(function (p) { return !p.hidden; });
  function findProject(slug) { return projects.filter(function (p) { return p.slug === slug; })[0]; }
  function catOf(key) { return (P.categories || []).filter(function (c) { return c.key === key; })[0] || { key: key, label: key, blurb: "" }; }
  function catsInUse() {
    return (P.categories || []).filter(function (c) {
      return projects.some(function (p) { return p.category === c.key; });
    });
  }
  function projectUrl(p) { return "project.html?p=" + encodeURIComponent(p.slug); }

  /* ------------------------------------------------------------------ media */
  function youtubeInfo(url) {
    var m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return m ? { id: m[1], vertical: /\/shorts\//.test(url) } : null;
  }
  function isVertical(m) {
    if (!m || !m.url) return false;
    if (m.type === "instagram") return true;
    if (m.type === "youtube") { var y = youtubeInfo(m.url); return !!(y && y.vertical); }
    return false;
  }

  function mediaHTML(m, title) {
    if (!m || !m.url) return "";
    var url = m.url, t = m.type || "image";

    if (t === "youtube") {
      var yt = youtubeInfo(url);
      if (!yt) return "";
      return '<div class="media media-video' + (yt.vertical ? " vertical" : "") + '">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' + yt.id + '" title="' + esc(m.title || title || "Video") + '" loading="lazy" ' +
        'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    }
    if (t === "instagram") {
      var clean = url.split("?")[0];
      return '<div class="media media-instagram"><blockquote class="instagram-media" data-instgrm-permalink="' + esc(clean) +
        '" data-instgrm-version="14"><a href="' + esc(clean) + '" target="_blank" rel="noopener">View on Instagram</a></blockquote></div>';
    }
    if (t === "soundcloud") {
      return '<div class="media media-audio"><iframe title="' + esc(m.title || title || "Audio") + '" loading="lazy" src="https://w.soundcloud.com/player/?url=' +
        encodeURIComponent(url) + '&color=%231c2233&hide_related=true&show_comments=false&visual=false"></iframe></div>';
    }
    if (t === "audio") {
      return '<div class="media media-audio-file"><audio controls preload="none" src="' + esc(url) + '"></audio></div>';
    }
    if (t === "sketchfab") {
      var sk = url.match(/([0-9a-f]{32})/i);
      if (!sk) return "";
      return '<div class="media media-video"><iframe title="' + esc(m.title || title || "3D model") + '" loading="lazy" src="https://sketchfab.com/models/' +
        sk[1] + '/embed" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen></iframe></div>';
    }
    return '<figure class="media media-image"><img src="' + esc(url) + '" alt="' + esc(m.alt || "") + '" loading="lazy" decoding="async">' +
      (m.caption ? "<figcaption>" + esc(m.caption) + "</figcaption>" : "") + "</figure>";
  }

  function mediaGroup(list, title) {
    list = arr(list).filter(function (m) { return m && m.url; });
    if (!list.length) return "";
    var vertical = list.every(isVertical) && list.length > 1;
    return '<div class="media-group ' + (vertical ? "is-row" : "is-stack") + '">' +
      list.map(function (m) { return mediaHTML(m, title); }).join("") + "</div>";
  }

  /* ------------------------------------------------------------- tiles/cards */
  function coverHTML(p) {
    if (p.cover) return '<img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || p.title) + '" loading="lazy" decoding="async">';
    return '<div class="tint tint-' + esc(p.category) + '" aria-hidden="true"></div>';
  }
  function tileHTML(p, cls) {
    return '<a class="tile ' + cls + ' reveal" href="' + projectUrl(p) + '" data-cat="' + esc(p.category) + '">' +
      '<div class="tile-media">' + coverHTML(p) + (p.status ? '<span class="badge">' + esc(p.status) + "</span>" : "") + "</div>" +
      '<div class="tile-body"><p class="tile-cat">' + esc(catOf(p.category).label) + "</p>" +
      "<h3>" + esc(p.title) + "</h3>" +
      (p.tagline ? '<p class="tile-text">' + esc(p.tagline) + "</p>" : "") + "</div></a>";
  }

  /* ---------------------------------------------------------- header / footer */
  function buildHeader() {
    var el = $("#site-header");
    if (!el) return;
    var nav = [
      { key: "home", label: "Home", href: "index.html" },
      { key: "work", label: "Work", href: "work.html" },
      { key: "about", label: "About", href: "about.html" },
      { key: "contact", label: "Contact", href: "contact.html" }
    ];
    var current = page === "project" ? "work" : page;
    el.innerHTML =
      '<header class="site-header"><div class="container header-row">' +
      '<a class="brand" href="index.html">' + esc(S.name) + "</a>" +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Menu"><span></span><span></span></button>' +
      '<nav id="main-nav" class="main-nav" aria-label="Main"><ul>' +
      nav.map(function (n) {
        return '<li><a href="' + n.href + '"' + (n.key === current ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
      }).join("") + "</ul></nav></div></header>";

    var btn = $(".nav-toggle", el), menu = $(".main-nav", el);
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  function contactLinks() {
    var out = [];
    if (S.email) out.push({ label: "Email", text: S.email, href: "mailto:" + S.email });
    if (S.linkedin) out.push({ label: "LinkedIn", text: "LinkedIn", href: S.linkedin, ext: true });
    if (S.instagram) out.push({ label: "Instagram", text: "Instagram", href: S.instagram, ext: true });
    if (S.youtube) out.push({ label: "YouTube", text: "YouTube", href: S.youtube, ext: true });
    return out;
  }

  function buildFooter() {
    var el = $("#site-footer");
    if (!el) return;
    var links = contactLinks().map(function (l) {
      return '<li><a href="' + esc(l.href) + '"' + (l.ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.text) + "</a></li>";
    }).join("");
    el.innerHTML =
      '<footer class="site-footer"><div class="container footer-grid">' +
      '<div><p class="footer-title">Let’s make something <em>interesting</em>.</p>' +
      '<a class="btn" href="contact.html">Get in touch</a></div>' +
      '<div class="footer-side">' + (links ? '<ul class="footer-links">' + links + "</ul>" : "") +
      '<p class="footer-note">' + esc(S.name) + " · " + esc(S.location) + " · &copy; " + new Date().getFullYear() + "</p></div>" +
      "</div></footer>";
  }

  /* -------------------------------------------------------------------- home */
  function renderHome() {
    $("#hero-title").innerHTML = "Hi, I’m <em>" + esc(S.name) + "</em>.";
    $("#hero-intro").textContent = S.intro;
    $("#hero-loc").textContent = S.location;
    $("#hero-visual").innerHTML = S.heroImage
      ? '<img src="' + esc(S.heroImage) + '" alt="' + esc(S.heroAlt || "") + '" decoding="async">'
      : '<div class="dream" aria-hidden="true"></div>';

    var feat = arr(P.featured).map(findProject).filter(Boolean);
    var box = $("#featured");
    if (feat.length) {
      box.innerHTML = feat.map(function (p, i) { return tileHTML(p, "f" + Math.min(i, 3)); }).join("");
    } else {
      $("#featured-section").hidden = true;
    }

    var cats = catsInUse();
    $("#cats").innerHTML = cats.map(function (c, i) {
      var n = projects.filter(function (p) { return p.category === c.key; }).length;
      return '<a class="cat-row reveal" href="work.html#' + esc(c.key) + '">' +
        '<span class="cat-num">0' + (i + 1) + "</span>" +
        '<span class="cat-name">' + esc(c.label) + "</span>" +
        '<span class="cat-blurb">' + esc(c.blurb) + "</span>" +
        '<span class="cat-count">' + n + (n === 1 ? " project" : " projects") + "</span>" +
        '<span class="cat-arrow" aria-hidden="true">&rarr;</span></a>';
    }).join("");
    $("#teaser-text").textContent = S.aboutTeaser || "";
  }

  /* -------------------------------------------------------------------- work */
  function renderWork() {
    var cats = catsInUse();
    var chips = $("#chips");
    chips.innerHTML =
      '<button class="chip" type="button" data-f="all" aria-pressed="true">All <span>' + projects.length + "</span></button>" +
      cats.map(function (c) {
        var n = projects.filter(function (p) { return p.category === c.key; }).length;
        return '<button class="chip" type="button" data-f="' + esc(c.key) + '" aria-pressed="false">' + esc(c.label) + " <span>" + n + "</span></button>";
      }).join("");
    $("#work-grid").innerHTML = projects.map(function (p) { return tileHTML(p, "tile--" + (p.size || "m")); }).join("");

    function apply(f) {
      if (f !== "all" && !cats.some(function (c) { return c.key === f; })) f = "all";
      [].forEach.call(document.querySelectorAll("#work-grid .tile"), function (t) {
        t.hidden = !(f === "all" || t.getAttribute("data-cat") === f);
      });
      [].forEach.call(chips.querySelectorAll(".chip"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-f") === f ? "true" : "false");
      });
      return f;
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      var f = apply(b.getAttribute("data-f"));
      if (history.replaceState) history.replaceState(null, "", f === "all" ? "work.html" : "work.html#" + f);
    });
    apply(location.hash.slice(1) || "all");
    window.addEventListener("hashchange", function () { apply(location.hash.slice(1) || "all"); });
  }

  /* ----------------------------------------------------------------- project */
  function renderProject() {
    var slug = new URLSearchParams(location.search).get("p");
    var p = findProject(slug);
    var box = $("#project");
    if (!p) {
      document.title = "Project not found | " + S.name;
      box.innerHTML = '<section class="container page-head"><h1>That project <em>isn’t here</em>.</h1>' +
        '<p class="lead">It may have moved or been renamed.</p><p><a class="btn" href="work.html">Back to work</a></p></section>';
      return;
    }
    document.title = p.title + " | " + S.name;
    var cat = catOf(p.category);
    var h = "";

    /* header */
    h += '<header class="container project-head">' +
      '<a class="crumb" href="work.html#' + esc(p.category) + '">&larr; Work / ' + esc(cat.label) + "</a>" +
      '<p class="eyebrow">' + esc(p.type || cat.label) + (p.status ? ' <span class="badge badge--inline">' + esc(p.status) + "</span>" : "") + "</p>" +
      "<h1>" + esc(p.title) + "</h1>" +
      (p.summary ? '<p class="lead">' + esc(p.summary) + "</p>" : "") + "</header>";

    /* meta row */
    var meta = [];
    if (p.role) meta.push(["Role", esc(p.role)]);
    var collabs = arr(p.collaborators).filter(function (c) { return c && c.name; });
    if (collabs.length) meta.push(["With", collabs.map(function (c) { return esc(c.name) + (c.role ? " — " + esc(c.role) : ""); }).join("<br>")]);
    if (arr(p.tools).length) meta.push(["Tools", arr(p.tools).map(esc).join(", ")]);
    if (p.year) meta.push(["Year", esc(p.year)]);
    if (meta.length) {
      h += '<section class="container"><dl class="meta">' + meta.map(function (m) { return "<div><dt>" + m[0] + "</dt><dd>" + m[1] + "</dd></div>"; }).join("") + "</dl></section>";
    }

    /* hero media: video/embed if given, else the cover image. Nothing if neither. */
    var heroHTML = p.hero && p.hero.url ? mediaHTML(p.hero, p.title) : (p.cover ? '<figure class="media media-image"><img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || p.title) + '" decoding="async"></figure>' : "");
    if (heroHTML) h += '<section class="container project-hero reveal">' + heroHTML + "</section>";

    /* story sections and video groups (empty ones are skipped) */
    function block(s) {
      var text = paras(s.text), media = mediaGroup(s.media, s.title);
      if (!text && !media) return "";
      return '<section class="container psec reveal">' +
        (s.title ? '<div class="psec-grid"><h2>' + esc(s.title) + '</h2><div class="psec-text">' + text + "</div></div>" : (text ? '<div class="psec-text psec-solo">' + text + "</div>" : "")) +
        media + "</section>";
    }
    arr(p.mediaRows).forEach(function (s) { h += block(s); });
    arr(p.sections).forEach(function (s) { h += block(s); });

    /* gallery */
    var gal = arr(p.gallery).filter(function (g) { return g && g.src; });
    if (gal.length) {
      h += '<section class="container pgallery reveal"><div class="gallery gallery--' + (p.galleryLayout === "masonry" ? "masonry" : "grid") + '">' +
        gal.map(function (g) {
          return '<figure><img src="' + esc(g.src) + '" alt="' + esc(g.alt || "") + '" loading="lazy" decoding="async">' +
            (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") + "</figure>";
        }).join("") + "</div></section>";
    }

    /* links */
    var links = arr(p.links).filter(function (l) { return l && l.url; });
    if (links.length) {
      h += '<section class="container plinks">' + links.map(function (l) {
        return '<a class="btn btn--ghost" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label || "View") + " &nearr;</a>";
      }).join("") + "</section>";
    }

    /* next / back */
    var idx = projects.indexOf(p), next = projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
    h += '<nav class="container pnav" aria-label="Project navigation"><a class="btn btn--ghost" href="work.html#' + esc(p.category) + '">&larr; Back to work</a>' +
      (next ? '<a class="pnav-next" href="' + projectUrl(next) + '"><span>Next project</span><strong>' + esc(next.title) + " &rarr;</strong></a>" : "") + "</nav>";

    box.innerHTML = h;
  }

  /* ------------------------------------------------------------------- about */
  function renderAbout() {
    var t = arr(S.about);
    $("#about-text").innerHTML = t.map(function (x, i) { return '<p class="' + (i === 0 ? "lead" : "") + '">' + esc(x) + "</p>"; }).join("");
    $("#about-photo").innerHTML = S.aboutPhoto ? '<img src="' + esc(S.aboutPhoto) + '" alt="Photo of ' + esc(S.name) + '" decoding="async">' : '<div class="dream" aria-hidden="true"></div>';
    $("#about-facts").innerHTML = [S.fullName, S.education, S.from, S.location]
      .filter(Boolean).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");

    $("#experience").innerHTML = arr(P.experience).map(function (e) {
      return '<article class="exp reveal"><div class="exp-when">' + esc(e.period || "") + "</div><div><h3>" + esc(e.title) + '</h3><p class="exp-org">' +
        esc(e.org) + "</p>" + (e.text ? "<p>" + esc(e.text) + "</p>" : "") + "</div></article>";
    }).join("");

    $("#skills").innerHTML = arr(P.skills).map(function (g) {
      return '<div class="skill-group reveal"><h3>' + esc(g.group) + "</h3><ul>" + arr(g.items).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
    }).join("");

    var tools = [];
    projects.forEach(function (p) { arr(p.tools).forEach(function (x) { if (tools.indexOf(x) < 0) tools.push(x); }); });
    if (tools.length) {
      $("#tools").innerHTML = '<h3>Tools I’ve used in these projects</h3><ul class="chips-static">' + tools.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    } else {
      $("#tools").hidden = true;
    }
  }

  /* ----------------------------------------------------------------- contact */
  function renderContact() {
    var links = contactLinks();
    $("#contact-list").innerHTML = links.length ? links.map(function (l) {
      return '<li class="reveal"><span>' + esc(l.label) + '</span><a href="' + esc(l.href) + '"' + (l.ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.text) + ' <i aria-hidden="true">&rarr;</i></a></li>';
    }).join("") : "<li><span>Contact</span><em>Contact details coming soon.</em></li>";
  }

  /* --------------------------------------------------------------- lightbox */
  function setupLightbox() {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image viewer");
    box.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(box);
    var img = $("img", box);
    function close() { box.hidden = true; document.body.classList.remove("no-scroll"); }
    document.addEventListener("click", function (e) {
      var t = e.target.closest(".gallery img, .media-image img");
      if (t) { img.src = t.currentSrc || t.src; img.alt = t.alt || ""; box.hidden = false; document.body.classList.add("no-scroll"); $("button", box).focus(); return; }
      if (!box.hidden && (e.target === box || e.target.closest(".lightbox button"))) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
  }

  /* --------------------------------------------------------------- animation */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      [].forEach.call(items, function (n) { n.classList.add("in"); });
      return;
    }
    document.documentElement.classList.add("anim");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    [].forEach.call(items, function (n, i) {
      n.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(n);
    });
  }

  function loadInstagram() {
    if (!document.querySelector(".instagram-media")) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = function () { if (window.instgrm) window.instgrm.Embeds.process(); };
    document.body.appendChild(s);
  }

  /* -------------------------------------------------------------------- go */
  document.title = ({ home: "", work: "Work | ", about: "About | ", contact: "Contact | " }[page] || "") + S.name;
  if (page === "home") document.title = S.name + " | Digital Media Creative";

  buildHeader();
  if (page === "home") renderHome();
  if (page === "work") renderWork();
  if (page === "project") renderProject();
  if (page === "about") renderAbout();
  if (page === "contact") renderContact();
  buildFooter();
  setupLightbox();
  setupReveal();
  loadInstagram();
})();
