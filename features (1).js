/* কিবলার দিক ও ক্যালেন্ডার — index.html এর শেষে </body> এর আগে যোগ করুন:
   <script src="features.js"></script> */
(function () {
  'use strict';
  var BN = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  function bn(n) { return String(n).replace(/\d/g, function (d) { return BN[d]; }); }
  function $(id) { return document.getElementById(id); }

  /* ---------- styles ---------- */
  var css =
    '.qwrap{display:grid;gap:14px;justify-items:center;text-align:center}' +
    '.qsvg{width:min(84vw,300px);height:auto;display:block}' +
    '.qsvg .ring{fill:var(--surface);stroke:var(--line);stroke-width:2}' +
    '.qwrap.ok .qsvg .ring{stroke:var(--accent);stroke-width:5}' +
    '.qsvg .tk{stroke:var(--muted);stroke-width:1;opacity:.55}' +
    '.qsvg .tk.mj{stroke-width:2;opacity:1}' +
    '.qsvg text{fill:var(--muted);font-family:var(--font-display);font-size:16px;text-anchor:middle;dominant-baseline:central}' +
    '.qsvg text.n{fill:var(--gold);font-size:19px}' +
    '.qsvg .ln{stroke:var(--accent);stroke-width:3;stroke-linecap:round}' +
    '.qsvg .kb{fill:#111;stroke:var(--gold);stroke-width:2}' +
    '.qsvg .pt{fill:var(--gold)}' +
    '.qsvg .ct{fill:var(--accent)}' +
    '.qdeg{font-size:34px;font-weight:600;color:var(--accent);font-variant-numeric:tabular-nums;line-height:1.1}' +
    '.qmsg{min-height:1.6em;font-weight:600;margin:0}' +
    '.qwrap.ok .qmsg{color:var(--accent)}' +
    '.qbtns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}' +
    '.cal-head{display:flex;align-items:center;justify-content:space-between;gap:10px}' +
    '.cal-mid{text-align:center;min-width:0}' +
    '.cal-title{font-family:var(--font-display);font-size:24px;line-height:1.3}' +
    '.cal-sub{font-size:14px;color:var(--muted)}' +
    '.cal-nav{font:inherit;font-size:20px;line-height:1;width:42px;height:42px;flex:0 0 auto;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--accent);cursor:pointer}' +
    '.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:14px}' +
    '.cal-dow{text-align:center;font-size:13px;font-weight:600;color:var(--muted)}' +
    '.cal-dow.fr{color:var(--gold)}' +
    '.cal-d{border:1px solid var(--line);background:var(--surface);border-radius:10px;padding:5px 0 4px;text-align:center;min-width:0;line-height:1.2}' +
    '.cal-d b{display:block;font-size:17px;font-weight:600;font-variant-numeric:tabular-nums}' +
    '.cal-d i{display:block;font-style:normal;font-size:11.5px;color:var(--muted);font-variant-numeric:tabular-nums}' +
    '.cal-d.fr{border-color:var(--gold)}' +
    '.cal-d.td{background:var(--accent);border-color:var(--accent);color:var(--bg)}' +
    '.cal-d.td i{color:var(--bg);opacity:.85}' +
    '.cal-e{visibility:hidden}' +
    '.cal-foot{display:grid;gap:10px;margin-top:16px;justify-items:center}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- sections ---------- */
  var qSec = document.createElement('section');
  qSec.className = 'view'; qSec.id = 'qibla';
  qSec.innerHTML =
    '<div class="sec-head"><h2>কিবলার দিক</h2><span class="label">Qibla</span></div>' +
    '<div class="card"><div class="qwrap" id="qWrap">' +
      '<svg class="qsvg" id="qSvg" viewBox="0 0 260 260" role="img" aria-label="কিবলা কম্পাস">' +
        '<g id="qDial">' +
          '<circle class="ring" cx="130" cy="130" r="118"/>' +
          '<g id="qTicks"></g>' +
          '<text class="n" x="130" y="46">উ</text><text x="214" y="130">পূ</text><text x="130" y="214">দ</text><text x="46" y="130">প</text>' +
          '<g id="qMark"><line class="ln" x1="130" y1="130" x2="130" y2="40"/><rect class="kb" x="120" y="14" width="20" height="22" rx="3"/><path d="M120 22h20" stroke="#e2c370" stroke-width="2"/></g>' +
        '</g>' +
        '<path class="pt" d="M130 16 L121 0 L139 0 Z"/>' +
        '<circle class="ct" cx="130" cy="130" r="6"/>' +
      '</svg>' +
      '<div class="qdeg" id="qDeg">—</div>' +
      '<p class="qmsg" id="qMsg" aria-live="polite"></p>' +
      '<div class="qbtns">' +
        '<button class="btn" id="qCompass" type="button">কম্পাস চালু করুন</button>' +
        '<button class="btn line" id="qLoc" type="button">আমার লোকেশন ব্যবহার করুন</button>' +
      '</div>' +
      '<p class="small" id="qInfo"></p>' +
    '</div></div>' +
    '<p class="small">ফোন সমতলভাবে ধরুন এবং কাছে চুম্বক বা ধাতুর জিনিস রাখবেন না। কম্পাস ঠিক না চললে ফোনটি ৮-এর মতো করে ঘুরিয়ে নিন। কাবার চিহ্নটি ওপরের সোনালি তীরের সোজা হলে ওই দিকই কিবলা।</p>';

  var cSec = document.createElement('section');
  cSec.className = 'view'; cSec.id = 'calendar';
  cSec.innerHTML =
    '<div class="sec-head"><h2>ক্যালেন্ডার</h2><span class="label">Calendar</span></div>' +
    '<div class="card">' +
      '<div class="tchips" id="cTabs" role="tablist" style="margin-bottom:14px"></div>' +
      '<div class="cal-head">' +
        '<button class="cal-nav" id="cPrev" type="button" aria-label="আগের মাস">‹</button>' +
        '<div class="cal-mid"><div class="cal-title" id="cTitle"></div><div class="cal-sub" id="cSub"></div></div>' +
        '<button class="cal-nav" id="cNext" type="button" aria-label="পরের মাস">›</button>' +
      '</div>' +
      '<div class="cal-grid" id="cGrid"></div>' +
      '<div class="cal-foot">' +
        '<button class="btn line" id="cToday" type="button">আজকের তারিখে যান</button>' +
        '<div id="cAdjBox"><div class="small" style="margin:0 0 6px !important;text-align:center">হিজরি তারিখ সমন্বয় (সৌদির হিসাবের তুলনায়)</div>' +
        '<div class="tchips" id="cAdj"></div></div>' +
      '</div>' +
    '</div>' +
    '<p class="small" id="calNote">বড় সংখ্যা ইংরেজি তারিখ, ছোট সংখ্যা হিজরি তারিখ। শুক্রবার সোনালি রঙে দেখানো। বাংলাদেশে সাধারণত সৌদির একদিন পরে চাঁদ দেখা যায়, তাই শুরুতে −১ দিন ধরা আছে। চাঁদ দেখা অনুযায়ী ওপরের বোতামে বদলে নিন।</p>';

  var foot = document.querySelector('footer');
  var host = foot ? foot.parentNode : document.querySelector('.wrap');
  host.insertBefore(qSec, foot || null);
  host.insertBefore(cSec, foot || null);

  // "শীঘ্রই" ট্যাগ সরিয়ে কার্ড দুটো চালু করা
  ['#qibla', '#calendar', '#roza'].forEach(function (h) {
    var a = document.querySelector('a.tile[href="' + h + '"]');
    if (!a) return;
    a.classList.remove('soon');
    var bd = a.querySelector('.bd'); if (bd) bd.parentNode.removeChild(bd);
  });

  /* ================= কিবলা ================= */
  var KAABA = { lat: 21.4225, lon: 39.8262 };
  var MOSQUE = { lat: 24.1564, lon: 90.6520 }; // মসজিদের অবস্থান (গুগল ম্যাপের প্লাস কোড 5M42+HRF থেকে নেওয়া)
  var pos = { lat: MOSQUE.lat, lon: MOSQUE.lon, own: false };
  var qibla = 0, heading = null, smooth = null, aligned = false, listening = false;

  function rad(d) { return d * Math.PI / 180; }
  function calcQibla(lat, lon) {
    var p1 = rad(lat), p2 = rad(KAABA.lat), dl = rad(KAABA.lon - lon);
    var y = Math.sin(dl) * Math.cos(p2);
    var x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }
  function distKm(lat, lon) {
    var dp = rad(KAABA.lat - lat), dl = rad(KAABA.lon - lon);
    var a = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(rad(lat)) * Math.cos(rad(KAABA.lat)) * Math.sin(dl / 2) * Math.sin(dl / 2);
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // ঘড়ির দাগ
  (function () {
    var g = $('qTicks'), s = '', i;
    for (i = 0; i < 72; i++) {
      var major = i % 6 === 0, r1 = major ? 100 : 106, r2 = 114, a = rad(i * 5);
      s += '<line class="tk' + (major ? ' mj' : '') + '" x1="' + (130 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (130 - r1 * Math.cos(a)).toFixed(1) +
           '" x2="' + (130 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (130 - r2 * Math.cos(a)).toFixed(1) + '"/>';
    }
    g.innerHTML = s;
  })();

  function drawInfo() {
    var km = Math.round(distKm(pos.lat, pos.lon));
    $('qInfo').textContent = (pos.own ? 'আপনার বর্তমান লোকেশন অনুযায়ী' : 'মসজিদের আনুমানিক অবস্থান অনুযায়ী') + ' কাবা শরীফ প্রায় ' + bn(km.toLocaleString('en-IN')) + ' কিমি দূরে।';
  }
  function drawQibla() {
    qibla = calcQibla(pos.lat, pos.lon);
    $('qMark').setAttribute('transform', 'rotate(' + qibla.toFixed(1) + ' 130 130)');
    $('qDeg').textContent = 'উত্তর থেকে ' + bn(Math.round(qibla)) + '° (ঘড়ির কাঁটার দিকে)';
    $('qDeg').style.fontSize = '22px';
    drawInfo();
    if (heading === null) $('qMsg').textContent = 'কম্পাস চালু করলে ফোন ঘোরালে দিক মিলবে।';
  }
  function drawHeading() {
    $('qDial').setAttribute('transform', 'rotate(' + (-smooth).toFixed(1) + ' 130 130)');
    var d = Math.abs(((qibla - smooth + 540) % 360) - 180);
    var ok = d < 5;
    $('qWrap').classList.toggle('ok', ok);
    $('qMsg').textContent = ok ? 'কিবলার দিকে মুখ করে আছেন ✓' : 'ফোন ঘুরিয়ে কাবার চিহ্ন ওপরের তীরের সোজা করুন';
    if (ok && !aligned) { try { if (navigator.vibrate) navigator.vibrate(40); } catch (e) {} }
    aligned = ok;
  }

  function onOri(e) {
    var h = null;
    if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading;
    else if (e.alpha !== null && e.alpha !== undefined && (e.absolute === true || e.type === 'deviceorientationabsolute')) {
      h = 360 - e.alpha;
      try { if (screen.orientation && screen.orientation.angle) h += screen.orientation.angle; } catch (x) {}
    }
    if (h === null || isNaN(h)) return;
    h = ((h % 360) + 360) % 360;
    heading = h;
    if (smooth === null) smooth = h;
    else smooth = (smooth + ((h - smooth + 540) % 360 - 180) * 0.25 + 360) % 360;
    drawHeading();
  }
  function startCompass() {
    function attach() {
      if (listening) return;
      listening = true;
      window.addEventListener('deviceorientationabsolute', onOri, true);
      window.addEventListener('deviceorientation', onOri, true);
      $('qMsg').textContent = 'কম্পাস চালু হয়েছে। ফোন ধীরে ঘোরান।';
      $('qCompass').textContent = 'কম্পাস চালু আছে';
      setTimeout(function () {
        if (heading === null) $('qMsg').textContent = 'এই ফোনে কম্পাস সেন্সর পাওয়া যায়নি। ওপরের কাবার চিহ্ন যে দিকে আছে, সেটা উত্তর থেকে ' + bn(Math.round(qibla)) + '° দিক।';
      }, 2500);
    }
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(function (r) {
          if (r === 'granted') attach(); else $('qMsg').textContent = 'কম্পাসের অনুমতি দেওয়া হয়নি।';
        }).catch(function () { $('qMsg').textContent = 'কম্পাস চালু করা যায়নি।'; });
      } else attach();
    } catch (e) { $('qMsg').textContent = 'কম্পাস চালু করা যায়নি।'; }
  }
  function stopCompass() {
    if (!listening) return;
    listening = false;
    window.removeEventListener('deviceorientationabsolute', onOri, true);
    window.removeEventListener('deviceorientation', onOri, true);
    $('qCompass').textContent = 'কম্পাস চালু করুন';
    heading = null; smooth = null; aligned = false;
    $('qDial').setAttribute('transform', '');
    $('qWrap').classList.remove('ok');
    drawQibla();
  }
  $('qCompass').addEventListener('click', startCompass);
  $('qLoc').addEventListener('click', function () {
    var b = $('qLoc');
    if (!navigator.geolocation) { $('qMsg').textContent = 'এই ব্রাউজারে লোকেশন সুবিধা নেই।'; return; }
    b.textContent = 'লোকেশন খোঁজা হচ্ছে…';
    navigator.geolocation.getCurrentPosition(function (p) {
      pos = { lat: p.coords.latitude, lon: p.coords.longitude, own: true };
      b.textContent = 'লোকেশন পাওয়া গেছে ✓';
      drawQibla();
      if (heading !== null) drawHeading();
    }, function () {
      b.textContent = 'আমার লোকেশন ব্যবহার করুন';
      $('qMsg').textContent = 'লোকেশন পাওয়া যায়নি। অনুমতি দিয়ে আবার চেষ্টা করুন।';
    }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
  });
  drawQibla();

  /* ================= ক্যালেন্ডার ================= */
  var DOW = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র'];
  var MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  var hDay = null, hMon = null, hijriOK = false;
  try {
    hDay = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { timeZone: 'UTC', day: 'numeric' });
    hMon = new Intl.DateTimeFormat('bn-BD-u-ca-islamic-umalqura', { timeZone: 'UTC', month: 'long', year: 'numeric' });
    hijriOK = /islamic/.test(hDay.resolvedOptions().calendar || '');
  } catch (e) { hijriOK = false; }

  var adj = -1; // বাংলাদেশে সাধারণত সৌদির একদিন পরে চাঁদ দেখা যায়
  try { var sv = localStorage.getItem('hijriAdj'); if (sv !== null && /^-?[01]$/.test(sv)) adj = +sv; } catch (e) {}

  function todayDhaka() {
    try {
      var p = {};
      new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
        .forEach(function (x) { p[x.type] = x.value; });
      return { y: +p.year, m: +p.month - 1, d: +p.day };
    } catch (e) { var n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate() }; }
  }
  var T = todayDhaka(), cy = T.y, cm = T.m;

  function hijriParts(y, m, d) {
    var dt = new Date(Date.UTC(y, m, d + adj, 12));
    var o = { month: '', year: '' };
    hMon.formatToParts(dt).forEach(function (x) { if (x.type === 'month') o.month = x.value; if (x.type === 'year') o.year = x.value; });
    return o;
  }

  function renderG() {
    var grid = $('cGrid'), html = '', i;
    $('cTitle').textContent = MONTHS[cm] + ' ' + bn(cy);
    for (i = 0; i < 7; i++) html += '<div class="cal-dow' + (i === 6 ? ' fr' : '') + '">' + DOW[i] + '</div>';
    var first = new Date(Date.UTC(cy, cm, 1, 12)).getUTCDay(); // 0 = রবিবার
    var offset = (first + 1) % 7;                               // শনিবার থেকে শুরু
    var days = new Date(Date.UTC(cy, cm + 1, 0, 12)).getUTCDate();
    for (i = 0; i < offset; i++) html += '<div class="cal-d cal-e"></div>';
    for (var d = 1; d <= days; d++) {
      var col = (offset + d - 1) % 7, cls = 'cal-d';
      if (col === 6) cls += ' fr';
      if (cy === T.y && cm === T.m && d === T.d) cls += ' td';
      var h = '';
      if (hijriOK) { try { h = bn(hDay.format(new Date(Date.UTC(cy, cm, d + adj, 12)))); } catch (e) { h = ''; } }
      html += '<div class="' + cls + '"><b>' + bn(d) + '</b>' + (h ? '<i>' + h + '</i>' : '') + '</div>';
    }
    grid.innerHTML = html;

    var sub = $('cSub'), box = $('cAdjBox');
    if (hijriOK) {
      try {
        var a = hijriParts(cy, cm, 1), b = hijriParts(cy, cm, days), t;
        if (a.month === b.month && a.year === b.year) t = a.month + ' ' + a.year;
        else if (a.year === b.year) t = a.month + ' – ' + b.month + ' ' + b.year;
        else t = a.month + ' ' + a.year + ' – ' + b.month + ' ' + b.year;
        sub.textContent = t + ' হিজরি';
      } catch (e) { sub.textContent = ''; }
      box.hidden = false;
    } else { sub.textContent = ''; box.hidden = true; }
  }

  /* ---------- ইংরেজি / বাংলা / হিজরি আলাদা ট্যাব ---------- */
  var DMS = 864e5, calMode = 'g';
  var BMN = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
  var HMN = ['মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি', 'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান', 'রমযান', 'শাওয়াল', 'জিলকদ', 'জিলহজ'];
  var GSH = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  var bY = 0, bM = 0, hY = 0, hM = 0, hFirstMs = 0;

  function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
  /* বাংলাদেশের সংশোধিত জাতীয় পঞ্জিকা: পহেলা বৈশাখ = ১৪ এপ্রিল; প্রথম ছয় মাস ৩১ দিন, এরপর চার মাস ৩০ দিন,
     ফাল্গুন ২৯ (লিপ ইয়ারে ৩০), চৈত্র ৩০ */
  function bLens(by) { return [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeap(by + 594) ? 30 : 29, 30]; }
  function bStart(by) { return Date.UTC(by + 593, 3, 14, 12); }
  function bMonthFirst(by, bm) { var L = bLens(by), ms = bStart(by), i; for (i = 0; i < bm; i++) ms += L[i] * DMS; return ms; }
  function bOf(ms) {
    var d = new Date(ms), y = d.getUTCFullYear(), by = Date.UTC(y, 3, 14, 12) <= ms ? y - 593 : y - 594;
    var off = Math.round((ms - bStart(by)) / DMS), L = bLens(by), m = 0;
    while (m < 11 && off >= L[m]) { off -= L[m]; m++; }
    return { y: by, m: m, d: off + 1 };
  }
  function hNumOf(ms) {
    if (!hijriOK) return null;
    try {
      var o = {};
      new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { timeZone: 'UTC', day: 'numeric', month: 'numeric', year: 'numeric' })
        .formatToParts(new Date(ms + adj * DMS)).forEach(function (x) { o[x.type] = +x.value; });
      return o.month ? { y: o.year, m: o.month, d: o.day } : null;
    } catch (e) { return null; }
  }
  function hFirstOf(ms) { var h = hNumOf(ms); return h ? ms - (h.d - 1) * DMS : ms; }
  function hLenOf(first) { var h = hNumOf(first), n = 0; if (!h) return 30; while (n < 31) { var x = hNumOf(first + n * DMS); if (!x || x.m !== h.m) break; n++; } return n; }
  function tdMs() { var t = todayDhaka(); return Date.UTC(t.y, t.m, t.d, 12); }
  function anchorMs() { return (cy === T.y && cm === T.m) ? tdMs() : Date.UTC(cy, cm, 15, 12); }

  function setB(ms) { var b = bOf(ms); bY = b.y; bM = b.m; }
  function setH(ms) { hFirstMs = hFirstOf(ms); var h = hNumOf(hFirstMs); if (h) { hY = h.y; hM = h.m; } }

  function drawGeneric(first, n, bigFn, smallFn, title, sub) {
    var html = '', i, today = tdMs();
    for (i = 0; i < 7; i++) html += '<div class="cal-dow' + (i === 6 ? ' fr' : '') + '">' + DOW[i] + '</div>';
    var offset = (new Date(first).getUTCDay() + 1) % 7;
    for (i = 0; i < offset; i++) html += '<div class="cal-d cal-e"></div>';
    for (i = 0; i < n; i++) {
      var ms = first + i * DMS, col = (offset + i) % 7, cls = 'cal-d';
      if (col === 6) cls += ' fr';
      if (ms === today) cls += ' td';
      var sm = smallFn(ms);
      html += '<div class="' + cls + '"><b>' + bigFn(ms, i) + '</b>' + (sm ? '<i>' + sm + '</i>' : '') + '</div>';
    }
    $('cGrid').innerHTML = html;
    $('cTitle').textContent = title; $('cSub').textContent = sub;
  }
  function gRange(first, n) {
    var a = new Date(first), b = new Date(first + (n - 1) * DMS), t = MONTHS[a.getUTCMonth()] + ' ' + bn(a.getUTCFullYear());
    if (a.getUTCMonth() !== b.getUTCMonth() || a.getUTCFullYear() !== b.getUTCFullYear()) t = (a.getUTCFullYear() === b.getUTCFullYear() ? MONTHS[a.getUTCMonth()] : MONTHS[a.getUTCMonth()] + ' ' + bn(a.getUTCFullYear())) + ' – ' + MONTHS[b.getUTCMonth()] + ' ' + bn(b.getUTCFullYear());
    return 'ইংরেজি: ' + t;
  }
  function gSmall(ms) { var d = new Date(ms); return d.getUTCDate() === 1 ? GSH[d.getUTCMonth()] : bn(d.getUTCDate()); }

  function renderB() {
    var first = bMonthFirst(bY, bM), n = bLens(bY)[bM];
    drawGeneric(first, n, function (ms, i) { return bn(i + 1); }, gSmall, BMN[bM] + ' ' + bn(bY), gRange(first, n));
  }
  function renderH() {
    var first = hFirstMs, n = hLenOf(first);
    drawGeneric(first, n, function (ms, i) { return bn(i + 1); }, gSmall, HMN[hM - 1] + ' ' + bn(hY), gRange(first, n));
  }

  var NOTES = {
    g: 'বড় সংখ্যা ইংরেজি তারিখ, ছোট সংখ্যা হিজরি তারিখ। শুক্রবার সোনালি রঙে দেখানো। বাংলাদেশে সাধারণত সৌদির একদিন পরে চাঁদ দেখা যায়, তাই শুরুতে −১ দিন ধরা আছে। চাঁদ দেখা অনুযায়ী ওপরের বোতামে বদলে নিন।',
    b: 'বাংলা তারিখ বাংলাদেশের সংশোধিত জাতীয় পঞ্জিকা অনুযায়ী: ১৪ এপ্রিল পহেলা বৈশাখ। বড় সংখ্যা বাংলা তারিখ, ছোট সংখ্যা ইংরেজি তারিখ।',
    h: 'বড় সংখ্যা হিজরি তারিখ, ছোট সংখ্যা ইংরেজি তারিখ। হিজরি মাস চাঁদ দেখার ওপর নির্ভর করে, তাই চাঁদ দেখা অনুযায়ী ওপরের সমন্বয়ের বোতামে এক দিন বাড়ানো-কমানো যায়।'
  };
  function renderCal() {
    if (calMode === 'h' && !hijriOK) calMode = 'g';
    if (calMode === 'g') renderG(); else if (calMode === 'b') renderB(); else renderH();
    $('cAdjBox').hidden = !(hijriOK && calMode !== 'b');
    var nt = $('calNote'); if (nt) nt.textContent = NOTES[calMode];
    var tb = $('cTabs'); if (tb) Array.prototype.forEach.call(tb.children, function (c) { var on = c.getAttribute('data-m') === calMode; c.className = on ? 'chip on' : 'chip'; c.setAttribute('aria-selected', on ? 'true' : 'false'); });
  }
  function setMode(m) {
    var a = anchorMs();
    if (calMode === 'b') a = bMonthFirst(bY, bM) + 14 * DMS; else if (calMode === 'h') a = hFirstMs + 14 * DMS;
    if (calMode !== 'g' && tdMs() >= (calMode === 'b' ? bMonthFirst(bY, bM) : hFirstMs) && tdMs() < (calMode === 'b' ? bMonthFirst(bY, bM) + bLens(bY)[bM] * DMS : hFirstMs + hLenOf(hFirstMs) * DMS)) a = tdMs();
    var d = new Date(a);
    if (m === 'g') { cy = d.getUTCFullYear(); cm = d.getUTCMonth(); }
    else if (m === 'b') setB(a); else setH(a);
    calMode = m; renderCal();
  }
  (function () {
    var tb = $('cTabs'); if (!tb) return;
    [['g', 'ইংরেজি'], ['b', 'বাংলা'], ['h', 'হিজরি']].forEach(function (o) {
      if (o[0] === 'h' && !hijriOK) return;
      var c = document.createElement('button'); c.type = 'button'; c.className = 'chip'; c.setAttribute('data-m', o[0]); c.setAttribute('role', 'tab'); c.textContent = o[1];
      c.addEventListener('click', function () { setMode(o[0]); });
      tb.appendChild(c);
    });
  })();

  var adjHooks = [];
  function setAdj(v) {
    adj = v;
    try { localStorage.setItem('hijriAdj', String(adj)); } catch (e) {}
    if (calMode === 'h') setH(tdMs());
    renderAdj(); renderCal();
    adjHooks.forEach(function (f) { f(); });
  }
  function renderAdj() {
    ['cAdj', 'rzAdj'].forEach(function (id) {
      var box = $(id); if (!box) return;
      box.textContent = '';
      [[-1, '−১ দিন'], [0, 'সৌদির সমান'], [1, '+১ দিন']].forEach(function (o) {
        var c = document.createElement('button');
        c.type = 'button'; c.className = o[0] === adj ? 'chip on' : 'chip'; c.textContent = o[1];
        c.addEventListener('click', function () { setAdj(o[0]); });
        box.appendChild(c);
      });
    });
  }

  $('cPrev').addEventListener('click', function () {
    if (calMode === 'b') { bM--; if (bM < 0) { bM = 11; bY--; } }
    else if (calMode === 'h') { hFirstMs = hFirstOf(hFirstMs - DMS); var h = hNumOf(hFirstMs); if (h) { hY = h.y; hM = h.m; } }
    else { cm--; if (cm < 0) { cm = 11; cy--; } }
    renderCal();
  });
  $('cNext').addEventListener('click', function () {
    if (calMode === 'b') { bM++; if (bM > 11) { bM = 0; bY++; } }
    else if (calMode === 'h') { hFirstMs = hFirstMs + hLenOf(hFirstMs) * DMS; var h = hNumOf(hFirstMs); if (h) { hY = h.y; hM = h.m; } }
    else { cm++; if (cm > 11) { cm = 0; cy++; } }
    renderCal();
  });
  $('cToday').addEventListener('click', function () { T = todayDhaka(); cy = T.y; cm = T.m; if (calMode === 'b') setB(tdMs()); else if (calMode === 'h') setH(tdMs()); renderCal(); });
  renderAdj(); renderCal();

  /* ================= রোজা ================= */
  var DAY = 864e5;
  var WD = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  var HM = ['মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি', 'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান', 'রমযান', 'শাওয়াল', 'জিলকদ', 'জিলহজ'];
  var cfg = {};
  var rzTab = 'today';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pick(v, d) { return (typeof v === 'string' && v.replace(/\s/g, '')) ? v.trim() : d; }

  var hNum = null;
  try { hNum = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { timeZone: 'UTC', day: 'numeric', month: 'numeric', year: 'numeric' }); } catch (e) { hNum = null; }
  function hOf(ms) {
    if (!hijriOK || !hNum) return null;
    try {
      var o = {};
      hNum.formatToParts(new Date(ms + adj * DAY)).forEach(function (p) { o[p.type] = +p.value; });
      return o.month ? { y: o.year, m: o.month, d: o.day } : null;
    } catch (e) { return null; }
  }
  function gTxt(ms, withYear) { var d = new Date(ms); return bn(d.getUTCDate()) + ' ' + MONTHS[d.getUTCMonth()] + (withYear ? ' ' + bn(d.getUTCFullYear()) : ''); }
  function hTxt(ms) { var h = hOf(ms); return h ? bn(h.d) + ' ' + HM[h.m - 1] + ' ' + bn(h.y) : ''; }
  function wdOf(ms) { return WD[new Date(ms).getUTCDay()]; }
  function todayMs() { var t = todayDhaka(); return Date.UTC(t.y, t.m, t.d, 12); }

  /* সাহরীর শেষ সময় (ফজর ১৮°) ও ইফতার (সূর্যাস্ত) — মসজিদের অবস্থান অনুযায়ী হিসাব */
  function sunCalc(ms) {
    var dt = new Date(ms), y = dt.getUTCFullYear();
    var doy = Math.round((Date.UTC(y, dt.getUTCMonth(), dt.getUTCDate()) - Date.UTC(y, 0, 1)) / DAY) + 1;
    var g = 2 * Math.PI / 365 * (doy - 1);
    var eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    var dc = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    var noon = 12 + 6 - MOSQUE.lon / 15 - eq / 60;
    function H(ang) {
      var c = (Math.sin(rad(-ang)) - Math.sin(rad(MOSQUE.lat)) * Math.sin(dc)) / (Math.cos(rad(MOSQUE.lat)) * Math.cos(dc));
      c = Math.max(-1, Math.min(1, c));
      return Math.acos(c) * 180 / Math.PI / 15;
    }
    return { s: (noon - H(18)) * 60, i: (noon + H(0.833)) * 60 };
  }
  function offs() {
    var a = Number(cfg.sehriOffset), b = Number(cfg.iftarOffset);
    return { s: isFinite(a) && cfg.sehriOffset !== undefined && cfg.sehriOffset !== '' ? a : -1,
             i: isFinite(b) && cfg.iftarOffset !== undefined && cfg.iftarOffset !== '' ? b : 2 };
  }
  function rzTimes(ms) { var t = sunCalc(ms), o = offs(); return { s: Math.round(t.s) + o.s, i: Math.round(t.i) + o.i }; }
  function hm(min) { var h = Math.floor(min / 60) % 12 || 12, m = min % 60; return bn(h + ':' + (m < 10 ? '0' : '') + m); }

  function ramadanStart() {
    var t0 = todayMs(), k, m;
    if (typeof cfg.ramadanStart === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(cfg.ramadanStart)) {
      var p = cfg.ramadanStart.split('-'), ms = Date.UTC(+p[0], +p[1] - 1, +p[2], 12);
      if (ms + 30 * DAY > t0) return { ms: ms, fixed: true };
    }
    if (!hijriOK) return null;
    for (k = -30; k <= 420; k++) {
      m = t0 + k * DAY;
      var h = hOf(m);
      if (h && h.m === 9 && h.d === 1) return { ms: m, fixed: false };
    }
    return null;
  }

  /* নফল ও নিষিদ্ধ দিন */
  function dayTags(ms) {
    var h = hOf(ms), wd = new Date(ms).getUTCDay(), t = [];
    if (h) {
      if (h.m === 10 && h.d === 1) return { ban: true, t: ['ঈদুল ফিতর — আজ রোজা রাখা নিষিদ্ধ'] };
      if (h.m === 12 && h.d >= 10 && h.d <= 13) return { ban: true, t: [(h.d === 10 ? 'ঈদুল আযহা' : 'তাশরীকের দিন') + ' — আজ রোজা রাখা নিষিদ্ধ'] };
      if (h.m === 9) return { ram: true, t: ['রমযানের ফরয রোজা'] };
    }
    if (wd === 1) t.push('সোমবারের নফল রোজা');
    if (wd === 4) t.push('বৃহস্পতিবারের নফল রোজা');
    if (h) {
      if (h.d >= 13 && h.d <= 15 && h.m !== 12) t.push('আইয়ামে বীজের রোজা');
      if (h.m === 12 && h.d === 9) t.push('আরাফার দিনের রোজা');
      if (h.m === 1 && (h.d === 9 || h.d === 10)) t.push('আশুরার রোজা');
      if (h.m === 10 && h.d >= 2) t.push('শাওয়ালের ছয় রোজা (মাসের মধ্যে)');
    }
    return { t: t };
  }
  function tagHtml(x) {
    if (!x.t.length) return '<span class="rz-lbl">আজ বিশেষ নফল রোজার দিন নয়।</span>';
    return x.t.map(function (s) { return '<span class="rz-tag' + (x.ban ? ' ban' : '') + '">' + esc(s) + '</span>'; }).join('');
  }
  function upcoming() {
    var t0 = todayMs(), out = [], k;
    for (k = 0; k <= 420 && out.length < 8; k++) {
      var ms = t0 + k * DAY, h = hOf(ms);
      if (!h) break;
      if (h.m === 12 && h.d === 9) out.push({ ms: ms, t: 'আরাফার রোজা', n: '৯ জিলহজ। যারা হজে নেই, তাদের জন্য এই রোজা অত্যন্ত ফযীলতের।' });
      else if (h.m === 1 && h.d === 9) out.push({ ms: ms, t: 'আশুরার রোজা', n: '৯ ও ১০ মুহাররম (অথবা ১০ ও ১১) — দুটি রোজা রাখা উত্তম।' });
      else if (h.m === 10 && h.d === 2) out.push({ ms: ms, t: 'শাওয়ালের ছয় রোজা শুরু', n: 'ঈদের পরের দিন থেকে শাওয়াল মাসের ভেতরে যেকোনো ছয় দিন।' });
      else if (h.d === 13 && h.m !== 9 && h.m !== 12) out.push({ ms: ms, t: 'আইয়ামে বীজ', n: HM[h.m - 1] + ' মাসের ১৩, ১৪ ও ১৫ তারিখ — তিন দিন।' });
    }
    return out;
  }

  /* ---------- styles ---------- */
  var rzCss = [
    '.rz-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}',
    '.rz-pane[hidden]{display:none}',
    '.rz-pane>*+*{margin-top:14px}',
    '.rz-hero{text-align:center;display:grid;gap:6px;justify-items:center}',
    '.rz-st{font-family:var(--font-display);font-size:22px;line-height:1.4}',
    '.rz-lbl{color:var(--muted);font-size:15px}',
    '.rz-cnt{font-size:44px;font-weight:600;color:var(--accent);font-variant-numeric:tabular-nums;line-height:1.15}',
    '.rz-f{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.rz-f>div{border:1px solid var(--line);border-radius:12px;padding:12px 8px;text-align:center;background:var(--surface)}',
    '.rz-f b{display:block;font-size:13px;color:var(--muted);font-weight:600}',
    '.rz-f span{font-size:22px;font-weight:600;font-variant-numeric:tabular-nums}',
    '.rz-tag{display:inline-block;background:var(--hl);border:1px solid var(--line);border-radius:999px;padding:2px 12px;font-size:14.5px;margin:2px 6px 2px 0}',
    '.rz-tag.ban{border-color:#d2573b;color:#d2573b}',
    '.rz-t th{padding:0 6px 8px;white-space:nowrap;text-align:center}',
    '.rz-t td{padding:8px 6px;font-size:15px;white-space:nowrap;text-align:center}',
    '.rz-t td:nth-child(2),.rz-t td:nth-child(3){text-align:left}',
    '.rz-t tr.dh td{background:var(--hl);font-weight:600;color:var(--accent);font-family:var(--font-display);font-size:16px;white-space:normal}',
    '.rz-t tr.fr td:nth-child(3){color:var(--gold);font-weight:600}',
    '.rz-ar{font-family:"Amiri","Noto Naskh Arabic","Scheherazade New","Traditional Arabic",serif;font-size:26px;line-height:2;direction:rtl;text-align:center;margin:6px 0 !important;color:var(--fg)}',
    '.rz-pr{font-style:italic;color:var(--muted)}',
    '.rz-src{font-size:13px;color:var(--muted)}',
    '.rz-pane details{border:1px solid var(--line);border-radius:12px;background:var(--surface);padding:0 14px}',
    '.rz-pane details+details{margin-top:10px}',
    '.rz-pane summary{cursor:pointer;padding:12px 0;font-weight:600}',
    '.rz-pane details ul{margin:0 0 12px;padding-left:20px}',
    '.rz-pane details li{margin-bottom:4px}',
    '.rz-trk{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:12px}',
    '.rz-day{font:inherit;border:1px solid var(--line);background:var(--surface);color:var(--fg);border-radius:10px;padding:9px 0;cursor:pointer;font-variant-numeric:tabular-nums}',
    '.rz-day.on{background:var(--accent);color:var(--bg);border-color:var(--accent)}',
    '.rz-day.td{box-shadow:0 0 0 2px var(--gold)}',
    '.rz-big{font-size:40px;font-weight:600;color:var(--accent);font-variant-numeric:tabular-nums;text-align:center;line-height:1.2}',
    '.rz-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px}',
    '.rz-in{font:inherit;width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--fg)}',
    '.rz-fl{display:grid;gap:4px;font-size:14.5px;color:var(--muted)}',
    '.rz-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.rz-ev{border-top:1px solid var(--line);padding:10px 0}',
    '.rz-ev:first-child{border-top:0;padding-top:0}',
    '@media print{body.rz-print *{visibility:hidden!important}body.rz-print #rz-print,body.rz-print #rz-print *{visibility:visible!important}body.rz-print #rz-print{position:absolute;left:0;top:0;width:100%}}'
  ].join('');
  var rzSt = document.createElement('style'); rzSt.textContent = rzCss; document.head.appendChild(rzSt);

  /* ---------- section ---------- */
  var rSec = document.createElement('section');
  rSec.className = 'view'; rSec.id = 'roza';
  rSec.innerHTML = '<div class="sec-head"><h2>রোজা</h2><span class="label">Roza</span></div>' +
    '<div class="rz-tabs" id="rzTabs"></div>' +
    ['today', 'table', 'nafl', 'dua', 'masala', 'track', 'fitra', 'mosque'].map(function (k) {
      return '<div class="rz-pane" id="rz-' + k + '" hidden></div>';
    }).join('');
  host.insertBefore(rSec, foot || null);

  var TABS = [['today', 'আজ'], ['table', 'রমযানের সময়সূচি'], ['nafl', 'নফল রোজা'], ['dua', 'নিয়ত ও দোয়া'], ['masala', 'মাসআলা'], ['track', 'ট্র্যাকার ও কাযা'], ['fitra', 'ফিতরা'], ['mosque', 'মসজিদের ঘোষণা']];
  function setTab(k) {
    rzTab = k;
    TABS.forEach(function (t) { $('rz-' + t[0]).hidden = t[0] !== k; });
    Array.prototype.forEach.call($('rzTabs').children, function (c) { c.className = c.getAttribute('data-k') === k ? 'chip on' : 'chip'; });
  }
  TABS.forEach(function (t) {
    var c = document.createElement('button');
    c.type = 'button'; c.className = 'chip'; c.setAttribute('data-k', t[0]); c.textContent = t[1];
    c.addEventListener('click', function () { setTab(t[0]); });
    $('rzTabs').appendChild(c);
  });

  /* ---------- আজ ---------- */
  var lastDay = '';
  function nowSec() {
    try {
      var o = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit' })
        .formatToParts(new Date()).forEach(function (p) { o[p.type] = +p.value; });
      return o.hour * 3600 + o.minute * 60 + o.second;
    } catch (e) { var n = new Date(); return n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds(); }
  }
  function renderToday() {
    var t0 = todayMs(), tm = rzTimes(t0), R = ramadanStart(), head = '', sub = '';
    lastDay = String(t0);
    if (R) {
      var idx = Math.round((t0 - R.ms) / DAY);
      if (idx >= 0 && idx < 30) { head = 'আজ রমযানের ' + bn(idx + 1) + ' তারিখ'; sub = 'রমযানুল মুবারক'; }
      else if (idx < 0) { head = 'রমযান শুরু হতে আনুমানিক ' + bn(-idx) + ' দিন বাকি'; sub = 'প্রথম রোজা: ' + wdOf(R.ms) + ', ' + gTxt(R.ms, true) + (R.fixed ? '' : ' (চাঁদ দেখা সাপেক্ষে)'); }
    }
    var inRam = R && Math.round((t0 - R.ms) / DAY) >= 0 && Math.round((t0 - R.ms) / DAY) < 30;
    $('rz-today').innerHTML =
      '<div class="card rz-hero">' +
        (head ? '<div class="rz-st">' + esc(head) + '</div>' : '') +
        (sub ? '<div class="rz-lbl">' + esc(sub) + '</div>' : '') +
        '<div class="rz-lbl" id="rzLbl" style="margin-top:8px"></div>' +
        '<div class="rz-cnt" id="rzCnt">—</div>' +
      '</div>' +
      '<div class="rz-f"><div><b>সাহরীর শেষ সময়</b><span>ভোর ' + hm(tm.s) + '</span></div><div><b>ইফতার</b><span>সন্ধ্যা ' + hm(tm.i) + '</span></div></div>' +
      '<div class="card"><div class="rz-lbl" style="margin-bottom:6px">আজ (' + esc(wdOf(t0)) + (hTxt(t0) ? ', ' + esc(hTxt(t0)) : '') + ')</div>' + tagHtml(dayTags(t0)) +
        '<div class="rz-lbl" style="margin:10px 0 6px">আগামীকাল</div>' + tagHtml(dayTags(t0 + DAY)) + '</div>' +
      '<p class="small">' + (inRam ? '' : 'এখন রমযান নয়। নফল রোজা রাখলে আজকের সাহরী ও ইফতারের আনুমানিক সময় এটাই। ') +
      'সময় সূর্যের অবস্থান থেকে হিসাব করা (ফজর ১৮° কোণ, সূর্যাস্ত), মসজিদের অবস্থান অনুযায়ী। সতর্কতার জন্য সাহরী ১ মিনিট আগে ও ইফতার ২ মিনিট পরে ধরা হয়েছে। মসজিদের ঘোষিত সময় থাকলে সেটাই চূড়ান্ত।</p>';
    rzTick();
  }
  function rzTick() {
    var lbl = $('rzLbl'), cnt = $('rzCnt');
    if (!lbl || !cnt) return;
    var t0 = todayMs();
    if (String(t0) !== lastDay) { renderAll(); return; }
    var s = nowSec(), tm = rzTimes(t0), sS = tm.s * 60, iS = tm.i * 60, label, diff;
    if (s < sS) { label = 'সাহরীর শেষ সময় হতে বাকি'; diff = sS - s; }
    else if (s < iS) { label = 'ইফতারের বাকি'; diff = iS - s; }
    else { label = 'আগামীকালের সাহরী শেষ হতে বাকি'; diff = 86400 - s + rzTimes(t0 + DAY).s * 60; }
    var h = Math.floor(diff / 3600), m = Math.floor((diff % 3600) / 60), x = diff % 60;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    lbl.textContent = label;
    cnt.textContent = bn(h + ':' + pad(m) + ':' + pad(x));
  }
  setInterval(function () { if (rSec.classList.contains('on')) rzTick(); }, 1000);

  /* ---------- রমযানের সময়সূচি ---------- */
  function renderTable() {
    var R = ramadanStart(), pane = $('rz-table');
    if (!R) { pane.innerHTML = '<div class="card"><p>এই ব্রাউজারে হিজরি তারিখের সুবিধা নেই, তাই সময়সূচি দেখানো যাচ্ছে না।</p></div>'; return; }
    var hy = hOf(R.ms), t0 = todayMs(), rows = '', i, G = ['রহমতের ১০ দিন', 'মাগফিরাতের ১০ দিন', 'নাজাতের ১০ দিন'];
    for (i = 0; i < 30; i++) {
      if (i % 10 === 0) rows += '<tr class="dh"><td colspan="5">' + G[i / 10] + '</td></tr>';
      var ms = R.ms + i * DAY, tm = rzTimes(ms), fri = new Date(ms).getUTCDay() === 5;
      rows += '<tr class="' + (ms === t0 ? 'next' : '') + (fri ? ' fr' : '') + '"><td>' + bn(i + 1) + (i === 29 ? '*' : '') + '</td><td>' + gTxt(ms) + '</td><td>' + wdOf(ms) + '</td><td>' + hm(tm.s) + '</td><td>' + hm(tm.i) + '</td></tr>';
    }
    pane.innerHTML =
      '<div id="rz-print"><div class="card" style="text-align:center"><div class="rz-st">পবিত্র মাহে রমযান' + (hy ? ' ' + bn(hy.y) + ' হিজরি' : '') + '</div>' +
      '<div class="rz-lbl">বাওরাইদ উত্তর পাড়া ফাদিলমুন্সী বাড়ি জামে মসজিদ, কাপাসিয়া, গাজীপুর</div>' +
      '<div class="rz-lbl">প্রথম রোজা আনুমানিক ' + wdOf(R.ms) + ', ' + gTxt(R.ms, true) + (R.fixed ? ' (মসজিদ কর্তৃপক্ষ ঘোষিত)' : ' (চাঁদ দেখা সাপেক্ষে)') + '</div></div>' +
      '<div class="card tbl rz-t" style="margin-top:14px"><table><thead><tr><th>রমযান</th><th>তারিখ</th><th>বার</th><th>সাহরী শেষ</th><th>ইফতার</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="small">* ২৯ বা ৩০ — চাঁদ দেখার ওপর নির্ভর করে। সাহরীর সময় ভোরের (এএম), ইফতারের সময় সন্ধ্যার (পিএম)।</p></div>' +
      (R.fixed ? '' : '<div class="card"><div class="rz-lbl" style="text-align:center;margin-bottom:6px">রমযান শুরুর তারিখ সমন্বয় (সৌদির হিসাবের তুলনায়)</div><div class="tchips" id="rzAdj"></div>' +
      '<p class="small" style="text-align:center">বাংলাদেশে সাধারণত সৌদির একদিন পরে চাঁদ দেখা যায়, তাই শুরুতে −১ দিন ধরা আছে। চাঁদ দেখা কমিটির ঘোষণা অনুযায়ী বদলে নিন।</p></div>') +
      '<div class="rz-row"><button class="btn line" id="rzPrint" type="button">সময়সূচি প্রিন্ট করুন</button></div>';
    renderAdj();
    var pb = $('rzPrint');
    if (pb) pb.addEventListener('click', function () {
      document.body.classList.add('rz-print');
      try { window.print(); } catch (e) {}
      setTimeout(function () { document.body.classList.remove('rz-print'); }, 500);
    });
  }

  /* ---------- নফল রোজা ---------- */
  function renderNafl() {
    var list = upcoming(), t0 = todayMs();
    var items = list.map(function (e) {
      return '<div class="rz-ev"><b>' + esc(e.t) + '</b><div class="rz-lbl">' + esc(wdOf(e.ms) + ', ' + gTxt(e.ms, true) + (hTxt(e.ms) ? ' · ' + hTxt(e.ms) : '')) + '</div><div>' + esc(e.n) + '</div></div>';
    }).join('');
    $('rz-nafl').innerHTML =
      '<div class="card"><h3>আসন্ন বিশেষ নফল রোজা</h3>' + (items || '<p>হিজরি তারিখ পাওয়া যায়নি।</p>') + '</div>' +
      '<div class="card"><h3>নফল রোজার দিনগুলো</h3><ul style="margin:0;padding-left:20px">' +
      '<li><b>সোমবার ও বৃহস্পতিবার:</b> প্রতি সপ্তাহে।</li>' +
      '<li><b>আইয়ামে বীজ:</b> প্রতি চান্দ্র মাসের ১৩, ১৪, ১৫ তারিখ।</li>' +
      '<li><b>আরাফার দিন:</b> ৯ জিলহজ (যারা হজে নেই)।</li>' +
      '<li><b>আশুরা:</b> ১০ মুহাররম, সাথে ৯ অথবা ১১ তারিখ।</li>' +
      '<li><b>শাওয়ালের ছয় রোজা:</b> ঈদুল ফিতরের পর শাওয়াল মাসে।</li>' +
      '<li><b>শাবান মাস:</b> রাসূলুল্লাহ (সা.) এই মাসে বেশি রোজা রাখতেন।</li></ul></div>' +
      '<div class="card"><h3>যেসব দিন রোজা রাখা নিষিদ্ধ</h3><ul style="margin:0;padding-left:20px"><li>ঈদুল ফিতর (১ শাওয়াল)</li><li>ঈদুল আযহা ও পরের তিন দিন (১০–১৩ জিলহজ)</li></ul></div>' +
      '<p class="small">তারিখগুলো হিসাব করা, চাঁদ দেখার ওপর এক দিন কম-বেশি হতে পারে। নফল রোজার জন্য মুখে নিয়ত জরুরি নয়, মনে সংকল্প যথেষ্ট।</p>';
  }

  /* ---------- নিয়ত ও দোয়া ---------- */
  function duaCard(title, ar, pr, mean, src) {
    return '<div class="card"><h3>' + title + '</h3><p class="rz-ar">' + ar + '</p><p class="rz-pr">' + pr + '</p><p><b>অর্থ:</b> ' + mean + '</p>' + (src ? '<p class="rz-src">' + src + '</p>' : '') + '</div>';
  }
  $('rz-dua').innerHTML =
    duaCard('সাহরীর পর রমযানের নিয়ত',
      'نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللهُ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
      'নাওয়াইতু আন আছুমা গাদাম মিন শাহরি রমাযানাল মুবারাকি ফারদ্বাল লাকা ইয়া আল্লাহু, ফাতাক্বাব্বাল মিন্নী ইন্নাকা আনতাস সামীউল আলীম।',
      'হে আল্লাহ! আগামীকাল পবিত্র রমযান মাসের ফরয রোজা তোমার জন্য রাখার নিয়ত করলাম। তুমি আমার পক্ষ থেকে কবুল করো, নিশ্চয়ই তুমি সর্বশ্রোতা ও সর্বজ্ঞ।', '') +
    duaCard('ইফতারের দোয়া',
      'اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
      'আল্লাহুম্মা লাকা সুমতু ওয়া আলা রিযক্বিকা আফতারতু।',
      'হে আল্লাহ! আমি তোমারই জন্য রোজা রেখেছি এবং তোমার দেওয়া রিযিক দিয়েই ইফতার করছি।', 'সূত্র: সুনানে আবু দাউদ') +
    duaCard('ইফতারের পরের দোয়া',
      'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
      'যাহাবায যামাউ ওয়াবতাল্লাতিল উরুকু ওয়া সাবাতাল আজরু ইনশাআল্লাহ।',
      'পিপাসা দূর হলো, শিরাগুলো সিক্ত হলো এবং আল্লাহ চাইলে প্রতিদান নিশ্চিত হলো।', 'সূত্র: সুনানে আবু দাউদ') +
    duaCard('লাইলাতুল কদরের দোয়া',
      'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
      'আল্লাহুম্মা ইন্নাকা আফুউউন তুহিব্বুল আফওয়া ফাফু আন্নী।',
      'হে আল্লাহ! তুমি ক্ষমাশীল, ক্ষমা করতে ভালোবাসো। অতএব আমাকে ক্ষমা করে দাও।', 'সূত্র: জামে তিরমিযী') +
    '<div class="card"><h3>নিয়ত সম্পর্কে জরুরি কথা</h3><ul style="margin:0;padding-left:20px">' +
      '<li>নিয়ত অন্তরের বিষয়। মনে সংকল্প করলেই হয়, মুখে বলা জরুরি নয়।</li>' +
      '<li>রমযানের রোজার নিয়ত রাতে করাই উত্তম। সাহরী খাওয়াও নিয়তের মধ্যে গণ্য।</li>' +
      '<li>কাযা ও মানতের রোজার নিয়ত সুবহে সাদিকের আগে, রাতেই করতে হয়।</li>' +
      '<li>নফল রোজার নিয়ত দুপুরের আগে করা যায়, যদি কিছু খাওয়া বা পান করা না হয়ে থাকে।</li></ul></div>';

  /* ---------- মাসআলা ---------- */
  function det(t, items) { return '<details><summary>' + t + '</summary><ul>' + items.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul></details>'; }
  $('rz-masala').innerHTML =
    det('যেসব কাজে রোজা ভেঙে যায়', [
      'ইচ্ছাকৃতভাবে পানাহার করলে বা ধূমপান করলে।',
      'ইচ্ছাকৃতভাবে স্ত্রী সহবাস করলে (কাযা ও কাফফারা দুটোই লাগে)।',
      'ইচ্ছাকৃতভাবে মুখ ভরে বমি করলে।',
      'সুবহে সাদিক হয়ে যাওয়ার পর খেলে, অথবা সূর্যাস্তের আগে ইফতার করে ফেললে।',
      'রোজা অবস্থায় হায়েয বা নিফাস শুরু হলে (সূর্যাস্তের এক মুহূর্ত আগে হলেও)।']) +
    det('যেসব কাজে রোজা ভাঙে না', [
      'ভুলে পানাহার করলে (মনে পড়ামাত্র থেমে যেতে হবে)।',
      'অনিচ্ছায় বমি হলে।',
      'স্বপ্নদোষ হলে।',
      'মিসওয়াক বা ব্রাশ করলে, যদি কিছু গলার ভেতরে না যায়।',
      'গোসল করলে বা কুলি করলে, যদি পানি গলায় না যায়।',
      'চোখে সুরমা বা তেল ব্যবহার করলে।']) +
    det('মাকরূহ কাজ', [
      'অকারণে কোনো কিছুর স্বাদ দেখা বা চিবানো।',
      'গীবত, মিথ্যা, ঝগড়া ও অশ্লীল কাজ। এতে রোজার সওয়াব কমে যায়।',
      'অতিরিক্ত গড়গড়া করা বা নাকে অতিরিক্ত পানি টানা।']) +
    det('যাদের রোজা না রাখার অনুমতি আছে', [
      '<b>অসুস্থ ব্যক্তি:</b> রোজা রাখলে অসুখ বাড়ার আশঙ্কা থাকলে। সুস্থ হলে কাযা করতে হবে।',
      '<b>মুসাফির:</b> শরীয়তসম্মত সফরে (প্রায় ৭৭ কিমি বা তার বেশি দূরত্বে)। পরে কাযা করতে হবে।',
      '<b>গর্ভবতী ও দুগ্ধদানকারী নারী:</b> নিজের বা শিশুর ক্ষতির আশঙ্কা হলে। পরে কাযা করতে হবে।',
      '<b>হায়েয ও নিফাসের নারী:</b> রোজা রাখা যাবে না, পরে কাযা করতে হবে।',
      '<b>অতিবৃদ্ধ বা স্থায়ী রোগী:</b> যারা রোজা রাখতে সক্ষম নন এবং সুস্থ হওয়ার আশা নেই, তারা ফিদিয়া দেবেন।']) +
    det('কাযা, কাফফারা ও ফিদিয়া', [
      '<b>কাযা:</b> ভাঙা রোজার বদলে একটি করে রোজা রাখা। রমযানের পর যেকোনো সময় রাখা যায়, তবে দ্রুত রাখা উত্তম।',
      '<b>কাফফারা:</b> ইচ্ছাকৃতভাবে রোজা ভাঙলে (পানাহার বা সহবাস) কাযার সাথে লাগে। একটানা ৬০টি রোজা, সম্ভব না হলে ৬০ জন মিসকীনকে দুই বেলা খাওয়ানো।',
      '<b>ফিদিয়া:</b> প্রতিটি রোজার বদলে একজন মিসকীনকে সদকাতুল ফিতরের সমপরিমাণ খাবার বা তার মূল্য দেওয়া।']) +
    '<div class="card"><p>ইনজেকশন, ইনহেলার, কানে বা নাকে ড্রপ, রক্তদানসহ আধুনিক চিকিৎসার কিছু বিষয়ে আলেমদের মতভেদ আছে। এসব ক্ষেত্রে মসজিদের ইমাম সাহেব বা নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নিন।</p></div>';

  /* ---------- ট্র্যাকার ও কাযা ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var trkKey = 'rzTrk';
  function trkGet() { var s = lsGet(trkKey) || ''; while (s.length < 30) s += '0'; return s.slice(0, 30); }
  function kazaGet() { var n = parseInt(lsGet('rzKaza'), 10); return isFinite(n) && n > 0 ? n : 0; }
  function renderTrack() {
    var R = ramadanStart(), hy = R && hOf(R.ms);
    trkKey = 'rzTrk' + (hy ? hy.y : '0');
    var s = trkGet(), n = 0, i, t0 = todayMs(), cells = '', tIdx = R ? Math.round((t0 - R.ms) / DAY) : -1;
    for (i = 0; i < 30; i++) {
      if (s.charAt(i) === '1') n++;
      cells += '<button type="button" class="rz-day' + (s.charAt(i) === '1' ? ' on' : '') + (i === tIdx ? ' td' : '') + '" data-i="' + i + '" aria-pressed="' + (s.charAt(i) === '1') + '">' + bn(i + 1) + '</button>';
    }
    $('rz-track').innerHTML =
      '<div class="card"><h3>রোজা ট্র্যাকার' + (hy ? ' · ' + bn(hy.y) + ' হিজরি' : '') + '</h3>' +
      '<div class="rz-lbl">যেদিন রোজা রাখলেন সেই দিনের ঘরে চাপ দিন।</div>' +
      '<div class="rz-trk">' + cells + '</div>' +
      '<div class="rz-big" style="margin-top:14px">' + bn(n) + ' / ' + bn(30) + '</div><div class="rz-lbl" style="text-align:center">রোজা রাখা হয়েছে</div>' +
      '<div class="rz-row"><button class="btn line" type="button" data-act="trkreset">ট্র্যাকার রিসেট</button></div></div>' +
      '<div class="card"><h3>কাযা রোজার হিসাব</h3><div class="rz-big">' + bn(kazaGet()) + '</div><div class="rz-lbl" style="text-align:center">কাযা রোজা বাকি আছে</div>' +
      '<div class="rz-row"><button class="btn" type="button" data-act="kplus">+১ কাযা যোগ</button><button class="btn line" type="button" data-act="kminus">−১ আদায় করলাম</button></div>' +
      '<p class="small" style="text-align:center">কাযার নিয়ত রাতেই (সুবহে সাদিকের আগে) করতে হয়।</p></div>' +
      '<p class="small">এই হিসাব শুধু আপনার এই ফোনের ব্রাউজারে সংরক্ষিত থাকে, অন্য কোথাও পাঠানো হয় না। ব্রাউজারের ডেটা মুছলে হিসাবও মুছে যাবে।</p>';
  }
  $('rz-track').addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b) return;
    var i = b.getAttribute('data-i'), a = b.getAttribute('data-act');
    if (i !== null) {
      var s = trkGet().split(''); s[+i] = s[+i] === '1' ? '0' : '1'; lsSet(trkKey, s.join(''));
    } else if (a === 'trkreset') {
      if (!window.confirm('ট্র্যাকারের সব হিসাব মুছে ফেলবেন?')) return;
      lsSet(trkKey, '');
    } else if (a === 'kplus') lsSet('rzKaza', String(kazaGet() + 1));
    else if (a === 'kminus') lsSet('rzKaza', String(Math.max(0, kazaGet() - 1)));
    else return;
    renderTrack();
  });

  /* ---------- ফিতরা ---------- */
  $('rz-fitra').innerHTML =
    '<div class="card"><h3>সদকাতুল ফিতরের হিসাব</h3>' +
      '<div class="rz-grid2">' +
        '<label class="rz-fl">সদস্য সংখ্যা<input class="rz-in" id="ftN" type="number" inputmode="numeric" min="1" value="1"></label>' +
        '<label class="rz-fl">খাদ্যের ধরন<select class="rz-in" id="ftT"><option value="1.633">গম বা আটা (১.৬৩৩ কেজি)</option><option value="3.266">যব (৩.২৬৬ কেজি)</option><option value="3.266">খেজুর (৩.২৬৬ কেজি)</option><option value="3.266">কিশমিশ (৩.২৬৬ কেজি)</option></select></label>' +
      '</div>' +
      '<label class="rz-fl" style="margin-top:12px">প্রতি কেজির বাজারদর (টাকা)<input class="rz-in" id="ftP" type="number" inputmode="decimal" min="0" placeholder="যেমন: ৫০"></label>' +
      '<div class="rz-big" id="ftR" style="margin-top:14px">—</div><div class="rz-lbl" id="ftS" style="text-align:center"></div>' +
    '</div>' +
    '<div class="card" id="ftCfg" hidden></div>' +
    '<div class="card"><ul style="margin:0;padding-left:20px">' +
      '<li>যার কাছে নিসাব পরিমাণ সম্পদ আছে, তার ওপর নিজের ও নাবালেগ সন্তানদের পক্ষ থেকে ফিতরা দেওয়া ওয়াজিব।</li>' +
      '<li>ঈদের নামাজের আগেই আদায় করা উত্তম।</li>' +
      '<li>সরকার বা ইসলামিক ফাউন্ডেশনের ঘোষিত হার থাকলে সেটাও দেখে নিন।</li></ul>' +
      '<div class="rz-row"><a class="btn" href="#paydonate">ফিতরা ও অনুদান দিন</a></div></div>';
  function ftCalc() {
    var n = parseFloat($('ftN').value), kg = parseFloat($('ftT').value), p = parseFloat($('ftP').value);
    if (!(n > 0) || !(p > 0)) { $('ftR').textContent = '—'; $('ftS').textContent = 'সদস্য সংখ্যা ও দর লিখুন'; return; }
    var each = Math.round(kg * p), tot = Math.round(n * kg * p);
    $('ftR').textContent = bn(tot.toLocaleString('en-IN')) + ' টাকা';
    $('ftS').textContent = 'জনপ্রতি প্রায় ' + bn(each.toLocaleString('en-IN')) + ' টাকা × ' + bn(n) + ' জন';
  }
  ['ftN', 'ftT', 'ftP'].forEach(function (id) { $(id).addEventListener('input', ftCalc); $(id).addEventListener('change', ftCalc); });
  ftCalc();

  /* ---------- মসজিদের ঘোষণা (roza.json থেকে) ---------- */
  function renderMosque() {
    var tw = cfg.tarawih || {}, ev = Array.isArray(cfg.iftar) ? cfg.iftar : [], ND = 'ঘোষণা হবে';
    var evHtml = ev.length ? ev.map(function (e) {
      return '<div class="rz-ev"><b>' + esc(pick(e && e.date, '')) + '</b>' + (pick(e && e.by, '') ? ' · ' + esc(e.by) : '') + (pick(e && e.note, '') ? '<div class="rz-lbl">' + esc(e.note) + '</div>' : '') + '</div>';
    }).join('') : '<p>' + ND + '</p>';
    $('rz-mosque').innerHTML =
      '<div class="card"><h3>তারাবীহ</h3><div class="rz-f" style="grid-template-columns:1fr">' +
        '<div><b>জামাতের সময়</b><span style="font-size:19px">' + esc(pick(tw.time, 'এশার জামাতের পর')) + '</span></div>' +
        '<div><b>হাফেজ সাহেব</b><span style="font-size:19px">' + esc(pick(tw.hafez, ND)) + '</span></div>' +
        '<div><b>খতম</b><span style="font-size:19px">' + esc(pick(tw.khatam, ND)) + '</span></div></div></div>' +
      '<div class="card"><h3>ইফতার মাহফিল</h3>' + evHtml + '</div>' +
      '<div class="card"><h3>শেষ দশক</h3><div class="rz-ev"><b>শবে কদর</b><div>' + esc(pick(cfg.shabeQadr, ND)) + '</div></div><div class="rz-ev"><b>ইতিকাফ</b><div>' + esc(pick(cfg.etikaf, ND)) + '</div></div></div>' +
      '<div class="rz-row"><a class="btn line" href="#notices">সব ঘোষণা দেখুন</a></div>';
    var fc = $('ftCfg'), fr = pick(cfg.fitraRate, '');
    if (fc) { fc.hidden = !fr; fc.innerHTML = fr ? '<b>ঘোষিত ফিতরার হার</b><div class="rz-big" style="font-size:28px">' + esc(fr) + '</div>' + (pick(cfg.fitraNote, '') ? '<div class="rz-lbl" style="text-align:center">' + esc(cfg.fitraNote) + '</div>' : '') : ''; }
  }

  function renderAll() { renderToday(); renderTable(); renderNafl(); renderTrack(); renderMosque(); }
  adjHooks.push(function () { renderAll(); });

  // roza.json থাকলে সেখান থেকে মসজিদের তথ্য নেওয়া (যেমন jumuah.json)
  try {
    fetch('roza.json?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('no file'); return r.json(); })
      .then(function (j) { if (j && typeof j === 'object') { cfg = j; renderAll(); } })
      .catch(function () {});
  } catch (e) {}

  renderAll();
  setTab('today');

  /* ---------- রাউটিং ---------- */
  window.addEventListener('hashchange', function () {
    if ((location.hash || '') !== '#qibla') stopCompass();
  });
  // পেজ লোডের সময় #qibla বা #calendar খোলা থাকলে আবার রাউট করা
  window.dispatchEvent(new Event('hashchange'));
})();
