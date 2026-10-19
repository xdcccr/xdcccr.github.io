/* ---------------------------------------------------------------------------
   The only JavaScript on this site: a light/dark toggle.

   Everything else — all the text, every link, the whole CV — is plain HTML and
   works with JavaScript switched off. That is deliberate: search engines, link
   previews and screen readers should never have to run a script to read this
   page. Keep it that way.

   This design is dark by default, on purpose, regardless of the reader's system
   setting. The toggle lets anyone switch to light, and that choice is remembered
   per browser in localStorage. If storage is unavailable (private windows,
   blocked site data) the toggle still works for the current page view.
   --------------------------------------------------------------------------- */

(function () {
  "use strict";

  var KEY = "xx-theme";
  var DEFAULT = "dark";          // must match the :root block in site.css
  var root = document.documentElement;

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function remember(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* no persistence available; the page still works */
    }
  }

  function current() {
    return root.getAttribute("data-theme") || DEFAULT;
  }

  function apply(theme) {
    // Only "light" needs the attribute; dark is the stylesheet's own default.
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.setAttribute("data-theme", "dark");

    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    var next = theme === "dark" ? "light" : "dark";
    btn.textContent = next === "dark" ? "Dark" : "Light";
    btn.setAttribute("aria-label", "Switch to the " + next + " colour scheme");
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function init() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    // Hidden in the markup so readers without JavaScript never see a control
    // that cannot work.
    btn.hidden = false;
    apply(stored() === "light" ? "light" : DEFAULT);

    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      apply(next);
      remember(next);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
