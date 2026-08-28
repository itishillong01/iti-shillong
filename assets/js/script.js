/* =========================================================
   ITI Shillong — Site Script
   Handles: mobile navigation, notices loading/rendering,
   and populating content from assets/js/site-data.js
   ========================================================= */

(function () {
  "use strict";

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  /* -----------------------------------------------------
     Mobile navigation toggle
     ----------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* -----------------------------------------------------
     Notices (Home page)
     ----------------------------------------------------- */
  function parseDate(dateStr) {
    // Expects "YYYY-MM-DD"
    var parts = String(dateStr).split("-");
    if (parts.length !== 3) return null;
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10) - 1;
    var d = parseInt(parts[2], 10);
    var dateObj = new Date(y, m, d);
    if (isNaN(dateObj.getTime())) return null;
    return dateObj;
  }

  function formatDateParts(dateObj) {
    return {
      day: String(dateObj.getDate()).padStart(2, "0"),
      monthYear: MONTHS[dateObj.getMonth()] + " " + dateObj.getFullYear()
    };
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  }

  function renderNotices(notices) {
    var list = document.getElementById("notice-board");
    var status = document.getElementById("notice-status");
    if (!list) return;

    if (!Array.isArray(notices) || notices.length === 0) {
      list.innerHTML = "";
      if (status) {
        status.textContent = "There are no notices at this time. Please check again later.";
        status.hidden = false;
      }
      return;
    }

    // Sort newest first. Invalid/missing dates are pushed to the end.
    var sorted = notices.slice().sort(function (a, b) {
      var da = parseDate(a.date);
      var db = parseDate(b.date);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db.getTime() - da.getTime();
    });

    var html = sorted.map(function (notice) {
      var dateObj = parseDate(notice.date);
      var dateHtml = "";
      if (dateObj) {
        var parts = formatDateParts(dateObj);
        dateHtml =
          '<div class="notice-date">' +
            '<span class="day">' + escapeHtml(parts.day) + '</span>' +
            '<span class="month-year">' + escapeHtml(parts.monthYear) + '</span>' +
          '</div>';
      } else {
        dateHtml = '<div class="notice-date"><span class="month-year">Undated</span></div>';
      }

      var importantHtml = notice.important
        ? '<span class="notice-important">Important</span>'
        : "";

      var descHtml = notice.description
        ? '<p class="notice-desc">' + escapeHtml(notice.description) + '</p>'
        : "";

      var pdfHtml = notice.pdf
        ? '<a class="notice-link" href="' + escapeHtml(notice.pdf) + '" target="_blank" rel="noopener noreferrer">' +
            '<span aria-hidden="true">\uD83D\uDCC4</span> View / Download PDF' +
            '<span class="visually-hidden"> for ' + escapeHtml(notice.title || "this notice") + '</span>' +
          '</a>'
        : "";

      return (
        '<li class="notice-item">' +
          dateHtml +
          '<div class="notice-content">' +
            '<h3>' + escapeHtml(notice.title || "Untitled notice") + importantHtml + '</h3>' +
            descHtml +
            pdfHtml +
          '</div>' +
        '</li>'
      );
    }).join("");

    list.innerHTML = html;
    if (status) status.hidden = true;
  }

  function loadNotices() {
    var list = document.getElementById("notice-board");
    var status = document.getElementById("notice-status");
    if (!list) return; // Not on the home page

    fetch("notices.json", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load notices.json");
        return response.json();
      })
      .then(function (data) {
        renderNotices(data);
      })
      .catch(function () {
        list.innerHTML = "";
        if (status) {
          status.textContent = "Latest notices are currently unavailable. Please check again later.";
          status.hidden = false;
        }
      });
  }

  /* -----------------------------------------------------
     Populate Contact page from SITE_DATA
     ----------------------------------------------------- */
  function initContactPage() {
    var emailEl = document.getElementById("contact-email");
    var phoneEl = document.getElementById("contact-phone");
    var instaEl = document.getElementById("contact-instagram");
    if (!emailEl && !phoneEl && !instaEl) return;
    if (typeof SITE_DATA === "undefined") return;

    var c = SITE_DATA.contact || {};

    if (emailEl) {
      emailEl.textContent = c.email || "[INSERT OFFICIAL ITI SHILLONG EMAIL]";
      if (c.email && c.email.indexOf("[INSERT") === -1) {
        emailEl.innerHTML = '<a href="mailto:' + escapeHtml(c.email) + '">' + escapeHtml(c.email) + '</a>';
      }
    }
    if (phoneEl) {
      phoneEl.textContent = c.phone || "[INSERT OFFICIAL ITI SHILLONG PHONE NUMBER]";
    }
    if (instaEl) {
      var hasUrl = c.instagramUrl && c.instagramUrl.indexOf("[INSERT") === -1;
      if (hasUrl) {
        instaEl.setAttribute("href", c.instagramUrl);
      } else {
        instaEl.setAttribute("href", "#");
        instaEl.setAttribute("aria-disabled", "true");
        instaEl.title = "Official Instagram URL not yet added";
      }
    }
  }

  /* -----------------------------------------------------
     Populate Principal page from SITE_DATA
     ----------------------------------------------------- */
  function initPrincipalPage() {
    var nameEl = document.getElementById("principal-name");
    var titleEl = document.getElementById("principal-title");
    var photoEl = document.getElementById("principal-photo");
    var messageEl = document.getElementById("principal-message");
    if (!nameEl && !messageEl) return;
    if (typeof SITE_DATA === "undefined") return;

    var p = SITE_DATA.principal || {};
    if (nameEl) nameEl.textContent = p.name || "[INSERT PRINCIPAL'S NAME]";
    if (titleEl) titleEl.textContent = p.designation || "Principal";
    if (photoEl && p.photo) photoEl.setAttribute("src", p.photo);
    if (messageEl && Array.isArray(p.message)) {
      messageEl.innerHTML = p.message.map(function (para) {
        return "<p>" + escapeHtml(para) + "</p>";
      }).join("");
    }
  }

  /* -----------------------------------------------------
     Populate Trades page from SITE_DATA
     ----------------------------------------------------- */
  function initTradesPage() {
    var grid = document.getElementById("trades-grid");
    if (!grid) return;
    if (typeof SITE_DATA === "undefined" || !Array.isArray(SITE_DATA.trades)) return;

    if (SITE_DATA.trades.length === 0) {
      grid.innerHTML = '<p class="notice-status">Trade information will be published here soon.</p>';
      return;
    }

    grid.innerHTML = SITE_DATA.trades.map(function (trade) {
      return (
        '<article class="trade-card">' +
          '<h3>' + escapeHtml(trade.name) + '</h3>' +
          '<span class="trade-duration">Duration: ' + escapeHtml(trade.duration || "N/A") + '</span>' +
          '<p>' + escapeHtml(trade.description || "") + '</p>' +
        '</article>'
      );
    }).join("");
  }

  /* -----------------------------------------------------
     Init
     ----------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    loadNotices();
    initContactPage();
    initPrincipalPage();
    initTradesPage();
  });
})();
