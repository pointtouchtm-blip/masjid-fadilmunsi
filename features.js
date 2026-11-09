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
      '<div class="cal-head">' +
        '<button class="cal-nav" id="cPrev" type="button" aria-label="আগের মাস">‹</button>' +
        '<div class="cal-mid"><div class="cal-title" id="cTitle"></div><div class="cal-sub" id="cSub"></div></div>' +
        '<button class="cal-nav" id="cNext" type="button" aria-label="পরের মাস">›</button>' +
      '</div>' +
      '<div class="cal-grid" id="cGrid"></div>' +
      '<div class="cal-foot">' +
        '<button class="btn line" id="cToday" type="button">আজকের তারিখে যান</button>' +
        '<div id="cAdjBox"><div class="small" style="margin:0 0 6px !important;text-align:center">হিজরি তারিখ সমন্বয় (চাঁদ দেখা সাপেক্ষে)</div>' +
        '<div class="tchips" id="cAdj"></div></div>' +
      '</div>' +
    '</div>' +
    '<p class="small">বড় সংখ্যা ইংরেজি তারিখ, ছোট সংখ্যা হিজরি তারিখ। শুক্রবার সোনালি রঙে দেখানো। বাংলাদেশে চাঁদ দেখা অনুযায়ী হিজরি তারিখ এক দিন কম-বেশি হতে পারে, তাই ওপরে সমন্বয়ের বোতাম রাখা হয়েছে।</p>';

  var foot = document.querySelector('footer');
  var host = foot ? foot.parentNode : document.querySelector('.wrap');
  host.insertBefore(qSec, foot || null);
  host.insertBefore(cSec, foot || null);

  // "শীঘ্রই" ট্যাগ সরিয়ে কার্ড দুটো চালু করা
  ['#qibla', '#calendar'].forEach(function (h) {
    var a = document.querySelector('a.tile[href="' + h + '"]');
    if (!a) return;
    a.classList.remove('soon');
    var bd = a.querySelector('.bd'); if (bd) bd.parentNode.removeChild(bd);
  });

  /* ================= কিবলা ================= */
  var KAABA = { lat: 21.4225, lon: 39.8262 };
  var MOSQUE = { lat: 24.10, lon: 90.58 }; // মসজিদের আনুমানিক অবস্থান (কাপাসিয়া, গাজীপুর)
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

  var adj = 0;
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

  function renderCal() {
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

  function renderAdj() {
    var box = $('cAdj'); box.textContent = '';
    [[-1, '−১ দিন'], [0, 'ঠিক আছে'], [1, '+১ দিন']].forEach(function (o) {
      var c = document.createElement('button');
      c.type = 'button'; c.className = o[0] === adj ? 'chip on' : 'chip'; c.textContent = o[1];
      c.addEventListener('click', function () {
        adj = o[0];
        try { localStorage.setItem('hijriAdj', String(adj)); } catch (e) {}
        renderAdj(); renderCal();
      });
      box.appendChild(c);
    });
  }

  $('cPrev').addEventListener('click', function () { cm--; if (cm < 0) { cm = 11; cy--; } renderCal(); });
  $('cNext').addEventListener('click', function () { cm++; if (cm > 11) { cm = 0; cy++; } renderCal(); });
  $('cToday').addEventListener('click', function () { T = todayDhaka(); cy = T.y; cm = T.m; renderCal(); });
  renderAdj(); renderCal();

  /* ---------- রাউটিং ---------- */
  window.addEventListener('hashchange', function () {
    if ((location.hash || '') !== '#qibla') stopCompass();
  });
  // পেজ লোডের সময় #qibla বা #calendar খোলা থাকলে আবার রাউট করা
  window.dispatchEvent(new Event('hashchange'));
})();
