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
      dims: "25 x 52 x 15 mm (0.984 x 2.047 x 0.591 in)",
      skf: "6205-2RS1 (Sweden 🇸🇪)",
      nbc: "6205 LLU (India 🇮🇳)",
      urb: "6205 2RS (Romania 🇷🇴)",
      ntn: "6205 LLUC3 (Japan 🇯🇵)",
      fag: "6205-2RSR (Germany 🇩🇪)",
      nsk: "6205 DDU (Japan 🇯🇵)",
      koyo: "6205 2RS (Japan 🇯🇵)",
      cr: "14.8 kN",
      cor: "7.8 kN",
      app: "Rice Mill Polisher Shafts, 5HP Electric Motors, Centrifugal Water Pumps",
      clearance: "Normal / C3 (ISO 5753-1)",
      speedLimit: "12,000 RPM (Grease)",
      stockStatus: "Verified Ready Stock in Siddharthanagar Hub"
    },
    {
      baseCode: "6309",
      dims: "45 x 100 x 25 mm (1.771 x 3.937 x 0.984 in)",
  // ================= 3. MULTI-TIER BRAND BEARING INTERCHANGE & DIMENSIONS DATABASE =================
  const INTERCHANGE_DATABASE = [
    {
      baseCode: "6204",
      dims: "20 × 47 × 14 mm",
      d_mm: 20,
      D_mm: 47,
      B_mm: 14,
      weight_kg: "0.11 kg",
      cr: "13.5 kN",
      cor: "6.55 kN",
      speedLimit: "18,000 RPM (Grease) / 22,000 RPM (Oil)",
      clearance: "Normal / C3 Radial Clearance",
      app: "Small Flour Mills, Electric Motors (1-3 HP), Centrifugal Water Pumps",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 6204-2RS1 (Sweden 🇸🇪) • NTN 6204 LLU (Japan 🇯🇵) • FAG 6204-2RSR (Germany 🇩🇪)",
          durability: "★★★★★ (Max Lifespan under continuous 24/7 industrial run)",
          priceTag: "NPR 380 - 450 / unit",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6204 LLU (India 🇮🇳) • ARB 6204 2RS (India 🇮🇳) • ZKL 6204 2RS (Czech 🇨🇿)",
          durability: "★★★★☆ (Excellent balance of reliability and cost for mills)",
          priceTag: "NPR 260 - 320 / unit",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6204 2RS (India/UAE 🇮🇳) • HI-BOND 6204 (India 🇮🇳) • V-TECH / KG Economy",
          durability: "★★★☆☆ (Best for intermittent, light-duty, or cost-sensitive agro drives)",
          priceTag: "NPR 140 - 190 / unit",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "6205",
      dims: "25 × 52 × 15 mm",
      d_mm: 25,
      D_mm: 52,
      B_mm: 15,
      weight_kg: "0.13 kg",
      cr: "14.8 kN",
      cor: "7.8 kN",
      speedLimit: "15,000 RPM (Grease) / 18,000 RPM (Oil)",
      clearance: "Normal / C3 Radial Clearance",
      app: "Centrifugal Water Pumps, Rice Mill Polisher Shafts, 3-5 HP Electric Motors",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 6205-2RS1 (Sweden 🇸🇪) • NTN 6205 LLU (Japan 🇯🇵) • URB 6205 2RS (Romania 🇷🇴)",
          durability: "★★★★★ (Highest precision, noise-free, zero early fatigue)",
          priceTag: "NPR 480 - 550 / unit",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6205 LLU (India 🇮🇳) • ARB 6205 2RS (India 🇮🇳) • KOYO 6205 2RS (Japan 🇯🇵)",
          durability: "★★★★☆ (Top choice for commercial rice/flour mills in Nepal)",
          priceTag: "NPR 320 - 390 / unit",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6205 2RS (India/UAE 🇮🇳) • HI-BOND 6205 • V-TECH / Chinese Industrial Grade",
          durability: "★★★☆☆ (Cost-effective solution for light agricultural machinery)",
          priceTag: "NPR 160 - 220 / unit",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "6308",
      dims: "40 × 90 × 23 mm",
      d_mm: 40,
      D_mm: 90,
      B_mm: 23,
      weight_kg: "0.64 kg",
      cr: "42.5 kN",
      cor: "24.0 kN",
      speedLimit: "8,500 RPM (Grease) / 10,000 RPM (Oil)",
      clearance: "C3 Radial Internal Clearance (High Heat & Shock)",
      app: "Heavy 3-Phase Electric Motors (15-25 HP), Crusher Intermediate Drives, Oil Mill Barrels",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 6308-2RS1/C3 (Sweden 🇸🇪) • FAG 6308-2RSR-C3 (Germany 🇩🇪) • NTN 6308 LLU C3",
          durability: "★★★★★ (Engineered for high thermal loads and heavy motor armatures)",
          priceTag: "NPR 1,450 - 1,750 / unit",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6308 2RS C3 (India 🇮🇳) • ARB 6308 C3 (India 🇮🇳) • ZKL 6308 2RS (Czech 🇨🇿)",
          durability: "★★★★☆ (Heavy-duty plant standard across Lumbini Province)",
          priceTag: "NPR 980 - 1,250 / unit",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6308 2RS (India/UAE 🇮🇳) • HI-BOND 6308 • V-TECH Heavy Duty Line",
          durability: "★★★☆☆ (Economic choice for slower shaft speeds & secondary equipment)",
          priceTag: "NPR 550 - 750 / unit",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "22212",
      dims: "60 × 110 × 28 mm",
      d_mm: 60,
      D_mm: 110,
      B_mm: 28,
      weight_kg: "1.15 kg",
      cr: "156.0 kN",
      cor: "166.0 kN",
      speedLimit: "5,300 RPM (Oil/Grease)",
      clearance: "C3 Spherical Roller (Self-Aligning with W33 Lube Groove)",
      app: "Stone Crusher Vibrating Screens, Heavy Vibratory Feeders, Asphalt Mixers",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 22212 EK/W33 (Sweden 🇸🇪) • URB 22212 EK C3 (Romania 🇷🇴) • NTN 22212 EAKD1",
          durability: "★★★★★ (Withstands massive quarry vibration and shock without cracking)",
          priceTag: "NPR 4,800 - 5,900 / unit",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 22212 CA/W33 (India 🇮🇳) • ARB 22212 EK (India 🇮🇳) • ZKL 22212 (Czech 🇨🇿)",
          durability: "★★★★☆ (Proven track record in crushing & screening plants in Nepal)",
          priceTag: "NPR 3,400 - 4,200 / unit",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 22212 EK • HI-BOND Spherical • KG International 22212",
          durability: "★★★☆☆ (Budget replacement for low-vibration secondary rollers)",
          priceTag: "NPR 1,950 - 2,600 / unit",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "22218",
      dims: "90 × 160 × 40 mm",
      d_mm: 90,
      D_mm: 160,
      B_mm: 40,
      weight_kg: "3.45 kg",
      cr: "345.0 kN",
      cor: "375.0 kN",
      speedLimit: "3,800 RPM (Oil/Grease)",
      clearance: "C3 Spherical Roller (Tapered 1:12 Bore with Adapter Sleeve H318)",
      app: "Primary Stone Jaw Crushers (24x12 & 30x15 size), Rotary Kilns, Heavy Clinker Grinding Mills",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 22218 EK/W33 (Sweden 🇸🇪) • URB 22218 EK C3 (Romania 🇷🇴) • FAG 22218-E1-K",
          durability: "★★★★★ (Ultra high dynamic capacity for boulder crushing impacts)",
          priceTag: "NPR 8,500 - 11,500 / unit",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 22218 CA/W33 (India 🇮🇳) • ARB 22218 EK (India 🇮🇳) • KOYO 22218 RHR",
          durability: "★★★★☆ (Strong reliability for medium-heavy aggregate crushing plants)",
          priceTag: "NPR 6,200 - 7,800 / unit",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 22218 EK • HI-BOND 22218 • Commercial Chinese Quarry Grade",
          durability: "★★★☆☆ (Cost-saving option for lighter duty secondary crushing stages)",
          priceTag: "NPR 3,800 - 4,900 / unit",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "30206",
      dims: "30 × 62 × 17.25 mm",
      d_mm: 30,
      D_mm: 62,
      B_mm: 17.25,
      weight_kg: "0.24 kg",
      cr: "43.5 kN",
      cor: "45.0 kN",
      speedLimit: "9,000 RPM",
      clearance: "Tapered Roller (High Combined Radial & Axial Thrust)",
      app: "Tractor Front Axle Hubs, Industrial Reducer Gearboxes, Bevel Pinion Shafts",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 30206 J2/Q (Sweden 🇸🇪) • NTN 30206 (Japan 🇯🇵) • TIMKEN 30206 (USA 🇺🇸)",
          durability: "★★★★★ (Case-carburized alloy steel for heavy vehicle shock loads)",
          priceTag: "NPR 680 - 850 / unit",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 30206 (India 🇮🇳) • ARB 30206 (India 🇮🇳) • ZKL 30206 (Czech 🇨🇿)",
          durability: "★★★★☆ (Widespread standard for commercial vehicles and gearboxes in Nepal)",
          priceTag: "NPR 450 - 580 / unit",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 30206 • HI-BOND 30206 • V-TECH Taper Line",
          durability: "★★★☆☆ (Economy solution for agro implements and trailer axles)",
          priceTag: "NPR 250 - 340 / unit",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "UCP 208",
      dims: "40 mm Bore (1.575 in) • Solid Cast Iron Pillow Block Housing",
      d_mm: 40,
      D_mm: 184,
      B_mm: 49.2,
      weight_kg: "2.10 kg",
      cr: "29.1 kN",
      cor: "17.8 kN",
      speedLimit: "4,800 RPM",
      clearance: "Self-Aligning Insert Ball Bearing with Set-Screw Lock",
      app: "Rice Mill Rubber Roll Huller Shafts (High Demand in Nepal), Agro Conveyors, Elevators",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "NTN UCP 208D1 (Japan 🇯🇵) • SKF SY 40 TF (Sweden 🇸🇪) • FYH UCP 208 (Japan 🇯🇵)",
          durability: "★★★★★ (Heavy ductile iron housing, dual triple-lip sealing for paddy dust)",
          priceTag: "NPR 2,100 - 2,650 / unit",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC UCP 208 (India 🇮🇳) • ARB UCP 208 (India 🇮🇳) • URB UCP 208 (Romania 🇷🇴)",
          durability: "★★★★☆ (Standard workhorse across rice mills in Terai region)",
          priceTag: "NPR 1,350 - 1,750 / unit",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI UCP 208 • HI-BOND UCP 208 • V-TECH Block Line",
          durability: "★★★☆☆ (Economical unit for slow speed grain elevators and sorting conveyors)",
          priceTag: "NPR 750 - 950 / unit",
          tagClass: "tier-economy"
        }
      }
    }
  ];

  window.switchCalcTab = function (tabKey) {
    const btnInterchange = document.getElementById('tabBtnInterchange');
    const btnBelt = document.getElementById('tabBtnBelt');
    const panelInterchange = document.getElementById('panelCalcInterchange');
    const panelBelt = document.getElementById('panelCalcBelt');

    if (tabKey === 'interchange') {
      btnInterchange?.classList.add('active');
      btnBelt?.classList.remove('active');
      if (panelInterchange) panelInterchange.style.display = 'block';
      if (panelBelt) panelBelt.style.display = 'none';
      window.runBearingInterchange();
    } else {
      btnBelt?.classList.add('active');
      btnInterchange?.classList.remove('active');
      if (panelBelt) panelBelt.style.display = 'block';
      if (panelInterchange) panelInterchange.style.display = 'none';
      window.runBeltCalculator();
    }
  };

  window.setInterchangePreset = function (code) {
    const input = document.getElementById('interchangeInput');
    if (input) {
      input.value = code;
      window.switchCalcTab('interchange');
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
        <div class="calc-result-heading">Multi-Tier Brand &amp; Dimensions Calculator</div>
        <div class="calc-result-value" style="font-size: 1.15rem; color: var(--text-muted);">Type any bearing number (e.g. 6205, 6308, 22212, 22218, 30206, UCP 208) to inspect exact dimensions and all brand tier options</div>
      `;
      return;
    }

    const match = INTERCHANGE_DATABASE.find(item => raw.includes(item.baseCode) || item.baseCode.includes(raw)) || {
      baseCode: raw,
      dims: "Standard ISO Dimensions Available",
      d_mm: "Standard",
      D_mm: "Standard",
      B_mm: "Standard",
      weight_kg: "Standard ISO Weight",
      cr: "Standard ISO Load Rating",
      cor: "Standard ISO Load Rating",
      speedLimit: "Standard Industrial Rating",
      clearance: "Normal / C3 Radial Clearance",
      app: "Industrial Mills, Crushers, Motors & Transmission Shafts in Nepal",
      stockStatus: "Ready Stock in Siddharthanagar Hub",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: `SKF ${raw} (Sweden 🇸🇪) • NTN ${raw} (Japan 🇯🇵) • FAG ${raw} (Germany 🇩🇪)`,
          durability: "★★★★★ (Max Heavy-Duty Lifespan)",
          priceTag: "Wholesale Rate on Direct Inquiry",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: `NBC ${raw} (India 🇮🇳) • ARB ${raw} (India 🇮🇳) • ZKL ${raw} (Czech 🇨🇿)`,
          durability: "★★★★☆ (Standard Plant Workhorse)",
          priceTag: "Wholesale Rate on Direct Inquiry",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: `DPI ${raw} • HI-BOND ${raw} • V-TECH / KG Commercial Line`,
          durability: "★★★☆☆ (Best for Cost-Sensitive / Light Applications)",
          priceTag: "Wholesale Rate on Direct Inquiry",
          tagClass: "tier-economy"
        }
      }
    };

    resultBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem;">
        <div class="calc-result-heading" style="margin-bottom: 0;">Technical Specs &amp; Tier Matrix For: <strong style="color: #FFFFFF; font-size: 1.1rem; text-decoration: underline var(--orange-electric);">${raw}</strong></div>
        <span style="background: rgba(16, 185, 129, 0.15); color: #34D399; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: var(--radius-pill); border: 1px solid rgba(16, 185, 129, 0.3);">
          <i class="fa-solid fa-circle-check"></i> ${match.stockStatus}
        </span>
      </div>

      <!-- Tech Specs Dimensions Grid -->
      <div class="interchange-spec-grid">
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">Dimensions ($d \\times D \\times B$)</span>
          <span class="spec-tile-value" style="color: var(--cyan-accent);">${match.dims}</span>
        </div>
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">Bore ($d$) / OD ($D$) / Width ($B$)</span>
          <span class="spec-tile-value">${match.d_mm} mm × ${match.D_mm} mm × ${match.B_mm} mm</span>
        </div>
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">Dynamic Load ($C_r$) / Static ($C_{0r}$)</span>
          <span class="spec-tile-value">${match.cr} / ${match.cor}</span>
        </div>
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">Ref Speed / Weight</span>
          <span class="spec-tile-value">${match.speedLimit} • ${match.weight_kg}</span>
        </div>
      </div>

      <p style="font-size: 0.825rem; color: #E2E8F0; margin: 0.75rem 0 1rem; line-height: 1.45;">
        ⚙️ <strong>Primary Nepal Industry Application:</strong> ${match.app}
      </p>

      <!-- 3-Tier Brand Options Grid (Premium vs Standard vs Economy) -->
      <div class="brand-tiers-comparison-grid">
        
        <!-- Tier 1: Premium -->
        <div class="brand-tier-card tier-premium-card">
          <div class="tier-card-header">
            <span class="tier-badge-pill badge-tier-premium">💎 PREMIUM HEAVY-DUTY</span>
            <span class="tier-durability">${match.tiers.premium.durability}</span>
          </div>
          <div class="tier-brand-names">${match.tiers.premium.brands}</div>
          <div class="tier-price-est">Estimated: <strong>${match.tiers.premium.priceTag}</strong></div>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring Premium Tier (SKF/NTN/FAG) wholesale price for ' + raw)}" target="_blank" class="btn-tier-action btn-tier-premium-action">
            <i class="fa-brands fa-whatsapp"></i> Inquire Premium Rate
          </a>
        </div>

        <!-- Tier 2: Standard -->
        <div class="brand-tier-card tier-standard-card">
          <div class="tier-card-header">
            <span class="tier-badge-pill badge-tier-standard">⚡ STANDARD INDUSTRIAL</span>
            <span class="tier-durability">${match.tiers.standard.durability}</span>
          </div>
          <div class="tier-brand-names">${match.tiers.standard.brands}</div>
          <div class="tier-price-est">Estimated: <strong>${match.tiers.standard.priceTag}</strong></div>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring Standard Tier (NBC/ARB/ZKL) wholesale price for ' + raw)}" target="_blank" class="btn-tier-action btn-tier-standard-action">
            <i class="fa-brands fa-whatsapp"></i> Inquire Standard Rate
          </a>
        </div>

        <!-- Tier 3: Economy -->
        <div class="brand-tier-card tier-economy-card">
          <div class="tier-card-header">
            <span class="tier-badge-pill badge-tier-economy">💰 BUDGET / ECONOMY</span>
            <span class="tier-durability">${match.tiers.economy.durability}</span>
          </div>
          <div class="tier-brand-names">${match.tiers.economy.brands}</div>
          <div class="tier-price-est">Estimated: <strong>${match.tiers.economy.priceTag}</strong></div>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring Budget Economy Tier (DPI/HI-BOND/V-TECH) wholesale price for ' + raw)}" target="_blank" class="btn-tier-action btn-tier-economy-action">
            <i class="fa-brands fa-whatsapp"></i> Inquire Budget Rate
          </a>
        </div>

      </div>
    `;
  };
          <td><strong>${match.urb}</strong></td>
          <td style="text-align: right;"><a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring stock & wholesale price for URB ' + match.urb)}" target="_blank" class="btn-matrix-wa" style="font-size: 0.725rem; padding: 0.3rem 0.65rem;"><i class="fa-brands fa-whatsapp"></i> Get Quote</a></td>
        </tr>
        <tr>
          <td><strong>NTN / FAG / NSK</strong></td>
          <td><strong>${match.ntn}</strong> / <strong>${match.fag}</strong></td>
          <td style="text-align: right;"><a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring stock & wholesale price for ' + match.ntn)}" target="_blank" class="btn-matrix-wa" style="font-size: 0.725rem; padding: 0.3rem 0.65rem;"><i class="fa-brands fa-whatsapp"></i> Get Quote</a></td>
        </tr>
      </table>
    `;
  };

  // ================= 5. V-BELT & PULLEY CENTER DISTANCE CALCULATOR =================
  window.runBeltCalculator = function () {
    const d1 = parseFloat(document.getElementById('calcPulleyD1')?.value) || 6;
    const d2 = parseFloat(document.getElementById('calcPulleyD2')?.value) || 12;
    const c = parseFloat(document.getElementById('calcCenterDist')?.value) || 24;

    // Update MM Hints
    const d1Mm = document.getElementById('d1MmHint');
    const d2Mm = document.getElementById('d2MmHint');
    const mmValSpan = document.getElementById('centerDistMmVal');
    if (d1Mm) d1Mm.textContent = `≈ ${(d1 * 25.4).toFixed(1)} mm`;
    if (d2Mm) d2Mm.textContent = `≈ ${(d2 * 25.4).toFixed(1)} mm`;
    if (mmValSpan) mmValSpan.textContent = `≈ ${(c * 25.4).toFixed(1)} mm`;

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

    // Update SVG Pulley Visuals
    const svgD1 = document.getElementById('svgPulleyD1');
    const svgD2 = document.getElementById('svgPulleyD2');
    const svgD1Label = document.getElementById('svgD1Label');
    const svgD2Label = document.getElementById('svgD2Label');
    const svgCenterText = document.getElementById('svgCenterDistText');
    const svgBeltPath = document.getElementById('svgBeltPath');

    if (svgD1 && svgD2) {
      const r1 = Math.min(50, Math.max(18, d1 * 4.5));
      const r2 = Math.min(65, Math.max(22, d2 * 4.5));
      svgD1.setAttribute('r', r1);
      svgD2.setAttribute('r', r2);
      if (svgD1Label) svgD1Label.textContent = `D1: ${d1}"`;
      if (svgD2Label) svgD2Label.textContent = `D2: ${d2}"`;
      if (svgCenterText) svgCenterText.textContent = `Center Distance C = ${c.toFixed(1)}" (${(c * 25.4).toFixed(0)} mm)`;

      if (svgBeltPath) {
        // Dynamically compute tangent connection points for animated belt
        const yTop1 = 80 - r1;
        const yBot1 = 80 + r1;
        const yTop2 = 80 - r2;
        const yBot2 = 80 + r2;
        svgBeltPath.setAttribute('d', `M120 ${yTop1} L360 ${yTop2} A${r2} ${r2} 0 0 1 360 ${yBot2} L120 ${yBot1} A${r1} ${r1} 0 0 1 120 ${yTop1} Z`);
      }
    }

    const outputCode = document.getElementById('calcBeltOutputCode');
    const outputDetails = document.getElementById('calcBeltOutputDetails');
    const waCta = document.getElementById('calcBeltWhatsAppCta');

    if (outputCode) outputCode.textContent = `${beltCode} (Pitch Length: ${pitchLengthInches.toFixed(1)}")`;
    if (outputDetails) {
      outputDetails.innerHTML = `
        • Calculated Pitch Length: <strong>${pitchLengthInches.toFixed(2)} inches (${pitchLengthMm.toFixed(0)} mm)</strong><br />
        • Speed Reduction Ratio: <strong>${speedRatio} : 1</strong> (${d1 > d2 ? 'Speed Increaser' : 'Speed Reducer'})<br />
        • Recommended Section: <strong>${section}-Section (${section === 'A' ? '13×8' : section === 'B' ? '17×11' : '22×14'} mm)</strong><br />
        • Standard Motor RPM: <strong>1440 RPM $\\rightarrow$ Driven Shaft: ${(1440 / speedRatio).toFixed(0)} RPM</strong>
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

  // ================= 8. MULTI-TIER CATALOG SEARCH =================
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
    const bearingMatch = INTERCHANGE_DATABASE.find(b => lower.includes(b.baseCode.toLowerCase()) || b.baseCode.toLowerCase().includes(lower));

    if (bearingMatch || lower.includes('62') || lower.includes('63') || lower.includes('222') || lower.includes('302') || lower.includes('ucp') || lower.includes('bearing') || lower.includes('roller')) {
      const targetCode = bearingMatch ? bearingMatch.baseCode : query;
      window.setInterchangePreset(targetCode);
      document.getElementById('engineering-tools')?.scrollIntoView({ behavior: 'smooth' });
      showToast(`Showing 3 Brand Tiers & Dimensions for "${targetCode}"`);
    } else if (lower.includes('belt') || lower.includes('pulley') || lower.includes('conveyor') || lower.includes('b-') || lower.includes('c-') || lower.includes('a-')) {
      document.getElementById('belts-deepdive')?.scrollIntoView({ behavior: 'smooth' });
      showToast(`Browsing power transmission belt specs for "${query}"`);
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

  // ================= 10. NEPALI BILINGUAL VOICE SEARCH =================
  window.startNepaliVoiceSearch = function () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const btn = document.getElementById('nepaliVoiceBtn');
    const textSpan = document.getElementById('voiceBtnText');

    if (!SpeechRecognition) {
      showToast('Voice search not supported on this browser. Try Chrome or Android.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ne-NP';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      if (btn) {
        btn.style.background = 'rgba(239, 68, 68, 0.25)';
        btn.style.borderColor = '#EF4444';
      }
      if (textSpan) textSpan.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Listening in Nepali... (बोल्नुहोस्)';
      showToast('Listening... Speak bearing part number (e.g. "६२०५", "६३०९", "२२२१८", "युसिपी २०८")');

      recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.toLowerCase();
        
        // Nepali digit converter
        const nepaliDigits = {'०':'0', '१':'1', '२':'2', '३':'3', '४':'4', '५':'5', '६':'6', '७':'7', '८':'8', '९':'9'};
        let converted = transcript.replace(/[०-९]/g, char => nepaliDigits[char]);

        showToast(`Heard: "${transcript}" -> Searching: "${converted}"`);

        // Check matching series
        if (converted.includes('62') || converted.includes('६२')) {
          window.filterBearingMatrix('6200');
        } else if (converted.includes('63') || converted.includes('६३')) {
          window.filterBearingMatrix('6300');
        } else if (converted.includes('222') || converted.includes('२२२')) {
          window.filterBearingMatrix('22200');
        } else if (converted.includes('302') || converted.includes('३०२')) {
          window.filterBearingMatrix('30200');
        } else if (converted.includes('ucp') || converted.includes('युसिपी')) {
          window.filterBearingMatrix('ucp');
        }

        // Trigger interchange preset if matching
        if (converted.includes('6205') || converted.includes('6205')) window.setInterchangePreset('SKF 6205');
        if (converted.includes('6309')) window.setInterchangePreset('NSK 6309');
        if (converted.includes('22218')) window.setInterchangePreset('FAG 22218');
        if (converted.includes('30206')) window.setInterchangePreset('KOYO 30206');
        if (converted.includes('208')) window.setInterchangePreset('NTN UCP 208');

        document.getElementById('bearings-deepdive')?.scrollIntoView({ behavior: 'smooth' });
      };

      recognition.onerror = function (e) {
        console.warn('Speech recognition error:', e);
        showToast('Voice not recognized. Please try speaking clearly.');
      };

      recognition.onend = function () {
        if (btn) {
          btn.style.background = 'rgba(255, 85, 0, 0.15)';
          btn.style.borderColor = 'var(--orange-electric)';
        }
        if (textSpan) textSpan.textContent = 'Nepali Voice Search (बोलेर खोज्नुहोस्)';
      };

      recognition.start();
    } catch (err) {
      console.warn('Voice recognition initialization error:', err);
      showToast('Voice Search Error: ' + err.message);
    }
  };

  // ================= 11. 1-CLICK PROFORMA INVOICE PDF GENERATOR =================
  window.generatePublicPdfProforma = function () {
    const partNo = document.getElementById('quickPartNo')?.value || 'SKF 6205-2RS / Fenner B-65';
    const qty = document.getElementById('quickQty')?.value || '10';
    const company = document.getElementById('quickCompany')?.value || 'Valued Industrial Customer';
    const district = document.getElementById('quickLocation')?.value || 'Siddharthanagar';
    const dateStr = new Date().toLocaleDateString('en-GB');

    const printWin = window.open('', '_blank', 'width=800,height=900');
    if (!printWin) {
      showToast('Please allow popups to download quotation PDF.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Shree Anjani — Official Wholesale Quotation</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1E293B; margin: 0; padding: 2.5rem; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #FF5500; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
          .brand-title { font-size: 1.5rem; font-weight: 800; color: #0F172A; }
          .brand-sub { font-size: 0.9rem; color: #FF5500; font-weight: bold; }
          .meta-box { font-size: 0.85rem; line-height: 1.5; text-align: right; }
          .client-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.9rem; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.9rem; }
          th { background: #0F172A; color: #FFFFFF; text-align: left; padding: 0.65rem 0.75rem; }
          td { border-bottom: 1px solid #E2E8F0; padding: 0.65rem 0.75rem; }
          .total-box { margin-left: auto; width: 320px; font-size: 0.95rem; line-height: 1.8; }
          .grand-total { font-size: 1.15rem; font-weight: bold; color: #FF5500; border-top: 2px solid #0F172A; padding-top: 0.4rem; }
          .qr-seal-wrap { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2.5rem; border-top: 1px dashed #CBD5E1; padding-top: 1.5rem; }
          .seal-box { border: 2px solid #059669; color: #059669; font-weight: bold; padding: 0.5rem 1rem; border-radius: 4px; display: inline-block; font-size: 0.8rem; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 1rem; text-align: right;">
          <button onclick="window.print()" style="background: #FF5500; color: #fff; border: none; padding: 0.6rem 1.25rem; font-weight: bold; border-radius: 4px; cursor: pointer;">🖨️ Print / Save as PDF</button>
        </div>
        <div class="header">
          <div>
            <div class="brand-title">SHREE ANJANI BELT &amp; BEARING STORE</div>
            <div class="brand-sub">ESTB. 2026 • RELIABILITY | QUALITY | SERVICE</div>
            <div style="font-size: 0.85rem; color: #64748B; margin-top: 0.25rem;">Formerly Known as <em>Shree Balaji Belt Center</em></div>
            <div style="font-size: 0.85rem; color: #64748B;">Siddharthanagar (Bhairahawa), Nepal • PAN: 601249821</div>
          </div>
          <div class="meta-box">
            <div><strong>ESTIMATE / PROFORMA QUOTE</strong></div>
            <div>Date: ${dateStr}</div>
            <div>Hotline: 980-4462602</div>
            <div>Warehouse: 984-7301185</div>
          </div>
        </div>

        <div class="client-box">
          <strong>Quotation Issued To:</strong><br />
          <strong>Client / Company:</strong> ${company}<br />
          <strong>Delivery Destination:</strong> ${district}, Nepal<br />
          <strong>Dispatch Hub:</strong> Siddharthanagar Main Warehouse
        </div>

        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Description / Part Number</th>
              <th>Brand Origin</th>
              <th>Qty</th>
              <th>Estimated Rate (NPR)</th>
              <th style="text-align: right;">Amount (NPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><strong>${partNo}</strong></td>
              <td>Genuine SKF / NBC / URB</td>
              <td>${qty} pcs</td>
              <td>Market Wholesale Rate</td>
              <td style="text-align: right;">Contact Sales Desk</td>
            </tr>
          </tbody>
        </table>

        <div class="qr-seal-wrap">
          <div>
            <div class="seal-box">✓ 100% GENUINE FACTORY SPARES GUARANTEED</div>
            <p style="font-size: 0.75rem; color: #64748B; margin-top: 0.5rem;">Subject to final stock availability at Siddharthanagar Hub.</p>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 0.75rem; font-weight: bold; color: #0F172A; margin-bottom: 0.25rem;">Fonepay / Nepal QR Accepted</div>
            <div style="width: 80px; height: 80px; border: 1px solid #CBD5E1; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #64748B; margin: 0 auto; background: #F8FAFC;">
              [ QR Code ]
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWin.document.write(htmlContent);
    printWin.document.close();
    showToast('Proforma Quote generated in new window!');
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

  // ================= 12. BILINGUAL I18N SWITCHER =================
  const I18N_DICT = {
    en: {
      topTrust: "<strong>Nepal's Trusted Independent Wholesale Supplier</strong> for Genuine Bearings & Industrial Spares.",
      heroSubtitle: "ESTB. 2026 • RELIABILITY | QUALITY | SERVICE",
      heroBadge: "🇳🇵 100% GENUINE INDUSTRIAL BEARINGS & V-BELTS",
      heroHeadline: "Nepal's Premier Wholesale Hub for Bearings & Industrial Spares",
      heroDesc: "Direct supply of authentic SKF, NBC, URB, and NTN bearings, classical V-belts, conveyor systems, and CI pulleys. Same-day Bilty dispatch from Siddharthanagar warehouse.",
      btnCatalog: "Explore Size Matrices",
      btnEmergency: "🚨 Emergency Saturday Breakdown (Open Till Midnight)",
      liveOpen: "Open Now (Siddharthanagar)",
      liveSat: "Emergency Saturday Breakdown Open Till Midnight"
    },
    ne: {
      topTrust: "<strong>नेपालको भरपर्दो होलसेल सप्लायर</strong> — १००% ओरिजिनल बियरिङ्ग, कन्वेयर बेल्ट र मेसिनरी स्पेयर पार्ट्स।",
      heroSubtitle: "स्थापना २०८२ • विश्वसनीयता | गुणस्तर | निरन्तर सेवा",
      heroBadge: "🇳🇵 १००% ओरिजिनल इन्डस्ट्रियल बियरिङ्ग र भी-बेल्ट",
      heroHeadline: "नेपालभरिका मिल तथा उद्योगका लागि ओरिजिनल बियरिङ्ग र बेल्ट",
      heroDesc: "SKF, NBC, URB, र NTN बियरिङ्ग, भी-बेल्ट, कन्वेयर र पुल्लीहरू भैरहवा गोदामबाट नेपालभर तत्काल बिल्टी डेलिभरी।",
      btnCatalog: "साइज र विवरण हेर्नुहोस्",
      btnEmergency: "🚨 शनिबार राति १२ बजेसम्म आपतकालीन सेवा खुला",
      liveOpen: "अहिले खुला छ (सिद्धार्थनगर)",
      liveSat: "शनिबार मध्यरातसम्म आपतकालीन सेवा खुला"
    }
  };

  window.setLanguage = function (lang) {
    const activeLang = lang === 'ne' ? 'ne' : 'en';
    document.documentElement.lang = activeLang;
    try { localStorage.setItem('shree_anjani_lang', activeLang); } catch (e) {}

    const btnEn = document.getElementById('langBtnEn');
    const btnNe = document.getElementById('langBtnNe');
    if (btnEn) btnEn.classList.toggle('active', activeLang === 'en');
    if (btnNe) btnNe.classList.toggle('active', activeLang === 'ne');

    const d = I18N_DICT[activeLang];
    const elTopTrust = document.getElementById('txtTopTrust');
    if (elTopTrust) elTopTrust.innerHTML = d.topTrust;

    showToast(activeLang === 'ne' ? 'भाषा नेपालीमा परिवर्तन भयो (Language: Nepali)' : 'Language switched to English');
  };

  // ================= 13. DYNAMIC SCROLL READING PROGRESS BAR & MOBILE SEARCH =================
  window.toggleMobileSearch = function () {
    const searchWrap = document.querySelector('.header-search-wrapper');
    if (!searchWrap) return;
    const isVisible = searchWrap.classList.toggle('mobile-search-active');
    if (isVisible) {
      const input = document.getElementById('partSearchInput');
      if (input) input.focus();
    }
  };

  function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    let ticking = false;
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
      progressBar.style.width = progress + '%';
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  // ================= 14. INITIALIZATION =================
  window.filterBearingMatrix('6200');
  window.filterBeltMatrix('b-section');
  window.runBearingInterchange();
  window.runBeltCalculator();
  loadLedgerProfiles();
  checkOperatingStatusAndEmergencyFab();
  initScrollProgressBar();
  setInterval(checkOperatingStatusAndEmergencyFab, 60000);

  // Auto-detect Language from URL or Storage
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const savedLang = localStorage.getItem('shree_anjani_lang');
  if (urlLang === 'ne' || (!urlLang && savedLang === 'ne')) {
    window.setLanguage('ne');
  }

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    });
  }

})();
