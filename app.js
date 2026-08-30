/* ============================================================
   التقويم الاحترافي — app.js
   تحويل أم القرى، التاريخ الحالي، العمر، الفارق، الرواتب
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     تقويم أم القرى — تحويل دقيق
     المرجع: الجدول الرسمي لأم القرى (1356هـ – 1500هـ)
     ========================================================== */

  /* ==========================================================
     التعدد اللغوي (عربي / English)
     ========================================================== */

  const LANG_STORAGE = 'calendar-lang';
  let curLang = 'ar';

  // قواميس النصوص (الواجهة الثابتة + الرسائل الديناميكية)
  const I18N = {
    ar: {
      pageTitle: 'التقويم الاحترافي — هجري وميلادي',
      metaDesc: 'صفحة التواريخ والتقويم الاحترافية — التاريخ الهجري والميلادي، تحويل التواريخ (أم القرى)، حساب العمر، فارق التواريخ، ومواعيد الرواتب من المصادر الرسمية۔',
      brandName: 'التقويم الاحترافي',
      brandTag: 'هجري · ميلادي · أم القرى',
      nightMode: 'الوضع الليلي',
      dayMode: 'الوضع النهاري',
      langToggleTitle: 'English',
      salaryTitle: 'مواعيد نزول الرواتب',
      salaryNote: 'دعم / رواتب ومساعدات — المواعيد أدناه هي القاعدة الرسمية العامة لكل جهة۔',
      salaryHead: '⚡ مواعيد الرواتب',
      hijri: 'هجري',
      gregorian: 'ميلادي',
      thEntity: 'الجهة',
      thDay: 'اليوم',
      thDate: 'تاريخ الصرف',
      thRemaining: 'متبقي',
      toolsTitle: 'أدوات التواريخ',
      tabConvert: 'تحويل تاريخ',
      tabAge: 'حساب عمر',
      tabAddDays: 'حساب أيام',
      tabDiff: 'حساب فترة',
      fldDay: 'اليوم',
      fldMonth: 'الشهر',
      fldYear: 'السنة',
      btnConvert: 'تحويل',
      resultTitle: 'نتيجة التحويل',
      btnCalcAge: 'حساب العمر',
      unitYear: 'سنة',
      unitMonth: 'شهر',
      unitDay: 'يوم',
      diffCalLabel: 'نوع التقويم للتاريخين',
      diffDate1: 'التاريخ الأول (من)',
      diffDate2: 'التاريخ الثاني (إلى)',
      btnCalcDiff: 'حساب الفرق',
      unitWeek: 'أسبوع',
      fldOperation: 'العملية',
      opAdd: 'إضافة (بعد)',
      opSub: 'خصم (قبل)',
      fldDayCount: 'عدد الأيام',
      btnCalc: 'حساب',
      resultLabel: 'النتيجة',
      monthsTitle: 'أشهر السنة',
      gregorianDate: 'التاريخ الميلادي',
      hijriDate: 'التاريخ الهجري',
      bannerHint: '✨ الشهر المميّز أدناه هو شهر اليوم الحالي',
      hijriMonths: '🌙 الأشهر الهجرية',
      gregorianMonths: '☀️ الأشهر الميلادية',
      footerText: 'التقويم الاحترافي — تحويل دقيق وفق تقويم أم القرى · جميع التواريخ لأغراض إرشادية',
      hijriAbbr: 'هـ',
      gregorianAbbr: 'م',
      monthDays2930: '29 أو 30 يوم',
      monthDays2829: '28 أو 29 يوم',
      monthDaysUnit: 'يوم',
      notifHijriOutOfRange: 'السنة الهجرية خارج نطاق أم القرى ({min} – {max})',
      notifHijriInvalidDay: 'اليوم غير صحيح لهذا الشهر الهجري (الأيام: {n})',
      notifGregInvalid: 'تاريخ ميلادي غير صحيح.',
      notifOutOfRange: 'التاريخ خارج نطاق تقويم أم القرى المدعوم.',
      notifBirthInvalid: 'تاريخ ميلاد غير صحيح.',
      notifBirthFuture: 'تاريخ الميلاد في المستقبل!',
      notifHijriOutOfRangeShort: 'السنة الهجرية خارج النطاق المدعوم',
      notifHijriInvalidDayShort: 'يوم غير صحيح للشهر الهجري (الأيام: {n})',
      notifResultOutOfRange: 'النتيجة خارج نطاق تقويم أم القرى المدعوم.',
      notifFirst: 'التاريخ الأول: ',
      notifSecond: 'التاريخ الثاني: ',
      resultConversionFrom: 'التحويل من {from} إلى {to}',
      resultWeekday: 'اليوم المقابل: {day}',
      ageTotal: 'العمر الكلي: {d} يوم — حوالي {h} ساعة',
      diffTotalDays: 'إجمالي الفرق: {d} يوم = {w} أسبوع',
      afterDays: 'بعد {n} يوم: {day}',
      beforeDays: 'قبل {n} يوم: {day}',
      countdown: '{d} يوم {h} ساعة {m} دقيقة',
      sSalaryCivil: 'الرواتب المدنية',
      sSalarySocial: 'الضمان الاجتماعي المطوّر',
      sSalaryRehab: 'التأهيل الشامل',
      sSalaryCitizen: 'حساب المواطن',
      sSalaryHousing: 'الدعم السكني',
      sSalaryPension: 'راتب التقاعد',
      sSalaryInsurance: 'التأمينات الاجتماعية'
    },
    en: {
      pageTitle: 'Professional Calendar — Hijri & Gregorian',
      metaDesc: 'An advanced Hijri & Gregorian date tool — Umm al-Qura conversion, age calculation, date differences, and official salary payment dates.',
      brandName: 'Professional Calendar',
      brandTag: 'Hijri · Gregorian · Umm al-Qura',
      nightMode: 'Dark mode',
      dayMode: 'Light mode',
      langToggleTitle: 'العربية',
      salaryTitle: 'Salary Payment Dates',
      salaryNote: 'Support / salaries and allowances — the dates below are the general official rule for each entity.',
      salaryHead: '⚡ Salary Dates',
      hijri: 'Hijri',
      gregorian: 'Gregorian',
      thEntity: 'Entity',
      thDay: 'Day',
      thDate: 'Payment Date',
      thRemaining: 'Remaining',
      toolsTitle: 'Date Tools',
      tabConvert: 'Convert Date',
      tabAge: 'Age',
      tabAddDays: 'Add Days',
      tabDiff: 'Date Difference',
      fldDay: 'Day',
      fldMonth: 'Month',
      fldYear: 'Year',
      btnConvert: 'Convert',
      resultTitle: 'Conversion Result',
      btnCalcAge: 'Calculate Age',
      unitYear: 'Years',
      unitMonth: 'Months',
      unitDay: 'Days',
      diffCalLabel: 'Calendar type for both dates',
      diffDate1: 'First date (from)',
      diffDate2: 'Second date (to)',
      btnCalcDiff: 'Calculate Difference',
      unitWeek: 'Weeks',
      fldOperation: 'Operation',
      opAdd: 'Add (after)',
      opSub: 'Subtract (before)',
      fldDayCount: 'Number of Days',
      btnCalc: 'Calculate',
      resultLabel: 'Result',
      monthsTitle: 'Months of the Year',
      gregorianDate: 'Gregorian Date',
      hijriDate: 'Hijri Date',
      bannerHint: '✨ The highlighted month below is the current month',
      hijriMonths: '🌙 Hijri Months',
      gregorianMonths: '☀️ Gregorian Months',
      footerText: 'Professional Calendar — accurate conversion using the Umm al-Qura calendar · All dates are for informational purposes',
      hijriAbbr: 'AH',
      gregorianAbbr: 'AD',
      monthDays2930: '29 or 30 days',
      monthDays2829: '28 or 29 days',
      monthDaysUnit: 'days',
      notifHijriOutOfRange: 'The Hijri year is outside the Umm al-Qura range ({min} – {max})',
      notifHijriInvalidDay: 'Invalid day for this Hijri month (days: {n})',
      notifGregInvalid: 'Invalid Gregorian date.',
      notifOutOfRange: 'The date is outside the supported Umm al-Qura range.',
      notifBirthInvalid: 'Invalid birth date.',
      notifBirthFuture: 'The birth date is in the future!',
      notifHijriOutOfRangeShort: 'The Hijri year is outside the supported range',
      notifHijriInvalidDayShort: 'Invalid day for the Hijri month (days: {n})',
      notifResultOutOfRange: 'The result is outside the supported Umm al-Qura range.',
      notifFirst: 'First date: ',
      notifSecond: 'Second date: ',
      resultConversionFrom: 'Convert from {from} to {to}',
      resultWeekday: 'Corresponding day: {day}',
      ageTotal: 'Total age: {d} days — about {h} hours',
      diffTotalDays: 'Total difference: {d} days = {w} weeks',
      afterDays: 'After {n} days: {day}',
      beforeDays: 'Before {n} days: {day}',
      countdown: '{d}d {h}h {m}m',
      sSalaryCivil: "Civil Servants' Salaries",
      sSalarySocial: 'Social Security (Developed)',
      sSalaryRehab: 'Comprehensive Rehabilitation',
      sSalaryCitizen: 'Citizen Account',
      sSalaryHousing: 'Housing Support',
      sSalaryPension: 'Pension',
      sSalaryInsurance: 'Social Insurance'
    }
  };

  // أسماء الأشهر وأيام الأسبوع حسب اللغة
  const LANG_DATA = {
    ar: {
      hijri: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
      gregorian: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      weekdays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    },
    en: {
      hijri: ['Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani", 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'],
      gregorian: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  };

  // المصفوفات الحالية — تُستبدل عند تغيير اللغة
  let HIJRI_MONTHS = LANG_DATA.ar.hijri.slice();
  let GREGORIAN_MONTHS = LANG_DATA.ar.gregorian.slice();
  let WEEKDAYS = LANG_DATA.ar.weekdays.slice();

  // جلب نص مترجم
  function t(key) {
    const d = I18N[curLang];
    return (d && key in d) ? d[key] : (I18N.ar[key] || key);
  }

  // تنسيق نص مترجم مع استبدال {key}
  function fmt(key, params) {
    let s = t(key);
    if (params) {
      Object.keys(params).forEach((k) => {
        s = s.split('{' + k + '}').join(params[k]);
      });
    }
    return s;
  }

  // تطبيق مصفوفات اللغة على المتغيرات الحالية
  function applyLanguageData() {
    const d = LANG_DATA[curLang];
    HIJRI_MONTHS = d.hijri.slice();
    GREGORIAN_MONTHS = d.gregorian.slice();
    WEEKDAYS = d.weekdays.slice();
  }

  // بداية تقويم أم القرى: 1 محرم 1356هـ = 13 مارس 1937م
  // نقطة البداية تُحسب من التاريخ الميلادي لتجنّب أخطاء الاتفاق
  const UQ_START_GY = 1937, UQ_START_GM = 3, UQ_START_GD = 13;
  const UQ_START_YEAR = 1356;

  // جدول أطوال أشهر أم القرى الرسمي (1356هـ → 1500هـ، 145 قيمة)
  // المصدر: جدول Microsoft .NET UmAlQuraCalendar الرسمي.
  // كل قيمة تمثل سنة هجرية واحدة: 12 بت، البت بلو الرتبة (bit 0) = محرم.
  // البت = 1 يعني 30 يوم، 0 يعني 29 يوم.
  const UMMALQURA_DATA = [
    0x0EC9, 0x0D92, 0x0D25, 0x0A4D, 0x02AD, 0x056D, 0x0B6A, 0x0B52, 0x0AA5, 0x0A4B,
    0x0497, 0x0937, 0x02B6, 0x0575, 0x0D6A, 0x0D52, 0x0A96, 0x092D, 0x025D, 0x04DD,
    0x0ADA, 0x05D4, 0x0DA9, 0x0D52, 0x0AAA, 0x04D6, 0x09B6, 0x0374, 0x0769, 0x0752,
    0x06A5, 0x054B, 0x0AAB, 0x055A, 0x0AD5, 0x0DD2, 0x0DA4, 0x0D49, 0x0A95, 0x052D,
    0x0A5D, 0x055A, 0x0AD5, 0x06AA, 0x0695, 0x052B, 0x0A57, 0x04AE, 0x0976, 0x056C,
    0x0B55, 0x0AAA, 0x0A55, 0x04AD, 0x095D, 0x02DA, 0x05D9, 0x0DB2, 0x0BA4, 0x0B4A,
    0x0A55, 0x02B5, 0x0575, 0x0B6A, 0x0BD2, 0x0BC4, 0x0B89, 0x0A95, 0x052D, 0x05AD,
    0x0B6A, 0x06D4, 0x0DC9, 0x0D92, 0x0AA6, 0x0956, 0x02AE, 0x056D, 0x036A, 0x0B55,
    0x0AAA, 0x094D, 0x049D, 0x095D, 0x02BA, 0x05B5, 0x05AA, 0x0D55, 0x0A9A, 0x092E,
    0x026E, 0x055D, 0x0ADA, 0x06D4, 0x06A5, 0x054B, 0x0A97, 0x054E, 0x0AAE, 0x05AC,
    0x0BA9, 0x0D92, 0x0B25, 0x064B, 0x0CAB, 0x055A, 0x0B55, 0x06D2, 0x0EA5, 0x0E4A,
    0x0A95, 0x052D, 0x0AAD, 0x036C, 0x0759, 0x06D2, 0x0695, 0x052D, 0x0A5B, 0x04BA,
    0x09BA, 0x03B4, 0x0B69, 0x0B52, 0x0AA6, 0x04B6, 0x096D, 0x02EC, 0x06D9, 0x0EB2,
    0x0D54, 0x0D2A, 0x0A56, 0x04AE, 0x096D, 0x0D6A, 0x0B54, 0x0B29, 0x0A93, 0x052B,
    0x0A57, 0x0536, 0x0AB5, 0x06AA, 0x0E93
  ];

  // عدد السنوات المتاحة في الجدول
  const UQ_MAX_YEAR = UQ_START_YEAR + UMMALQURA_DATA.length - 1;
  // نقطة البداية باليوم اليولياني (تُحسب من التاريخ الميلادي)
  const UMMALQURA_START_JDN = gregorianToJDN(UQ_START_GY, UQ_START_GM, UQ_START_GD);

  /* ---------- تحويل ميلادي <-> يوم يولياني (JDN) ---------- */

  function gregorianToJDN(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y +
      Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  function jdnToGregorian(jdn) {
    const a = jdn + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    const c = a - Math.floor(146097 * b / 4);
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor(1461 * d / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = 100 * b + d - 4800 + Math.floor(m / 10);
    return { year, month, day };
  }

  /* ---------- أطوال أشهر أم القرى ---------- */

  function uqMonthLength(year, month) {
    // month: 1..12  —  البت بلو الرتبة (bit 0) يمثل محرم
    const idx = year - UQ_START_YEAR;
    if (idx < 0 || idx >= UMMALQURA_DATA.length) return null;
    const code = UMMALQURA_DATA[idx];
    const bit = (code >> (month - 1)) & 1;
    return bit === 1 ? 30 : 29;
  }

  function uqYearLength(year) {
    let sum = 0;
    for (let m = 1; m <= 12; m++) {
      const ml = uqMonthLength(year, m);
      if (ml === null) return null;
      sum += ml;
    }
    return sum;
  }

  function isUqDateValid(year, month, day) {
    const ml = uqMonthLength(year, month);
    if (ml === null) return false;
    return day >= 1 && day <= ml;
  }

  /* ---------- تحويل هجري (أم القرى) -> ميلادي ---------- */

  function hijriToJDN(year, month, day) {
    let jdn = UMMALQURA_START_JDN;
    for (let y = UQ_START_YEAR; y < year; y++) {
      const yl = uqYearLength(y);
      if (yl === null) return null;
      jdn += yl;
    }
    for (let m = 1; m < month; m++) {
      const ml = uqMonthLength(year, m);
      if (ml === null) return null;
      jdn += ml;
    }
    return jdn + day - 1;
  }

  function hijriToGregorian(year, month, day) {
    if (!isUqDateValid(year, month, day)) return null;
    const jdn = hijriToJDN(year, month, day);
    if (jdn === null) return null;
    return jdnToGregorian(jdn);
  }

  /* ---------- تحويل ميلادي -> هجري (أم القرى) ---------- */

  function gregorianToHijri(year, month, day) {
    const jdn = gregorianToJDN(year, month, day);
    if (jdn < UMMALQURA_START_JDN) return null;

    let remaining = jdn - UMMALQURA_START_JDN;
    let hy = UQ_START_YEAR;

    while (hy <= UQ_MAX_YEAR) {
      const yl = uqYearLength(hy);
      if (remaining < yl) break;
      remaining -= yl;
      hy++;
    }
    if (hy > UQ_MAX_YEAR) return null;

    let hm = 1;
    while (hm <= 12) {
      const ml = uqMonthLength(hy, hm);
      if (remaining < ml) break;
      remaining -= ml;
      hm++;
    }

    return { year: hy, month: hm, day: remaining + 1 };
  }

  /* ==========================================================
     أدوات مساعدة
     ========================================================== */

  function weekdayOf(gregDate) {
    const jdn = gregorianToJDN(gregDate.year, gregDate.month, gregDate.day);
    const idx = ((jdn + 1) % 7 + 7) % 7; // جعل الأحد = 0
    return WEEKDAYS[idx];
  }

  function daysInGregorianMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function isValidGregorian(y, m, d) {
    if (m < 1 || m > 12) return false;
    if (y < 1 || y > 9999) return false;
    return d >= 1 && d <= daysInGregorianMonth(y, m);
  }

  /* ==========================================================
     تهيئة الواجهة
     ========================================================== */

  const $ = (id) => document.getElementById(id);

  /* نافذة تنبيه مدمجة بديلة عن alert()
     — مريحة جداً على الجوال ولا تفتح نافذة المتصفح */
  let toastTimer = null;
  function notify(message, isError) {
    const toast = $('toast');
    if (!toast) { alert(message); return; }
    // إعادة ضبط المهلة السابقة
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle('toast-error', !!isError);
    toast.classList.add('toast-show');
    toast.hidden = false;
    toastTimer = setTimeout(() => {
      toast.classList.remove('toast-show');
      toast.hidden = true;
    }, 3600);
  }

  function populateMonths(selectEl, arr) {
    // إعادة بناء قائمة الشهور بشكل نظيف (تراكيب متوافقة مع كل المتصفحات)
    let html = '';
    arr.forEach((name, i) => {
      html += '<option value="' + (i + 1) + '">' + name + ' ' + (i + 1) + '</option>';
    });
    selectEl.innerHTML = html;
    selectEl.selectedIndex = 0;
  }

  function populateMonthSelects() {
    // شهور التحويل حسب "نوع التقويم" الافتراضي (هجري)
    refreshConvertMonths();
    // شهور حساب العمر والفارق وإضافة الأيام (تُضبط حسب نوع التقويم)
    refreshAgeMonths();
    refreshAddMonths();
    refreshDiffMonths();
  }

  // يعبّئ قائمتي شهور "الفرق بين تاريخين" حسب نوع التقويم المختار
  function getDiffCalendar() {
    const el = $('diffCalendar');
    if (!el) return 'gregorian';
    const active = el.querySelector('.seg-btn.active');
    return active ? active.dataset.cal : 'gregorian';
  }

  function refreshDiffMonths() {
    const cal = getDiffCalendar();
    const months = cal === 'hijri' ? HIJRI_MONTHS : GREGORIAN_MONTHS;
    populateMonths($('diffMonth1'), months);
    populateMonths($('diffMonth2'), months);
  }

  let hijriMonthItems = null;
  let gregorianMonthItems = null;

  function renderMonthsLists() {
    const hijriList = $('hijriMonthsList');
    HIJRI_MONTHS.forEach((name, i) => {
      const li = document.createElement('li');
      li.dataset.month = String(i + 1);
      li.innerHTML =
        '<span class="m-badge"></span>' +
        '<span class="m-head">' +
          '<span class="m-name">' + name + '</span>' +
          '<span class="m-num">' + (i + 1) + '</span>' +
        '</span>' +
        '<span class="m-days">' + t('monthDays2930') + '</span>';
      hijriList.appendChild(li);
    });
    hijriMonthItems = [...hijriList.children];

    const gregList = $('gregorianMonthsList');
    const gregDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    GREGORIAN_MONTHS.forEach((name, i) => {
      const li = document.createElement('li');
      li.dataset.month = String(i + 1);
      const d = gregDays[i];
      const label = d === 28 ? t('monthDays2829') : d + ' ' + t('monthDaysUnit');
      li.innerHTML =
        '<span class="m-badge"></span>' +
        '<span class="m-head">' +
          '<span class="m-name">' + name + '</span>' +
          '<span class="m-num">' + (i + 1) + '</span>' +
        '</span>' +
        '<span class="m-days">' + label + '</span>';
      gregList.appendChild(li);
    });
    gregorianMonthItems = [...gregList.children];

    updateCurrentMonths();
  }

  // يميِّز الشهر الحالي فقط في كلتا القائمتين (دون عرض رقم اليوم)
  function updateCurrentMonths() {
    if (!hijriMonthItems || !gregorianMonthItems) return;
    const now = new Date();
    const gMonth = now.getMonth() + 1;

    const hijri = gregorianToHijri(now.getFullYear(), gMonth, now.getDate());
    const hMonth = hijri ? hijri.month : null;

    hijriMonthItems.forEach((li) => {
      const isCur = hMonth !== null && li.dataset.month === String(hMonth);
      li.classList.toggle('is-current', isCur);
    });

    gregorianMonthItems.forEach((li) => {
      const isCur = li.dataset.month === String(gMonth);
      li.classList.toggle('is-current', isCur);
    });
  }

  // صيغة تاريخ رقمية موحّدة: 12-12-2022 - ديسمبر
  function fmtNumDate(obj, monthsArr) {
    const p2 = (n) => String(n).padStart(2, '0');
    return p2(obj.day) + '-' + p2(obj.month) + '-' + obj.year + ' - ' + monthsArr[obj.month - 1];
  }

  // صيغة رقمية فقط (بلا اسم الشهر): 12-12-2022
  function fmtNumOnly(obj) {
    const p2 = (n) => String(n).padStart(2, '0');
    return p2(obj.day) + '-' + p2(obj.month) + '-' + obj.year;
  }

  /* ==========================================================
     قسم 1: التاريخ الحالي
     ========================================================== */

  function renderToday() {
    const now = new Date();
    const gYear = now.getFullYear();
    const gMonth = now.getMonth() + 1;
    const gDay = now.getDate();
    const weekday = WEEKDAYS[now.getDay()];

    const hijri = gregorianToHijri(gYear, gMonth, gDay);

    // شريط التاريخ الحالي (مدمج في الترويسة): 12-12-2022 - ديسمبر
    $('stripGregorian').textContent = fmtNumDate({ day: gDay, month: gMonth, year: gYear }, GREGORIAN_MONTHS);
    if (hijri) {
      $('stripHijri').textContent = fmtNumDate(hijri, HIJRI_MONTHS);
    }

    // شريط "تاريخ اليوم" في قسم الأشهر
    $('monthsWeekday').textContent = weekday + ' ' + gDay + ' ' + GREGORIAN_MONTHS[gMonth - 1] + ' ' + gYear;
    $('monthsGregDate').textContent = fmtNumDate({ day: gDay, month: gMonth, year: gYear }, GREGORIAN_MONTHS);
    if (hijri) {
      $('monthsHijriDate').textContent = fmtNumDate(hijri, HIJRI_MONTHS);
    }

    // تحديث تمييز الشهر الحالي في قوائم الأشهر
    updateCurrentMonths();
  }

  /* ==========================================================
     قسم 2: تحويل التاريخ
     ========================================================== */

  /* --- التبويبات الرئيسية: تحويل / أيام / عمر / فرق --- */
  const mainTabs = document.querySelectorAll('.main-tabs .tab');
  const MAIN_PANELS = { convert: 'tab-convert', adddays: 'tab-adddays', age: 'tab-age', diff: 'tab-diff' };

  function switchMain(name) {
    mainTabs.forEach((t) => {
      const active = t.dataset.main === name;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
    Object.keys(MAIN_PANELS).forEach((key) => {
      const panel = $(MAIN_PANELS[key]);
      if (panel) panel.hidden = key !== name;
    });
  }

  mainTabs.forEach((tab) => {
    tab.addEventListener('click', () => switchMain(tab.dataset.main));
  });

  // يملأ لوحة تاريخ منفصلة: خلايا الأرقام (يوم/شهر/سنة) + اسم الشهر
  // عرض مختصر: "DD-MM-YYYY هـ/م" + اسم الشهر أسفله
  function fillDatePanel(valueElId, nameElId, dateObj, monthNames, unit) {
    const pad2 = (n) => String(n).padStart(2, '0');
    $(valueElId).innerHTML =
      pad2(dateObj.day) + '-' + pad2(dateObj.month) + '-' + dateObj.year +
      ' <span class="unit">' + unit + '</span>';
    $(nameElId).textContent = monthNames[dateObj.month - 1] + ' ' + dateObj.month;
  }

  /* --- تحويل التاريخ (نوع التقويم بزرّين) --- */
  function getConvertCalendar() {
    const el = $('h2gFrom');
    if (!el) return 'hijri';
    const active = el.querySelector('.seg-btn.active');
    return active ? active.dataset.cal : 'hijri';
  }

  function refreshConvertMonths() {
    const from = getConvertCalendar();
    const months = from === 'hijri' ? HIJRI_MONTHS : GREGORIAN_MONTHS;
    populateMonths($('h2gMonth'), months);
  }

  // ربط أزرار نوع التقويم في التحويل: عند التبديل يُحوّل التاريخ المُدخَل للتقويم الآخر
  const h2gFromEl = $('h2gFrom');
  if (h2gFromEl) {
    h2gFromEl.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prev = getConvertCalendar();
        const next = btn.dataset.cal;
        if (prev === next) return;

        h2gFromEl.querySelectorAll('.seg-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });

        // قراءة المُدخل من التقويم القديم
        const d = parseInt($('h2gDay').value, 10) || 1;
        const m = parseInt($('h2gMonth').value, 10) || 1;
        const y = parseInt($('h2gYear').value, 10);

        // إعادة بناء قائمة الشهور للتقويم الجديد
        refreshConvertMonths();

        if (isFinite(y)) {
          let nD = d, nM = m, nY = y;
          if (prev === 'hijri') {
            // من هجري إلى ميلادي (forzar تحقق هجري)
            if (isUqDateValid(y, m, d)) {
              const g = hijriToGregorian(y, m, d);
              if (g) { nD = g.day; nM = g.month; nY = g.year; }
            }
          } else {
            // من ميلادي إلى هجري
            const h = gregorianToHijri(y, m, d);
            if (h) { nD = h.day; nM = h.month; nY = h.year; }
          }
          $('h2gDay').value = nD;
          $('h2gMonth').value = nM;
          $('h2gYear').value = nY;
        }
      });
    });
  }

  $('h2gForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const d = parseInt($('h2gDay').value, 10);
    const m = parseInt($('h2gMonth').value, 10);
    const y = parseInt($('h2gYear').value, 10);
    const from = getConvertCalendar(); // 'hijri' | 'gregorian'
    const to = from === 'hijri' ? 'gregorian' : 'hijri'; // الوجهة عكس المُدخل

    let inputG = null;
    if (from === 'hijri') {
      if (!isUqDateValid(y, m, d)) {
        const ml = uqMonthLength(y, m);
        notify(ml === null
          ? fmt('notifHijriOutOfRange', { min: UQ_START_YEAR, max: UQ_MAX_YEAR })
          : fmt('notifHijriInvalidDay', { n: ml }));
        return;
      }
      inputG = hijriToGregorian(y, m, d);
    } else {
      if (!isValidGregorian(y, m, d)) { notify(t('notifGregInvalid')); return; }
      inputG = { year: y, month: m, day: d };
    }

    if (to === 'hijri') {
      const h = gregorianToHijri(inputG.year, inputG.month, inputG.day);
      if (!h) { notify(t('notifOutOfRange')); return; }
      fillDatePanel('h2gOutOutputText', 'h2gOutOutputName', h, HIJRI_MONTHS, t('hijriAbbr'));
    } else {
      fillDatePanel('h2gOutOutputText', 'h2gOutOutputName', inputG, GREGORIAN_MONTHS, t('gregorianAbbr'));
    }

    if (from === 'hijri') {
      fillDatePanel('h2gOutInputText', 'h2gOutInputName', { day: d, month: m, year: y }, HIJRI_MONTHS, t('hijriAbbr'));
    } else {
      fillDatePanel('h2gOutInputText', 'h2gOutInputName', { day: d, month: m, year: y }, GREGORIAN_MONTHS, t('gregorianAbbr'));
    }

    $('h2gResultTitle').textContent = fmt('resultConversionFrom', {
      from: from === 'hijri' ? t('hijri') : t('gregorian'),
      to: to === 'hijri' ? t('hijri') : t('gregorian')
    });
    $('h2gOutWeekday').textContent = fmt('resultWeekday', { day: weekdayOf(inputG) });
    $('h2gResult').hidden = false;
  });

  /* ==========================================================
     حساب الفارق بين تاريخين (بالوحدات)
     ========================================================== */

  function diffInUnits(fromJDN, toJDN) {
    const from = jdnToGregorian(fromJDN);
    const to = jdnToGregorian(toJDN);

    let years = to.year - from.year;
    let months = to.month - from.month;
    let days = to.day - from.day;

    if (days < 0) {
      months--;
      const prevMonth = to.month === 1 ? 12 : to.month - 1;
      const prevYear = to.month === 1 ? to.year - 1 : to.year;
      days += daysInGregorianMonth(prevYear, prevMonth);
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = toJDN - fromJDN;
    const weeks = Math.floor(totalDays / 7);
    return { years, months, days, totalDays, weeks };
  }

  /* ==========================================================
     قسم 4: حساب العمر
     ========================================================== */

  // قراءة نوع التقويم المختار في "حساب العمر" (من الزر النشط)
  function getAgeCalendar() {
    const el = $('ageCalendar');
    if (!el) return 'gregorian';
    const active = el.querySelector('.seg-btn.active');
    return active ? active.dataset.cal : 'gregorian';
  }

  // إعادة بناء قائمة شهور حساب العمر حسب التقويم المختار
  function refreshAgeMonths() {
    const isHijri = getAgeCalendar() === 'hijri';
    populateMonths($('ageMonth'), isHijri ? HIJRI_MONTHS : GREGORIAN_MONTHS);
  }

  // ربط أزرار نوع التقويم (ميلادي/هجري) في حساب العمر
  // عند الضغط: يحوّل التاريخ المُدخَل من التقويم الحالي إلى التقويم المختار
  const ageCalEl = $('ageCalendar');
  if (ageCalEl) {
    ageCalEl.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prev = getAgeCalendar();
        const next = btn.dataset.cal;
        if (prev === next) {
          // نفس التقويم، لا حاجة للتحويل
          return;
        }

        ageCalEl.querySelectorAll('.seg-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });

        // القراءة من التقويم القديم
        const d = parseInt($('ageDay').value, 10) || 1;
        const m = parseInt($('ageMonth').value, 10) || 1;
        const y = parseInt($('ageYear').value, 10);

        // إعادة بناء قائمة الشهور حسب التقويم الجديد أولاً
        refreshAgeMonths();

        if (isFinite(y)) {
          let newDay = d, newMonth = m, newYear = y;
          if (prev === 'gregorian') {
            // من ميلادي إلى هجري
            const h = gregorianToHijri(y, m, d);
            if (h) { newDay = h.day; newMonth = h.month; newYear = h.year; }
          } else {
            // من هجري إلى ميلادي
            if (isUqDateValid(y, m, d)) {
              const g = hijriToGregorian(y, m, d);
              if (g) { newDay = g.day; newMonth = g.month; newYear = g.year; }
            }
          }
          $('ageDay').value = newDay;
          $('ageMonth').value = newMonth;
          $('ageYear').value = newYear;
        }
      });
    });
  }

  $('ageForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const d = parseInt($('ageDay').value, 10);
    const m = parseInt($('ageMonth').value, 10);
    const y = parseInt($('ageYear').value, 10);
    const cal = getAgeCalendar();

    let birthJDN;
    if (cal === 'gregorian') {
      if (!isValidGregorian(y, m, d)) { notify(t('notifBirthInvalid')); return; }
      birthJDN = gregorianToJDN(y, m, d);
    } else {
      if (!isUqDateValid(y, m, d)) {
        const ml = uqMonthLength(y, m);
        notify(ml === null ? t('notifHijriOutOfRangeShort') : fmt('notifHijriInvalidDayShort', { n: ml }));
        return;
      }
      const g = hijriToGregorian(y, m, d);
      birthJDN = gregorianToJDN(g.year, g.month, g.day);
    }

    const now = new Date();
    const nowJDN = gregorianToJDN(now.getFullYear(), now.getMonth() + 1, now.getDate());
    if (birthJDN > nowJDN) { notify(t('notifBirthFuture')); return; }

    const res = diffInUnits(birthJDN, nowJDN);

    $('ageYears').textContent = res.years;
    $('ageMonths').textContent = res.months;
    $('ageDays').textContent = res.days;
    $('ageSubText').textContent = fmt('ageTotal', {
      d: res.totalDays,
      h: (res.totalDays * 24).toLocaleString('en')
    });
    $('ageResult').hidden = false;
  });

  /* ==========================================================
     قسم 5: الفرق بين تاريخين
     ========================================================== */

  // تحويل تاريخ إلى JDN حسب نوع التقويم، مع التحقق من صحته
  function dateToJDN(cal, d, m, y) {
    if (cal === 'hijri') {
      if (!isUqDateValid(y, m, d)) {
        const ml = uqMonthLength(y, m);
        return { ok: false, msg: ml === null
          ? fmt('notifHijriOutOfRange', { min: UQ_START_YEAR, max: UQ_MAX_YEAR })
          : fmt('notifHijriInvalidDay', { n: ml }) };
      }
      const g = hijriToGregorian(y, m, d);
      return { ok: true, jdn: gregorianToJDN(g.year, g.month, g.day) };
    }
    if (!isValidGregorian(y, m, d)) return { ok: false, msg: t('notifGregInvalid') };
    return { ok: true, jdn: gregorianToJDN(y, m, d) };
  }

  $('diffForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const cal = getDiffCalendar();
    const d1 = parseInt($('diffDay1').value, 10);
    const m1 = parseInt($('diffMonth1').value, 10);
    const y1 = parseInt($('diffYear1').value, 10);
    const d2 = parseInt($('diffDay2').value, 10);
    const m2 = parseInt($('diffMonth2').value, 10);
    const y2 = parseInt($('diffYear2').value, 10);

    const r1 = dateToJDN(cal, d1, m1, y1);
    if (!r1.ok) { notify(t('notifFirst') + r1.msg); return; }
    const r2 = dateToJDN(cal, d2, m2, y2);
    if (!r2.ok) { notify(t('notifSecond') + r2.msg); return; }

    const fromJDN = Math.min(r1.jdn, r2.jdn);
    const toJDN = Math.max(r1.jdn, r2.jdn);

    const res = diffInUnits(fromJDN, toJDN);

    $('diffYears').textContent = res.years;
    $('diffMonths').textContent = res.months;
    $('diffDays').textContent = res.days;
    $('diffWeeks').textContent = res.weeks;
    $('diffTotalDays').textContent = fmt('diffTotalDays', { d: res.totalDays, w: res.weeks });
    $('diffResult').hidden = false;
  });

  // عند اختيار نوع التقويم في "الفرق بين تاريخين"، حدّث قوائم الشهور
  const diffCalendarEl = $('diffCalendar');
  if (diffCalendarEl) {
    diffCalendarEl.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        diffCalendarEl.querySelectorAll('.seg-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });
        refreshDiffMonths();
      });
    });
  }

  /* ==========================================================
     إضافة/خصم أيام من تاريخ
     ========================================================== */

  function getAddCalendar() {
    const el = $('addCalendar');
    if (!el) return 'hijri';
    const active = el.querySelector('.seg-btn.active');
    return active ? active.dataset.cal : 'hijri';
  }

  function refreshAddMonths() {
    const isHijri = getAddCalendar() === 'hijri';
    populateMonths($('addMonth'), isHijri ? HIJRI_MONTHS : GREGORIAN_MONTHS);
  }

  // أزرار نوع التقويم في "إضافة أيام": عند التبديل يحوّل التاريخ المُدخَل للتقويم الآخر
  const addCalendarEl = $('addCalendar');
  if (addCalendarEl) {
    addCalendarEl.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prev = getAddCalendar();
        const next = btn.dataset.cal;
        if (prev === next) return;

        addCalendarEl.querySelectorAll('.seg-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });

        const curD = parseInt($('addDay').value, 10) || 1;
        const curM = parseInt($('addMonth').value, 10) || 1;
        const curY = parseInt($('addYear').value, 10);

        refreshAddMonths();

        if (isFinite(curY)) {
          let nD = curD, nM = curM, nY = curY;
          if (prev === 'hijri') {
            if (isUqDateValid(curY, curM, curD)) {
              const g = hijriToGregorian(curY, curM, curD);
              if (g) { nD = g.day; nM = g.month; nY = g.year; }
            }
          } else {
            const h = gregorianToHijri(curY, curM, curD);
            if (h) { nD = h.day; nM = h.month; nY = h.year; }
          }
          $('addDay').value = nD;
          $('addMonth').value = nM;
          $('addYear').value = nY;
        }
      });
    });
  }

  $('addDaysForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const d = parseInt($('addDay').value, 10);
    const m = parseInt($('addMonth').value, 10);
    const y = parseInt($('addYear').value, 10);
    const cal = getAddCalendar();
    const op = $('addOp').value;           // 'add' | 'sub'
    let days = parseInt($('addCount').value, 10) || 0;

    // تحويل التاريخ الأساسي إلى JDN
    let baseJDN;
    if (cal === 'hijri') {
      if (!isUqDateValid(y, m, d)) {
        const ml = uqMonthLength(y, m);
        notify(ml === null
          ? fmt('notifHijriOutOfRange', { min: UQ_START_YEAR, max: UQ_MAX_YEAR })
          : fmt('notifHijriInvalidDay', { n: ml }));
        return;
      }
      const g = hijriToGregorian(y, m, d);
      baseJDN = gregorianToJDN(g.year, g.month, g.day);
    } else {
      if (!isValidGregorian(y, m, d)) { notify(t('notifGregInvalid')); return; }
      baseJDN = gregorianToJDN(y, m, d);
    }

    const resultJDN = op === 'add' ? baseJDN + days : baseJDN - days;

    // النتيجة في نفس التقويم المُدخل
    let resultG = jdnToGregorian(resultJDN);
    let baseG = jdnToGregorian(baseJDN);

    if (cal === 'hijri') {
      const hResult = gregorianToHijri(resultG.year, resultG.month, resultG.day);
      const hBase = gregorianToHijri(baseG.year, baseG.month, baseG.day);
      if (!hResult || !hBase) { notify(t('notifResultOutOfRange')); return; }
      $('addOutResultText').innerHTML = padDay(hResult.day) + '-' + padDay(hResult.month) + '-' + hResult.year +
        ' <span class="unit">' + t('hijriAbbr') + '</span>';
      $('addOutResultName').textContent = HIJRI_MONTHS[hResult.month - 1] + ' ' + hResult.month;
      $('addOutBaseText').innerHTML = padDay(hBase.day) + '-' + padDay(hBase.month) + '-' + hBase.year +
        ' <span class="unit">' + t('hijriAbbr') + '</span>';
      $('addOutBaseName').textContent = HIJRI_MONTHS[hBase.month - 1] + ' ' + hBase.month;
    } else {
      $('addOutResultText').innerHTML = padDay(resultG.day) + '-' + padDay(resultG.month) + '-' + resultG.year +
        ' <span class="unit">' + t('gregorianAbbr') + '</span>';
      $('addOutResultName').textContent = GREGORIAN_MONTHS[resultG.month - 1] + ' ' + resultG.month;
      $('addOutBaseText').innerHTML = padDay(baseG.day) + '-' + padDay(baseG.month) + '-' + baseG.year +
        ' <span class="unit">' + t('gregorianAbbr') + '</span>';
      $('addOutBaseName').textContent = GREGORIAN_MONTHS[baseG.month - 1] + ' ' + baseG.month;
    }

    $('addOutWeekday').textContent = (op === 'add'
      ? fmt('afterDays', { n: days, day: weekdayOf(resultG) })
      : fmt('beforeDays', { n: days, day: weekdayOf(resultG) }));
    $('addDaysResult').hidden = false;
  });

  function padDay(n) { return String(n).padStart(2, '0'); }

  /* ==========================================================
     مواعيد نزول الرواتب + العداد التنازلي
     ========================================================== */

  // قائمة الجهات وأيام الصرف (رقم اليوم الميلادي)
  // الاسم مفتاح ترجمة (t('name')) ليُعرض حسب اللغة
  const SALARY_ITEMS = [
    { name: 'sSalaryCivil', day: 27, color: 'civil' },
    { name: 'sSalarySocial', day: 1, color: 'social' },
    { name: 'sSalaryRehab', day: 1, color: 'social' },
    { name: 'sSalaryCitizen', day: 10, color: 'citizen' },
    { name: 'sSalaryHousing', day: 24, color: 'housing' },
    { name: 'sSalaryPension', day: 25, color: 'retirement' },
    { name: 'sSalaryInsurance', day: 1, color: 'social' }
  ];

  function nextPaymentDate(dayOfMonth) {
    const now = new Date();
    let target = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
    if (now.getTime() >= target.getTime()) {
      target = new Date(now.getFullYear(), now.getMonth() + 1, dayOfMonth);
    }
    return target;
  }

  // يعرض مواعيد الرواتب كجدول (الجهة / اليوم / تاريخ الصرف / متبقي)
  function renderSalaryCards() {
    const tbody = $('salaryGrid');
    if (!tbody) return;
    tbody.innerHTML = ''; // إعادة بناء نظيفة (دون تراكم صفوف/مؤقّتات)

    SALARY_ITEMS.forEach((item) => {
      const target = nextPaymentDate(item.day);
      const g = { year: target.getFullYear(), month: target.getMonth() + 1, day: target.getDate() };
      const h = gregorianToHijri(g.year, g.month, g.day);

      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td class="xl-name">' + t(item.name) + '</td>' +
        '<td class="xl-day">' + weekdayOf(g) + '</td>' +
        '<td class="xl-date">' +
          '<span class="xl-date-val" data-mode="gregorian">' + fmtNumOnly(g) + '</span>' +
          (h ? '<span class="xl-date-val" data-mode="hijri">' + fmtNumOnly(h) + '</span>' : '') +
        '</td>' +
        '<td class="xl-count" data-count> ' + countdownText(target) + '</td>';

      tbody.appendChild(tr);

      const countEl = tr.querySelector('[data-count]');
      setInterval(() => {
        countEl.textContent = ' ' + countdownText(nextPaymentDate(item.day));
      }, 1000);
    });

    // بعد البناء طبق التبويب الحالي
    applySalaryMode();
  }

  // قراءة التبويب النشط (هجري/ميلادي)
  function getSalaryCalendar() {
    const el = $('salaryCalendar');
    if (!el) return 'hijri';
    const active = el.querySelector('.seg-btn.active');
    return active ? active.dataset.cal : 'hijri';
  }

  // يطبّق التبويب على أعمدة تاريخ الصرف في الجدول
  function applySalaryMode() {
    const mode = getSalaryCalendar();
    document.querySelectorAll('.xl-date-val').forEach((el) => {
      el.style.display = el.dataset.mode === mode ? '' : 'none';
    });
  }

  // ربط أزرار تبويب التقويم في مواعيد الرواتب
  const salaryCalEl = $('salaryCalendar');
  if (salaryCalEl) {
    salaryCalEl.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        salaryCalEl.querySelectorAll('.seg-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });
        applySalaryMode();
      });
    });
  }

  // نص عدّاد مختصر: "X يوم Y ساعة Z دقيقة"
  function countdownText(target) {
    const now = new Date();
    let diff = target.getTime() - now.getTime();
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return fmt('countdown', { d: d, h: hrs, m: mins });
  }

  /* ==========================================================
     وضع ليلي/نهاري
     ========================================================== */

  const themeToggle = $('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const themeLabel = themeToggle.querySelector('.theme-label');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeLabel.textContent = isDark ? t('dayMode') : t('nightMode');
    try { localStorage.setItem('calendar-theme', theme); } catch (err) { /* تجاهل */ }
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('calendar-theme'); } catch (err) { /* تجاهل */ }
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ==========================================================
     التبديل بين اللغتين (عربي / English)
     ========================================================== */

  // ترجمة كل عناصر الواجهة ذات data-i18n + العنوان والوصف + زر اللغة
  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      if (k === 'nightMode') return; // تُضبط ديناميكياً عبر applyTheme()
      el.textContent = t(k);
    });

    const langLabel = $('langLabel');
    if (langLabel) langLabel.textContent = curLang === 'ar' ? t('langToggleTitle') : 'العربية';
    const langBtn = $('langToggle');
    if (langBtn) {
      const next = curLang === 'ar' ? 'en' : 'ar';
      const nextName = next === 'ar' ? 'العربية' : 'English';
      langBtn.setAttribute('aria-label', nextName);
      langBtn.title = nextName;
    }

    document.title = t('pageTitle');
    const md = $('metaDescription');
    if (md) md.setAttribute('content', t('metaDesc'));
  }

  // إعادة بناء المحتوى الديناميكي ليعكس اللغة الحالية
  function renderLocalized() {
    // حفظ اختيارات المستخدم في قوائم الشهور ثم إعادة تعبئتها بالجديدة
    const selects = ['h2gMonth', 'ageMonth', 'addMonth', 'diffMonth1', 'diffMonth2']
      .map((id) => $(id))
      .filter(Boolean)
      .map((el) => ({ el: el, val: el.value }));
    populateMonthSelects();
    selects.forEach(({ el, val }) => { el.value = val; });

    renderMonthsLists();
    renderToday();
    renderSalaryCards();
    applySalaryMode();
  }

  // ضبط اللغة وتطبيق كل ما يلزم (اتجاه، نص، بيانات)
  function setLang(lang) {
    curLang = (lang === 'en') ? 'en' : 'ar';
    document.documentElement.setAttribute('lang', curLang);
    document.documentElement.setAttribute('dir', curLang === 'ar' ? 'rtl' : 'ltr');
    try { localStorage.setItem(LANG_STORAGE, curLang); } catch (err) { /* تجاهل */ }

    applyLanguageData();
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
    applyI18n();
    renderLocalized();
  }

  // ربط زر تبديل اللغة
  const langToggleEl = $('langToggle');
  if (langToggleEl) {
    langToggleEl.addEventListener('click', () => setLang(curLang === 'ar' ? 'en' : 'ar'));
  }

  // تهيئة اللغة عند الفتح (من التخزين المحلي أو الافتراضي: العربية)
  function initLang() {
    let saved = null;
    try { saved = localStorage.getItem(LANG_STORAGE); } catch (err) { /* تجاهل */ }
    curLang = saved === 'en' ? 'en' : 'ar';
    document.documentElement.setAttribute('lang', curLang);
    document.documentElement.setAttribute('dir', curLang === 'ar' ? 'rtl' : 'ltr');
    applyLanguageData();
    applyI18n();
  }

  /* ==========================================================
     التشغيل
     ========================================================== */

  // يملأ كل حقول التواريخ بتاريخ اليوم (حسب التقويم المختار لكل نموذج)
  function fillTodayDefaults() {
    const now = new Date();
    const g = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    const h = gregorianToHijri(g.year, g.month, g.day);

    function setDay(dayEl, monthEl, yearEl, date) {
      $(dayEl).value = date.day;
      $(monthEl).value = date.month;
      $(yearEl).value = date.year;
    }

    // التحويل: حسب «نوع التقويم» الافتراضي (هجري)
    setDay('h2gDay', 'h2gMonth', 'h2gYear', getConvertCalendar() === 'hijri' && h ? h : g);

    // إضافة/خصم أيام: حسب نوع التقويم الافتراضي (هجري)
    setDay('addDay', 'addMonth', 'addYear', getAddCalendar() === 'hijri' && h ? h : g);

    // حساب العمر: اليوم (بالهجري افتراضياً، يمكن تغييره)
    setDay('ageDay', 'ageMonth', 'ageYear', getAgeCalendar() === 'hijri' && h ? h : g);

    // الفرق بين تاريخين: كلا التاريخين = اليوم (بالهجري افتراضياً)
    setDay('diffDay1', 'diffMonth1', 'diffYear1', getDiffCalendar() === 'hijri' && h ? h : g);
    setDay('diffDay2', 'diffMonth2', 'diffYear2', getDiffCalendar() === 'hijri' && h ? h : g);
  }

  function init() {
    initLang();
    populateMonthSelects();
    renderMonthsLists();
    fillTodayDefaults();
    renderToday();
    setInterval(renderToday, 1000);
    renderSalaryCards();
    initTheme();
    applyI18n();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
