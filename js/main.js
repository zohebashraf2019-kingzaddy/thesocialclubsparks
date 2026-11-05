/* =========================================================================
   THE SOCIAL CLUB | SPARKS — site behaviour
   Content lives in js/data.js
   ========================================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const page = document.body.dataset.page || "home";
  const info = SC.info;

  /* ---------- icons ---------- */
  const ICON = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.6 3.7 3.9 3.9v3c-1.4.1-2.7-.3-3.9-1.1v6.1c0 3.6-2.6 6.1-6 6.1-3.3 0-5.9-2.6-5.9-5.8 0-3.6 3.1-6.3 6.8-5.7v3.2c-1.7-.4-3.5.6-3.5 2.5 0 1.5 1.2 2.7 2.7 2.7 1.6 0 2.8-1.1 2.8-3.1V3h3.1z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    muted: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4V8z"/><path d="M13 6v12" stroke-dasharray="2 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'
  };
  SC.icon = ICON;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeStore = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- dates ---------- */
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const isPast = (ev) => parseDate(ev.date) < today;
  const fmtLong = (d) => `${DOW[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
  const sorted = SC.events.slice().sort((a, b) => parseDate(a.date) - parseDate(b.date));
  const upcoming = sorted.filter((e) => !isPast(e));
  const past = sorted.filter(isPast).reverse();
  SC.helpers = { parseDate, isPast, fmtLong, MONTHS, DOW, sorted, upcoming, past, esc, today };

  const STATUS_LABEL = { "on-sale": "On Sale", "sold-out": "Sold Out", "door-only": "Tickets at Door", free: "Free Entry", info: "" };

  /* ---------- nav + footer ---------- */
  const links = [
    ["index.html", "Home", "home"],
    ["events.html", "Events", "events"],
    ["gallery.html", "Gallery", "gallery"],
    ["index.html#reels", "Reels", "reels"],
    ["contact.html", "Private Events", "contact"]
  ];
  const socialBtns = info.socials.map((s) => `<a class="social-btn" href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">${ICON[s.icon] || ICON.link}</a>`).join("");

  const navEl = document.createElement("header");
  navEl.className = "nav";
  navEl.innerHTML = `
    <div class="wrap">
      <a class="nav-logo" href="index.html" aria-label="The Social Club home"><img src="assets/img/logo-white.png" alt="The Social Club"></a>
      <nav class="nav-links" aria-label="Main">
        ${links.map(([h, t, k]) => `<a href="${h}" class="${k === page ? "active" : ""}">${t}</a>`).join("")}
      </nav>
      <div class="nav-cta">
        <a class="btn btn-chrome" href="events.html">${ICON.ticket} Upcoming</a>
        <button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </div>
    <div class="mobile-menu">
      ${links.map(([h, t]) => `<a class="m-link" href="${h}">${t}</a>`).join("")}
      <div class="m-socials">${socialBtns}</div>
    </div>`;
  document.body.prepend(navEl);
  const burger = $(".burger", navEl);
  burger.addEventListener("click", () => {
    const open = document.documentElement.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", open);
    document.body.classList.toggle("locked", open);
  });
  $$(".mobile-menu a", navEl).forEach((a) => a.addEventListener("click", () => {
    document.documentElement.classList.remove("nav-open"); document.body.classList.remove("locked");
  }));
  const onScroll = () => navEl.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <img class="footer-logo" src="assets/img/logo-white.png" alt="The Social Club">
          <p>Sparks' late-night social house — themed nights, live music, signature cocktails and VIP bottle service in Victorian Square.</p>
          <div class="socials">${socialBtns}</div>
        </div>
        <div>
          <h4>Visit</h4>
          <p><a href="${info.mapsUrl}" target="_blank" rel="noopener">${esc(info.address)}</a></p>
          ${info.phone ? `<p><a href="tel:${info.phone.replace(/[^\d+]/g, "")}">${esc(info.phone)}</a></p>` : ""}
          ${info.email ? `<p><a href="mailto:${info.email}">${esc(info.email)}</a></p>` : ""}
        </div>
        <div>
          <h4>Hours</h4>
          <ul>${info.hours.map((h) => `<li><p><strong style="color:#fff;font-weight:600">${esc(h.days)}</strong><br>${esc(h.time)}</p></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>${links.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}
            ${info.socials.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}</ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} The Social Club · Sparks, Nevada</span>
        <span class="age">21+ · Valid ID required · Drink responsibly</span>
      </div>
    </div>`;
  document.body.append(footer);

  /* ---------- 21+ age gate ---------- */
  if (safeStore.get("sc_age_ok") !== "1") {
    const gate = document.createElement("div");
    gate.className = "age-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "age-title");
    gate.innerHTML = `
      <div class="age-card">
        <img src="assets/img/logo-white.png" alt="The Social Club">
        <div class="age-badge">21<span style="font-size:18px">+</span></div>
        <h2 id="age-title">Are you 21 or older?</h2>
        <p>The Social Club is a 21+ venue. You must be of legal drinking age to enter this site.</p>
        <div class="age-actions">
          <button class="btn btn-chrome" data-age="yes">Yes, I'm 21+</button>
          <button class="btn" data-age="no">No</button>
        </div>
        <div class="age-denied">Sorry — come back when you're 21. We'll save you a seat.</div>
        <div class="age-legal">By entering you agree to drink responsibly.</div>
      </div>`;
    document.body.append(gate);
    document.body.classList.add("locked");
    $('[data-age="yes"]', gate).focus();
    gate.addEventListener("click", (e) => {
      const b = e.target.closest("[data-age]"); if (!b) return;
      if (b.dataset.age === "yes") {
        safeStore.set("sc_age_ok", "1");
        gate.classList.add("hidden"); document.body.classList.remove("locked");
        setTimeout(() => gate.remove(), 700);
        document.dispatchEvent(new Event("sc:entered"));
      } else gate.classList.add("denied");
    });
  }

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  SC.observe = (root = document) => $$(".reveal:not(.in)", root).forEach((el) => io.observe(el));

  /* ---------- event card ---------- */
  SC.eventCard = function (ev, i = 0) {
    const d = parseDate(ev.date);
    const p = isPast(ev);
    const st = p ? "past" : ev.status;
    const label = p ? "Past Night" : STATUS_LABEL[ev.status];
    const link = !p && ev.ticketsUrl
      ? `<a href="${ev.ticketsUrl}" target="_blank" rel="noopener">${ev.status === "door-only" ? "Details" : "Tickets"} →</a>`
      : `<a href="events.html#${ev.id}">View →</a>`;
    return `
      <article class="event-card reveal d${i % 3 + 1} ${p ? "is-past" : ""}" id="card-${esc(ev.id)}">
        <div class="media">
          <div class="date-chip"><small>${MONTHS[d.getMonth()].slice(0, 3)}</small><b>${d.getDate()}</b></div>
          ${label ? `<span class="status ${st}">${label}</span>` : ""}
          <img src="${ev.image}" alt="${esc(ev.title)}" loading="lazy">
        </div>
        <div class="body">
          <span class="genre">${esc(ev.genre || "")}</span>
          <h3>${esc(ev.title)}</h3>
          <p>${esc(ev.subtitle || "")}</p>
          <div class="meta"><span>${DOW[d.getDay()]} · ${esc(ev.time || "")}</span>${link}</div>
        </div>
      </article>`;
  };
  SC.soonCard = `
    <div class="soon-card reveal">
      <div>
        <span class="eyebrow">Next Up</span>
        <h3>More nights dropping soon</h3>
        <p>New dates are announced on Instagram first. Follow so you don't miss the drop.</p>
        <a class="btn" href="${info.socials[0].url}" target="_blank" rel="noopener">${ICON.instagram} Follow</a>
      </div>
    </div>`;

  /* ---------- lightbox (images + video) ---------- */
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">${ICON.close}</button>
    <button class="lb-prev" aria-label="Previous">${ICON.left}</button>
    <button class="lb-next" aria-label="Next">${ICON.right}</button>
    <div><div class="lightbox-stage"></div><div class="lightbox-cap"></div></div>`;
  document.body.append(lb);
  let lbItems = [], lbIdx = 0;
  const lbRender = () => {
    const it = lbItems[lbIdx];
    $(".lightbox-stage", lb).innerHTML = it.type === "video"
      ? `<video src="${it.src}" poster="${it.poster || ""}" controls autoplay playsinline></video>`
      : `<img src="${it.src}" alt="${esc(it.alt || "")}">`;
    $(".lightbox-cap", lb).textContent = it.alt || it.caption || "";
    const multi = lbItems.length > 1;
    $(".lb-prev", lb).style.display = $(".lb-next", lb).style.display = multi ? "" : "none";
  };
  SC.openLightbox = (items, idx = 0) => {
    lbItems = items; lbIdx = idx; lbRender();
    lb.classList.add("open"); document.body.classList.add("locked");
    $$("video", document).forEach((v) => { if (!lb.contains(v)) v.pause(); });
  };
  const lbClose = () => { lb.classList.remove("open"); document.body.classList.remove("locked"); $(".lightbox-stage", lb).innerHTML = ""; SC.resumeReels && SC.resumeReels(); };
  const lbStep = (n) => { lbIdx = (lbIdx + n + lbItems.length) % lbItems.length; lbRender(); };
  $(".lb-close", lb).onclick = lbClose;
  $(".lb-prev", lb).onclick = () => lbStep(-1);
  $(".lb-next", lb).onclick = () => lbStep(1);
  lb.addEventListener("click", (e) => { if (e.target === lb) lbClose(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowLeft") lbStep(-1);
    if (e.key === "ArrowRight") lbStep(1);
  });

  /* ---------- video wall ---------- */
  SC.renderReels = function (el, { withFollow = true } = {}) {
    if (!el) return;
    el.innerHTML = SC.reels.map((r, i) => `
      <div class="reel reveal d${i % 3 + 1}" data-i="${i}">
        <span class="reel-tag">${esc(r.tag || "Reel")}</span>
        <video src="${r.src}" poster="${r.poster || ""}" muted loop playsinline preload="metadata"></video>
        <div class="reel-cap">${esc(r.caption || "")}</div>
        <div class="reel-btns">
          <button class="icon-btn" data-act="sound" aria-label="Toggle sound">${ICON.muted}</button>
          <button class="icon-btn" data-act="expand" aria-label="Play full screen">${ICON.expand}</button>
        </div>
      </div>`).join("") + (withFollow ? `
      <div class="follow-tile reveal d3">
        <span class="eyebrow">Watch more</span>
        <h3 class="display">The night,<br><em>in motion.</em></h3>
        <p>New reels every weekend.</p>
        ${info.socials.map((s) => `<a class="btn ${s.icon === "instagram" ? "btn-chrome" : ""}" href="${s.url}" target="_blank" rel="noopener">${ICON[s.icon] || ICON.link} ${esc(s.name)}</a>`).join("")}
      </div>` : "");

    const vids = $$("video", el);
    const vio = new IntersectionObserver((ents) => ents.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting && !lb.classList.contains("open")) { const p = v.play(); p && p.catch(() => {}); }
      else v.pause();
    }), { threshold: 0.45 });
    vids.forEach((v) => vio.observe(v));
    SC.resumeReels = () => vids.forEach((v) => { const r = v.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) { const p = v.play(); p && p.catch(() => {}); } });

    el.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]"); const reel = e.target.closest(".reel");
      if (!reel) return;
      const v = $("video", reel);
      if (btn && btn.dataset.act === "sound") {
        const willUnmute = v.muted;
        vids.forEach((o) => { o.muted = true; $('[data-act="sound"]', o.parentElement).innerHTML = ICON.muted; });
        v.muted = !willUnmute; btn.innerHTML = v.muted ? ICON.muted : ICON.sound;
        if (!v.muted) { const p = v.play(); p && p.catch(() => {}); }
        return;
      }
      const i = +reel.dataset.i;
      SC.openLightbox(SC.reels.map((r) => ({ type: "video", src: r.src, poster: r.poster, caption: r.caption })), i);
    });
  };

  /* ---------- gallery ---------- */
  SC.renderGallery = function (el, items) {
    if (!el) return;
    el.innerHTML = items.map((g, i) => `
      <figure class="reveal" data-i="${i}"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy"><figcaption>${esc(g.alt)}</figcaption></figure>`).join("");
    el.onclick = (e) => {
      const f = e.target.closest("figure"); if (!f) return;
      SC.openLightbox(items.map((g) => ({ type: "img", src: g.src, alt: g.alt })), +f.dataset.i);
    };
    SC.observe(el);
  };

  /* ---------- hours: highlight today ---------- */
  SC.renderHours = function (el) {
    if (!el) return;
    const d = new Date().getDay();
    const map = { 0: 0, 3: 0, 4: 0, 5: 1, 6: 1, 1: 2, 2: 2 };
    el.innerHTML = info.hours.map((h, i) => `<li class="${map[d] === i ? "today" : ""}"><span>${esc(h.days)}</span><span>${esc(h.time)}</span></li>`).join("");
  };

  /* ---------- countdown ---------- */
  SC.countdown = function (el, ev) {
    if (!el || !ev) return;
    const [y, m, d] = ev.date.split("-").map(Number);
    const hour = /(\d{1,2})\s*PM/i.test(ev.time || "") ? (+RegExp.$1 % 12) + 12 : 22;
    const target = new Date(y, m - 1, d, hour, 0, 0);
    const tick = () => {
      let s = Math.max(0, Math.floor((target - new Date()) / 1000));
      if (s === 0) { el.innerHTML = `<div style="grid-column:1/-1"><b>Tonight</b><small>Doors open — see you inside</small></div>`; return; }
      const dd = Math.floor(s / 86400); s %= 86400;
      const hh = Math.floor(s / 3600); s %= 3600;
      const mm = Math.floor(s / 60); const ss = s % 60;
      el.innerHTML = [[dd, "Days"], [hh, "Hours"], [mm, "Min"], [ss, "Sec"]]
        .map(([n, l]) => `<div><b>${String(n).padStart(2, "0")}</b><small>${l}</small></div>`).join("");
    };
    tick(); setInterval(tick, 1000);
  };

  /* ---------- fill [data-info] slots ---------- */
  $$("[data-info]").forEach((el) => {
    const k = el.dataset.info;
    if (k === "address") el.textContent = info.address;
    if (k === "maps") el.href = info.mapsUrl;
    if (k === "map-embed") el.src = info.mapsEmbed;
    if (k === "socials") el.innerHTML = socialBtns;
  });
  $$("[data-hours]").forEach(SC.renderHours);

  document.addEventListener("DOMContentLoaded", () => SC.observe());
  if (document.readyState !== "loading") SC.observe();
})();
