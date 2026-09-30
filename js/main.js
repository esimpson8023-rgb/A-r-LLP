(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Header border on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  }
  toggle.addEventListener("click", function () {
    setNav(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  // Highlight the nav link for the section in view
  var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']:not(.btn)"));
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) sectionObserver.observe(section);
    });

    // Reveal-on-scroll
    var revealTargets = document.querySelectorAll(".section-head, .service, .tab-panel, .steps li, .values li, .faq, .contact-form");
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  // Accessible tabs
  document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll("[role='tab']"));
    function select(btn) {
      buttons.forEach(function (b) {
        var selected = b === btn;
        b.setAttribute("aria-selected", String(selected));
        b.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(b.getAttribute("aria-controls"));
        panel.hidden = !selected;
        if (selected) panel.classList.add("visible");
      });
    }
    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () { select(btn); });
      btn.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = buttons[(i + 1) % buttons.length];
        if (e.key === "ArrowLeft") next = buttons[(i - 1 + buttons.length) % buttons.length];
        if (e.key === "Home") next = buttons[0];
        if (e.key === "End") next = buttons[buttons.length - 1];
        if (next) { e.preventDefault(); select(next); next.focus(); }
      });
    });
  });

  // Contact form: validate, then open the visitor's email client.
  // Replace with a form service (e.g. Formspree) or your own endpoint when ready.
  var form = document.getElementById("contact-form");
  var status = form.querySelector(".form-status");
  var FIRM_EMAIL = "info@arllp.ca";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var invalid = [];
    ["name", "email", "message"].forEach(function (id) {
      var field = form.elements[id];
      var ok = field.value.trim() !== "" && (field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
      field.classList.toggle("invalid", !ok);
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok) invalid.push(field);
    });

    if (invalid.length) {
      status.className = "form-status error";
      status.textContent = "Please complete the highlighted fields.";
      invalid[0].focus();
      return;
    }

    var data = form.elements;
    var body = [
      "Name: " + data.name.value,
      "Email: " + data.email.value,
      "Phone: " + (data.phone.value || "-"),
      "Interested in: " + data.interest.value,
      "",
      data.message.value
    ].join("\n");

    window.location.href = "mailto:" + FIRM_EMAIL +
      "?subject=" + encodeURIComponent("Website enquiry: " + data.interest.value) +
      "&body=" + encodeURIComponent(body);

    status.className = "form-status success";
    status.textContent = "Thank you. Your email app should now open with your enquiry ready to send.";
    form.reset();
  });
})();
