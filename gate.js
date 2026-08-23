/* ============================================================
   All Stories — client-side password gate.

   IMPORTANT: this is a light deterrent only, not real security.
   The password below lives in plain text in this file, which is
   downloaded by every visitor's browser. Anyone who opens dev
   tools or "view source" can read it. Do not use this to protect
   anything you actually need to keep private — it only stops
   casual visitors from stumbling onto the site.

   Usage: include this script on every page (index.html and each
   story page), and wrap the page's real content in:
     <div id="site-content"> ... </div>
   styles.css hides #site-content until the body gets the
   "gate-unlocked" class, which this script adds after a correct
   password (or immediately, if already unlocked this tab session).
   ============================================================ */

(function () {
  var PASSWORD = 'muse2026';
  var SESSION_KEY = 'allstories-unlocked';

  function unlock() {
    sessionStorage.setItem(SESSION_KEY, '1');
    document.body.classList.add('gate-unlocked');
    var overlay = document.getElementById('gate-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  function showOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'gate-overlay';
    overlay.innerHTML =
      '<div class="gate-box">' +
        '<div class="gate-lock">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<rect x="4.5" y="11" width="15" height="10" rx="1.5"/>' +
            '<path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>' +
          '</svg>' +
        '</div>' +
        '<h2>This page is locked</h2>' +
        '<p>Enter the password to keep reading.</p>' +
        '<input type="password" id="gate-password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Password" />' +
        '<button type="button" id="gate-submit">Unlock</button>' +
        '<div class="gate-error" id="gate-error"></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = document.getElementById('gate-password');
    var button = document.getElementById('gate-submit');
    var errorEl = document.getElementById('gate-error');
    var box = overlay.querySelector('.gate-box');

    function attempt() {
      if (input.value === PASSWORD) {
        unlock();
      } else {
        errorEl.textContent = 'That’s not it — try again.';
        box.classList.remove('shake');
        // force reflow so the animation can replay
        void box.offsetWidth;
        box.classList.add('shake');
        input.value = '';
        input.focus();
      }
    }

    button.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        attempt();
      }
    });

    input.focus();
  }

  function init() {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      document.body.classList.add('gate-unlocked');
    } else {
      showOverlay();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
