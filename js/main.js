/* ==========================================================
   DAIRON CELL — Interações do site
   - Monta links de WhatsApp/Instagram a partir de js/config.js
   - Preenche endereço, horários e mapa (ou mantém placeholders)
   - Menu mobile, cabeçalho ao rolar, link ativo, animações
   ========================================================== */
(function () {
  "use strict";

  var cfg = window.DAIRON_CONFIG || {};
  var doc = document;
  doc.documentElement.classList.remove("no-js");

  /* ---------- Contatos ---------- */
  var phone = String(cfg.whatsapp || "").replace(/\D/g, "");
  var insta = String(cfg.instagram || "").replace(/^@/, "");

  function waLink(message) {
    var text = message || cfg.mensagemPadrao || "";
    return "https://wa.me/" + phone + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  function formatPhone(p) {
    // 55 + DDD (2) + número (8 ou 9)
    var m = p.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : p;
  }

  if (phone) {
    doc.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = waLink(a.getAttribute("data-wa"));
    });
    var waField = doc.querySelector('[data-field="whatsapp"]');
    if (waField) waField.textContent = formatPhone(phone);
  }

  if (insta) {
    doc.querySelectorAll("[data-ig]").forEach(function (a) {
      a.href = "https://www.instagram.com/" + insta + "/";
    });
    var igField = doc.querySelector('[data-field="instagram"]');
    if (igField) igField.textContent = "@" + insta;
  }

  /* ---------- Endereço / horários / mapa ---------- */
  var addr = doc.querySelector('[data-field="endereco"]');
  if (addr && cfg.endereco) addr.textContent = cfg.endereco;

  var mapLink = doc.querySelector('[data-field="mapaLink"]');
  if (mapLink && cfg.mapaLink) {
    mapLink.href = cfg.mapaLink;
    mapLink.hidden = false;
  }

  var hours = doc.querySelector('[data-field="horarios"]');
  if (hours && Array.isArray(cfg.horarios) && cfg.horarios.length) {
    var list = doc.createElement("ul");
    list.className = "hours";
    cfg.horarios.forEach(function (h) {
      var li = doc.createElement("li");
      var d = doc.createElement("span");
      d.textContent = h.dias + ": ";
      li.appendChild(d);
      li.appendChild(doc.createTextNode(h.horas));
      list.appendChild(li);
    });
    hours.replaceChildren(list);
  }

  var map = doc.querySelector('[data-field="mapa"]');
  if (map && /^https:\/\/((www\.)?google\.[a-z.]+\/maps\/embed|maps\.google\.[a-z.]+\/maps\?)/.test(cfg.mapaEmbed || "")) {
    var iframe = doc.createElement("iframe");
    iframe.src = cfg.mapaEmbed;
    iframe.title = "Localização da " + (cfg.nome || "loja") + " no mapa";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    map.replaceChildren(iframe);
  }

  /* ---------- Foto real no banner (opcional) ---------- */
  var photo = doc.querySelector(".hero__photo");
  if (photo && cfg.fotoDestaque) {
    photo.addEventListener("load", function () {
      photo.hidden = false;
      photo.parentElement.classList.add("has-photo");
    });
    photo.addEventListener("error", function () { photo.remove(); });
    photo.src = cfg.fotoDestaque;
  } else if (photo) {
    photo.remove();
  }

  /* ---------- Vídeos (Testando e galeria) ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var videos = [];

  doc.querySelectorAll(".story").forEach(function (story) {
    var video = story.querySelector(".story__video");
    var playBtn = story.querySelector(".story__play");
    var soundBtn = story.querySelector(".story__sound");
    if (!video) return;
    video.dataset.userPaused = reduceMotion ? "1" : "";
    videos.push(video);

    function syncPlay() {
      var playing = !video.paused;
      story.classList.toggle("is-playing", playing);
      if (!playBtn) return;
      playBtn.setAttribute("data-state", playing ? "playing" : "paused");
      playBtn.setAttribute("aria-label", playing ? "Pausar vídeo" : "Reproduzir vídeo");
    }
    video.addEventListener("play", syncPlay);
    video.addEventListener("pause", syncPlay);
    syncPlay();

    if (playBtn) playBtn.addEventListener("click", function () {
      if (video.paused) { video.dataset.userPaused = ""; video.play().catch(function () {}); }
      else { video.dataset.userPaused = "1"; video.pause(); }
    });
    if (soundBtn) soundBtn.addEventListener("click", function () {
      var turnOn = video.muted;
      // só um vídeo com som por vez
      if (turnOn) videos.forEach(function (v) {
        if (v !== video && !v.muted) {
          v.muted = true;
          var b = v.closest(".story").querySelector(".story__sound");
          if (b) { b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-label", "Ativar som"); }
        }
      });
      video.muted = !turnOn;
      soundBtn.setAttribute("aria-pressed", String(turnOn));
      soundBtn.setAttribute("aria-label", turnOn ? "Desativar som" : "Ativar som");
      if (turnOn && video.paused) { video.dataset.userPaused = ""; video.play().catch(function () {}); }
    });
  });

  // Cada vídeo só toca quando está visível na tela (economiza bateria e dados)
  if (videos.length && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !v.dataset.userPaused) v.play().catch(function () {});
        else if (!e.isIntersecting) v.pause();
      });
    }, { threshold: 0.5 });
    videos.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- Ano no rodapé ---------- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Menu mobile ---------- */
  var toggle = doc.querySelector(".menu-toggle");
  var nav = doc.getElementById("menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    doc.body.classList.toggle("menu-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Cabeçalho e botão flutuante ao rolar ---------- */
  var header = doc.querySelector(".header");
  var waFloat = doc.querySelector(".wa-float");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 24);
    if (waFloat) waFloat.classList.toggle("is-visible", y > window.innerHeight * 0.6);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Link ativo no menu ---------- */
  var links = Array.prototype.slice.call(doc.querySelectorAll(".nav__link"));
  var sections = links
    .map(function (l) { return doc.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        links.forEach(function (l) {
          var active = l.getAttribute("href") === id;
          l.classList.toggle("is-active", active);
          if (active) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    /* ---------- Animações de entrada ---------- */
    var groups = new Map();
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    doc.querySelectorAll(".reveal").forEach(function (el) {
      // atraso escalonado entre irmãos do mesmo bloco
      var parent = el.parentElement;
      var i = groups.get(parent) || 0;
      groups.set(parent, i + 1);
      el.style.setProperty("--d", Math.min(i, 6) * 0.07 + "s");
      reveal.observe(el);
    });
  } else {
    doc.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }
})();
