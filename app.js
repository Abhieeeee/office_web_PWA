/**
 * Shree Anjani Belt and Bearing Store - Advanced B2B Application Engine
 * Includes:
 * 1. SEO-Friendly i18n Engine (English & Nepali)
 * 2. Bearing Brand Interchange Cross-Reference Calculator
 * 3. Mechanical V-Belt & Pulley Center Distance Calculator
 * 4. Digital Machine Ledger (Factory Profile Bookmarks & Reorder)
 * 5. Time-Triggered Emergency Breakdown FAB Engine (Saturday Midnight)
 * 6. Dynamic Operating Status & Nepal Timezone (Asia/Kathmandu UTC+5:45)
 */

(function () {
  'use strict';

  const SALES_PHONE_CLEAN = '9779804462602';
  const WAREHOUSE_PHONE_CLEAN = '9779847301185';

  // Dynamic Year in Footer
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  // ================= 1. SEO-FRIENDLY i18n ENGINE (NEPALI & ENGLISH) =================
  const TRANSLATIONS = {
    en: {
      txtTopTrust: "<strong>Nepal's Trusted Independent Wholesale Supplier</strong> for Genuine Bearings & Industrial Spares.",
      heroTitle: "Heavy-Duty Bearings, Conveyor Belts & Spares <br /><span class=\"gradient-title-text\">Direct at Wholesale Rates</span>",
      heroLead: "Supplying authentic industrial bearings, power transmission belts, and precision workshop solutions to rice & oil mills, cement plants, workshops, and contractors across Nepal. Eliminate machine downtime with verified genuine inventory.",
      guaranteeTitle: "100% Genuine Parts Guarantee",
      guaranteeText: "Eliminate the risk of duplicity in your machinery. Every single bearing, belt, and spare is verified authentic with factory packaging.",
      btnWaQuote: "Instant WhatsApp Quote",
      btnCallSales: "Call Sales Desk",
      btnBrowseCatalog: "Browse 4-Category Catalog",
      skuMetric: "SKUs in Stock",
      counterfeitMetric: "Zero Counterfeits",
      dispatchMetric: "Warehouse Dispatch",
      trustMetric: "Regional Trust",
      promoHeadline: "Bulk Order Special — <span class=\"nepali-text-emphasis\">Special Rates for Bulk Orders!</span>",
      promoSubtext: "Special contracted wholesale pricing for mills, processing plants, machine workshops, and bulk retailers across Nepal.",
      catalogHeading: "Complete Industrial Inventory & Services",
      catalogDesc: "Select any category below to jump into technical size matrices, tolerances, and direct wholesale dispatch."
    },
    ne: {
      txtTopTrust: "<strong>नेपालको भरपर्दो स्वतन्त्र थोक आपूर्तिकर्ता</strong> — १००% ओरिजिनल बियरिङ्ग तथा इन्डस्ट्रियल स्पेयर्स।",
      heroTitle: "हेभी-ड्युटी बियरिङ्ग, कन्वेयर बेल्ट र स्पेयर्स <br /><span class=\"gradient-title-text\">सिधै थोक मूल्यमा उपलब्ध</span>",
      heroLead: "नेपालभरिका चामल, तेल तथा दाल मिल, सिमेन्ट उद्योग, क्रसर र वर्कशपहरूलाई ओरिजिनल बियरिङ्ग र बेल्टहरू द्रुत ढुवानीसहित उपलब्ध गराइन्छ। नक्कली सामानको जोखिमबाट आफ्नो मेसिनरी जोगाउनुहोस्।",
      guaranteeTitle: "१००% ओरिजिनल सामानको पूर्ण ग्यारेन्टी",
      guaranteeText: "तपाईंको मेसिनमा डुप्लिकेट बियरिङ्गको जोखिम शून्य बनाउनुहोस्। प्रत्येक सामान फ्याक्ट्री सिल प्याकमा उपलब्ध छ।",
      btnWaQuote: "ह्वाट्सएपमा मूल्य सोध्नुहोस्",
      btnCallSales: "बिक्री कक्षमा कल गर्नुहोस्",
      btnBrowseCatalog: "थोक सामानको सूची हेर्नुहोस्",
      skuMetric: "स्टकमा उपलब्ध सामान",
      counterfeitMetric: "शून्य डुप्लिकेट जोखिम",
      dispatchMetric: "सोही दिन ढुवानी",
      trustMetric: "वर्षको विश्वास",
      promoHeadline: "थोक अर्डर विशेष — <span class=\"nepali-text-emphasis\">आज Order गर्दा Special Rate उपलब्ध छ!</span>",
      promoSubtext: "उद्योग, मिल, क्रसर तथा डिलरहरूका लागि विशेष सम्झौता थोक मूल्य उपलब्ध छ।",
      catalogHeading: "सम्पूर्ण इन्डस्ट्रियल सामान तथा वर्कशप सेवाहरू",
      catalogDesc: "कुनै पनि वर्ग चयन गरी प्राविधिक साइज, क्षमता र सिधै अर्डर प्रक्रिया हेर्नुहोस्।"
    }
  };

  let currentLang = localStorage.getItem('shree_anjani_lang') || 'en';

  window.setLanguage = function (lang) {
    currentLang = lang;
    localStorage.setItem('shree_anjani_lang', lang);
    document.documentElement.lang = lang;

    const btnEn = document.getElementById('langBtnEn');
    const btnNe = document.getElementById('langBtnNe');
    if (btnEn && btnNe) {
      btnEn.classList.toggle('active', lang === 'en');
      btnNe.classList.toggle('active', lang === 'ne');
    }

    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const topTrust = document.getElementById('txtTopTrust');
    if (topTrust) topTrust.innerHTML = t.txtTopTrust;

    showToast(lang === 'ne' ? 'नेपाली भाषा चयन गरियो' : 'Language switched to English');
  };

  // ================= 2. RESEARCHED BEARING STANDARD SIZE MATRICES =================
  const BEARING_SIZE_DATA = {
    '6200': [
      { part: '6204 2RS / ZZ', id: '20 mm', od: '47 mm', w: '14 mm', app: 'Small Flour Mills, Electric Motors, Agricultural Pumps' },
      { part: '6205 2RS / ZZ', id: '25 mm', od: '52 mm', w: '15 mm', app: 'Centrifugal Water Pumps, Rice Mill Polisher Shafts' },
      { part: '6206 2RS / ZZ', id: '30 mm', od: '62 mm', w: '16 mm', app: 'Standard 30mm Motor Drives, Conveyor Return Rollers' },
      { part: '6207 2RS / ZZ', id: '35 mm', od: '72 mm', w: '17 mm', app: 'Heavy Paddy Huller Shafts, Industrial Blowers' },
      { part: '6208 2RS / ZZ', id: '40 mm', od: '80 mm', w: '18 mm', app: 'Oil Expeller Main Shafts, Tractor Implement Gearboxes' },
      { part: '6209 2RS / ZZ', id: '45 mm', od: '85 mm', w: '19 mm', app: 'Industrial Reducer Gearboxes, Cement Screw Conveyors' },
      { part: '6210 2RS / ZZ', id: '50 mm', od: '90 mm', w: '20 mm', app: 'Heavy 50mm Industrial Drives, Mill Countershafts' }
    ],
    '6300': [
      { part: '6305 2RS / ZZ', id: '25 mm', od: '62 mm', w: '17 mm', app: 'Heavy Shock Load Pumps, High Torque Gear Drives' },
      { part: '6306 2RS / ZZ', id: '30 mm', od: '72 mm', w: '19 mm', app: 'Rice Huller Beater Shafts, Pulverizer Hammers' },
      { part: '6307 2RS / ZZ', id: '35 mm', od: '80 mm', w: '21 mm', app: 'Dal Mill De-husker, Brick Plant Extruder' },
      { part: '6308 2RS / ZZ', id: '40 mm', od: '90 mm', w: '23 mm', app: 'Heavy 3-Phase Electric Motors (15-25 HP), Crusher Drives' },
      { part: '6309 2RS / ZZ', id: '45 mm', od: '100 mm', w: '25 mm', app: 'Paddy Destoner Vibrating Shafts, Oil Mill Main Barrel' },
      { part: '6310 2RS / ZZ', id: '50 mm', od: '110 mm', w: '27 mm', app: 'Heavy Stone Crusher Screeners, 50 HP Motor Shafts' },
      { part: '6312 2RS / ZZ', id: '60 mm', od: '130 mm', w: '31 mm', app: 'Cement Plant Fan Shafts, Heavy Industrial Agitators' }
    ],
    '22200': [
      { part: '22212 EK / W33', id: '60 mm', od: '110 mm', w: '28 mm', app: 'Stone Crusher Vibrating Screens, Heavy Vibratory Feeders' },
      { part: '22214 EK / W33', id: '70 mm', od: '125 mm', w: '31 mm', app: 'Asphalt Hot Mix Plant Drums, Heavy Conveyor Head Pulleys' },
      { part: '22216 EK / W33', id: '80 mm', od: '140 mm', w: '33 mm', app: 'Rotary Kiln Support Rollers, Primary Jaw Crusher Drives' },
      { part: '22218 EK / W33', id: '90 mm', od: '160 mm', w: '40 mm', app: 'Heavy Stone Jaw Crushers (24x12, 30x15 size in Nepal)' },
      { part: '22220 EK / W33', id: '100 mm', od: '180 mm', w: '46 mm', app: 'Cement Clinker Grinding Mills, Heavy Steel Mill Rollers' }
    ],
    '30200': [
      { part: '30205', id: '25 mm', od: '52 mm', w: '16.25 mm', app: 'Light Commercial Vehicle Wheel Hubs, Speed Reducers' },
      { part: '30206', id: '30 mm', od: '62 mm', w: '17.25 mm', app: 'Tractor Front Axle Hubs, Industrial Bevel Gearboxes' },
      { part: '30207', id: '35 mm', od: '72 mm', w: '18.25 mm', app: 'Truck Intermediate Shafts, Heavy Worm Reducers' },
      { part: '30208', id: '40 mm', od: '80 mm', w: '19.75 mm', app: 'Heavy Commercial Tipper Hubs, Agro Harvester Drives' },
      { part: '30209', id: '45 mm', od: '85 mm', w: '20.75 mm', app: 'Heavy Differential Pinion Shafts, Crusher Idler Hubs' },
      { part: '32210', id: '50 mm', od: '90 mm', w: '24.75 mm', app: 'High Axial Thrust Mill Gearboxes, Heavy Duty Axles' }
    ],
    'ucp': [
      { part: 'UCP 204', id: '20 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Packaging Conveyor Lines, Grain Cleaner Elevators' },
      { part: 'UCP 205', id: '25 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Standard 25mm Rice Mill Belt Conveyors, Sieve Shakers' },
      { part: 'UCP 206', id: '30 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Paddy Elevator Head/Tail Shafts, Agro Trommels' },
      { part: 'UCP 207', id: '35 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Medium Duty Conveyor Systems, Seed Processing Plants' },
      { part: 'UCP 208', id: '40 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Rice Mill Rubber Roll Huller Main Shafts (High Demand in Terai)' },
      { part: 'UCP 209', id: '45 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Heavy Paddy Separator Shafts, Flour Mill Rotors' },
      { part: 'UCP 210', id: '50 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Stone Crusher Discharge Belt Head Drum Shafts' },
      { part: 'UCP 212', id: '60 mm', od: 'Cast Iron Housing', w: 'Solid Base', app: 'Heavy Duty 60mm Crusher Conveyor Drives & Elevators' }
    ]
  };

  // ================= 3. RESEARCHED V-BELT & CONVEYOR STANDARD DIMENSIONS =================
  const BELT_SIZE_DATA = {
    'b-section': [
      { code: 'V-Belt B-45 to B-60', width: '17 mm', thick: '11 mm', len: 'Inside Length: 45" to 60"', app: 'Standard Electric Motor to Water Pump Drives' },
      { code: 'V-Belt B-65 (Top Demand)', width: '17 mm', thick: '11 mm', len: 'Inside Length: 65" (1651 mm)', app: 'Universal Rice Mill Polisher & Huller Drives in Nepal' },
      { code: 'V-Belt B-70 to B-85', width: '17 mm', thick: '11 mm', len: 'Inside Length: 70" to 85"', app: 'Flour Mill Chakkis, Centrifugal Blowers' },
      { code: 'V-Belt B-90 to B-120', width: '17 mm', thick: '11 mm', len: 'Inside Length: 90" to 120"', app: 'Agricultural Threshers, Tractor Pulley Linkages' },
      { code: 'V-Belt B-130 to B-180', width: '17 mm', thick: '11 mm', len: 'Inside Length: 130" to 180"', app: 'Long Center Distance Overhead Line Shafts' }
    ],
    'c-section': [
      { code: 'V-Belt C-68 to C-90', width: '22 mm', thick: '14 mm', len: 'Inside Length: 68" to 90"', app: 'Heavy 30-50 HP Rice Mill Main Drive Motors' },
      { code: 'V-Belt C-100 to C-120', width: '22 mm', thick: '14 mm', len: 'Inside Length: 100" to 120"', app: 'Oil Expeller 6-Bolt & 9-Bolt Chamber Drives' },
      { code: 'V-Belt C-130 to C-160', width: '22 mm', thick: '14 mm', len: 'Inside Length: 130" to 160"', app: 'Stone Crusher Secondary Cone & Jaw Flywheels' },
      { code: 'V-Belt C-180 to C-240', width: '22 mm', thick: '14 mm', len: 'Inside Length: 180" to 240"', app: 'Heavy Cement Packing Plants, Clinker Elevator Drives' }
    ],
    'a-section': [
      { code: 'V-Belt A-30 to A-45', width: '13 mm', thick: '8 mm', len: 'Inside Length: 30" to 45"', app: 'Small Workshop Lathes, Drill Presses, Compressors' },
      { code: 'V-Belt A-50 to A-75', width: '13 mm', thick: '8 mm', len: 'Inside Length: 50" to 75"', app: 'Grain Destoner Sieve Blowers, Domestic Flour Chakkis' },
      { code: 'V-Belt A-80 to A-120', width: '13 mm', thick: '8 mm', len: 'Inside Length: 80" to 120"', app: 'Paddy Cleaner Exhaust Fans, Light Belt Conveyors' }
    ],
    'conveyor': [
      { code: 'Rubber Conveyor EP 400/3 (16" / 400mm)', width: '400 mm', thick: '3+1.5 mm covers', len: 'Tensile: 400 N/mm (3 Ply)', app: 'Paddy & Rice Grain Handling Conveyors, Mill Elevators' },
      { code: 'Rubber Conveyor EP 400/3 (20" / 500mm)', width: '500 mm', thick: '3+1.5 mm covers', len: 'Tensile: 400 N/mm (3 Ply)', app: 'Bag Loading Conveyors, Fertilizer & Agro Transport' },
      { code: 'Rubber Conveyor EP 500/3 (24" / 600mm)', width: '600 mm', thick: '4+2 mm covers', len: 'Tensile: 500 N/mm (3 Ply)', app: 'River Sand, Gravel & Stone Crusher Feeder Belts' },
      { code: 'Rubber Conveyor EP 630/4 (32" / 800mm)', width: '800 mm', thick: '5+2 mm covers', len: 'Tensile: 630 N/mm (4 Ply)', app: 'Heavy Stone Crusher Discharge, Mining & Quarry Stockpiles' }
    ]
  };

  // Render Bearing Matrix Table
  window.filterBearingMatrix = function (seriesKey) {
    const chipContainer = document.querySelector('#bearings-deepdive .matrix-filter-bar');
    if (chipContainer) {
      chipContainer.querySelectorAll('.chip-btn').forEach(btn => btn.classList.remove('active'));
    }
    const currentBtn = event?.target;
    if (currentBtn && currentBtn.classList.contains('chip-btn')) {
      currentBtn.classList.add('active');
    }

    const tbody = document.getElementById('bearingMatrixTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const items = BEARING_SIZE_DATA[seriesKey] || BEARING_SIZE_DATA['6200'];
    items.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="part-num-highlight">${item.part}</span></td>
        <td><strong>${item.id}</strong></td>
        <td>${item.od}</td>
        <td>${item.w}</td>
        <td>${item.app}</td>
        <td>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Namaste Shree Anjani Belt & Bearing! Inquiring wholesale rate & stock for Bearing: ' + item.part)}" target="_blank" rel="noopener noreferrer" class="btn-matrix-wa" title="WhatsApp Quote">
            <i class="fa-brands fa-whatsapp"></i> Get Quote
          </a>
        </td>
      `;
      tbody.appendChild(tr);
    });
  };

  // Render Belt Matrix Table
  window.filterBeltMatrix = function (sectionKey) {
    const chipContainer = document.querySelector('#belts-deepdive .matrix-filter-bar');
    if (chipContainer) {
      chipContainer.querySelectorAll('.chip-btn').forEach(btn => btn.classList.remove('active'));
    }
    const currentBtn = event?.target;
    if (currentBtn && currentBtn.classList.contains('chip-btn')) {
      currentBtn.classList.add('active');
    }

    const tbody = document.getElementById('beltMatrixTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const items = BELT_SIZE_DATA[sectionKey] || BELT_SIZE_DATA['b-section'];
    items.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="part-num-highlight">${item.code}</span></td>
        <td><strong>${item.width}</strong></td>
        <td>${item.thick}</td>
        <td>${item.len}</td>
        <td>${item.app}</td>
        <td>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Namaste Shree Anjani Belt & Bearing! Inquiring wholesale rate & stock for Belt: ' + item.code)}" target="_blank" rel="noopener noreferrer" class="btn-matrix-wa" title="WhatsApp Quote">
            <i class="fa-brands fa-whatsapp"></i> Get Quote
          </a>
        </td>
      `;
      tbody.appendChild(tr);
    });
  };

  // ================= 4. BEARING BRAND INTERCHANGE CALCULATOR =================
  const INTERCHANGE_DATABASE = [
    {
      baseCode: "6205",
      dims: "25 x 52 x 15 mm",
      skf: "6205-2RS1 / 6205-ZZ",
      nbc: "6205 LLU / 6205 ZZ",
      urb: "6205 2RS",
      ntn: "6205 LLUC3",
      fag: "6205-2RSR",
      nsk: "6205 DDU",
      koyo: "6205 2RS",
      app: "Rice Mill Polisher Shafts, 5HP Electric Motors, Centrifugal Pumps",
      clearance: "Normal / C3",
      stockStatus: "Ready Stock in Siddharthanagar Hub"
    },
    {
      baseCode: "6309",
      dims: "45 x 100 x 25 mm",
      skf: "6309-2RS1 / C3",
      nbc: "6309 LLU C3",
      urb: "6309 2RS",
      ntn: "6309 LLU",
      fag: "6309-2RSR-C3",
      nsk: "6309 DDUC3",
      koyo: "6309 2RS",
      app: "Heavy Destoner Vibrating Shafts, Oil Expeller Barrels, 25-40 HP Motor",
      clearance: "C3 Radial Internal",
      stockStatus: "Ready Stock in Siddharthanagar Hub"
    },
    {
      baseCode: "22218",
      dims: "90 x 160 x 40 mm",
      skf: "22218 EK / W33",
      nbc: "22218 CA / W33",
      urb: "22218 EK C3 (Brass Cage)",
      ntn: "22218 EAKD1",
      fag: "22218-E1-K",
      nsk: "22218 EAE4",
      koyo: "22218 RHR",
      app: "Stone Crusher 24x12 Jaw & Vibrating Screens, Clinker Grinding Mills",
      clearance: "C3 Spherical Roller (Taper/Cylindrical Bore)",
      stockStatus: "Ready Stock in Siddharthanagar Hub"
    },
    {
      baseCode: "30206",
      dims: "30 x 62 x 17.25 mm",
      skf: "30206 J2/Q",
      nbc: "30206",
      urb: "30206",
      ntn: "30206",
      fag: "30206-A",
      nsk: "HR30206J",
      koyo: "30206JR",
      app: "Tractor Front Axle Hubs, Reducer Gearboxes, Intermediate Pinion Shafts",
      clearance: "Taper Roller (High Radial & Axial Thrust)",
      stockStatus: "Ready Stock in Siddharthanagar Hub"
    },
    {
      baseCode: "6207",
      dims: "35 x 72 x 17 mm",
      skf: "6207-2RS1",
      nbc: "6207 LLU",
      urb: "6207 2RS",
      ntn: "6207 LLU",
      fag: "6207-2RSR",
      nsk: "6207 DDU",
      koyo: "6207 2RS",
      app: "Heavy Paddy Huller Main Shafts, Industrial Blowers",
      clearance: "Normal / C3",
      stockStatus: "Ready Stock in Siddharthanagar Hub"
    },
    {
      baseCode: "6312",
      dims: "60 x 130 x 31 mm",
      skf: "6312-2RS1 / C3",
      nbc: "6312 ZZ C3",
      urb: "6312 2RS",
      ntn: "6312 LLU",
      fag: "6312-2RSR",
      nsk: "6312 DDU",
      koyo: "6312 2RS",
      app: "Heavy Cement Plant Exhaust Fans, 50-75 HP Main Motor Drives",
      clearance: "C3 Radial Internal",
      stockStatus: "Ready Stock in Siddharthanagar Hub"
    }
  ];

  window.setInterchangePreset = function (code) {
    const input = document.getElementById('interchangeInput');
    if (input) {
      input.value = code;
      window.runBearingInterchange();
    }
  };

  window.runBearingInterchange = function () {
    const input = document.getElementById('interchangeInput');
    const resultBox = document.getElementById('interchangeResultBox');
    if (!input || !resultBox) return;

    const raw = input.value.toUpperCase().trim();
    if (!raw) {
      resultBox.innerHTML = `
        <div class="calc-result-heading">Equivalent Part In Stock</div>
        <div class="calc-result-value" style="font-size: 1.2rem; color: var(--text-muted);">Type a bearing part number to see cross-reference</div>
      `;
      return;
    }

    // Extract core numbers (e.g. "6309", "22218", "6205")
    const match = INTERCHANGE_DATABASE.find(item => raw.includes(item.baseCode)) || {
      baseCode: raw,
      dims: "Standard ISO Dimensions",
      skf: `SKF ${raw}`,
      nbc: `NBC ${raw}`,
      urb: `URB ${raw}`,
      ntn: `NTN ${raw}`,
      fag: `FAG ${raw}`,
      nsk: `NSK ${raw}`,
      koyo: `KOYO ${raw}`,
      app: "General Industrial Mill & Transmission Equipment in Nepal",
      clearance: "C3 / Normal",
      stockStatus: "Verified Stock in Siddharthanagar Hub"
    };

    resultBox.innerHTML = `
      <div class="calc-result-heading">Cross-Reference Match for: <span style="color: #fff;">${raw}</span></div>
      <div class="calc-result-value" style="color: var(--orange-electric); font-size: 1.4rem;">
        SKF ${match.skf} | NBC ${match.nbc} | URB ${match.urb}
      </div>
      <div class="calc-result-memo" style="margin-top: 0.6rem;">
        • Dimensions ($d \\times D \\times B$): <strong>${match.dims}</strong><br />
        • Recommended Clearance: <strong>${match.clearance}</strong><br />
        • Common Machine Application: <strong>${match.app}</strong><br />
        • Warehouse Availability: <strong style="color: #34D399;">${match.stockStatus}</strong>
      </div>
      <table class="interchange-table-compact">
        <tr style="background: rgba(255,255,255,0.04); font-weight: bold; color: #fff;">
          <td>Input / Brand</td>
          <td>Direct In-Stock Equivalent</td>
          <td>Action</td>
        </tr>
        <tr>
          <td>SKF</td>
          <td><strong>${match.skf}</strong></td>
          <td><a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring stock & rate for ' + match.skf)}" target="_blank" class="btn-matrix-wa" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;"><i class="fa-brands fa-whatsapp"></i> Quote</a></td>
        </tr>
        <tr>
          <td>NBC</td>
          <td><strong>${match.nbc}</strong></td>
          <td><a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring stock & rate for ' + match.nbc)}" target="_blank" class="btn-matrix-wa" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;"><i class="fa-brands fa-whatsapp"></i> Quote</a></td>
        </tr>
        <tr>
          <td>URB</td>
          <td><strong>${match.urb}</strong></td>
          <td><a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring stock & rate for ' + match.urb)}" target="_blank" class="btn-matrix-wa" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;"><i class="fa-brands fa-whatsapp"></i> Quote</a></td>
        </tr>
        <tr>
          <td>NTN / FAG / NSK</td>
          <td><strong>${match.ntn}</strong></td>
          <td><a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring stock & rate for ' + match.ntn)}" target="_blank" class="btn-matrix-wa" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;"><i class="fa-brands fa-whatsapp"></i> Quote</a></td>
        </tr>
      </table>
    `;
  };

  // ================= 5. V-BELT & PULLEY CENTER DISTANCE CALCULATOR =================
  window.runBeltCalculator = function () {
    const d1 = parseFloat(document.getElementById('calcPulleyD1')?.value) || 6;
    const d2 = parseFloat(document.getElementById('calcPulleyD2')?.value) || 12;
    const c = parseFloat(document.getElementById('calcCenterDist')?.value) || 24;

    const mmValSpan = document.getElementById('centerDistMmVal');
    if (mmValSpan) {
      mmValSpan.textContent = `≈ ${(c * 25.4).toFixed(1)} mm`;
    }

    // Standard Mechanical Engineering Formula:
    // L = 2*C + (pi/2)*(D1 + D2) + ((D2 - D1)^2)/(4*C)
    const pitchLengthInches = (2 * c) + (Math.PI / 2) * (d1 + d2) + (Math.pow(d2 - d1, 2) / (4 * c));
    const pitchLengthMm = pitchLengthInches * 25.4;
    const speedRatio = (Math.max(d1, d2) / Math.min(d1, d2)).toFixed(2);

    // Closest Standard Belt Size
    const approxNumber = Math.round(pitchLengthInches);
    let section = "B";
    if (d1 < 4.5) section = "A";
    else if (d1 >= 9.0) section = "C";

    const beltCode = `V-Belt ${section}-${approxNumber}`;

    const outputCode = document.getElementById('calcBeltOutputCode');
    const outputDetails = document.getElementById('calcBeltOutputDetails');
    const waCta = document.getElementById('calcBeltWhatsAppCta');

    if (outputCode) outputCode.textContent = `${beltCode} (Pitch: ${pitchLengthInches.toFixed(1)}")`;
    if (outputDetails) {
      outputDetails.innerHTML = `
        • Calculated Pitch Length: <strong>${pitchLengthInches.toFixed(2)} inches (${pitchLengthMm.toFixed(0)} mm)</strong><br />
        • Speed Ratio: <strong>${speedRatio} : 1</strong> (${d1 > d2 ? 'Speed Increaser' : 'Speed Reducer'})<br />
        • Recommended Section: <strong>${section}-Section (${section === 'A' ? '13×8' : section === 'B' ? '17×11' : '22×14'} mm)</strong>
      `;
    }
    if (waCta) {
      waCta.href = `https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring wholesale rate for ' + beltCode + ' calculated for ' + d1 + '" x ' + d2 + '" pulleys at ' + c + '" center distance.')}`;
      waCta.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Inquire Wholesale Rate for ${beltCode}`;
    }
  };

  // ================= 6. DIGITAL MACHINE LEDGER (FACTORY PROFILES) =================
  const LEDGER_KEY = 'shree_anjani_machine_ledger';
  const DEFAULT_LEDGER_DATA = [
    {
      id: 'm1',
      name: "Lumbini Rice Mill — Line 1 Huller",
      type: "Rice Milling (Terai)",
      parts: ["6207 2RS (2 pcs)", "UCP 208-24 (4 pcs)", "V-Belt B-65 (3 pcs)", "Oil Seal 45x65x10 (2 pcs)"]
    },
    {
      id: 'm2',
      name: "Western Stone Crusher — Primary Jaw",
      type: "Crusher & Mining",
      parts: ["22218 EK Spherical (2 pcs)", "V-Belt C-144 (6 pcs)", "UCP 212 (2 pcs)", "Coupling L-095"]
    },
    {
      id: 'm3',
      name: "Bhairahawa Agro Feeds — 50HP Main Blower",
      type: "Feed Processing",
      parts: ["6310 2RS C3 (2 pcs)", "V-Belt B-85 (4 pcs)", "Spider Insert L-100"]
    }
  ];

  function loadLedgerProfiles() {
    let saved = JSON.parse(localStorage.getItem(LEDGER_KEY));
    if (!saved || saved.length === 0) {
      saved = DEFAULT_LEDGER_DATA;
      localStorage.setItem(LEDGER_KEY, JSON.stringify(saved));
    }
    renderLedgerCards(saved);
  }

  function renderLedgerCards(list) {
    const grid = document.getElementById('machineLedgerCardsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    list.forEach(m => {
      const card = document.createElement('div');
      card.className = 'machine-card';
      card.innerHTML = `
        <div>
          <div class="machine-card-head">
            <span class="machine-name-title">${m.name}</span>
            <span class="machine-type-tag">${m.type}</span>
          </div>
          <p style="font-size: 0.775rem; color: var(--text-muted); margin-bottom: 0.4rem;">Installed Spares &amp; Dimensions:</p>
          <div class="ledger-parts-list">
            ${m.parts.map(p => `<span class="ledger-part-pill">${p}</span>`).join('')}
          </div>
        </div>
        <div>
          <button type="button" class="btn-reorder-ledger" onclick="window.reorderMachineLedger('${m.id}')">
            <i class="fa-brands fa-whatsapp"></i> 1-Tap Emergency Breakdown Reorder
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  window.saveMachineToLedger = function () {
    const name = document.getElementById('ledgerMachineName')?.value.trim();
    const type = document.getElementById('ledgerMachineType')?.value.trim();
    const partsStr = document.getElementById('ledgerPartsList')?.value.trim();

    if (!name || !partsStr) {
      showToast('Please fill in machine name and installed part sizes.');
      return;
    }

    const parts = partsStr.split(',').map(s => s.trim()).filter(Boolean);
    const newMachine = {
      id: 'm_' + Date.now(),
      name,
      type: type || 'General Factory Machine',
      parts
    };

    let list = JSON.parse(localStorage.getItem(LEDGER_KEY)) || DEFAULT_LEDGER_DATA;
    list.unshift(newMachine);
    localStorage.setItem(LEDGER_KEY, JSON.stringify(list));

    renderLedgerCards(list);
    document.getElementById('addMachineLedgerForm')?.reset();
    showToast(`Machine "${name}" saved to Digital Ledger!`);
  };

  window.reorderMachineLedger = function (id) {
    let list = JSON.parse(localStorage.getItem(LEDGER_KEY)) || DEFAULT_LEDGER_DATA;
    const m = list.find(x => x.id === id);
    if (!m) return;

    let msg = `*EMERGENCY MACHINE BREAKDOWN REORDER*\n`;
    msg += `*Machine Line:* ${m.name} (${m.type})\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*REQUIRED SPARES IN STOCK:*\n`;
    m.parts.forEach((p, idx) => {
      msg += `${idx + 1}. ${p}\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm immediate warehouse availability and fastest Bilty transport dispatch timeline.`;

    const waUrl = `https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  // ================= 7. TIME-TRIGGERED EMERGENCY FAB & OPERATING STATUS =================
  function checkOperatingStatusAndEmergencyFab() {
    const statusElem = document.getElementById('liveOperatingStatus');
    const fabElem = document.querySelector('.fab-pill-action');
    const fabToast = document.querySelector('.fab-bubble-toast');

    try {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const nepalOffset = 5.75 * 3600000; // UTC+5:45 in ms
      const nepalDate = new Date(utc + nepalOffset);

      const day = nepalDate.getDay(); // 0 = Sun, 6 = Sat
      const hour = nepalDate.getHours();
      const minute = nepalDate.getMinutes();
      const currentTimeDecimal = hour + (minute / 60);

      let isOpen = false;
      let isEmergencyHours = false;
      let statusText = '';

      if (day >= 1 && day <= 5) {
        // Mon - Fri: 8:00 AM to 8:00 PM
        isOpen = currentTimeDecimal >= 8.0 && currentTimeDecimal < 20.0;
        statusText = isOpen ? 'Open Now (Till 8:00 PM)' : 'Closed (Emergency Open)';
        isEmergencyHours = !isOpen;
      } else if (day === 6) {
        // Saturday: 10:00 AM to Midnight (24.0)
        isOpen = currentTimeDecimal >= 10.0 && currentTimeDecimal < 24.0;
        statusText = isOpen ? 'Open Now (Saturday Open Till Midnight)' : 'Emergency Breakdown Open';
        isEmergencyHours = currentTimeDecimal >= 18.0 || !isOpen; // Saturday evening is peak emergency
      } else if (day === 0) {
        // Sunday: 8:00 AM to 8:00 PM
        isOpen = currentTimeDecimal >= 8.0 && currentTimeDecimal < 20.0;
        statusText = isOpen ? 'Open Now (Sunday Open Till 8:00 PM)' : 'Emergency Hotline Active';
        isEmergencyHours = !isOpen;
      }

      if (statusElem) {
        if (isOpen) {
          statusElem.innerHTML = `<span class="status-pulse"></span> ${statusText}`;
          statusElem.style.color = '#34D399';
          statusElem.style.borderColor = 'rgba(16, 185, 129, 0.3)';
          statusElem.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
        } else {
          statusElem.innerHTML = `<i class="fa-solid fa-bolt" style="font-size: 0.75rem;"></i> ${statusText} • 980-4462602`;
          statusElem.style.color = '#FFAE73';
          statusElem.style.borderColor = 'rgba(255, 85, 0, 0.4)';
          statusElem.style.backgroundColor = 'rgba(255, 85, 0, 0.15)';
        }
      }

      // Dynamic Emergency FAB Transition during off-hours or Saturday nights
      if (fabElem && fabToast) {
        if (isEmergencyHours) {
          fabElem.classList.add('fab-emergency-pulse');
          fabToast.classList.add('emergency-toast-alert');
          fabToast.innerHTML = `
            <span class="bubble-heading">🚨 Factory Breakdown?</span>
            <span class="bubble-caption">Emergency Saturday/Night dispatch open</span>
          `;
        } else {
          fabElem.classList.remove('fab-emergency-pulse');
          fabToast.classList.remove('emergency-toast-alert');
          fabToast.innerHTML = `
            <span class="bubble-heading">Need Wholesale Price?</span>
            <span class="bubble-caption">Instant response on WhatsApp</span>
          `;
        }
      }

    } catch (e) {
      console.warn('Nepal timezone evaluation fallback:', e);
    }
  }

  // ================= 8. CATALOG SEARCH =================
  window.searchCatalog = function () {
    const input = document.getElementById('partSearchInput');
    if (!input) return;
    const query = input.value.trim();

    if (!query) {
      showToast('Please type a bearing number, belt size, or keyword.');
      input.focus();
      return;
    }

    const lower = query.toLowerCase();
    if (lower.includes('62') || lower.includes('63') || lower.includes('222') || lower.includes('302') || lower.includes('ucp') || lower.includes('bearing')) {
      document.getElementById('bearings-deepdive')?.scrollIntoView({ behavior: 'smooth' });
      showToast(`Browsing technical size matrices for "${query}"`);
    } else if (lower.includes('belt') || lower.includes('pulley') || lower.includes('conveyor') || lower.includes('b-') || lower.includes('c-')) {
      document.getElementById('belts-deepdive')?.scrollIntoView({ behavior: 'smooth' });
      showToast(`Browsing belt specifications for "${query}"`);
    } else {
      const msg = `Namaste Shree Anjani Belt and Bearing! I want to check availability & wholesale price for: *${query}*`;
      const waUrl = `https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent(msg)}`;
      showToast(`Checking live warehouse stock for "${query}"...`);
      window.open(waUrl, '_blank');
    }
  };

  // ================= 9. RFQ MODAL =================
  window.sendDirectWhatsAppInquiry = function () {
    const partNo = (document.getElementById('quickPartNo')?.value || '').trim();
    const qty = (document.getElementById('quickQty')?.value || '').trim();
    const company = (document.getElementById('quickCompany')?.value || '').trim();
    const location = (document.getElementById('quickLocation')?.value || '').trim();

    if (!partNo) {
      showToast('Please enter the Bearing/Belt part number or description.');
      document.getElementById('quickPartNo')?.focus();
      return;
    }

    let message = `*WHOLESALE INQUIRY - SHREE ANJANI BELT & BEARING*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `• *Part/Item:* ${partNo}\n`;
    if (qty) message += `• *Quantity:* ${qty}\n`;
    if (company) message += `• *Company/Mill:* ${company}\n`;
    if (location) message += `• *Delivery District:* ${location}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Please provide stock availability and best wholesale rate.`;

    const waUrl = `https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  window.openRfqModal = function () {
    const modal = document.getElementById('rfqModal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeRfqModal = function () {
    const modal = document.getElementById('rfqModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  window.submitModalRfq = function () {
    const category = document.getElementById('modalCategory')?.value || '';
    const specs = document.getElementById('modalPartNumbers')?.value || '';
    const company = document.getElementById('modalCompanyName')?.value || '';
    const phone = document.getElementById('modalPhone')?.value || '';
    const district = document.getElementById('modalDistrict')?.value || '';

    if (!specs || !company || !district) {
      showToast('Please fill all required fields marked with *');
      return;
    }

    let message = `*OFFICIAL B2B WHOLESALE RFQ*\n`;
    message += `*Shree Anjani Belt and Bearing Store*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📁 *Category:* ${category}\n`;
    message += `📋 *Items / Specs:* \n${specs}\n`;
    message += `🏢 *Company / Mill:* ${company}\n`;
    if (phone) message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Delivery District:* ${district}, Nepal\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Kindly send wholesale rates and transport dispatch timeline.`;

    const waUrl = `https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    window.closeRfqModal();
    showToast('Quote request dispatched to WhatsApp Sales Desk!');
  };

  function showToast(text) {
    const container = document.getElementById('toastNotification');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-pill';
    toast.innerHTML = `<i class="fa-solid fa-circle-info text-orange"></i> <span>${text}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  // ================= 10. INITIALIZATION =================
  window.filterBearingMatrix('6200');
  window.filterBeltMatrix('b-section');
  window.runBearingInterchange();
  window.runBeltCalculator();
  loadLedgerProfiles();
  checkOperatingStatusAndEmergencyFab();
  setInterval(checkOperatingStatusAndEmergencyFab, 60000);

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    });
  }

})();
