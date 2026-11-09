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
    '.lr-note{font-size:14.5px;color:var(--muted)}'
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
        '</div><div class="lr-row"><button type="button" class="btn" id="' + el.id + 'Nx" hidden>পরের প্রশ্ন</button></div></div>';
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

  /* ---------- টাইল থেকে "শীঘ্রই" সরানো ও রাউটিং ---------- */
  ['#kalema', '#names'].forEach(function (h) {
    var a = document.querySelector('a.tile[href="' + h + '"]');
    if (!a) return;
    a.classList.remove('soon');
    var bd = a.querySelector('.bd'); if (bd) bd.parentNode.removeChild(bd);
  });
  window.dispatchEvent(new Event('hashchange'));
})();
