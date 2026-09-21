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

  function igBlockquote(clean) {
    return '<blockquote class="instagram-media" data-instgrm-permalink="' + esc(clean) +
      '" data-instgrm-version="14"><a href="' + esc(clean) + '" target="_blank" rel="noopener">View on Instagram</a></blockquote>';
  }

  function mediaHTML(m, title, lazy) {
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
      // lazy = only load the Instagram embed when it is about to be seen (keeps big lists fast)
      if (lazy) return '<div class="media media-instagram is-lazy" data-ig="' + esc(clean) + '"><div class="ig-skeleton" aria-hidden="true"></div></div>';
      return '<div class="media media-instagram">' + igBlockquote(clean) + "</div>";
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
    if (t === "embed") {
      // Click-to-load: shows a poster first, then loads the live page inside the site.
      return '<div class="media media-embed"><div class="embed-frame" data-src="' + esc(url) + '" data-title="' + esc(m.title || title || "Interactive page") + '">' +
        (m.poster ? '<img class="embed-poster" src="' + esc(m.poster) + '" alt="" loading="lazy" decoding="async">' : '<div class="tint tint-immersive embed-poster"></div>') +
        '<button type="button" class="embed-start"><span>' + esc(m.label || "Try it here") + "</span></button></div></div>";
    }
    return '<figure class="media media-image"><img src="' + esc(url) + '" alt="' + esc(m.alt || "") + '" loading="lazy" decoding="async">' +
      (m.caption ? "<figcaption>" + esc(m.caption) + "</figcaption>" : "") + "</figure>";
  }

  function mediaGroup(list, title, opts) {
    opts = opts || {};
    list = arr(list).filter(function (m) { return m && m.url; });
    if (!list.length) return "";
    var vertical = list.every(isVertical) && list.length > 1;
    var page = opts.page || 0;
    var html = '<div class="media-group ' + (vertical ? "is-row" : "is-stack") + '"' + (page ? ' data-page="' + page + '"' : "") + ">" +
      list.map(function (m, i) {
        var h = mediaHTML(m, title, opts.lazy);
        return page && i >= page ? h.replace("<div ", "<div hidden ") : h;
      }).join("") + "</div>";
    if (page && list.length > page) {
      html += '<p class="more-wrap"><button type="button" class="btn btn--ghost more-btn">Show more <span>(' + (list.length - page) + " more)</span></button></p>";
    }
    return html;
  }

  /* Instagram: load the embed script once, then (re)process whatever is on the page */
  var igLoading = false;
  function processInstagram() {
    if (window.instgrm && window.instgrm.Embeds) { window.instgrm.Embeds.process(); return; }
    if (igLoading) return;
    igLoading = true;
    var sc = document.createElement("script");
    sc.async = true;
    sc.src = "https://www.instagram.com/embed.js";
    sc.onload = function () { if (window.instgrm) window.instgrm.Embeds.process(); };
    document.body.appendChild(sc);
  }
  // turn visible lazy placeholders inside `root` into real Instagram embeds
  function hydrateInstagram(root) {
    var any = false;
    [].forEach.call((root || document).querySelectorAll(".media-instagram.is-lazy"), function (el) {
      if (el.hidden || el.closest("[hidden]")) return;
      el.classList.remove("is-lazy");
      el.innerHTML = igBlockquote(el.getAttribute("data-ig"));
      any = true;
    });
    if (any) processInstagram();
  }

  /* ------------------------------------------- highlight reels (auto-advance) */
  var ytQueue = null;
  function loadYouTubeAPI(cb) {
    if (window.YT && window.YT.Player) { cb(); return; }
    if (!ytQueue) {
      ytQueue = [];
      var s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
      window.onYouTubeIframeAPIReady = function () { var q = ytQueue; ytQueue = []; q.forEach(function (f) { f(); }); };
    }
    ytQueue.push(cb);
  }

  function isReelList(list) {
    return list.some(function (m) { return m.type === "instagram"; });
  }

  function reelCarouselHTML(list, text) {
    return '<section class="container hl hl--reels reveal" id="hl">' +
      '<div class="psec-grid"><h2>Highlight reels</h2><div class="psec-text">' +
      (text ? paras(text) : "<p>A few favourites. Use the arrows to move through them.</p>") + "</div></div>" +
      '<div class="reel-carousel" role="group" aria-roledescription="carousel" aria-label="Highlight reels">' +
      '<button type="button" class="reel-side reel-prev" aria-label="Previous reel"><span class="reel-side-arrow">&larr;</span><span class="reel-side-kind"></span></button>' +
      '<div class="reel-frame"><span class="reel-label" hidden></span><div class="reel-slot" aria-live="polite"></div></div>' +
      '<button type="button" class="reel-side reel-next" aria-label="Next reel"><span class="reel-side-arrow">&rarr;</span><span class="reel-side-kind"></span></button>' +
      "</div>" +
      '<div class="reel-foot">' +
      '<div class="reel-nav"><span class="reel-count"></span><span class="reel-dots">' +
      list.map(function (m, i) { return '<button type="button" class="reel-dot" aria-label="Reel ' + (i + 1) + '"></button>'; }).join("") +
      "</span></div></div></section>";
  }

  function setupReelCarousel(list) {
    var root = $("#hl");
    if (!root) return;
    var slot = $(".reel-slot", root), label = $(".reel-label", root), count = $(".reel-count", root);
    var dots = root.querySelectorAll(".reel-dot"), idx = 0, n = list.length;
    function show(i) {
      idx = (i + n) % n;                       // loops around at both ends
      var m = list[idx];
      slot.innerHTML = mediaHTML(m, m.title || "Highlight reel");
      slot.classList.toggle("is-video", m.type !== "instagram");
      if (m.label) { label.textContent = m.label; label.setAttribute("data-kind", String(m.label).toLowerCase()); label.hidden = false; } else { label.hidden = true; }
      count.textContent = (idx + 1) + " / " + n;
      var pv = list[(idx - 1 + n) % n], nx = list[(idx + 1) % n];
      $(".reel-prev .reel-side-kind", root).textContent = (pv.label || "Previous") + " · " + (((idx - 1 + n) % n) + 1);
      $(".reel-next .reel-side-kind", root).textContent = (nx.label || "Next") + " · " + (((idx + 1) % n) + 1);
      [].forEach.call(dots, function (d, k) { d.setAttribute("aria-current", k === idx ? "true" : "false"); });
      if (m.type === "instagram") processInstagram();
    }
    $(".reel-prev", root).addEventListener("click", function () { show(idx - 1); });
    $(".reel-next", root).addEventListener("click", function () { show(idx + 1); });
    [].forEach.call(dots, function (d, k) { d.addEventListener("click", function () { show(k); }); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { show(idx - 1); } else if (e.key === "ArrowRight") { show(idx + 1); }
    });
    show(0);
  }

  function highlightsHTML(list, text) {
    list = arr(list).filter(function (m) { return m && m.url; });
    if (!list.length) return "";
    if (isReelList(list)) return reelCarouselHTML(list, text);
    return '<section class="container hl reveal" id="hl">' +
      '<div class="psec-grid"><h2>Highlight reels</h2><div class="psec-text">' + (text ? paras(text) : "<p>Clips from the recap videos. Press play and the next one follows when each one ends.</p>") + "</div></div>" +
      '<div class="hl-stage"><div class="hl-player" aria-live="polite"></div><ol class="hl-list">' +
      list.map(function (m, i) {
        return '<li><button type="button" class="hl-item" aria-current="' + (i === 0 ? "true" : "false") + '"><span class="hl-num">' + (i + 1) + "</span><span>" + esc(m.title || "Highlight " + (i + 1)) + "</span></button></li>";
      }).join("") + "</ol></div></section>";
  }

  function setupHighlights(list) {
    var root = $("#hl");
    if (!root) return;
    list = arr(list).filter(function (m) { return m && m.url; });
    if (isReelList(list)) { setupReelCarousel(list); return; }
    var stage = $(".hl-player", root), btns = root.querySelectorAll(".hl-item"), idx = 0, player = null;

    function clear() {
      if (player && player.destroy) { try { player.destroy(); } catch (e) {} }
      player = null; stage.innerHTML = "";
    }
    function next() { if (idx + 1 < list.length) play(idx + 1, true); else play(0, false); }
    function play(i, auto) {
      idx = i; var m = list[i]; clear();
      stage.classList.toggle("vertical", isVertical(m) || m.vertical === true);
      [].forEach.call(btns, function (b, k) { b.setAttribute("aria-current", k === i ? "true" : "false"); });
      if (m.type === "video") {
        var v = document.createElement("video");
        v.controls = true; v.playsInline = true; v.preload = "metadata"; v.src = m.url;
        if (m.poster) v.poster = m.poster;
        v.addEventListener("ended", next);
        stage.appendChild(v);
        if (auto) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
        return;
      }
      var y = youtubeInfo(m.url);
      if (!y) return;
      var slot = document.createElement("div");
      stage.appendChild(slot);
      loadYouTubeAPI(function () {
        if (idx !== i) return;
        player = new window.YT.Player(slot, {
          host: "https://www.youtube-nocookie.com", videoId: y.id,
          playerVars: { autoplay: auto ? 1 : 0, rel: 0, playsinline: 1 },
          events: { onStateChange: function (e) { if (e.data === 0) next(); } }
        });
      });
    }
    [].forEach.call(btns, function (b, i) { b.addEventListener("click", function () { play(i, true); }); });
    play(0, false);   // first one waits for you to press play (no surprise sound)
  }

  /* ------------------------------------------------ tabs of videos/reels */
  function tabsHTML(tabs) {
    tabs = arr(tabs).map(function (t) { return { title: t.title, text: t.text, media: arr(t.media).filter(function (m) { return m && m.url; }) }; })
      .filter(function (t) { return t.media.length; });
    if (!tabs.length) return "";
    return '<section class="container ptabs reveal" id="ptabs"><div class="tabbar" role="tablist">' +
      tabs.map(function (t, i) {
        return '<button type="button" role="tab" class="chip" data-i="' + i + '" aria-selected="' + (i === 0 ? "true" : "false") + '">' + esc(t.title) + " <span>" + t.media.length + "</span></button>";
      }).join("") + "</div>" +
      tabs.map(function (t, i) {
        return '<div role="tabpanel" class="tabpanel" data-i="' + i + '"' + (i ? " hidden" : "") + ">" +
          (t.text ? '<div class="psec-text tab-text">' + paras(t.text) + "</div>" : "") + mediaGroup(t.media, t.title, { lazy: true, page: 6 }) + "</div>";
      }).join("") + "</section>";
  }

  function setupTabs() {
    var root = $("#ptabs");
    if (!root) return;
    root.addEventListener("click", function (e) {
      var more = e.target.closest(".more-btn");
      if (more) {
        var panel = more.closest(".tabpanel"), grp = $(".media-group", panel), page = +grp.getAttribute("data-page") || 6;
        var hid = grp.querySelectorAll(":scope > [hidden]");
        [].slice.call(hid, 0, page).forEach(function (el) { el.hidden = false; });
        var left = grp.querySelectorAll(":scope > [hidden]").length;
        if (left) { $("span", more).textContent = "(" + left + " more)"; } else { more.parentNode.remove(); }
        hydrateInstagram(panel);
        return;
      }
      var b = e.target.closest(".chip");
      if (!b) return;
      var i = b.getAttribute("data-i");
      [].forEach.call(root.querySelectorAll(".chip"), function (c) { c.setAttribute("aria-selected", c === b ? "true" : "false"); });
      [].forEach.call(root.querySelectorAll(".tabpanel"), function (p) { p.hidden = p.getAttribute("data-i") !== i; });
      hydrateInstagram(root);
    });
    hydrateInstagram(root);
  }

  /* ------------------------------------------------------------- tiles/cards */
  function coverHTML(p) {
    if (p.cover) return '<img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || p.title) + '" loading="lazy" decoding="async">';
    return '<div class="tint tint-' + esc(p.category) + '" aria-hidden="true"></div>';
  }
  function tileHTML(p, cls) {
    var contain = p.coverFit === "contain" || p.coverFit === "fit";
    var chips = String(p.type || "").split(" · ").filter(Boolean).slice(0, 2);
    return '<a class="tile glass ' + cls + ' reveal" href="' + projectUrl(p) + '" data-cat="' + esc(p.category) + '">' +
      '<div class="tile-media' + (p.coverFit === "fit" ? " is-fit" : contain ? " is-contain" : "") + '"' + (contain && p.coverBg ? ' style="background:' + esc(p.coverBg) + '"' : "") + ">" + coverHTML(p) + (p.status ? '<span class="badge">' + esc(p.status) + "</span>" : "") + "</div>" +
      '<div class="tile-body"><p class="tile-cat">' + esc(catOf(p.category).label) + "</p>" +
      "<h3>" + esc(p.title) + "</h3>" +
      (p.tagline ? '<p class="tile-text">' + esc(p.tagline) + "</p>" : "") +
      '<div class="feat-foot"><span class="mini-tags">' + chips.map(function (c) { return '<span class="mini-tag">' + esc(c) + "</span>"; }).join("") +
      '</span><span class="feat-arrow" aria-hidden="true">&rarr;</span></div></div></a>';
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
      '<a class="brand" href="index.html">' + esc(S.name) + ".</a>" +
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
    if (S.github) out.push({ label: "GitHub", text: "GitHub" + (S.alias ? " (" + S.alias + ")" : ""), href: S.github, ext: true });
    if (S.instagram) out.push({ label: "Instagram", text: "Instagram" + (S.alias ? " (" + S.alias + ")" : ""), href: S.instagram, ext: true });
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
      '<a class="btn" href="contact.html">Get in touch <span aria-hidden="true">&rarr;</span></a></div>' +
      '<div class="footer-side">' + (links ? '<ul class="footer-links">' + links + "</ul>" : "") +
      '<p class="footer-note">' + esc(S.name) + (S.alias ? " (" + esc(S.alias) + ")" : "") + " · " + esc(S.location) + " · &copy; " + new Date().getFullYear() + "</p></div>" +
      "</div></footer>";
  }

  /* -------------------------------------------------------------------- home */
  function emph(t) { return esc(t).replace(/\*([^*]+)\*/g, "<em>$1</em>"); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function featMainHTML(p, n) {
    var contain = p.coverFit === "contain" || p.coverFit === "fit";
    var tags = arr(p.tools).length ? arr(p.tools).slice(0, 4).join(" · ") : (p.type || "");
    return '<a class="feat-main" href="' + projectUrl(p) + '">' +
      '<div class="feat-media tile-media' + (p.coverFit === "fit" ? " is-fit" : contain ? " is-contain" : "") + '"' + (contain && p.coverBg ? ' style="background:' + esc(p.coverBg) + '"' : "") + ">" + coverHTML(p) + "</div>" +
      '<div class="feat-card"><p class="feat-cat">' + pad2(n) + " / " + esc(catOf(p.category).label) + "</p>" +
      "<h3>" + esc(p.title) + "</h3>" +
      (p.tagline ? '<p class="feat-text">' + esc(p.tagline) + "</p>" : "") +
      (tags ? '<p class="feat-tags">' + esc(tags) + "</p>" : "") +
      '<span class="feat-link">Explore project <span aria-hidden="true">&rarr;</span></span></div></a>';
  }
  function featTileHTML(p, n) {
    var contain = p.coverFit === "contain" || p.coverFit === "fit";
    var chips = String(p.type || "").split(" · ").filter(Boolean).slice(0, 2);
    return '<a class="feat-tile glass" href="' + projectUrl(p) + '">' +
      '<div class="feat-media tile-media' + (p.coverFit === "fit" ? " is-fit" : contain ? " is-contain" : "") + '"' + (contain && p.coverBg ? ' style="background:' + esc(p.coverBg) + '"' : "") + ">" + coverHTML(p) + "</div>" +
      '<div class="feat-info"><p class="feat-cat">' + pad2(n) + " / " + esc(catOf(p.category).label) + "</p>" +
      "<h3>" + esc(p.title) + "</h3>" +
      '<div class="feat-foot"><span class="mini-tags">' + chips.map(function (c) { return '<span class="mini-tag">' + esc(c) + "</span>"; }).join("") +
      '</span><span class="feat-arrow" aria-hidden="true">&rarr;</span></div></div></a>';
  }

  /* Selected work rotator. The top project fades to the next one, the row shifts left, the
     left-most tile slides away and the old top slides in on the right as the last tile. */
  var FEAT_MS = 8000, FEAT_SWAP_MS = 950;
  function setupFeatured(list) {
    var box = $("#featured"), len = list.length, cur = 0, busy = false, paused = { seen: false, tab: false };
    function at(i) { return list[((i % len) + len) % len]; }
    function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstChild; }

    box.innerHTML = (len > 1 ? '<div class="feat-timer" aria-hidden="true"><i></i></div>' : "") +
      '<div class="feat-top"></div>' +
      (len > 1 ? '<div class="feat-rowwrap"><div class="feat-row feat-track" style="--per:' + (len - 1) + '"></div></div>' : "");
    var top = $(".feat-top", box), track = $(".feat-track", box), bar = $(".feat-timer i", box);
    top.appendChild(el(featMainHTML(at(0).p, at(0).n)));
    for (var k = 1; k < len; k++) track.appendChild(el(featTileHTML(at(k).p, at(k).n)));
    if (len < 2) return;

    box.style.setProperty("--feat-ms", FEAT_MS + "ms");
    box.style.setProperty("--feat-dur", FEAT_SWAP_MS + "ms");

    function startTimer() {
      bar.classList.remove("is-run");
      void bar.offsetWidth;
      bar.classList.add("is-run");
    }
    function syncPause() { box.classList.toggle("is-paused", !paused.seen || paused.tab); }

    function advance() {
      if (busy) return;
      busy = true;
      var next = (cur + 1) % len;
      var oldMain = top.firstElementChild, leaving = track.firstElementChild;
      var newMain = el(featMainHTML(at(next).p, at(next).n));
      var incoming = el(featTileHTML(at(cur).p, at(cur).n));
      newMain.classList.add("is-in");
      oldMain.classList.add("is-out");
      incoming.classList.add("is-in");
      top.appendChild(newMain);
      track.appendChild(incoming);
      void box.offsetWidth;
      box.classList.add("is-swapping");
      leaving.classList.add("is-leaving");
      startTimer();
      setTimeout(function () {
        oldMain.remove();
        leaving.remove();
        newMain.classList.remove("is-in");
        incoming.classList.remove("is-in");
        box.classList.add("no-anim");
        box.classList.remove("is-swapping");
        void box.offsetWidth;
        box.classList.remove("no-anim");
        cur = next;
        busy = false;
      }, FEAT_SWAP_MS + 60);
    }

    bar.addEventListener("animationend", advance);
    /* only run while the section is on screen and the tab is in front */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        paused.seen = es[0].isIntersecting;
        syncPause();
      }, { threshold: 0.25 }).observe(box);
    } else { paused.seen = true; }
    document.addEventListener("visibilitychange", function () { paused.tab = document.hidden; syncPause(); });
    syncPause();
    startTimer();
  }

  function renderHome() {
    $("#hero-title").innerHTML = "Hi, I’m <em>" + esc(S.name) + ".</em>";
    $("#hero-intro").textContent = S.intro;
    $("#hero-loc").textContent = S.location;
    var tags = arr(S.heroTags);
    $("#hero-visual").innerHTML =
      '<div class="hero-photo">' + (S.heroImage
        ? '<img src="' + esc(S.heroImage) + '" alt="' + esc(S.heroAlt || "") + '" decoding="async">'
        : '<div class="dream" aria-hidden="true"></div>') + '</div>' +
      (tags.length ? '<p class="hero-tag" aria-hidden="true">' + tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</p>" : "");

    /* short skills block */
    var hs = arr(P.homeSkills);
    if (hs.length) {
      $("#home-skills").innerHTML = hs.map(function (g, i) {
        return '<article class="hs-card reveal"><span class="hs-num">' + pad2(i + 1) + "</span><h3>" + esc(g.title) + "</h3><ul>" +
          arr(g.items).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></article>";
      }).join("");
    } else {
      $("#skills-section").hidden = true;
    }

    /* selected work: one big project on top, the rest in a row underneath; they rotate every 8 seconds */
    var feat = arr(P.featured).map(findProject).filter(Boolean);
    if (feat.length) {
      setupFeatured(feat.map(function (p, i) { return { p: p, n: i + 1 }; }));
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

    var ph = S.homeAboutImage || S.aboutPhoto;
    if (ph) { $("#home-about-photo").innerHTML = '<img src="' + esc(ph) + '" alt="' + esc(S.aboutAlt || "Portrait of " + S.name) + '" loading="lazy" decoding="async">'; }
    else { $("#home-about-photo").hidden = true; }
    $("#teaser-text").innerHTML = emph(S.aboutTeaser || "");
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
      (p.summary ? '<p class="lead">' + esc(p.summary) + "</p>" : "") +
      (function () {
        var ls = arr(p.links).filter(function (l) { return l && l.url; });
        return ls.length ? '<div class="btn-row head-links">' + ls.map(function (l) {
          return '<a class="btn btn--ghost" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label || "View") + " &nearr;</a>";
        }).join("") + "</div>" : "";
      })() + "</header>";

    /* meta row */
    var meta = [];
    if (p.context) meta.push(["Made for", esc(p.context)]);
    if (p.role) meta.push(["Role", esc(p.role)]);
    var collabs = arr(p.collaborators).filter(function (c) { return c && c.name; });
    if (collabs.length) meta.push(["With", collabs.map(function (c) { return esc(c.name) + (c.role ? " — " + esc(c.role) : ""); }).join("<br>")]);
    if (arr(p.tools).length) meta.push(["Tools", arr(p.tools).map(esc).join(", ")]);
    if (p.year) meta.push(["Year", esc(p.year)]);
    if (meta.length) {
      h += '<section class="container"><dl class="meta">' + meta.map(function (m) { return "<div><dt>" + m[0] + "</dt><dd>" + m[1] + "</dd></div>"; }).join("") + "</dl></section>";
    }

    /* hero media: video/embed if given, else the cover image. Nothing if neither. */
    var heroHTML = p.hero && p.hero.url ? mediaHTML(p.hero, p.title) : (p.cover && p.coverFit !== "contain" && p.coverFit !== "fit" ? '<figure class="media media-image"><img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || p.title) + '" decoding="async"></figure>' : "");
    if (heroHTML) h += '<section class="container project-hero reveal">' + heroHTML + "</section>";

    /* highlight reels, then tabs of videos/reels (skipped when empty) */
    h += highlightsHTML(p.highlights, p.highlightsText);
    h += tabsHTML(p.tabs);

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

    /* next / back */
    var idx = projects.indexOf(p), next = projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
    h += '<nav class="container pnav" aria-label="Project navigation"><a class="btn btn--ghost" href="work.html#' + esc(p.category) + '">&larr; Back to work</a>' +
      (next ? '<a class="pnav-next" href="' + projectUrl(next) + '"><span>Next project</span><strong>' + esc(next.title) + " &rarr;</strong></a>" : "") + "</nav>";

    box.innerHTML = h;
    setupHighlights(p.highlights);
    setupTabs();
  }

  /* ------------------------------------------------------------------- about */
  function renderAbout() {
    var t = arr(S.about);
    $("#about-text").innerHTML = t.map(function (x, i) { return '<p class="' + (i === 0 ? "lead" : "") + '">' + esc(x) + "</p>"; }).join("");
    $("#about-photo").innerHTML = S.aboutPhoto ? '<img src="' + esc(S.aboutPhoto) + '" alt="Photo of ' + esc(S.name) + '" decoding="async">' : '<div class="dream" aria-hidden="true"></div>';
    $("#about-facts").innerHTML = [S.fullName, S.education, S.from, S.languages, S.location]
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

  function setupEmbeds() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".embed-start");
      if (!b) return;
      var frame = b.closest(".embed-frame");
      if (!frame) return;
      var f = document.createElement("iframe");
      f.src = frame.getAttribute("data-src");
      f.title = frame.getAttribute("data-title") || "Interactive page";
      f.setAttribute("allow", "autoplay; fullscreen");
      f.setAttribute("allowfullscreen", "");
      frame.innerHTML = "";
      frame.classList.add("is-live");
      frame.appendChild(f);
    });
  }

  function loadInstagram() {
    if (!document.querySelector(".instagram-media")) return;
    processInstagram();
  }

  /* -------------------------------------------------------------------- go */
  document.title = ({ home: "", work: "Work | ", about: "About | ", contact: "Contact | " }[page] || "") + S.name;
  if (page === "home") document.title = S.name + " | Digital Media Creative";

  (function addSky() {
    var m = $("main");
    if (m && !$(".sky", m)) {
      m.classList.add("has-sky");
      m.insertAdjacentHTML("afterbegin", '<div class="sky" aria-hidden="true"></div>');
    }
  })();
  buildHeader();
  if (page === "home") renderHome();
  if (page === "work") renderWork();
  if (page === "project") renderProject();
  if (page === "about") renderAbout();
  if (page === "contact") renderContact();
  buildFooter();
  setupLightbox();
  setupEmbeds();
  setupReveal();
  loadInstagram();
})();
