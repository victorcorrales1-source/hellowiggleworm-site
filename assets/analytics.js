/* Hello Wiggleworm / Already Wild: opt-in Google Analytics 4 (Q-0083). Nothing loads until a visitor taps Accept.
   IP anonymised (GA4 default), no ad features, no ad personalisation, no user ids. The site is for parents. */
(function () {
  var ID = "G-64842VN2XJ"; // GA4 Measurement ID (set by apply.py)
  if (!/^G-[A-Z0-9]{6,}$/.test(ID) || /X{6}/.test(ID)) return;
  var KEY = "analytics-choice";
  function load() {
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
  }
  var choice = null; try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice === "yes") return load();
  if (choice === "no") return;
  var bar = document.createElement("div");
  bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Analytics notice");
  bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;background:#fffaf0;border-top:1px solid #cdbf9c;padding:12px 16px;font:15px/1.4 sans-serif;color:#333;z-index:9999;text-align:center";
  bar.innerHTML = 'We would like to count visits with Google Analytics so we know what helps parents. It is for grown-ups only, uses no advertising features, and you can say no. <a href="' + (location.hostname.indexOf('alreadywild') > -1 ? '/privacy/' : '/privacy.html') + '">Details</a> ' +
    '<button id="an-yes" style="margin:0 6px;padding:6px 12px">Accept</button><button id="an-no" style="padding:6px 12px">No thanks</button>';
  document.body.appendChild(bar);
  function pick(v) { try { localStorage.setItem(KEY, v); } catch (e) {} bar.remove(); if (v === "yes") load(); }
  document.getElementById("an-yes").onclick = function () { pick("yes"); };
  document.getElementById("an-no").onclick = function () { pick("no"); };
})();
