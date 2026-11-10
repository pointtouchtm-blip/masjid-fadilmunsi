/* শিক্ষা অংশের পেজগুলোর শেয়ার্ড হেল্পার */
(function () {
  var BN = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  var E = window.EDU = {};

  E.bn = function (n) { return String(n).replace(/\d/g, function (d) { return BN[d]; }); };
  E.toLatin = function (s) { return String(s).replace(/[০-৯]/g, function (d) { return '০১২৩৪৫৬৭৮৯'.indexOf(d); }); };

  E.h = function (tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined && txt !== null) e.textContent = txt;
    return e;
  };

  E.get = function (k, def) { try { var v = localStorage.getItem(k); return v === null ? def : v; } catch (e) { return def; } };
  E.set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  E.copy = function (text, btn) {
    var old = btn.textContent;
    function done(ok) { btn.textContent = ok ? 'কপি হয়েছে' : 'কপি করা গেল না'; setTimeout(function () { btn.textContent = old; }, 1800); }
    try { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); }); }
    catch (e) { done(false); }
  };

  E.copyBtn = function (text) {
    var b = E.h('button', 'cp', 'কপি করুন');
    b.type = 'button';
    b.addEventListener('click', function () { E.copy(text, b); });
    return b;
  };

  /* আরবি + উচ্চারণ + অর্থ + সূত্র দেখানোর কার্ড */
  E.arCard = function (it) {
    var c = E.h('article', 'card dc');
    if (it.t) c.appendChild(E.h('h3', '', it.t));
    if (it.n) c.appendChild(E.h('p', 'dn', it.n));
    if (it.a) { var a = E.h('p', 'ar', it.a); a.lang = 'ar'; a.dir = 'rtl'; c.appendChild(a); }
    if (it.r) { c.appendChild(E.h('div', 'lb', 'উচ্চারণ')); c.appendChild(E.h('p', 'tr', it.r)); }
    if (it.m) { c.appendChild(E.h('div', 'lb', 'অর্থ')); c.appendChild(E.h('p', 'mn', it.m)); }
    if (it.s) c.appendChild(E.h('p', 'rf', 'সূত্র: ' + it.s));
    if (it.a) c.appendChild(E.copyBtn([it.a, it.r || '', it.m || ''].filter(Boolean).join('\n\n')));
    return c;
  };

  /* চিপ বাটন সারি; cb(id) ডাকা হয় নির্বাচন বদলালে */
  E.chips = function (box, list, cb, startId) {
    box.textContent = '';
    var btns = {};
    function sel(id, fromClick) {
      for (var k in btns) btns[k].className = (k === id) ? 'chip on' : 'chip';
      if (fromClick) { try { btns[id].scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {} }
      cb(id);
    }
    list.forEach(function (it) {
      var b = E.h('button', 'chip', it.n);
      b.type = 'button';
      b.addEventListener('click', function () { sel(it.id, true); });
      box.appendChild(b);
      btns[it.id] = b;
    });
    sel(startId || list[0].id, false);
    return sel;
  };

  /* আরবি লেখার সাইজ বদলানো */
  var sizes = [22, 26, 30, 34], si = parseInt(E.get('edu_ar', '1'), 10);
  if (!(si >= 0 && si < sizes.length)) si = 1;
  function applySize() { document.documentElement.style.setProperty('--ar-size', sizes[si] + 'px'); }
  applySize();
  var fb = document.getElementById('fsBtn');
  if (fb) fb.addEventListener('click', function () { si = (si + 1) % sizes.length; E.set('edu_ar', String(si)); applySize(); });
})();
