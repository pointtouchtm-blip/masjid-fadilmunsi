/* কালেমা ও আল্লাহর ৯৯ নাম — index.html এর শেষে features.js এর পরে যোগ করুন:
   <script src="learn.js"></script> */
(function () {
  'use strict';
  var BN = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  function bn(n) { return String(n).replace(/\d/g, function (d) { return BN[d]; }); }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function copyText(t, btn) {
    function ok() { var o = btn.textContent; btn.textContent = 'কপি হয়েছে ✓'; setTimeout(function () { btn.textContent = o; }, 1500); }
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t).then(ok, function () {}); return; } } catch (e) {}
    try { var ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); ok(); } catch (e) {}
  }

  /* ================= তথ্য ================= */
  var KAL = [
    { t: 'প্রথম কালিমা: তাইয়্যিব', s: 'তাইয়্যিব',
      ar: 'لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ',
      pr: 'লা ইলাহা ইল্লাল্লাহু মুহাম্মাদুর রাসূলুল্লাহ।',
      mn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, মুহাম্মাদ (সা.) আল্লাহর রাসূল।' },
    { t: 'দ্বিতীয় কালিমা: শাহাদাত', s: 'শাহাদাত',
      ar: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      pr: 'আশহাদু আল লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহু।',
      mn: 'আমি সাক্ষ্য দিচ্ছি, আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরীক নেই। আমি আরও সাক্ষ্য দিচ্ছি, মুহাম্মাদ (সা.) তাঁর বান্দা ও রাসূল।' },
    { t: 'তৃতীয় কালিমা: তামজীদ', s: 'তামজীদ',
      ar: 'سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيمِ',
      pr: 'সুবহানাল্লাহি ওয়াল হামদু লিল্লাহি ওয়া লা ইলাহা ইল্লাল্লাহু ওয়াল্লাহু আকবার, ওয়া লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহিল আলিয়্যিল আযীম।',
      mn: 'আল্লাহ পবিত্র, সব প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোনো উপাস্য নেই, আল্লাহ সবচেয়ে বড়। মহান ও সুউচ্চ আল্লাহর সাহায্য ছাড়া কোনো উপায় ও শক্তি নেই।' },
    { t: 'চতুর্থ কালিমা: তাওহীদ', s: 'তাওহীদ',
      ar: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ أَبَدًا أَبَدًا ذُو الْجَلَالِ وَالْإِكْرَامِ بِيَدِهِ الْخَيْرُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      pr: 'লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, লাহুল মুলকু ওয়া লাহুল হামদু, ইউহয়ী ওয়া ইউমীতু ওয়া হুয়া হাইয়্যুল লা ইয়ামূতু আবাদান আবাদা, যুল জালালি ওয়াল ইকরাম, বিয়াদিহিল খাইর, ওয়া হুয়া আলা কুল্লি শাইয়িন কাদীর।',
      mn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরীক নেই। রাজত্ব ও প্রশংসা তাঁরই। তিনি জীবন দেন ও মৃত্যু দেন। তিনি চিরঞ্জীব, কখনো মরবেন না। তিনি মহিমা ও সম্মানের অধিকারী। সব কল্যাণ তাঁর হাতে এবং তিনি সবকিছুর ওপর ক্ষমতাবান।' },
    { t: 'পঞ্চম কালিমা: ইস্তিগফার', s: 'ইস্তিগফার',
      ar: 'أَسْتَغْفِرُ اللّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيمِ',
      pr: 'আস্তাগফিরুল্লাহা রাব্বী মিন কুল্লি যাম্বিন আযনাবতুহু আমাদান আও খাতাআন, সির্রান আও আলানিয়াতান, ওয়া আতূবু ইলাইহি মিনায যাম্বিল্লাযী আলামু, ওয়া মিনায যাম্বিল্লাযী লা আলামু, ইন্নাকা আনতা আল্লামুল গুয়ূবি ওয়া সাত্তারুল উয়ূবি ওয়া গাফফারুয যুনূবি, ওয়া লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহিল আলিয়্যিল আযীম।',
      mn: 'আমি আমার রব আল্লাহর কাছে ক্ষমা চাচ্ছি আমার সব গোনাহের জন্য, যা ইচ্ছায় বা ভুলে, গোপনে বা প্রকাশ্যে করেছি। আমি জানা ও না-জানা সব গোনাহ থেকে তাঁর কাছে তাওবা করছি। নিশ্চয়ই আপনি অদৃশ্যের জ্ঞানী, দোষ গোপনকারী ও গোনাহ ক্ষমাকারী। মহান ও সুউচ্চ আল্লাহর সাহায্য ছাড়া কোনো উপায় ও শক্তি নেই।' },
    { t: 'ষষ্ঠ কালিমা: রদ্দে কুফর', s: 'রদ্দে কুফর',
      ar: 'اللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكَذِبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا وَأَسْلَمْتُ وَأَقُولُ لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ',
      pr: 'আল্লাহুম্মা ইন্নী আঊযু বিকা মিন আন উশরিকা বিকা শাইআন ওয়া আনা আলামু বিহী, ওয়া আস্তাগফিরুকা লিমা লা আলামু বিহী, তুবতু আনহু ওয়া তাবাররাতু মিনাল কুফরি ওয়াশ শিরকি ওয়াল কাযিবি ওয়াল গীবাতি ওয়াল বিদআতি ওয়ান নামীমাতি ওয়াল ফাওয়াহিশি ওয়াল বুহতানি ওয়াল মাআসী কুল্লিহা, ওয়া আসলামতু ওয়া আকূলু লা ইলাহা ইল্লাল্লাহু মুহাম্মাদুর রাসূলুল্লাহ।',
      mn: 'হে আল্লাহ! জেনেশুনে আপনার সাথে কাউকে শরীক করা থেকে আমি আপনার আশ্রয় চাই, আর না-জেনে করে ফেললে ক্ষমা চাই। আমি তা থেকে তাওবা করলাম এবং কুফর, শিরক, মিথ্যা, গীবত, বিদআত, চোগলখুরি, অশ্লীলতা, অপবাদ ও সব গোনাহ থেকে নিজেকে মুক্ত করলাম। আমি ইসলাম গ্রহণ করলাম এবং বলছি, আল্লাহ ছাড়া কোনো উপাস্য নেই, মুহাম্মাদ (সা.) আল্লাহর রাসূল।' }
  ];

  var NM = [
    ['الرَّحْمَنُ', 'আর-রহমান', 'পরম দয়ালু'], ['الرَّحِيمُ', 'আর-রহীম', 'অতি করুণাময়'], ['الْمَلِكُ', 'আল-মালিক', 'সর্বময় অধিপতি'],
    ['الْقُدُّوسُ', 'আল-কুদ্দুস', 'অতি পবিত্র'], ['السَّلَامُ', 'আস-সালাম', 'শান্তিদাতা, সব ত্রুটি থেকে মুক্ত'], ['الْمُؤْمِنُ', 'আল-মুমিন', 'নিরাপত্তাদানকারী'],
    ['الْمُهَيْمِنُ', 'আল-মুহাইমিন', 'মহারক্ষক, তত্ত্বাবধায়ক'], ['الْعَزِيزُ', 'আল-আযীয', 'মহাপরাক্রমশালী'], ['الْجَبَّارُ', 'আল-জাব্বার', 'মহাপ্রতাপশালী, ভাঙা মন জোড়াদানকারী'],
    ['الْمُتَكَبِّرُ', 'আল-মুতাকাব্বির', 'শ্রেষ্ঠত্ব ও মহত্ত্বের অধিকারী'], ['الْخَالِقُ', 'আল-খালিক', 'সৃষ্টিকর্তা'], ['الْبَارِئُ', 'আল-বারী', 'অস্তিত্বদানকারী'],
    ['الْمُصَوِّرُ', 'আল-মুসাওয়ির', 'আকৃতিদানকারী'], ['الْغَفَّارُ', 'আল-গাফফার', 'অতি ক্ষমাশীল'], ['الْقَهَّارُ', 'আল-কাহহার', 'মহাপরাক্রান্ত, সবার ওপর বিজয়ী'],
    ['الْوَهَّابُ', 'আল-ওয়াহহাব', 'মহাদাতা'], ['الرَّزَّاقُ', 'আর-রাযযাক', 'রিযিকদাতা'], ['الْفَتَّاحُ', 'আল-ফাত্তাহ', 'দরজা উন্মোচনকারী, ফয়সালাকারী'],
    ['الْعَلِيمُ', 'আল-আলীম', 'সর্বজ্ঞ'], ['الْقَابِضُ', 'আল-কাবিয', 'সংকুচিতকারী'], ['الْبَاسِطُ', 'আল-বাসিত', 'প্রসারিতকারী'],
    ['الْخَافِضُ', 'আল-খাফিয', 'নিচুকারী'], ['الرَّافِعُ', 'আর-রাফি', 'উঁচুকারী'], ['الْمُعِزُّ', 'আল-মুইয্য', 'সম্মানদাতা'],
    ['الْمُذِلُّ', 'আল-মুযিল্ল', 'লাঞ্ছনাদাতা'], ['السَّمِيعُ', 'আস-সামী', 'সর্বশ্রোতা'], ['الْبَصِيرُ', 'আল-বাসীর', 'সর্বদ্রষ্টা'],
    ['الْحَكَمُ', 'আল-হাকাম', 'চূড়ান্ত বিচারক'], ['الْعَدْلُ', 'আল-আদল', 'ন্যায়পরায়ণ'], ['اللَّطِيفُ', 'আল-লাতীফ', 'সূক্ষ্মদর্শী, অতি দয়ালু'],
    ['الْخَبِيرُ', 'আল-খাবীর', 'সবকিছুর খবর রাখেন'], ['الْحَلِيمُ', 'আল-হালীম', 'সহনশীল'], ['الْعَظِيمُ', 'আল-আযীম', 'মহান'],
    ['الْغَفُورُ', 'আল-গাফুর', 'পরম ক্ষমাশীল'], ['الشَّكُورُ', 'আশ-শাকুর', 'গুণগ্রাহী, কদরদানকারী'], ['الْعَلِيُّ', 'আল-আলী', 'সুউচ্চ'],
    ['الْكَبِيرُ', 'আল-কাবীর', 'সর্ববৃহৎ'], ['الْحَفِيظُ', 'আল-হাফীয', 'মহান রক্ষক'], ['الْمُقِيتُ', 'আল-মুকীত', 'খাদ্য ও শক্তির যোগানদাতা'],
    ['الْحَسِيبُ', 'আল-হাসীব', 'হিসাবগ্রহণকারী, যথেষ্ট'], ['الْجَلِيلُ', 'আল-জালীল', 'মহিমাময়'], ['الْكَرِيمُ', 'আল-কারীম', 'মহাদানশীল, সম্মানিত'],
    ['الرَّقِيبُ', 'আর-রাকীব', 'সদা পর্যবেক্ষক'], ['الْمُجِيبُ', 'আল-মুজীব', 'ডাকে সাড়াদানকারী'], ['الْوَاسِعُ', 'আল-ওয়াসি', 'সর্বব্যাপী, প্রাচুর্যময়'],
    ['الْحَكِيمُ', 'আল-হাকীম', 'প্রজ্ঞাময়'], ['الْوَدُودُ', 'আল-ওয়াদূদ', 'অতি স্নেহময়, প্রেমময়'], ['الْمَجِيدُ', 'আল-মাজীদ', 'মহা গৌরবময়'],
    ['الْبَاعِثُ', 'আল-বায়িস', 'পুনরুত্থানকারী'], ['الشَّهِيدُ', 'আশ-শাহীদ', 'সর্বসাক্ষী'], ['الْحَقُّ', 'আল-হক্ব', 'চরম সত্য'],
    ['الْوَكِيلُ', 'আল-ওয়াকীল', 'নির্ভরযোগ্য কার্যনির্বাহী'], ['الْقَوِيُّ', 'আল-কাবিয়্যু', 'মহাশক্তিমান'], ['الْمَتِينُ', 'আল-মাতীন', 'অতি দৃঢ়'],
    ['الْوَلِيُّ', 'আল-ওয়ালী', 'অভিভাবক, বন্ধু'], ['الْحَمِيدُ', 'আল-হামীদ', 'প্রশংসিত'], ['الْمُحْصِي', 'আল-মুহসী', 'সবকিছুর হিসাব রাখেন'],
    ['الْمُبْدِئُ', 'আল-মুবদি', 'প্রথমবার সৃষ্টিকারী'], ['الْمُعِيدُ', 'আল-মুঈদ', 'পুনরায় সৃষ্টিকারী'], ['الْمُحْيِي', 'আল-মুহয়ী', 'জীবনদাতা'],
    ['الْمُمِيتُ', 'আল-মুমীত', 'মৃত্যুদাতা'], ['الْحَيُّ', 'আল-হাইয়্যু', 'চিরঞ্জীব'], ['الْقَيُّومُ', 'আল-কাইয়্যূম', 'চিরস্থায়ী, সবকিছুর ধারক'],
    ['الْوَاجِدُ', 'আল-ওয়াজিদ', 'সবকিছুর অধিকারী'], ['الْمَاجِدُ', 'আল-মাজিদ', 'মহিমান্বিত, মর্যাদাবান'], ['الْوَاحِدُ', 'আল-ওয়াহিদ', 'এক'],
    ['الْأَحَدُ', 'আল-আহাদ', 'একক, অদ্বিতীয়'], ['الصَّمَدُ', 'আস-সামাদ', 'অমুখাপেক্ষী, সবাই যাঁর মুখাপেক্ষী'], ['الْقَادِرُ', 'আল-কাদির', 'সর্বশক্তিমান'],
    ['الْمُقْتَدِرُ', 'আল-মুকতাদির', 'পূর্ণ ক্ষমতার অধিকারী'], ['الْمُقَدِّمُ', 'আল-মুকাদ্দিম', 'অগ্রবর্তীকারী'], ['الْمُؤَخِّرُ', 'আল-মুআখখির', 'পশ্চাদবর্তীকারী'],
    ['الْأَوَّلُ', 'আল-আউয়াল', 'সবার আগে, যাঁর শুরু নেই'], ['الْآخِرُ', 'আল-আখির', 'সবার শেষে, যাঁর শেষ নেই'], ['الظَّاهِرُ', 'আয-যাহির', 'প্রকাশ্য'],
    ['الْبَاطِنُ', 'আল-বাতিন', 'গোপন'], ['الْوَالِي', 'আল-ওয়ালী', 'শাসনকর্তা'], ['الْمُتَعَالِي', 'আল-মুতাআলী', 'সর্বোচ্চ মর্যাদাবান'],
    ['الْبَرُّ', 'আল-বার্র', 'পরম উপকারী'], ['التَّوَّابُ', 'আত-তাওয়াব', 'তাওবা কবুলকারী'], ['الْمُنْتَقِمُ', 'আল-মুনতাকিম', 'ন্যায়সংগত শাস্তিদাতা'],
    ['الْعَفُوُّ', 'আল-আফুউ', 'মার্জনাকারী'], ['الرَّءُوفُ', 'আর-রাউফ', 'অতি স্নেহশীল'], ['مَالِكُ الْمُلْكِ', 'মালিকুল মুলক', 'রাজত্বের মালিক'],
    ['ذُو الْجَلَالِ وَالْإِكْرَامِ', 'যুল জালালি ওয়াল ইকরাম', 'মহিমা ও সম্মানের অধিকারী'], ['الْمُقْسِطُ', 'আল-মুকসিত', 'ন্যায়বিচারক'], ['الْجَامِعُ', 'আল-জামি', 'একত্রকারী'],
    ['الْغَنِيُّ', 'আল-গানিয়্যু', 'অমুখাপেক্ষী, ঐশ্বর্যশালী'], ['الْمُغْنِي', 'আল-মুগনী', 'অভাবমুক্তকারী'], ['الْمَانِعُ', 'আল-মানি', 'বাধাদানকারী, রক্ষাকারী'],
    ['الضَّارُّ', 'আয-যার্র', 'ক্ষতির মালিক'], ['النَّافِعُ', 'আন-নাফি', 'উপকারের মালিক'], ['النُّورُ', 'আন-নূর', 'জ্যোতি, আলো'],
    ['الْهَادِي', 'আল-হাদী', 'পথপ্রদর্শক'], ['الْبَدِيعُ', 'আল-বাদী', 'অনুপম সৃষ্টিকারী'], ['الْبَاقِي', 'আল-বাকী', 'চিরস্থায়ী'],
    ['الْوَارِثُ', 'আল-ওয়ারিস', 'চূড়ান্ত উত্তরাধিকারী'], ['الرَّشِيدُ', 'আর-রাশীদ', 'সঠিক পথের দিশারী'], ['الصَّبُورُ', 'আস-সাবূর', 'অতি ধৈর্যশীল']
  ];

  /* ================= স্টাইল ================= */
  var css = [
    '.lr-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}',
    '.lr-pane[hidden]{display:none}',
    '.lr-pane>*+*{margin-top:14px}',
    '.lr-ar{font-family:"Amiri","Noto Naskh Arabic","Scheherazade New","Traditional Arabic",serif;direction:rtl;text-align:center;line-height:2;margin:6px 0 !important;color:var(--fg);font-size:26px}',
    '.lr-big .lr-ar{font-size:36px}',
    '.lr-pr{font-style:italic;color:var(--muted)}',
    '.lr-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}',
    '.lr-hd h3{margin:0 !important}',
    '.lr-mem{font:inherit;font-size:14px;cursor:pointer;border:1px solid var(--line);background:var(--surface);color:var(--muted);border-radius:999px;padding:3px 12px;flex:0 0 auto;white-space:nowrap}',
    '.lr-mem.on{background:var(--accent);color:var(--bg);border-color:var(--accent)}',
    '.lr-practice .lr-body:not(.shown){filter:blur(9px);cursor:pointer;user-select:none}',
    '.lr-hint{text-align:center;font-size:13px;color:var(--muted);display:none}',
    '.lr-practice .lr-body:not(.shown)+.lr-hint{display:block}',
    '.lr-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px}',
    '.lr-stat{text-align:center;color:var(--muted);font-size:15px}',
    '.lr-stat b{color:var(--accent);font-size:20px}',
    '.lr-in{font:inherit;width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--fg)}',
    '.lr-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}',
    '.lr-n{border:1px solid var(--line);border-radius:12px;background:var(--surface);padding:10px 8px 8px;text-align:center;min-width:0;display:flex;flex-direction:column;gap:2px}',
    '.lr-n.on{border-color:var(--accent);background:var(--hl)}',
    '.lr-n .no{font-size:12px;color:var(--muted);text-align:left}',
    '.lr-n .lr-ar{font-size:24px;line-height:1.7;margin:0 !important}',
    '.lr-n .p{font-weight:600;font-size:15px}',
    '.lr-n .m{font-size:13.5px;color:var(--muted);line-height:1.4}',
    '.lr-n button{margin-top:6px;font:inherit;font-size:13px;cursor:pointer;border:1px solid var(--line);background:transparent;color:var(--muted);border-radius:999px;padding:2px 0}',
    '.lr-n.on button{background:var(--accent);color:var(--bg);border-color:var(--accent)}',
    '.lr-today{text-align:center}',
    '.lr-q{text-align:center}',
    '.lr-q .lr-ar{font-size:30px}',
    '.lr-q .qm{font-size:20px;font-family:var(--font-display);line-height:1.5;margin:8px 0}',
    '.lr-opts{display:grid;gap:8px;margin-top:12px}',
    '.lr-opt{font:inherit;text-align:left;cursor:pointer;border:1px solid var(--line);background:var(--surface);color:var(--fg);border-radius:10px;padding:10px 14px}',
    '.lr-opt.ok{background:var(--accent);color:var(--bg);border-color:var(--accent)}',
    '.lr-opt.bad{border-color:#d2573b;color:#d2573b}',
    '.lr-flash{min-height:150px;display:grid;place-content:center;gap:6px;text-align:center;cursor:pointer}',
    '.lr-flash .lr-ar{font-size:40px}',
    '.lr-note{font-size:14.5px;color:var(--muted)}',
    '.lr-exp{margin-top:12px;font-size:15px;background:var(--hl);border:1px solid var(--line);border-radius:10px;padding:8px 12px;text-align:left}',
    '.lr-st{display:flex;gap:12px;align-items:flex-start;padding:9px 0;border-top:1px solid var(--line)}',
    '.lr-st:first-of-type{border-top:0}',
    '.lr-st .no{flex:0 0 28px;height:28px;border-radius:50%;background:var(--hl);color:var(--accent);display:grid;place-items:center;font-weight:600;font-size:14px}',
    '.lr-f2{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.lr-f2>div{border:1px solid var(--line);border-radius:12px;padding:12px 8px;text-align:center;background:var(--surface)}',
    '.lr-f2 b{display:block;font-size:13px;color:var(--muted);font-weight:600}',
    '.lr-f2 span{display:block;font-size:19px;font-weight:600}',
    '.lr-f2 small{display:block;font-size:12.5px;color:var(--muted)}',
    '.lr-no2{width:28px;height:28px;border-radius:50%;background:var(--hl);color:var(--accent);display:grid;place-items:center;font-weight:600;font-size:14px}',
    '.lr-cnt{font-size:14px;color:var(--accent);background:var(--hl);border:1px solid var(--line);border-radius:999px;padding:2px 12px}',
    '.lr-cnt.fj,.lr-cnt.iq{color:var(--gold)}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ================= ঘর ================= */
  var foot = document.querySelector('footer');
  var host = foot ? foot.parentNode : document.querySelector('.wrap');

  function mkSection(id, title, label, tabs) {
    var s = document.createElement('section');
    s.className = 'view'; s.id = id;
    s.innerHTML = '<div class="sec-head"><h2>' + title + '</h2><span class="label">' + label + '</span></div>' +
      '<div class="lr-tabs" id="' + id + 'Tabs"></div>' +
      tabs.map(function (t) { return '<div class="lr-pane" id="' + id + '-' + t[0] + '" hidden></div>'; }).join('');
    host.insertBefore(s, foot || null);
    var cur = tabs[0][0];
    function set(k) {
      cur = k;
      tabs.forEach(function (t) { $(id + '-' + t[0]).hidden = t[0] !== k; });
      Array.prototype.forEach.call($(id + 'Tabs').children, function (c) { c.className = c.getAttribute('data-k') === k ? 'chip on' : 'chip'; });
      if (s._onTab) s._onTab(k);
    }
    tabs.forEach(function (t) {
      var c = document.createElement('button');
      c.type = 'button'; c.className = 'chip'; c.setAttribute('data-k', t[0]); c.textContent = t[1];
      c.addEventListener('click', function () { set(t[0]); });
      $(id + 'Tabs').appendChild(c);
    });
    s._set = set;
    return s;
  }

  /* ---------- কুইজ (দুই জায়গার জন্যই) ---------- */
  function makeQuiz(el, gen) {
    var score = 0, total = 0, cur = null, done = false;
    function render() {
      cur = gen();
      done = false;
      el.innerHTML =
        '<div class="lr-stat">সঠিক <b>' + bn(score) + '</b> / ' + bn(total) + '</div>' +
        '<div class="card lr-q">' + cur.q + '<div class="lr-opts">' +
        cur.opts.map(function (o, i) { return '<button type="button" class="lr-opt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') +
        '</div><div class="lr-exp" hidden></div><div class="lr-row"><button type="button" class="btn" id="' + el.id + 'Nx" hidden>পরের প্রশ্ন</button></div></div>';
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      if (b.id === el.id + 'Nx') { render(); return; }
      if (!b.classList.contains('lr-opt') || done) return;
      done = true; total++;
      var i = +b.getAttribute('data-i');
      if (i === cur.ans) score++;
      var all = el.querySelectorAll('.lr-opt');
      Array.prototype.forEach.call(all, function (x, j) {
        if (j === cur.ans) x.classList.add('ok');
        else if (j === i) x.classList.add('bad');
      });
      el.querySelector('.lr-stat').innerHTML = 'সঠিক <b>' + bn(score) + '</b> / ' + bn(total);
      var ex = el.querySelector('.lr-exp');
      if (cur.exp && ex) { ex.textContent = (i === cur.ans ? 'সঠিক। ' : 'সঠিক উত্তর: ' + el.querySelectorAll('.lr-opt')[cur.ans].textContent + '। ') + cur.exp; ex.hidden = false; }
      el.querySelector('#' + el.id + 'Nx').hidden = false;
    });
    render();
  }

  /* ================= কালেমা ================= */
  var kSec = mkSection('kalema', 'ছয় কালিমা', 'Kalima', [['read', 'পড়া'], ['practice', 'মুখস্থ চর্চা'], ['quiz', 'কুইজ']]);
  var kMode = 'read', kBig = false;
  function kMem() { var s = lsGet('lrKal') || ''; while (s.length < 6) s += '0'; return s.slice(0, 6); }
  function kCards(practice) {
    var m = kMem(), n = 0;
    var html = KAL.map(function (k, i) {
      var on = m.charAt(i) === '1'; if (on) n++;
      return '<div class="card"><div class="lr-hd"><h3>' + esc(k.t) + '</h3><button type="button" class="lr-mem' + (on ? ' on' : '') + '" data-mem="' + i + '">' + (on ? 'মুখস্থ ✓' : 'মুখস্থ?') + '</button></div>' +
        '<div class="lr-body' + (practice ? '' : ' shown') + '" data-body><p class="lr-ar">' + k.ar + '</p><p class="lr-pr">' + esc(k.pr) + '</p><p><b>অর্থ:</b> ' + esc(k.mn) + '</p></div>' +
        (practice ? '<div class="lr-hint">দেখতে চাপ দিন</div>' : '') +
        '<div class="lr-row"><button type="button" class="btn line" data-copy="' + i + '">কপি করুন</button></div></div>';
    }).join('');
    return '<div class="lr-stat">মুখস্থ হয়েছে <b>' + bn(n) + '</b> / ' + bn(6) + '</div>' +
      '<div class="lr-row" style="margin-top:0"><button type="button" class="chip' + (kBig ? ' on' : '') + '" data-big>বড় হরফ</button></div>' + html;
  }
  function renderKal() {
    ['read', 'practice'].forEach(function (k) {
      var p = $('kalema-' + k);
      p.className = 'lr-pane' + (kBig ? ' lr-big' : '') + (k === 'practice' ? ' lr-practice' : '');
      p.innerHTML = kCards(k === 'practice') +
        (k === 'read' ? '<p class="small lr-note">ছয় কালিমার এই বিন্যাস প্রচলিত শিক্ষাপদ্ধতির। প্রথম কালিমা ও শাহাদাতের বাক্য কুরআন-হাদীসে আছে, বাকিগুলো আলেমদের সংকলিত দোয়া ও যিকির।</p>' : '<p class="small lr-note">লেখা ঝাপসা থাকবে। মনে মনে বলে কার্ডে চাপ দিয়ে মিলিয়ে নিন।</p>');
    });
  }
  function kalClick(e) {
    var b = e.target.closest ? e.target.closest('button') : null, body = e.target.closest ? e.target.closest('[data-body]') : null;
    if (body && !b) { body.classList.toggle('shown'); return; }
    if (!b) return;
    if (b.hasAttribute('data-big')) { kBig = !kBig; renderKal(); return; }
    var mi = b.getAttribute('data-mem'), ci = b.getAttribute('data-copy');
    if (mi !== null) {
      var s = kMem().split(''); s[+mi] = s[+mi] === '1' ? '0' : '1'; lsSet('lrKal', s.join(''));
      renderKal(); return;
    }
    if (ci !== null) { var k = KAL[+ci]; copyText(k.t + '\n' + k.ar + '\n' + k.pr + '\n' + k.mn, b); }
  }
  $('kalema-read').addEventListener('click', kalClick);
  $('kalema-practice').addEventListener('click', kalClick);
  renderKal();
  makeQuiz($('kalema-quiz'), function () {
    var i = Math.floor(Math.random() * KAL.length), others = shuffle(KAL.filter(function (_, j) { return j !== i; })).slice(0, 3);
    var opts = shuffle([KAL[i]].concat(others));
    return { q: '<div class="lr-lbl" style="color:var(--muted)">এটি কোন কালিমা?</div><p class="lr-ar">' + KAL[i].ar + '</p>', opts: opts.map(function (o) { return o.t; }), ans: opts.indexOf(KAL[i]) };
  });
  kSec._set('read');

  /* ================= আল্লাহর ৯৯ নাম ================= */
  var nSec = mkSection('names', 'আল্লাহর ৯৯ নাম', 'Asmaul Husna', [['list', 'তালিকা'], ['flash', 'ফ্ল্যাশকার্ড'], ['quiz', 'কুইজ']]);
  function nMem() { var s = lsGet('lrNm') || ''; while (s.length < 99) s += '0'; return s.slice(0, 99); }
  var nFilter = 'all', nQuery = '';
  function dayIdx() {
    try {
      var o = {};
      new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = +p.value; });
      return Math.floor(Date.UTC(o.year, o.month - 1, o.day) / 864e5);
    } catch (e) { return Math.floor(Date.now() / 864e5); }
  }
  function nCard(i, m) {
    var n = NM[i], on = m.charAt(i) === '1';
    return '<div class="lr-n' + (on ? ' on' : '') + '"><div class="no">' + bn(i + 1) + '</div><p class="lr-ar">' + n[0] + '</p><div class="p">' + esc(n[1]) + '</div><div class="m">' + esc(n[2]) + '</div><button type="button" data-mem="' + i + '">' + (on ? 'মুখস্থ ✓' : 'মুখস্থ?') + '</button></div>';
  }
  function nSearchKey(i) { return (NM[i][1] + ' ' + NM[i][2] + ' ' + (i + 1) + ' ' + bn(i + 1)).toLowerCase(); }
  function renderNames() {
    var m = nMem(), cnt = 0, i, t = dayIdx() % 99;
    for (i = 0; i < 99; i++) if (m.charAt(i) === '1') cnt++;
    var q = nQuery.trim().toLowerCase().replace(/[-\s]+/g, ''), cards = '';
    for (i = 0; i < 99; i++) {
      if (nFilter === 'done' && m.charAt(i) !== '1') continue;
      if (nFilter === 'todo' && m.charAt(i) === '1') continue;
      if (q && nSearchKey(i).replace(/[-\s]+/g, '').indexOf(q) < 0) continue;
      cards += nCard(i, m);
    }
    var keep = nQuery;
    $('names-list').innerHTML =
      '<div class="card"><p style="text-align:center;margin:0 0 6px">যে নামে আল্লাহকে ডাকা হয়, সেই সত্তাগত নাম:</p><p class="lr-ar" style="font-size:36px">اللّٰهُ</p><p style="text-align:center;margin:0"><b>আল্লাহ</b></p></div>' +
      '<div class="card lr-today"><div class="lr-note">আজকের নাম (' + bn(t + 1) + ' নম্বর)</div><p class="lr-ar" style="font-size:38px">' + NM[t][0] + '</p><div><b>' + esc(NM[t][1]) + '</b></div><div class="lr-note">' + esc(NM[t][2]) + '</div></div>' +
      '<p class="lr-note" style="text-align:center">রাসূলুল্লাহ (সা.) বলেছেন, আল্লাহর ৯৯টি নাম আছে। যে এগুলো সংরক্ষণ করবে (মুখস্থ, অর্থ বুঝে ও আমল করবে), সে জান্নাতে প্রবেশ করবে। <span style="white-space:nowrap">(বুখারী ও মুসলিম)</span></p>' +
      '<div class="lr-stat">মুখস্থ হয়েছে <b>' + bn(cnt) + '</b> / ' + bn(99) + '</div>' +
      '<input class="lr-in" id="nmQ" type="search" placeholder="নাম বা অর্থ খুঁজুন, যেমন: রহমান" value="' + esc(keep) + '">' +
      '<div class="lr-row" style="margin-top:0">' + [['all', 'সব'], ['done', 'মুখস্থ'], ['todo', 'বাকি']].map(function (f) { return '<button type="button" class="chip' + (nFilter === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      (cards ? '<div class="lr-grid">' + cards + '</div>' : '<div class="card"><p>কিছু পাওয়া যায়নি।</p></div>') +
      '<p class="small lr-note">নামগুলো তিরমিযীর বর্ণনার প্রচলিত তালিকা অনুযায়ী। কিছু তালিকায় ক্রম বা দু-একটি নাম আলাদা হতে পারে।</p>';
    var inp = $('nmQ');
    if (inp) inp.addEventListener('input', function () {
      nQuery = inp.value;
      var pos = inp.selectionStart;
      renderNames();
      var n2 = $('nmQ'); n2.focus(); try { n2.setSelectionRange(pos, pos); } catch (e) {}
    });
  }
  $('names-list').addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b) return;
    var mi = b.getAttribute('data-mem'), f = b.getAttribute('data-f');
    if (mi !== null) { var s = nMem().split(''); s[+mi] = s[+mi] === '1' ? '0' : '1'; lsSet('lrNm', s.join('')); renderNames(); }
    else if (f) { nFilter = f; renderNames(); }
  });
  renderNames();

  /* ফ্ল্যাশকার্ড */
  var fc = { i: 0, shown: false };
  function nextFlash() {
    var m = nMem(), pool = [], i;
    for (i = 0; i < 99; i++) if (m.charAt(i) !== '1') pool.push(i);
    if (!pool.length) for (i = 0; i < 99; i++) pool.push(i);
    fc.i = pool[Math.floor(Math.random() * pool.length)]; fc.shown = false;
    renderFlash(pool.length === 99 && m.indexOf('0') < 0);
  }
  function renderFlash(allDone) {
    var n = NM[fc.i];
    $('names-flash').innerHTML =
      (allDone ? '<p class="lr-note" style="text-align:center">মাশাআল্লাহ, সব নাম মুখস্থ! এখন সবগুলো থেকে দেখানো হচ্ছে।</p>' : '') +
      '<div class="card lr-flash" data-flip><div class="lr-note">' + bn(fc.i + 1) + ' নম্বর নাম</div><p class="lr-ar">' + n[0] + '</p>' +
      (fc.shown ? '<div><b>' + esc(n[1]) + '</b></div><div class="lr-note">' + esc(n[2]) + '</div>' : '<div class="lr-note">উচ্চারণ ও অর্থ মনে করে চাপ দিন</div>') + '</div>' +
      '<div class="lr-row"><button type="button" class="btn line" data-act="again">আবার দেখব</button><button type="button" class="btn" data-act="know">মনে ছিল (মুখস্থ ✓)</button></div>';
  }
  $('names-flash').addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b) { if (e.target.closest && e.target.closest('[data-flip]')) { fc.shown = !fc.shown; renderFlash(false); } return; }
    var a = b.getAttribute('data-act');
    if (a === 'know') { var s = nMem().split(''); s[fc.i] = '1'; lsSet('lrNm', s.join('')); renderNames(); nextFlash(); }
    else if (a === 'again') nextFlash();
  });
  nSec._onTab = function (k) { if (k === 'flash') nextFlash(); if (k === 'list') renderNames(); };

  /* কুইজ: ৫০% আরবি → অর্থ, ৫০% অর্থ → নাম */
  makeQuiz($('names-quiz'), function () {
    var i = Math.floor(Math.random() * 99), dir = Math.random() < 0.5 ? 0 : 1, pool = [], t = 0;
    var picked = [i];
    while (picked.length < 4 && t++ < 300) {
      var j = Math.floor(Math.random() * 99);
      if (picked.indexOf(j) < 0 && NM[j][2] !== NM[i][2] && NM[j][1] !== NM[i][1]) picked.push(j);
    }
    var order = shuffle(picked);
    if (dir === 0) return { q: '<div style="color:var(--muted)">এই নামের অর্থ কী?</div><p class="lr-ar">' + NM[i][0] + '</p>', opts: order.map(function (x) { return NM[x][2]; }), ans: order.indexOf(i) };
    return { q: '<div style="color:var(--muted)">এই অর্থের নামটি কোনটি?</div><p class="qm">' + esc(NM[i][2]) + '</p>', opts: order.map(function (x) { return NM[x][1]; }), ans: order.indexOf(i) };
  });
  nSec._set('list');

  /* ================= সাধারণ সাজসজ্জা ================= */
  function card(title, body) { return '<div class="card">' + (title ? '<h3>' + title + '</h3>' : '') + body + '</div>'; }
  function ul(items) { return '<ul style="margin:0;padding-left:20px">' + items.map(function (s) { return '<li style="margin-bottom:4px">' + s + '</li>'; }).join('') + '</ul>'; }
  function steps(title, list) {
    return card(title, list.map(function (s, i) { return '<div class="lr-st"><span class="no">' + bn(i + 1) + '</span><div>' + s + '</div></div>'; }).join(''));
  }
  function dua(title, ar, pr, mn, src) {
    return card(title, '<p class="lr-ar">' + ar + '</p><p class="lr-pr">' + pr + '</p><p><b>অর্থ:</b> ' + mn + '</p>' + (src ? '<p class="lr-note">সূত্র: ' + src + '</p>' : ''));
  }
  function note(t) { return '<p class="small lr-note">' + t + '</p>'; }
  function bankQuiz(el, bank) {
    var last = -1;
    makeQuiz(el, function () {
      var i;
      do { i = Math.floor(Math.random() * bank.length); } while (i === last && bank.length > 1);
      last = i;
      var b = bank[i], idx = b.opts.map(function (_, k) { return k; }), order = b.shuf === false ? idx : shuffle(idx);
      return { q: '<p class="qm">' + esc(b.q) + '</p>', opts: order.map(function (k) { return b.opts[k]; }), ans: order.indexOf(b.ans), exp: b.exp };
    });
  }
  function yn(text, breaks, exp) { return { q: text, opts: ['অযু ভাঙে', 'অযু ভাঙে না'], ans: breaks ? 0 : 1, exp: exp, shuf: false }; }
  var MAZ = 'এই অংশের মাসআলা হানাফী মাযহাব অনুযায়ী লেখা। কোনো বিষয়ে সন্দেহ থাকলে মসজিদের ইমাম সাহেব বা নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নিন।';

  /* ================= পবিত্রতা ================= */
  var pSec = mkSection('pobitrota', 'পবিত্রতা', 'Taharat', [['wudu', 'অযু'], ['ghusl', 'গোসল'], ['tayam', 'তায়াম্মুম'], ['masah', 'মোজার মাসেহ'], ['toilet', 'টয়লেট ও ইস্তিঞ্জা'], ['najasa', 'নাপাকি'], ['quiz', 'কুইজ']]);

  $('pobitrota-wudu').innerHTML =
    steps('অযুর পদ্ধতি (ধাপে ধাপে)', [
      '<b>নিয়ত ও বিসমিল্লাহ:</b> মনে মনে অযুর নিয়ত করে "বিসমিল্লাহ" বলুন।',
      '<b>দুই হাত কবজি পর্যন্ত</b> তিনবার ধুয়ে নিন (আঙুলের ফাঁকও)।',
      '<b>মিসওয়াক</b> করুন। মিসওয়াক না থাকলে আঙুল দিয়ে দাঁত ঘষুন।',
      '<b>তিনবার কুলি</b> করুন।',
      '<b>তিনবার নাকে পানি</b> দিয়ে নাক পরিষ্কার করুন।',
      '<b>মুখমণ্ডল</b> তিনবার ধুয়ে নিন (কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত, এক কানের লতি থেকে অন্য কানের লতি পর্যন্ত)। দাড়ি থাকলে খিলাল করুন।',
      '<b>ডান হাত, তারপর বাম হাত</b> কনুইসহ তিনবার করে ধুয়ে নিন।',
      '<b>মাথা মাসেহ</b> করুন (ভেজা হাতে একবার)। তারপর দুই কান মাসেহ করুন।',
      '<b>ডান পা, তারপর বাম পা</b> টাখনুসহ তিনবার করে ধুয়ে নিন। হাতের আঙুল দিয়ে পায়ের আঙুলের ফাঁক খিলাল করুন।',
      'অযুর শেষে নিচের দোয়াগুলো পড়ুন।']) +
    card('অযুর ফরয (৪টি)', ul(['মুখমণ্ডল একবার ধোয়া।', 'দুই হাত কনুইসহ একবার ধোয়া।', 'মাথার এক-চতুর্থাংশ মাসেহ করা।', 'দুই পা টাখনুসহ একবার ধোয়া।']) + '<p class="lr-note">এই চারটির একটিও বাদ গেলে অযু হবে না। (সূরা মায়িদা: ৬)</p>') +
    card('অযুর সুন্নত', ul(['নিয়ত করা ও বিসমিল্লাহ বলা।', 'দুই হাত কবজি পর্যন্ত ধোয়া।', 'মিসওয়াক করা।', 'কুলি করা ও নাকে পানি দেওয়া।', 'প্রতিটি অঙ্গ তিনবার ধোয়া।', 'হাত-পায়ের আঙুল ও দাড়ি খিলাল করা।', 'পুরো মাথা ও দুই কান মাসেহ করা।', 'ডান দিক থেকে শুরু করা।', 'অঙ্গগুলো ধারাবাহিকভাবে এবং বিরতি না দিয়ে ধোয়া।'])) +
    dua('অযুর শেষের দোয়া (১)', 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      'আশহাদু আন লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহু।',
      'আমি সাক্ষ্য দিচ্ছি, আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরীক নেই। আমি আরও সাক্ষ্য দিচ্ছি, মুহাম্মাদ (সা.) তাঁর বান্দা ও রাসূল।', 'সহীহ মুসলিম') +
    dua('অযুর শেষের দোয়া (২)', 'اللّٰهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
      'আল্লাহুম্মাজআলনী মিনাত তাওয়াবীনা ওয়াজআলনী মিনাল মুতাতাহহিরীন।',
      'হে আল্লাহ! আমাকে তাওবাকারীদের অন্তর্ভুক্ত করুন এবং পবিত্রতা অর্জনকারীদের অন্তর্ভুক্ত করুন।', 'জামে তিরমিযী') +
    card('যেসব কাজে অযু ভেঙে যায়', ul(['পেশাব, পায়খানা, বায়ু, মযী বা ওদী বের হলে।', 'শরীরের কোথাও থেকে রক্ত বা পুঁজ বের হয়ে গড়িয়ে পড়লে।', 'মুখ ভরে বমি হলে।', 'শুয়ে বা হেলান দিয়ে ঘুমিয়ে পড়লে।', 'অজ্ঞান, পাগল বা মাতাল হয়ে গেলে।', 'রুকু-সিজদাওয়ালা নামাজে উচ্চস্বরে হাসলে।'])) +
    card('যেসব কাজে অযু ভাঙে না (হানাফী মত)', ul(['স্ত্রীকে স্পর্শ করলে বা নিজের লজ্জাস্থান স্পর্শ করলে।', 'সামান্য রক্ত বের হয়ে গড়িয়ে না পড়লে।', 'মুখ ভরে নয় এমন বমি হলে।', 'বসে বসে সামান্য ঝিমুলে।', 'খাবার খেলে, নখ বা চুল কাটলে।'])) +
    card('মিসওয়াকের গুরুত্ব', '<p>রাসূলুল্লাহ (সা.) বলেছেন, মিসওয়াক মুখ পরিষ্কারকারী ও রবের সন্তুষ্টির কারণ। (সুনানে নাসাঈ)</p><p>অযুর সময়, নামাজের আগে, কুরআন তিলাওয়াতের আগে ও ঘুম থেকে উঠে মিসওয়াক করা সুন্নত।</p>') +
    note(MAZ);

  $('pobitrota-ghusl').innerHTML =
    card('কখন গোসল ফরয হয়', ul(['স্বপ্নদোষ বা অন্য কোনোভাবে কামভাবসহ বীর্যপাত হলে।', 'স্বামী-স্ত্রীর সহবাস হলে (বীর্যপাত না হলেও)।', 'নারীর হায়েয (মাসিক) শেষ হলে।', 'নারীর নিফাস (সন্তান প্রসবের পরের রক্তস্রাব) শেষ হলে।'])) +
    card('গোসলের ফরয (৩টি)', ul(['কুলি করা (মুখের ভেতরের সব জায়গায় পানি পৌঁছানো)।', 'নাকে পানি দেওয়া (নাকের নরম অংশ পর্যন্ত)।', 'পুরো শরীরে পানি পৌঁছানো (চুলের গোড়া ও নাভিসহ)।']) + '<p class="lr-note">এর কোনো একটি বাদ গেলে গোসল হবে না।</p>') +
    steps('সুন্নত পদ্ধতিতে গোসল', [
      'মনে মনে গোসলের নিয়ত করুন।',
      'দুই হাত কবজি পর্যন্ত ধুয়ে নিন।',
      'লজ্জাস্থান ও শরীরের অন্য নাপাকির জায়গা ধুয়ে নিন।',
      'নামাজের অযুর মতো পূর্ণ অযু করুন। (যেখানে পানি জমে থাকে, সেখানে পা ধোয়া শেষে করতে পারেন।)',
      'মাথায় তিনবার পানি ঢালুন এবং চুলের গোড়া ভিজিয়ে নিন।',
      'ডান কাঁধে তিনবার, তারপর বাম কাঁধে তিনবার পানি ঢেলে পুরো শরীর ভিজিয়ে নিন।',
      'শরীরের কোনো জায়গা শুকনো থেকে গেল কি না দেখে নিন। নাভি, কানের ভাঁজ ও আঙুলের ফাঁকের দিকে খেয়াল রাখুন।']) +
    card('গোসল ফরয অবস্থায় যা করা যাবে না', ul(['নামাজ পড়া ও সিজদা করা।', 'কুরআন স্পর্শ করা ও তিলাওয়াত করা।', 'মসজিদে প্রবেশ করা।'])) +
    card('সুন্নত ও মুস্তাহাব গোসল', ul(['জুমুআর দিনে।', 'দুই ঈদের দিনে।', 'ইহরাম বাঁধার সময় ও আরাফার দিনে।'])) +
    note(MAZ);

  $('pobitrota-tayam').innerHTML =
    card('কখন তায়াম্মুম করা যায়', ul(['পানি না পেলে (আশপাশে প্রায় এক মাইল বা ১.৬ কিমির মধ্যে)।', 'অসুখের কারণে পানি ব্যবহারে অসুখ বাড়ার বা সারতে দেরি হওয়ার আশঙ্কা থাকলে।', 'প্রচণ্ড ঠান্ডায় গোসল বা অযু করলে ক্ষতির আশঙ্কা থাকলে এবং পানি গরম করার সুযোগ না থাকলে।', 'পানির কাছে গেলে শত্রু বা হিংস্র প্রাণীর ভয় থাকলে।'])) +
    card('তায়াম্মুমের ফরয (৩টি)', ul(['নিয়ত করা।', 'পাক মাটি বা মাটিজাত জিনিসে হাত মেরে পুরো মুখমণ্ডল মাসেহ করা।', 'আবার হাত মেরে কনুইসহ দুই হাত মাসেহ করা।'])) +
    steps('তায়াম্মুমের পদ্ধতি', [
      'তায়াম্মুমের নিয়ত করে "বিসমিল্লাহ" বলুন।',
      'দুই হাতের তালু পাক মাটি, পাথর, দেয়াল বা ইটের মতো মাটিজাত জিনিসে একবার মারুন।',
      'হাতের মাটি ঝেড়ে নিয়ে পুরো মুখমণ্ডল মাসেহ করুন।',
      'আবার দুই হাত মাটিজাত জিনিসে মেরে ঝেড়ে নিন।',
      'প্রথমে ডান হাত, তারপর বাম হাত কনুইসহ মাসেহ করুন। আঙুলের ফাঁক খিলাল করুন।']) +
    card('কীসে তায়াম্মুম ভাঙে', ul(['অযু বা গোসল ভাঙার সব কারণে।', 'পানি পাওয়া গেলে বা অসুখ ভালো হয়ে পানি ব্যবহারের সুযোগ হলে।'])) +
    note('অসুখের কারণে তায়াম্মুম করার আগে বিশ্বস্ত ডাক্তারের পরামর্শ নিন। ' + MAZ);

  $('pobitrota-masah').innerHTML =
    card('মোজার ওপর মাসেহের শর্ত', ul(['পূর্ণ অযু করে মোজা পরা।', 'মোজা দুই পায়ের টাখনুসহ ঢেকে রাখা।', 'চামড়ার মোজা, অথবা এমন পুরু ও মজবুত মোজা যা পরে হেঁটে চলা যায় এবং পানি সহজে ভেতরে ঢোকে না।']) + '<p class="lr-note">সাধারণ পাতলা সুতির মোজার ওপর মাসেহ জায়েয নয় (হানাফী মত)।</p>') +
    card('মাসেহের মেয়াদ', '<div class="lr-f2"><div><b>মুকীম</b><span>১ দিন ১ রাত</span><small>(২৪ ঘণ্টা)</small></div><div><b>মুসাফির</b><span>৩ দিন ৩ রাত</span><small>(৭২ ঘণ্টা)</small></div></div><p class="lr-note" style="margin-top:10px">মোজা পরার পর প্রথমবার অযু ভাঙার সময় থেকে মেয়াদ গণনা শুরু হয়।</p>') +
    steps('মাসেহের পদ্ধতি', ['হাত ভিজিয়ে নিন।', 'হাতের তিন আঙুল দিয়ে মোজার ওপরের দিকে পায়ের আঙুলের মাথা থেকে গোড়ালির দিকে একবার টেনে মাসেহ করুন।', 'ডান ও বাম দুই পায়ে মাসেহ করুন।']) +
    card('কীসে মাসেহ ভাঙে', ul(['অযু ভাঙার সব কারণে।', 'মেয়াদ শেষ হলে।', 'মোজা খুলে ফেললে (একটি খুললেও)।', 'গোসল ফরয হলে।'])) +
    note(MAZ);

  $('pobitrota-toilet').innerHTML =
    dua('টয়লেটে ঢোকার দোয়া', 'بِسْمِ اللّٰهِ اللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
      'বিসমিল্লাহ, আল্লাহুম্মা ইন্নী আঊযু বিকা মিনাল খুবুসি ওয়াল খাবাইস।',
      'আল্লাহর নামে শুরু করছি। হে আল্লাহ! আমি সব পুরুষ ও নারী শয়তান থেকে আপনার আশ্রয় চাই।', 'সহীহ বুখারী ও সহীহ মুসলিম। টয়লেটে ঢোকার আগে বা খোলা জায়গায় কাপড় খোলার আগে পড়তে হয়।') +
    dua('টয়লেট থেকে বের হওয়ার দোয়া', 'غُفْرَانَكَ', 'গুফরানাকা।', 'হে আল্লাহ! আমি আপনার ক্ষমা চাই।', 'সুনানে আবু দাউদ ও জামে তিরমিযী') +
    card('টয়লেটের আদব', ul(['ঢোকার সময় বাম পা আগে, বের হওয়ার সময় ডান পা আগে দেওয়া।', 'কিবলার দিকে মুখ বা পিঠ করে না বসা।', 'অপ্রয়োজনে কথা না বলা এবং পর্দা রক্ষা করা।', 'পানি, টিস্যু বা ঢিলা দিয়ে পরিষ্কার করা এবং ডান হাত ব্যবহার না করা।', 'হাড়, গোবর বা খাদ্যদ্রব্য দিয়ে ইস্তিঞ্জা না করা।', 'পরিষ্কার হওয়ার পর সাবান বা মাটি দিয়ে হাত ভালো করে ধোয়া।', 'পানির কল, রাস্তা বা ছায়াযুক্ত স্থানে প্রস্রাব-পায়খানা না করা।', 'প্রস্রাবের ছিটা থেকে শরীর ও কাপড় বাঁচিয়ে রাখা।'])) +
    note(MAZ);

  $('pobitrota-najasa').innerHTML =
    card('নাপাকি দুই প্রকার', '<p><b>১. গলীজ (ঘন নাপাকি):</b> মানুষের পেশাব-পায়খানা, প্রবাহিত রক্ত, বীর্য, মদ, হারাম পশুর পেশাব ও গোবর, মুরগির বিষ্ঠা।</p><p><b>২. খফীফ (হালকা নাপাকি):</b> হালাল পশুর (গরু, ছাগল) পেশাব, হারাম পাখির বিষ্ঠা।</p>') +
    card('কতটুকু নাপাকি মাফ (মোটামুটি হিসাব)', ul(['<b>ঘন নাপাকি:</b> তরল হলে হাতের তালুর গর্তের সমান পর্যন্ত, আর ঘন বা শুকনো হলে প্রায় সাড়ে চার গ্রাম পর্যন্ত নামাজ হয়ে যায়। এর বেশি লাগলে ধুয়ে পাক করা ফরয।', '<b>হালকা নাপাকি:</b> কাপড় বা শরীরের যে অঙ্গে লেগেছে তার চার ভাগের এক ভাগের কম হলে নামাজ হয়।', 'মাফ হলেও ধুয়ে নেওয়াই উত্তম।'])) +
    card('পাক করার নিয়ম', ul(['<b>চোখে দেখা যায় এমন নাপাকি</b> (পায়খানা, রক্ত): নাপাকির চিহ্ন দূর না হওয়া পর্যন্ত ধুতে হবে। রং বা গন্ধ সামান্য থেকে গেলে ক্ষতি নেই।', '<b>না-দেখা নাপাকি</b> (পেশাব): পানি ঢেলে তিনবার ধুতে হবে এবং প্রতিবার নিংড়াতে হবে।', '<b>বহমান পানিতে</b> কাপড় ধুলে বা কলের পানি ঢালতে থাকলে সহজে পাক হয়।', '<b>মাটি বা মেঝে:</b> নাপাকি শুকিয়ে দাগ ও গন্ধ চলে গেলে পাক হয়। পানি ঢেলে ধুলেও পাক হয়।'])) +
    note(MAZ);

  var P_BANK = [
    yn('প্রস্রাব বা পায়খানা করলে', true, 'পেশাব-পায়খানার রাস্তা দিয়ে যা-ই বের হোক, অযু ভেঙে যায়।'),
    yn('বায়ু ত্যাগ করলে', true, 'বায়ু বের হলে অযু ভেঙে যায়।'),
    yn('শুয়ে বা হেলান দিয়ে ঘুমিয়ে পড়লে', true, 'এমন ঘুমে শরীরের বাঁধন শিথিল হয়ে যায়, তাই অযু ভাঙে।'),
    yn('শরীর থেকে রক্ত বের হয়ে গড়িয়ে পড়লে', true, 'রক্ত গড়িয়ে পড়লে অযু ভাঙে (হানাফী মত)।'),
    yn('মুখ ভরে বমি হলে', true, 'মুখ ভরে বমি হলে অযু ভাঙে।'),
    yn('রুকু-সিজদাওয়ালা নামাজে উচ্চস্বরে হাসলে', true, 'এতে নামাজ ও অযু দুটোই ভেঙে যায়।'),
    yn('স্ত্রীকে স্পর্শ করলে (হানাফী মত)', false, 'হানাফী মতে শুধু স্পর্শে অযু ভাঙে না।'),
    yn('নিজের লজ্জাস্থান স্পর্শ করলে (হানাফী মত)', false, 'হানাফী মতে এতে অযু ভাঙে না।'),
    yn('সামান্য রক্ত বের হলো কিন্তু গড়িয়ে পড়েনি', false, 'রক্ত গড়িয়ে না পড়লে অযু ভাঙে না।'),
    yn('বসে বসে সামান্য ঝিমুলে', false, 'হালকা ঝিমুনিতে অযু ভাঙে না। গভীর ঘুম বা শুয়ে ঘুমালে ভাঙে।'),
    yn('নখ বা চুল কাটলে', false, 'নখ বা চুল কাটলে অযু ভাঙে না।'),
    yn('মুখ ভরে নয়, এমন সামান্য বমি হলে', false, 'মুখ ভরে না হলে অযু ভাঙে না।'),
    { q: 'অযুর ফরয কয়টি?', opts: ['৩টি', '৪টি', '৫টি', '৭টি'], ans: 1, exp: 'মুখ ধোয়া, দুই হাত কনুইসহ ধোয়া, মাথার এক-চতুর্থাংশ মাসেহ, দুই পা টাখনুসহ ধোয়া।' },
    { q: 'গোসলের ফরয কয়টি?', opts: ['২টি', '৩টি', '৪টি', '৫টি'], ans: 1, exp: 'কুলি করা, নাকে পানি দেওয়া ও পুরো শরীরে পানি পৌঁছানো।' },
    { q: 'তায়াম্মুমের ফরয কয়টি?', opts: ['২টি', '৩টি', '৪টি', '৫টি'], ans: 1, exp: 'নিয়ত, মুখ মাসেহ ও কনুইসহ দুই হাত মাসেহ।' },
    { q: 'নিচের কোনটি অযুর ফরয নয়?', opts: ['কুলি করা', 'মুখ ধোয়া', 'পা ধোয়া', 'হাত ধোয়া'], ans: 0, exp: 'কুলি করা অযুর সুন্নত। গোসলে এটি ফরয।' },
    { q: 'কখন গোসল ফরয হয়?', opts: ['বীর্যপাত হলে', 'নখ কাটলে', 'খাবার খেলে', 'হাঁটাহাঁটি করলে'], ans: 0, exp: 'বীর্যপাত, সহবাস, হায়েয ও নিফাস শেষ হলে গোসল ফরয হয়।' },
    { q: 'মুকীমের জন্য মোজার ওপর মাসেহের মেয়াদ কত?', opts: ['১ দিন ১ রাত', '৩ দিন ৩ রাত', '৭ দিন', 'কোনো মেয়াদ নেই'], ans: 0, exp: 'মুকীম ১ দিন ১ রাত, মুসাফির ৩ দিন ৩ রাত।' },
    { q: 'মুসাফিরের জন্য মোজার ওপর মাসেহের মেয়াদ কত?', opts: ['১ দিন ১ রাত', '৩ দিন ৩ রাত', '৭ দিন', 'কোনো মেয়াদ নেই'], ans: 1, exp: 'মুসাফির ৩ দিন ৩ রাত, মুকীম ১ দিন ১ রাত।' },
    { q: 'টয়লেটে ঢোকার সময় কোন পা আগে দিতে হয়?', opts: ['ডান পা', 'বাম পা'], ans: 1, exp: 'টয়লেটে ঢোকার সময় বাম পা, বের হওয়ার সময় ডান পা আগে দেওয়া সুন্নত।', shuf: false },
    { q: 'টয়লেট থেকে বের হওয়ার দোয়া কোনটি?', opts: ['গুফরানাকা', 'বিসমিল্লাহ', 'সুবহানাল্লাহ', 'আলহামদুলিল্লাহ'], ans: 0, exp: '"গুফরানাকা" অর্থ, হে আল্লাহ! আমি আপনার ক্ষমা চাই।' }
  ];
  bankQuiz($('pobitrota-quiz'), P_BANK);
  pSec._set('wudu');

  /* ================= আযান ও ইকামত ================= */
  var aSec = mkSection('azan', 'আযান ও ইকামত', 'Azan & Iqamah', [['azan', 'আযান'], ['iqama', 'ইকামত'], ['practice', 'মুখস্থ চর্চা'], ['reply', 'জবাব ও দোয়া'], ['adab', 'আদব ও ফযীলত'], ['quiz', 'কুইজ']]);

  var L_TAK4 = { ar: 'اللّٰهُ أَكْبَرُ اللّٰهُ أَكْبَرُ اللّٰهُ أَكْبَرُ اللّٰهُ أَكْبَرُ', pr: 'আল্লাহু আকবার, আল্লাহু আকবার, আল্লাহু আকবার, আল্লাহু আকবার।', mn: 'আল্লাহ সবচেয়ে বড়।', c: '৪ বার' };
  var L_SH1 = { ar: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ', pr: 'আশহাদু আন লা ইলাহা ইল্লাল্লাহ।', mn: 'আমি সাক্ষ্য দিচ্ছি, আল্লাহ ছাড়া কোনো উপাস্য নেই।', c: '২ বার' };
  var L_SH2 = { ar: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللّٰهِ', pr: 'আশহাদু আন্না মুহাম্মাদার রাসূলুল্লাহ।', mn: 'আমি সাক্ষ্য দিচ্ছি, মুহাম্মাদ (সা.) আল্লাহর রাসূল।', c: '২ বার' };
  var L_HS = { ar: 'حَيَّ عَلَى الصَّلَاةِ', pr: 'হাইয়্যা আলাস সালাহ।', mn: 'নামাজের দিকে এসো।', c: '২ বার (ডান দিকে মুখ ঘুরিয়ে)' };
  var L_HF = { ar: 'حَيَّ عَلَى الْفَلَاحِ', pr: 'হাইয়্যা আলাল ফালাহ।', mn: 'সফলতার দিকে এসো।', c: '২ বার (বাম দিকে মুখ ঘুরিয়ে)' };
  var L_FJ = { ar: 'الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ', pr: 'আস-সালাতু খাইরুম মিনান নাউম।', mn: 'নামাজ ঘুমের চেয়ে উত্তম।', c: '২ বার', fajr: true };
  var L_QD = { ar: 'قَدْ قَامَتِ الصَّلَاةُ', pr: 'কদ কামাতিস সালাহ।', mn: 'নামাজ শুরু হচ্ছে।', c: '২ বার', iq: true };
  var L_TAK2 = { ar: 'اللّٰهُ أَكْبَرُ اللّٰهُ أَكْبَرُ', pr: 'আল্লাহু আকবার, আল্লাহু আকবার।', mn: 'আল্লাহ সবচেয়ে বড়।', c: '২ বার' };
  var L_TH = { ar: 'لَا إِلٰهَ إِلَّا اللّٰهُ', pr: 'লা ইলাহা ইল্লাল্লাহ।', mn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই।', c: '১ বার' };
  var AZ = [L_TAK4, L_SH1, L_SH2, L_HS, L_HF, L_FJ, L_TAK2, L_TH];
  var IQ = [L_TAK4, L_SH1, L_SH2, L_HS, L_HF, L_QD, L_TAK2, L_TH];
  function lineCards(list, practice) {
    return list.map(function (l, i) {
      return '<div class="card"><div class="lr-hd"><span class="lr-no2">' + bn(i + 1) + '</span><span class="lr-cnt' + (l.fajr ? ' fj' : (l.iq ? ' iq' : '')) + '">' + esc(l.c) + (l.fajr ? ' · শুধু ফজরে' : '') + (l.iq ? ' · শুধু ইকামতে' : '') + '</span></div>' +
        '<div class="lr-body' + (practice ? '' : ' shown') + '" data-body><p class="lr-ar">' + l.ar + '</p><p class="lr-pr">' + esc(l.pr) + '</p><p><b>অর্থ:</b> ' + esc(l.mn) + '</p></div>' + (practice ? '<div class="lr-hint">দেখতে চাপ দিন</div>' : '') + '</div>';
    }).join('');
  }
  $('azan-azan').innerHTML =
    '<div class="lr-f2"><div><b>বাক্য সংখ্যা</b><span>১৫টি</span><small>ফজরে ১৭টি</small></div><div><b>ধরন</b><span>ধীরে, উঁচু স্বরে</span><small>বাক্যের মাঝে বিরতি</small></div></div>' +
    lineCards(AZ, false) + note('আযানের বাক্য সংখ্যা ও পদ্ধতি নিয়ে মাযহাবে সামান্য মতভেদ আছে। এখানে হানাফী মত অনুযায়ী দেওয়া হয়েছে।');
  $('azan-iqama').innerHTML =
    '<div class="lr-f2"><div><b>বাক্য সংখ্যা</b><span>১৭টি</span><small>"কদ কামাতিস সালাহ" সহ</small></div><div><b>ধরন</b><span>দ্রুত, নিচু স্বরে</span><small>বাক্যের মাঝে বিরতি ছাড়া</small></div></div>' +
    lineCards(IQ, false) +
    card('আযান ও ইকামতের পার্থক্য', ul(['ইকামতে হাইয়্যা আলাল ফালাহর পর "কদ কামাতিস সালাহ" ২ বার বলা হয়, আযানে নয়।', 'ফজরের আযানে "আস-সালাতু খাইরুম মিনান নাউম" বলা হয়, ইকামতে বলা হয় না।', 'আযান ধীরে ও উঁচু স্বরে, ইকামত দ্রুত ও তুলনামূলক নিচু স্বরে বলা হয়।', 'ইকামত বলা হয় জামাত শুরুর ঠিক আগে।']));
  $('azan-practice').innerHTML = '<p class="lr-note" style="text-align:center">আগে আযান, তারপর ইকামত। লেখা ঝাপসা থাকবে। মনে মনে বলে কার্ডে চাপ দিয়ে মিলিয়ে নিন।</p><h3 style="margin:6px 0 0">আযান</h3>' + lineCards(AZ, true) + '<h3 style="margin:18px 0 0">ইকামত</h3>' + lineCards(IQ, true);
  $('azan-practice').className = 'lr-pane lr-practice';
  $('azan-practice').addEventListener('click', function (e) {
    var body = e.target.closest ? e.target.closest('[data-body]') : null;
    if (body) body.classList.toggle('shown');
  });
  $('azan-reply').innerHTML =
    card('আযানের জবাব দেওয়ার নিয়ম', ul(['মুয়াজ্জিন যা বলবেন, শ্রোতাও আস্তে আস্তে তা-ই বলবেন। (সহীহ বুখারী ও মুসলিম)', '"হাইয়্যা আলাস সালাহ" ও "হাইয়্যা আলাল ফালাহ"-এর জবাবে বলবেন: <b>লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ।</b> (সহীহ মুসলিম)', 'ইকামতের জবাবও আযানের মতোই দিতে হয়।', 'আযান শেষ হলে নবী (সা.)-এর ওপর দরূদ পড়ে নিচের দোয়াটি পড়বেন।'])) +
    dua('লা হাওলা', 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ', 'লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ।', 'আল্লাহর সাহায্য ছাড়া কোনো উপায় ও শক্তি নেই।', 'সহীহ মুসলিম') +
    dua('আযানের পরের দোয়া', 'اللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
      'আল্লাহুম্মা রাব্বা হাযিহিদ দাওয়াতিত তাম্মাহ, ওয়াস সালাতিল কাইমাহ, আতি মুহাম্মাদানিল ওয়াসীলাতা ওয়াল ফাযীলাহ, ওয়াবআসহু মাকামাম মাহমূদানিল্লাযী ওয়াআদতাহ।',
      'হে আল্লাহ! এই পরিপূর্ণ আহ্বান ও প্রতিষ্ঠিত নামাজের মালিক! মুহাম্মাদ (সা.)-কে ওসীলা ও মর্যাদা দান করুন এবং তাঁকে সেই প্রশংসিত স্থানে পৌঁছান, যার প্রতিশ্রুতি আপনি দিয়েছেন।', 'সহীহ বুখারী') +
    card('আযান ও ইকামতের মাঝের দোয়া', '<p>রাসূলুল্লাহ (সা.) বলেছেন, আযান ও ইকামতের মাঝের দোয়া ফিরিয়ে দেওয়া হয় না। তাই এই সময়ে নিজের জন্য, পরিবারের জন্য ও সবার জন্য দোয়া করুন। (সুনানে আবু দাউদ ও জামে তিরমিযী)</p>') +
    note(MAZ);
  $('azan-adab').innerHTML =
    card('আযান দেওয়ার আদব', ul(['ওয়াক্ত হওয়ার পর আযান দেওয়া। ফজরের আযান সুবহে সাদিকের পর।', 'পবিত্র অবস্থায়, কিবলামুখী হয়ে, দাঁড়িয়ে আযান দেওয়া।', 'উঁচু স্বরে ও সুন্দর কণ্ঠে, বাক্যের মাঝে থেমে থেমে বলা।', 'দুই কানে আঙুল রাখা।', '"হাইয়্যা আলাস সালাহ"-তে ডানে ও "হাইয়্যা আলাল ফালাহ"-তে বামে শুধু মুখ ঘোরানো, বুক বা শরীর নয়।', 'জামাতে নামাজের জন্য আযান ও ইকামত সুন্নতে মুয়াক্কাদা।'])) +
    card('আযান শোনার আদব', ul(['কথা, তিলাওয়াত ও অন্য কাজ থামিয়ে মন দিয়ে শোনা।', 'মুয়াজ্জিনের জবাব দেওয়া ও আযানের পরের দোয়া পড়া।', 'আযানের পর দ্রুত নামাজের প্রস্তুতি নেওয়া ও মসজিদে যাওয়া।'])) +
    card('আযান ও মুয়াজ্জিনের ফযীলত', ul(['রাসূলুল্লাহ (সা.) বলেছেন, মুয়াজ্জিনের আওয়াজ জিন, মানুষ ও যে-ই শুনবে, কিয়ামতের দিন সবাই তার পক্ষে সাক্ষ্য দেবে। (সহীহ বুখারী)', 'কিয়ামতের দিন মুয়াজ্জিনদের ঘাড় সবচেয়ে উঁচু হবে। (সহীহ মুসলিম)', 'মানুষ যদি আযানের সওয়াব জানত, তাহলে এর জন্য লটারি করত। (সহীহ বুখারী ও মুসলিম)', 'আযান শুনলে শয়তান পালিয়ে যায়। (সহীহ বুখারী ও মুসলিম)'])) +
    note(MAZ);
  var A_BANK = [
    { q: 'আযানে মোট কয়টি বাক্য (হানাফী মত)?', opts: ['১৩টি', '১৫টি', '১৭টি', '১৯টি'], ans: 1, exp: 'আযান ১৫ বাক্য। ফজরের আযানে "আস-সালাতু খাইরুম মিনান নাউম" ২ বার যোগ হয়ে ১৭ বাক্য হয়।' },
    { q: 'ইকামতে মোট কয়টি বাক্য (হানাফী মত)?', opts: ['১১টি', '১৫টি', '১৭টি', '১৯টি'], ans: 2, exp: 'আযানের ১৫ বাক্যের সাথে "কদ কামাতিস সালাহ" ২ বার যোগ হয়ে ইকামত ১৭ বাক্য।' },
    { q: 'শুধু ফজরের আযানে কোন বাক্য বাড়তি বলা হয়?', opts: ['আস-সালাতু খাইরুম মিনান নাউম', 'কদ কামাতিস সালাহ', 'লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ', 'আল্লাহু আকবার'], ans: 0, exp: 'অর্থ, নামাজ ঘুমের চেয়ে উত্তম। এটি হাইয়্যা আলাল ফালাহর পর ২ বার বলা হয়।' },
    { q: 'ইকামতে আযানের চেয়ে বাড়তি কোন বাক্য বলা হয়?', opts: ['কদ কামাতিস সালাহ', 'আস-সালাতু খাইরুম মিনান নাউম', 'সুবহানাল্লাহ', 'আলহামদুলিল্লাহ'], ans: 0, exp: '"কদ কামাতিস সালাহ" অর্থ, নামাজ শুরু হচ্ছে। এটি ২ বার বলা হয়।' },
    { q: '"হাইয়্যা আলাস সালাহ"-এর জবাবে শ্রোতা কী বলবেন?', opts: ['লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ', 'সুবহানাল্লাহ', 'আলহামদুলিল্লাহ', 'আমীন'], ans: 0, exp: 'এই দুই বাক্যের জবাবে "লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ" বলতে হয়।' },
    { q: 'আযান শুনলে শ্রোতা সাধারণভাবে কী করবেন?', opts: ['মুয়াজ্জিনের মতো আস্তে আস্তে বলবেন', 'চুপ থাকবেন', 'নিজের কাজ চালিয়ে যাবেন', 'শুধু দরূদ পড়বেন'], ans: 0, exp: 'মুয়াজ্জিন যা বলেন, শ্রোতাও তা-ই বলবেন।' },
    { q: 'আযানের পরে কোন দোয়া পড়া হয়?', opts: ['ওসীলার দোয়া (আল্লাহুম্মা রাব্বা হাযিহিদ দাওয়াতিত তাম্মাহ…)', 'ইফতারের দোয়া', 'অযুর দোয়া', 'টয়লেটের দোয়া'], ans: 0, exp: 'আযানের পর দরূদ পড়ে এই ওসীলার দোয়া পড়তে হয়।' },
    { q: '"হাইয়্যা আলাস সালাহ" বলার সময় মুয়াজ্জিন কোন দিকে মুখ ঘোরান?', opts: ['ডান দিকে', 'বাম দিকে'], ans: 0, exp: 'হাইয়্যা আলাস সালাহ-তে ডানে ও হাইয়্যা আলাল ফালাহ-তে বামে মুখ ঘোরান, বুক নয়।', shuf: false },
    { q: 'কোন সময়ের দোয়া ফিরিয়ে দেওয়া হয় না?', opts: ['আযান ও ইকামতের মাঝের সময়', 'আযানের ঠিক আগে', 'নামাজের পরে শুধু', 'কোনো নির্দিষ্ট সময় নেই'], ans: 0, exp: 'আযান ও ইকামতের মাঝের দোয়া ফিরিয়ে দেওয়া হয় না। (আবু দাউদ ও তিরমিযী)' },
    { q: '"আল্লাহু আকবার" আযানের শুরুতে কয়বার বলা হয় (হানাফী মত)?', opts: ['২ বার', '৩ বার', '৪ বার', '১ বার'], ans: 2, exp: 'আযান ও ইকামতের শুরুতে "আল্লাহু আকবার" ৪ বার বলা হয়।' }
  ];
  bankQuiz($('azan-quiz'), A_BANK);
  aSec._set('azan');

  /* ---------- টাইল থেকে "শীঘ্রই" সরানো ও রাউটিং ---------- */
  ['#kalema', '#names', '#pobitrota', '#azan'].forEach(function (h) {
    var a = document.querySelector('a.tile[href="' + h + '"]');
    if (!a) return;
    a.classList.remove('soon');
    var bd = a.querySelector('.bd'); if (bd) bd.parentNode.removeChild(bd);
  });
  window.dispatchEvent(new Event('hashchange'));
})();
