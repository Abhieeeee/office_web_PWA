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
    '6000': [
      { part: '6004 2RS / ZZ', id: '20 mm', od: '42 mm', w: '12 mm', app: 'High-Speed Alternators, Small Workshop Power Tools, Compact Blowers' },
      { part: '6005 2RS / ZZ', id: '25 mm', od: '47 mm', w: '12 mm', app: 'Electric Motor Shafts (2-3 HP), Submersible Pumps, Lawn Equipments' },
      { part: '6006 2RS / ZZ', id: '30 mm', od: '55 mm', w: '13 mm', app: 'Conveyor Intermediate Rollers, Packaging Machine Drives' },
      { part: '6007 2RS / ZZ', id: '35 mm', od: '62 mm', w: '14 mm', app: 'High-Speed Centrifugal Impellers, Printing Press Rollers' },
      { part: '6008 2RS / ZZ', id: '40 mm', od: '68 mm', w: '15 mm', app: 'Textile Machinery Spindles, Feed Mill Vibrating Feeders' },
      { part: '6010 2RS / ZZ', id: '50 mm', od: '80 mm', w: '16 mm', app: 'High RPM Industrial Fans, Centrifugal Water Pumps in Agro Irrigation' },
      { part: '6012 2RS / ZZ', id: '60 mm', od: '95 mm', w: '18 mm', app: 'Compressor Crankshafts, Heavy Industrial Fan Assemblies' }
    ],
    '6200': [
      { part: '6200 2RS / ZZ', id: '10 mm', od: '30 mm', w: '9 mm', app: 'Small Electric Motors, Power Saws, Precision Instruments' },
      { part: '6202 2RS / ZZ', id: '15 mm', od: '35 mm', w: '11 mm', app: 'Domestic Water Pumps, Motorcycle Alternators, Starter Motors' },
      { part: '6204 2RS / ZZ', id: '20 mm', od: '47 mm', w: '14 mm', app: 'Small Flour Mills, Electric Motors (1-3 HP), Centrifugal Water Pumps' },
      { part: '6205 2RS / ZZ', id: '25 mm', od: '52 mm', w: '15 mm', app: 'Centrifugal Water Pumps, Rice Mill Polisher Shafts, 3-5 HP Motors' },
      { part: '6206 2RS / ZZ', id: '30 mm', od: '62 mm', w: '16 mm', app: 'Standard 30mm Motor Drives, Conveyor Return Rollers, Threshers' },
      { part: '6207 2RS / ZZ', id: '35 mm', od: '72 mm', w: '17 mm', app: 'Heavy Paddy Huller Shafts, Industrial Blowers, Dal Mill Separators' },
      { part: '6208 2RS / ZZ', id: '40 mm', od: '80 mm', w: '18 mm', app: 'Oil Expeller Main Shafts, Tractor Implement Gearboxes, Agro Drives' },
      { part: '6209 2RS / ZZ', id: '45 mm', od: '85 mm', w: '19 mm', app: 'Industrial Reducer Gearboxes, Cement Screw Conveyors' },
      { part: '6210 2RS / ZZ', id: '50 mm', od: '90 mm', w: '20 mm', app: 'Heavy 50mm Industrial Drives, Mill Countershafts, Elevator Pulleys' },
      { part: '6212 2RS / ZZ', id: '60 mm', od: '110 mm', w: '22 mm', app: 'Heavy Mill Line Shafts, Large Industrial Gearboxes, Brick Plants' },
      { part: '6214 2RS / ZZ', id: '70 mm', od: '125 mm', w: '24 mm', app: 'Heavy Cement & Fertilizer Elevators, Sugar Mill Conveyor Heads' },
      { part: '6215 2RS / ZZ', id: '75 mm', od: '130 mm', w: '25 mm', app: 'High Torque Reduction Drives, Heavy Duty Terai Industrial Shafts' }
    ],
    '6300': [
      { part: '6304 2RS / ZZ', id: '20 mm', od: '52 mm', w: '15 mm', app: 'High Torque Small Motors, Deep Well Pump Heads' },
      { part: '6305 2RS / ZZ', id: '25 mm', od: '62 mm', w: '17 mm', app: 'Heavy Shock Load Pumps, High Torque Gear Drives, Cultivators' },
      { part: '6306 2RS / ZZ', id: '30 mm', od: '72 mm', w: '19 mm', app: 'Rice Huller Beater Shafts, Pulverizer Hammers, 7.5 HP Motors' },
      { part: '6307 2RS / ZZ', id: '35 mm', od: '80 mm', w: '21 mm', app: 'Dal Mill De-husker, Brick Plant Extruder, Heavy Bevel Drives' },
      { part: '6308 2RS / ZZ C3', id: '40 mm', od: '90 mm', w: '23 mm', app: 'Heavy 3-Phase Electric Motors (15-25 HP), Crusher Intermediate Drives' },
      { part: '6309 2RS / ZZ C3', id: '45 mm', od: '100 mm', w: '25 mm', app: 'Paddy Destoner Vibrating Shafts, Oil Mill Main Barrel, 30 HP Motors' },
      { part: '6310 2RS / ZZ C3', id: '50 mm', od: '110 mm', w: '27 mm', app: 'Heavy Stone Crusher Screeners, 50 HP Motor Shafts, Hammer Mills' },
      { part: '6312 2RS / ZZ C3', id: '60 mm', od: '130 mm', w: '31 mm', app: 'Cement Plant Fan Shafts, Heavy Industrial Agitators, Clinker Lines' },
      { part: '6314 2RS / ZZ C3', id: '70 mm', od: '150 mm', w: '35 mm', app: 'Heavy Quarry Primary Crushers, Heavy Induced Draft (ID) Fans' },
      { part: '6315 2RS / ZZ C3', id: '75 mm', od: '160 mm', w: '37 mm', app: 'Steel Rolling Mill Auxiliary Shafts, Heavy Cement Grinders' }
    ],
    '22200': [
      { part: '22210 EK / W33', id: '50 mm', od: '90 mm', w: '23 mm', app: 'Vibrating Screens, Small Quarry Feeders, Sand Washing Units' },
      { part: '22212 EK / W33', id: '60 mm', od: '110 mm', w: '28 mm', app: 'Stone Crusher Vibrating Screens, Heavy Vibratory Feeders, Asphalt Mixers' },
      { part: '22214 EK / W33', id: '70 mm', od: '125 mm', w: '31 mm', app: 'Asphalt Hot Mix Plant Drums, Heavy Conveyor Head Pulleys' },
      { part: '22216 EK / W33', id: '80 mm', od: '140 mm', w: '33 mm', app: 'Rotary Kiln Support Rollers, Primary Jaw Crusher Drives' },
      { part: '22218 EK / W33', id: '90 mm', od: '160 mm', w: '40 mm', app: 'Heavy Stone Jaw Crushers (24x12 & 30x15 size in Nepal), Rotary Kilns' },
      { part: '22220 EK / W33', id: '100 mm', od: '180 mm', w: '46 mm', app: 'Cement Clinker Grinding Mills, Heavy Steel Mill Rollers, 36x24 Crushers' },
      { part: '22222 EK / W33', id: '110 mm', od: '200 mm', w: '53 mm', app: 'Primary Boulders Jaw Crushers (Nepal Highway & Hydropower Projects)' },
      { part: '22224 EK / W33', id: '120 mm', od: '215 mm', w: '58 mm', app: 'Heavy Hydropower Dam Construction Crushers, Cement Raw Mills' },
      { part: '22226 EK / W33', id: '130 mm', od: '230 mm', w: '64 mm', app: 'Mining SAG Mills, Heavy Ball Mill Trunnions, Heavy Quarry Crushers' },
      { part: '22228 EK / W33', id: '140 mm', od: '250 mm', w: '68 mm', app: 'Extreme Heavy Industrial Crushing & Grinding Plants in Nepal' }
    ],
    '22300': [
      { part: '22312 EK / W33', id: '60 mm', od: '130 mm', w: '46 mm', app: 'Severe Impact Vibrating Screens, Heavy Aggregate Screen Boxes' },
      { part: '22314 EK / W33', id: '70 mm', od: '150 mm', w: '51 mm', app: 'High G-Force Vibrating Screen Shafts, Asphalt Plant Mixers' },
      { part: '22316 EK / W33', id: '80 mm', od: '170 mm', w: '58 mm', app: 'Heavy Duty Quarry Jaw Crusher Pitman Shafts (Severe Shock Loads)' },
      { part: '22318 EK / W33', id: '90 mm', od: '190 mm', w: '64 mm', app: 'Primary Hard Rock Quarry Jaw Crushers (High Dynamic Capacity)' },
      { part: '22320 EK / W33', id: '100 mm', od: '215 mm', w: '73 mm', app: 'Heavy Clinker & Boulders Impact Crushers, Mining Trunnions' }
    ],
    '30200': [
      { part: '30205', id: '25 mm', od: '52 mm', w: '16.25 mm', app: 'Light Commercial Vehicle Wheel Hubs, Speed Reducers, Lathes' },
      { part: '30206', id: '30 mm', od: '62 mm', w: '17.25 mm', app: 'Tractor Front Axle Hubs, Industrial Bevel Gearboxes, Tillers' },
      { part: '30207', id: '35 mm', od: '72 mm', w: '18.25 mm', app: 'Truck Intermediate Shafts, Heavy Worm Reducers, Combine Harvesters' },
      { part: '30208', id: '40 mm', od: '80 mm', w: '19.75 mm', app: 'Heavy Commercial Tipper Hubs, Agro Harvester Drives, Tractor Transmissions' },
      { part: '30209', id: '45 mm', od: '85 mm', w: '20.75 mm', app: 'Heavy Differential Pinion Shafts, Crusher Idler Hubs, Truck Axles' },
      { part: '30210', id: '50 mm', od: '90 mm', w: '21.75 mm', app: 'Heavy Transport Trailer Hubs, Industrial Gearboxes, Rotary Tillers' },
      { part: '30211', id: '55 mm', od: '100 mm', w: '22.75 mm', app: 'Commercial Bus & Truck Rear Differential Pinion Shafts' },
      { part: '30212', id: '60 mm', od: '110 mm', w: '23.75 mm', app: 'Heavy Duty 60mm Transmission Reducers, Heavy Vehicle Axles' }
    ],
    '32200': [
      { part: '32208', id: '40 mm', od: '80 mm', w: '24.75 mm', app: 'High Thrust Reducer Gearboxes, Agricultural Tractor Axle Hubs' },
      { part: '32210', id: '50 mm', od: '90 mm', w: '24.75 mm', app: 'High Axial Thrust Mill Gearboxes, Heavy Duty Axles, Brick Mixers' },
      { part: '32212', id: '60 mm', od: '110 mm', w: '29.75 mm', app: 'Heavy Duty Planetary Drives, Stone Crusher Bevel Gear Sets' },
      { part: '32214', id: '70 mm', od: '125 mm', w: '33.25 mm', app: 'Heavy Commercial Truck Drive Axles, High Load Worm Drives' },
      { part: '32216', id: '80 mm', od: '140 mm', w: '35.25 mm', app: 'Heavy Industrial Reducer Output Shafts, Cement Mill Gearboxes' },
      { part: '32309', id: '45 mm', od: '100 mm', w: '38.25 mm', app: 'Extra Heavy Duty Commercial Vehicle Pinion & Tractor Drive Shafts' },
      { part: '32310', id: '50 mm', od: '110 mm', w: '42.25 mm', app: 'Heavy Commercial Vehicle Differential Assemblies in Nepal' },
      { part: '32312', id: '60 mm', od: '130 mm', w: '48.75 mm', app: 'Extreme Shock Load Truck Transmissions & Quarry Gear Drives' }
    ],
    'ucp': [
      { part: 'UCP 204', id: '20 mm', od: 'Cast Iron Solid Base', w: '127 mm Base', app: 'Packaging Conveyor Lines, Grain Cleaner Elevators, Small Blowers' },
      { part: 'UCP 205', id: '25 mm', od: 'Cast Iron Solid Base', w: '140 mm Base', app: 'Standard 25mm Rice Mill Belt Conveyors, Sieve Shakers, Feed Mixers' },
      { part: 'UCP 206', id: '30 mm', od: 'Cast Iron Solid Base', w: '165 mm Base', app: 'Paddy Elevator Head/Tail Shafts, Agro Trommels, Threshers' },
      { part: 'UCP 207', id: '35 mm', od: 'Cast Iron Solid Base', w: '167 mm Base', app: 'Medium Duty Conveyor Systems, Seed Processing Plants, Dal Mills' },
      { part: 'UCP 208 / 208-24', id: '40 mm (1.5" option)', od: 'Cast Iron Solid Base', w: '184 mm Base', app: 'Rice Mill Rubber Roll Huller Main Shafts (Universal Terai Workhorse)' },
      { part: 'UCP 209', id: '45 mm', od: 'Cast Iron Solid Base', w: '190 mm Base', app: 'Heavy Paddy Separator Shafts, Flour Mill Rotors, Expeller Feeders' },
      { part: 'UCP 210', id: '50 mm', od: 'Cast Iron Solid Base', w: '206 mm Base', app: 'Stone Crusher Discharge Belt Head Drum Shafts, Heavy Elevators' },
      { part: 'UCP 211', id: '55 mm', od: 'Cast Iron Solid Base', w: '219 mm Base', app: 'Heavy Duty 55mm Line Shafts, Cement Packing Conveyors' },
      { part: 'UCP 212', id: '60 mm', od: 'Cast Iron Solid Base', w: '241 mm Base', app: 'Heavy Duty 60mm Crusher Conveyor Drives, Heavy Bucket Elevators' },
      { part: 'UCP 214', id: '70 mm', od: 'Cast Iron Solid Base', w: '266 mm Base', app: 'Heavy Quarry Conveyors, Fertilizer Mixing Drums, Sand Washers' },
      { part: 'UCP 215', id: '75 mm', od: 'Cast Iron Solid Base', w: '275 mm Base', app: 'Large Diameter Main Transmission Shafts in Cement & Rice Plants' }
    ],
    'ucf': [
      { part: 'UCF 205 (4-Bolt Flange)', id: '25 mm', od: 'Square Cast Iron Flange', w: '95 × 95 mm', app: 'Flour Mill Sifter Side Frames, Grain Cleaner Side Walls' },
      { part: 'UCF 206 (4-Bolt Flange)', id: '30 mm', od: 'Square Cast Iron Flange', w: '108 × 108 mm', app: 'Paddy Destoner Side Mounting, Bucket Elevator Side Bearings' },
      { part: 'UCF 207 (4-Bolt Flange)', id: '35 mm', od: 'Square Cast Iron Flange', w: '117 × 117 mm', app: 'Screw Conveyor Trough Ends, Agro Processing Machines' },
      { part: 'UCF 208 (4-Bolt Flange)', id: '40 mm', od: 'Square Cast Iron Flange', w: '130 × 130 mm', app: 'Rice Mill Polisher Machine Side Flanges, Oil Expeller Walls' },
      { part: 'UCF 210 (4-Bolt Flange)', id: '50 mm', od: 'Square Cast Iron Flange', w: '143 × 143 mm', app: 'Heavy Screw Conveyors, Cement Silo Bottom Dischargers' },
      { part: 'UCF 212 (4-Bolt Flange)', id: '60 mm', od: 'Square Cast Iron Flange', w: '175 × 175 mm', app: 'Heavy Industrial Agitators, Rotary Drum Washer End Bearings' }
    ],
    'nu_nj': [
      { part: 'NU 208 / NJ 208', id: '40 mm', od: '80 mm', w: '18 mm', app: 'Electric Motor Drive Ends (15-20 HP), Compressor Armatures' },
      { part: 'NU 210 / NJ 210', id: '50 mm', od: '90 mm', w: '20 mm', app: 'High Speed 50mm Reducer Pinions, Heavy Motor Non-Locating Ends' },
      { part: 'NU 308 / NJ 308', id: '40 mm', od: '90 mm', w: '23 mm', app: 'Severe Radial Load Electric Motors, Crusher Countershafts' },
      { part: 'NU 310 / NJ 310', id: '50 mm', od: '110 mm', w: '27 mm', app: 'Heavy 50 HP 3-Phase Electric Motors in Rice & Cement Mills' },
      { part: 'NU 312 / NJ 312', id: '60 mm', od: '130 mm', w: '31 mm', app: 'Cement Mill ID Fan Motor Armatures, Heavy Reducer Drives' }
    ],
    'self_aligning': [
      { part: '1205 2RS / Open', id: '25 mm', od: '52 mm', w: '15 mm', app: 'Vibrating Sieve Frames, Grain Cleaner Shakers (Accommodates Flex)' },
      { part: '1206 2RS / Open', id: '30 mm', od: '62 mm', w: '16 mm', app: 'Paddy Destoner Eccentric Linkages, Sifter Rocking Shafts' },
      { part: '1207 2RS / Open', id: '35 mm', od: '72 mm', w: '17 mm', app: 'Dal Mill Shaking Screens, Medium Sieve Agitators' },
      { part: '1208 2RS / Open', id: '40 mm', od: '80 mm', w: '18 mm', app: 'Heavy Grain Sieve Rocker Arms, Long Flexible Transmission Shafts' },
      { part: '2208 2RS / Open', id: '40 mm', od: '80 mm', w: '23 mm', app: 'Double Row Self-Aligning Ball for High-Flex Paddy Separators' },
      { part: '2210 2RS / Open', id: '50 mm', od: '90 mm', w: '23 mm', app: 'Heavy Vibratory Agro Graders, Long Line Shafts with Deflection' }
    ],
    'plummer_sleeves': [
      { part: 'Plummer SN 512 + Sleeve H 312', id: '55 mm (Shaft)', od: 'Split Housing for 22212 EK', w: 'Two-Bolt Base', app: 'Quarry Vibrating Screens, Cement Secondary Belt Pulleys' },
      { part: 'Plummer SN 515 + Sleeve H 315', id: '65 mm (Shaft)', od: 'Split Housing for 22215 EK', w: 'Two-Bolt Base', app: 'Heavy Conveyor Drive Drums, Sand Plant Head Pulleys' },
      { part: 'Plummer SN 516 + Sleeve H 316', id: '70 mm (Shaft)', od: 'Split Housing for 22216 EK', w: 'Two-Bolt Base', app: 'Rotary Kiln Support Shafts, Primary Screen Eccentrics' },
      { part: 'Plummer SN 518 + Sleeve H 318', id: '80 mm (Shaft)', od: 'Split Housing for 22218 EK', w: 'Two/Four-Bolt Base', app: 'Heavy Jaw Crusher Countershafts (24x12, 30x15 Plants in Nepal)' },
      { part: 'Plummer SN 520 + Sleeve H 320', id: '90 mm (Shaft)', od: 'Split Housing for 22220 EK', w: 'Four-Bolt Base', app: 'Heavy Mining Clinker Conveyors, Hydropower Crusher Drives' },
      { part: 'Plummer SN 522 + Sleeve H 322', id: '100 mm (Shaft)', od: 'Split Housing for 22222 EK', w: 'Four-Bolt Base', app: 'Heavy Ball Mill Trunnions, Primary Boulder Jaw Crushers' },
      { part: 'Adapter Sleeve H 2314 / H 2316', id: '60 / 70 mm', od: 'Hydraulic Taper Lock', w: 'With Locknut & Washer', app: 'High Impact 22300-Series Vibrating Screen Spherical Bearings' }
    ]
  };

  // ================= 3. RESEARCHED V-BELT & CONVEYOR STANDARD DIMENSIONS =================
  const BELT_SIZE_DATA = {
    'a-section': [
      { code: 'V-Belt A-28 to A-45', width: '13 mm', thick: '8 mm', len: 'Inside Length: 28" to 45"', app: 'Small Workshop Lathes, Drill Presses, Air Compressors, Sewing Units' },
      { code: 'V-Belt A-48 to A-65', width: '13 mm', thick: '8 mm', len: 'Inside Length: 48" to 65"', app: 'Grain Destoner Sieve Blowers, Domestic Flour Chakkis, Water Pumps' },
      { code: 'V-Belt A-70 to A-95', width: '13 mm', thick: '8 mm', len: 'Inside Length: 70" to 95"', app: 'Paddy Cleaner Exhaust Fans, Light Belt Conveyors, Feed Mixers' },
      { code: 'V-Belt A-100 to A-140', width: '13 mm', thick: '8 mm', len: 'Inside Length: 100" to 140"', app: 'Agricultural Threshers, Overhead Workshop Line Shafts' }
    ],
    'b-section': [
      { code: 'V-Belt B-40 to B-55', width: '17 mm', thick: '11 mm', len: 'Inside Length: 40" to 55"', app: 'Standard 5-7.5 HP Electric Motor to Centrifugal Water Pump Drives' },
      { code: 'V-Belt B-65 (Top Demand)', width: '17 mm', thick: '11 mm', len: 'Inside Length: 65" (1651 mm)', app: 'Universal Rice Mill Polisher & Huller Drives across Nepal' },
      { code: 'V-Belt B-68 to B-80', width: '17 mm', thick: '11 mm', len: 'Inside Length: 68" to 80"', app: 'Flour Mill Commercial Chakkis, Centrifugal Industrial Blowers' },
      { code: 'V-Belt B-85 to B-110', width: '17 mm', thick: '11 mm', len: 'Inside Length: 85" to 110"', app: 'Agricultural Threshers, Tractor Pulley Linkages, Sawmills' },
      { code: 'V-Belt B-120 to B-160', width: '17 mm', thick: '11 mm', len: 'Inside Length: 120" to 160"', app: 'Long Center Distance Rice Mill Overhead Drives, Oil Expellers' },
      { code: 'V-Belt B-170 to B-210', width: '17 mm', thick: '11 mm', len: 'Inside Length: 170" to 210"', app: 'Heavy Agricultural Harvesters & Multi-Machine Line Drives' }
    ],
    'c-section': [
      { code: 'V-Belt C-68 to C-90', width: '22 mm', thick: '14 mm', len: 'Inside Length: 68" to 90"', app: 'Heavy 30-50 HP Rice Mill Main Drive Motors, Heavy Water Turbines' },
      { code: 'V-Belt C-100 to C-125', width: '22 mm', thick: '14 mm', len: 'Inside Length: 100" to 125"', app: 'Oil Expeller 6-Bolt & 9-Bolt Chamber Drives, Brick Extruders' },
      { code: 'V-Belt C-130 to C-160', width: '22 mm', thick: '14 mm', len: 'Inside Length: 130" to 160"', app: 'Stone Crusher Secondary Cone & Jaw Flywheels (Universal Quarry Size)' },
      { code: 'V-Belt C-180 to C-240', width: '22 mm', thick: '14 mm', len: 'Inside Length: 180" to 240"', app: 'Heavy Cement Packing Plants, Clinker Elevator Drives, Sugar Rollers' }
    ],
    'd-section': [
      { code: 'V-Belt D-180 to D-220', width: '32 mm', thick: '19 mm', len: 'Inside Length: 180" to 220"', app: 'Primary Stone Crusher Heavy Flywheel Drives (75-100 HP Motors)' },
      { code: 'V-Belt D-240 to D-300', width: '32 mm', thick: '19 mm', len: 'Inside Length: 240" to 300"', app: 'Heavy Cement Clinker Grinding Mills, Hydropower Generators in Nepal' }
    ],
    'conveyor': [
      { code: 'Rubber Conveyor EP 400/3 (16" / 400mm)', width: '400 mm', thick: '3+1.5 mm covers', len: 'Tensile: 400 N/mm (3 Ply)', app: 'Paddy & Rice Grain Handling Conveyors, Mill Elevators' },
      { code: 'Rubber Conveyor EP 400/3 (20" / 500mm)', width: '500 mm', thick: '3+1.5 mm covers', len: 'Tensile: 400 N/mm (3 Ply)', app: 'Bag Loading Conveyors, Fertilizer & Agro Transport' },
      { code: 'Rubber Conveyor EP 500/3 (24" / 600mm)', width: '600 mm', thick: '4+2 mm covers', len: 'Tensile: 500 N/mm (3 Ply)', app: 'River Sand, Gravel & Stone Crusher Feeder Belts' },
      { code: 'Rubber Conveyor EP 630/4 (32" / 800mm)', width: '800 mm', thick: '5+2 mm covers', len: 'Tensile: 630 N/mm (4 Ply)', app: 'Heavy Stone Crusher Discharge, Mining & Quarry Stockpiles' },
      { code: 'Rubber Conveyor EP 800/4 (36" / 900mm)', width: '900 mm', thick: '6+2 mm covers', len: 'Tensile: 800 N/mm (4 Ply)', app: 'Severe Boulders & Heavy Quarry Extraction Conveyor Lines' }
    ],
    'pulleys': [
      { code: 'Cast Iron (CI) Pulley 4" to 8" (A/B Section, 1-2 Grooves)', width: 'Pilot / Custom Bore', thick: 'Grade 25 CI', len: 'Dynamic Balanced', app: 'Electric Motors (3-10 HP), Water Pumps, Sieve Drives' },
      { code: 'Cast Iron (CI) Pulley 10" to 14" (B/C Section, 2-4 Grooves)', width: '30mm - 55mm Bore', thick: 'Heavy Duty Hub', len: 'Dynamic Balanced', app: 'Rice Mill Polishers, Oil Expellers, Brick Kiln Blowers' },
      { code: 'Cast Iron (CI) Pulley 16" to 24" (C/D Section, 3-6 Grooves)', width: '50mm - 90mm Bore', thick: 'Extra Heavy Rim', len: 'Dynamic Balanced', app: 'Stone Jaw Crusher Flywheels, Heavy Hammer Mills, Cement Drives' }
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
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Namaste Shree Anjani Belt & Bearing! Inquiring wholesale walk-in discount rate & stock for Bearing: ' + item.part)}" target="_blank" rel="noopener noreferrer" class="btn-matrix-wa" title="WhatsApp Quote">
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
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Namaste Shree Anjani Belt & Bearing! Inquiring wholesale walk-in discount rate & stock for Belt: ' + item.code)}" target="_blank" rel="noopener noreferrer" class="btn-matrix-wa" title="WhatsApp Quote">
            <i class="fa-brands fa-whatsapp"></i> Get Quote
          </a>
        </td>
      `;
      tbody.appendChild(tr);
    });
  };

  // ================= 3. MULTI-TIER BRAND BEARING INTERCHANGE & STRATEGIC PRICING DATABASE =================
  // Pricing Model: List MRP (+30% Marked Up) vs Walk-in Counter / Mill Wholesale Rate (20% - 30% Off)
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
          listMRP: "NPR 520 / unit",
          counterRate: "NPR 380",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6204 LLU (India 🇮🇳) • ARB 6204 2RS (India 🇮🇳) • ZKL 6204 2RS (Czech 🇨🇿)",
          durability: "★★★★☆ (Excellent balance of reliability and cost for mills)",
          listMRP: "NPR 360 / unit",
          counterRate: "NPR 260",
          savings: "Save 28% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6204 2RS (India/UAE 🇮🇳) • HI-BOND 6204 (India 🇮🇳) • V-TECH / KG Economy",
          durability: "★★★☆☆ (Best for intermittent, light-duty, or cost-sensitive agro drives)",
          listMRP: "NPR 210 / unit",
          counterRate: "NPR 145",
          savings: "Save 31% Walk-in",
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
          listMRP: "NPR 650 / unit",
          counterRate: "NPR 480",
          savings: "Save 26% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6205 LLU (India 🇮🇳) • ARB 6205 2RS (India 🇮🇳) • KOYO 6205 2RS (Japan 🇯🇵)",
          durability: "★★★★☆ (Top choice for commercial rice/flour mills in Nepal)",
          listMRP: "NPR 460 / unit",
          counterRate: "NPR 330",
          savings: "Save 28% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6205 2RS (India/UAE 🇮🇳) • HI-BOND 6205 • V-TECH / Chinese Industrial Grade",
          durability: "★★★☆☆ (Cost-effective solution for light agricultural machinery)",
          listMRP: "NPR 250 / unit",
          counterRate: "NPR 175",
          savings: "Save 30% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "6207",
      dims: "35 × 72 × 17 mm",
      d_mm: 35,
      D_mm: 72,
      B_mm: 17,
      weight_kg: "0.29 kg",
      cr: "27.0 kN",
      cor: "15.3 kN",
      speedLimit: "11,000 RPM (Grease)",
      clearance: "Normal / C3 Radial Clearance",
      app: "Heavy Paddy Huller Shafts, Dal Mill Separators, Industrial Blowers",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 6207-2RS1 (Sweden 🇸🇪) • NTN 6207 LLU • FAG 6207-2RSR",
          durability: "★★★★★ (Engineered for non-stop grain milling under vibration)",
          listMRP: "NPR 1,080 / unit",
          counterRate: "NPR 790",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6207 LLU (India 🇮🇳) • ARB 6207 2RS • ZKL 6207 2RS",
          durability: "★★★★☆ (Proven performance across mills in Lumbini & Terai)",
          listMRP: "NPR 780 / unit",
          counterRate: "NPR 560",
          savings: "Save 28% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6207 2RS • HI-BOND 6207 • V-TECH",
          durability: "★★★☆☆ (Economical agro replacement)",
          listMRP: "NPR 440 / unit",
          counterRate: "NPR 310",
          savings: "Save 30% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "6208",
      dims: "40 × 80 × 18 mm",
      d_mm: 40,
      D_mm: 80,
      B_mm: 18,
      weight_kg: "0.37 kg",
      cr: "30.7 kN",
      cor: "19.0 kN",
      speedLimit: "9,500 RPM (Grease)",
      clearance: "Normal / C3 Clearance",
      app: "Oil Expeller Main Shafts, Tractor Implement Gearboxes, Agro Drives",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 6208-2RS1 (Sweden 🇸🇪) • NTN 6208 LLU • FAG 6208-2RSR",
          durability: "★★★★★ (Heavy duty oil expeller & tractor standard)",
          listMRP: "NPR 1,280 / unit",
          counterRate: "NPR 950",
          savings: "Save 26% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6208 LLU (India 🇮🇳) • ARB 6208 2RS • KOYO 6208",
          durability: "★★★★☆ (High reliability for continuous expelling)",
          listMRP: "NPR 920 / unit",
          counterRate: "NPR 680",
          savings: "Save 26% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6208 2RS • HI-BOND 6208 • V-TECH",
          durability: "★★★☆☆ (Budget replacement)",
          listMRP: "NPR 520 / unit",
          counterRate: "NPR 370",
          savings: "Save 29% Walk-in",
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
          listMRP: "NPR 2,250 / unit",
          counterRate: "NPR 1,650",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6308 2RS C3 (India 🇮🇳) • ARB 6308 C3 (India 🇮🇳) • ZKL 6308 2RS (Czech 🇨🇿)",
          durability: "★★★★☆ (Heavy-duty plant standard across Lumbini Province)",
          listMRP: "NPR 1,680 / unit",
          counterRate: "NPR 1,220",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6308 2RS (India/UAE 🇮🇳) • HI-BOND 6308 • V-TECH Heavy Duty Line",
          durability: "★★★☆☆ (Economic choice for slower shaft speeds & secondary equipment)",
          listMRP: "NPR 950 / unit",
          counterRate: "NPR 680",
          savings: "Save 28% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "6310",
      dims: "50 × 110 × 27 mm",
      d_mm: 50,
      D_mm: 110,
      B_mm: 27,
      weight_kg: "1.05 kg",
      cr: "65.0 kN",
      cor: "38.0 kN",
      speedLimit: "7,000 RPM (Grease)",
      clearance: "C3 Radial Internal Clearance",
      app: "Heavy Stone Crusher Screeners, 50 HP Motor Shafts, Rice Mill Destoner Heads",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 6310-2RS1/C3 (Sweden 🇸🇪) • NTN 6310 LLU C3 • FAG 6310-2RSR-C3",
          durability: "★★★★★ (Withstands massive continuous 50 HP motor torque)",
          listMRP: "NPR 3,450 / unit",
          counterRate: "NPR 2,550",
          savings: "Save 26% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 6310 2RS C3 (India 🇮🇳) • ARB 6310 C3 • ZKL 6310 2RS",
          durability: "★★★★☆ (Standard 50 HP workhorse in Nepal plants)",
          listMRP: "NPR 2,650 / unit",
          counterRate: "NPR 1,950",
          savings: "Save 26% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 6310 2RS • HI-BOND 6310 • V-TECH",
          durability: "★★★☆☆ (Budget option)",
          listMRP: "NPR 1,550 / unit",
          counterRate: "NPR 1,100",
          savings: "Save 29% Walk-in",
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
          listMRP: "NPR 6,800 / unit",
          counterRate: "NPR 4,950",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 22212 CA/W33 (India 🇮🇳) • ARB 22212 EK (India 🇮🇳) • ZKL 22212 (Czech 🇨🇿)",
          durability: "★★★★☆ (Proven track record in crushing & screening plants in Nepal)",
          listMRP: "NPR 4,950 / unit",
          counterRate: "NPR 3,600",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 22212 EK • HI-BOND Spherical • KG International 22212",
          durability: "★★★☆☆ (Budget replacement for low-vibration secondary rollers)",
          listMRP: "NPR 2,950 / unit",
          counterRate: "NPR 2,150",
          savings: "Save 27% Walk-in",
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
          listMRP: "NPR 14,800 / unit",
          counterRate: "NPR 10,800",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 22218 CA/W33 (India 🇮🇳) • ARB 22218 EK (India 🇮🇳) • KOYO 22218 RHR",
          durability: "★★★★☆ (Strong reliability for medium-heavy aggregate crushing plants)",
          listMRP: "NPR 10,500 / unit",
          counterRate: "NPR 7,650",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 22218 EK • HI-BOND 22218 • Commercial Chinese Quarry Grade",
          durability: "★★★☆☆ (Cost-saving option for lighter duty secondary crushing stages)",
          listMRP: "NPR 5,950 / unit",
          counterRate: "NPR 4,350",
          savings: "Save 27% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "22220",
      dims: "100 × 180 × 46 mm",
      d_mm: 100,
      D_mm: 180,
      B_mm: 46,
      weight_kg: "4.85 kg",
      cr: "435.0 kN",
      cor: "490.0 kN",
      speedLimit: "3,400 RPM",
      clearance: "C3 Spherical Roller (Tapered 1:12 Bore with Sleeve H320 / SN520)",
      app: "Heavy 36x24 Jaw Crushers, Cement Raw Mills, Sugar Cane Roller Shafts",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 22220 EK/W33 (Sweden 🇸🇪) • URB 22220 EK C3 • FAG 22220-E1-K",
          durability: "★★★★★ (High capacity for primary quarry jaw crushers)",
          listMRP: "NPR 19,500 / unit",
          counterRate: "NPR 14,200",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 22220 CA/W33 (India 🇮🇳) • ARB 22220 EK • ZKL 22220",
          durability: "★★★★☆ (Proven heavy crusher workhorse in Nepal)",
          listMRP: "NPR 13,800 / unit",
          counterRate: "NPR 9,950",
          savings: "Save 28% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 22220 EK • HI-BOND 22220 • Chinese Quarry Grade",
          durability: "★★★☆☆ (Budget replacement)",
          listMRP: "NPR 7,800 / unit",
          counterRate: "NPR 5,600",
          savings: "Save 28% Walk-in",
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
          listMRP: "NPR 950 / unit",
          counterRate: "NPR 690",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 30206 (India 🇮🇳) • ARB 30206 (India 🇮🇳) • ZKL 30206 (Czech 🇨🇿)",
          durability: "★★★★☆ (Widespread standard for commercial vehicles and gearboxes in Nepal)",
          listMRP: "NPR 680 / unit",
          counterRate: "NPR 490",
          savings: "Save 28% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 30206 • HI-BOND 30206 • V-TECH Taper Line",
          durability: "★★★☆☆ (Economy solution for agro implements and trailer axles)",
          listMRP: "NPR 390 / unit",
          counterRate: "NPR 275",
          savings: "Save 29% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "32210",
      dims: "50 × 90 × 24.75 mm",
      d_mm: 50,
      D_mm: 90,
      B_mm: 24.75,
      weight_kg: "0.62 kg",
      cr: "88.0 kN",
      cor: "105.0 kN",
      speedLimit: "6,000 RPM",
      clearance: "Tapered Roller (Heavy Axial & Radial Load)",
      app: "High Axial Thrust Mill Gearboxes, Heavy Duty Axles, Brick Extruders",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 32210 J2 (Sweden 🇸🇪) • TIMKEN 32210 (USA 🇺🇸) • NTN 32210",
          durability: "★★★★★ (Extreme load rating for gear reducers)",
          listMRP: "NPR 2,450 / unit",
          counterRate: "NPR 1,780",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 32210 (India 🇮🇳) • ARB 32210 • ZKL 32210",
          durability: "★★★★☆ (Commercial truck & plant standard)",
          listMRP: "NPR 1,750 / unit",
          counterRate: "NPR 1,280",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 32210 • HI-BOND 32210 • V-TECH",
          durability: "★★★☆☆ (Budget replacement)",
          listMRP: "NPR 980 / unit",
          counterRate: "NPR 710",
          savings: "Save 28% Walk-in",
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
          listMRP: "NPR 3,100 / unit",
          counterRate: "NPR 2,250",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC UCP 208 (India 🇮🇳) • ARB UCP 208 (India 🇮🇳) • URB UCP 208 (Romania 🇷🇴)",
          durability: "★★★★☆ (Standard workhorse across rice mills in Terai region)",
          listMRP: "NPR 2,150 / unit",
          counterRate: "NPR 1,550",
          savings: "Save 28% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI UCP 208 • HI-BOND UCP 208 • V-TECH Block Line",
          durability: "★★★☆☆ (Economical unit for slow speed grain elevators and sorting conveyors)",
          listMRP: "NPR 1,250 / unit",
          counterRate: "NPR 880",
          savings: "Save 30% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "UCP 210",
      dims: "50 mm Bore • Heavy Cast Iron Base Pillow Block Housing",
      d_mm: 50,
      D_mm: 206,
      B_mm: 51.6,
      weight_kg: "2.75 kg",
      cr: "35.1 kN",
      cor: "23.2 kN",
      speedLimit: "4,000 RPM",
      clearance: "Self-Aligning Insert Ball with Set-Screw Lock",
      app: "Stone Crusher Discharge Belt Head Drum Shafts, Heavy Mill Elevators, Feed Mixers",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "NTN UCP 210D1 (Japan 🇯🇵) • SKF SY 50 TF • FYH UCP 210",
          durability: "★★★★★ (Heavy duty industrial standard for conveyor drums)",
          listMRP: "NPR 4,500 / unit",
          counterRate: "NPR 3,300",
          savings: "Save 27% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC UCP 210 (India 🇮🇳) • ARB UCP 210 • URB UCP 210",
          durability: "★★★★☆ (High reliability for continuous conveyor operation)",
          listMRP: "NPR 3,150 / unit",
          counterRate: "NPR 2,300",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI UCP 210 • HI-BOND UCP 210 • V-TECH",
          durability: "★★★☆☆ (Economical replacement)",
          listMRP: "NPR 1,750 / unit",
          counterRate: "NPR 1,250",
          savings: "Save 29% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "UCF 208",
      dims: "40 mm Bore • 4-Bolt Square Cast Iron Flange Housing",
      d_mm: 40,
      D_mm: 130,
      B_mm: 51.2,
      weight_kg: "1.90 kg",
      cr: "29.1 kN",
      cor: "17.8 kN",
      speedLimit: "4,800 RPM",
      clearance: "Self-Aligning Flange Unit with Set-Screw Lock",
      app: "Rice Mill Polisher Machine Side Flanges, Oil Expeller Walls, Flour Mill Sifters",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "NTN UCF 208D1 (Japan 🇯🇵) • SKF FY 40 TF • FYH UCF 208",
          durability: "★★★★★ (Rigid 4-bolt square flange for machine sidewalls)",
          listMRP: "NPR 3,250 / unit",
          counterRate: "NPR 2,400",
          savings: "Save 26% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC UCF 208 (India 🇮🇳) • ARB UCF 208 • URB UCF 208",
          durability: "★★★★☆ (Universal grain machine sidewall workhorse)",
          listMRP: "NPR 2,250 / unit",
          counterRate: "NPR 1,650",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI UCF 208 • HI-BOND UCF 208 • V-TECH",
          durability: "★★★☆☆ (Budget replacement)",
          listMRP: "NPR 1,350 / unit",
          counterRate: "NPR 950",
          savings: "Save 30% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "NU 208",
      dims: "40 × 80 × 18 mm",
      d_mm: 40,
      D_mm: 80,
      B_mm: 18,
      weight_kg: "0.38 kg",
      cr: "56.0 kN",
      cor: "51.0 kN",
      speedLimit: "11,000 RPM",
      clearance: "Cylindrical Roller (High Speed & Heavy Radial Capacity)",
      app: "Electric Motor Drive Ends (15-20 HP), Compressor Armatures, Gearbox Pinions",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF NU 208 ECP (Sweden 🇸🇪) • NTN NU 208 • FAG NU 208-E",
          durability: "★★★★★ (Heavy radial load capacity with high RPM tolerance)",
          listMRP: "NPR 2,850 / unit",
          counterRate: "NPR 2,100",
          savings: "Save 26% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC NU 208 (India 🇮🇳) • ARB NU 208 • ZKL NU 208",
          durability: "★★★★☆ (Standard industrial motor armature replacement)",
          listMRP: "NPR 1,950 / unit",
          counterRate: "NPR 1,420",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI NU 208 • HI-BOND • V-TECH",
          durability: "★★★☆☆ (Budget commercial grade)",
          listMRP: "NPR 1,150 / unit",
          counterRate: "NPR 820",
          savings: "Save 29% Walk-in",
          tagClass: "tier-economy"
        }
      }
    },
    {
      baseCode: "1207",
      dims: "35 × 72 × 17 mm",
      d_mm: 35,
      D_mm: 72,
      B_mm: 17,
      weight_kg: "0.31 kg",
      cr: "15.9 kN",
      cor: "5.1 kN",
      speedLimit: "12,000 RPM",
      clearance: "Self-Aligning Double Row Ball Bearing",
      app: "Paddy Destoner Shaking Screens, Dal Mill Sieve Shakers, Long Agro Shafts",
      stockStatus: "Ready Stock (10+ Units in Siddharthanagar Hub)",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: "SKF 1207 EKTN9 (Sweden 🇸🇪) • NTN 1207 • FAG 1207-TVH",
          durability: "★★★★★ (Self-compensates for shaft deflection under vigorous vibration)",
          listMRP: "NPR 1,950 / unit",
          counterRate: "NPR 1,450",
          savings: "Save 26% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: "NBC 1207 (India 🇮🇳) • ARB 1207 • ZKL 1207",
          durability: "★★★★☆ (Top choice for vibrating cleaning sieves in Terai mills)",
          listMRP: "NPR 1,350 / unit",
          counterRate: "NPR 980",
          savings: "Save 27% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: "DPI 1207 • HI-BOND 1207 • V-TECH",
          durability: "★★★☆☆ (Budget agro option)",
          listMRP: "NPR 750 / unit",
          counterRate: "NPR 520",
          savings: "Save 31% Walk-in",
          tagClass: "tier-economy"
        }
      }
    }
  ];

  // ================= 4. MECHANICAL ENGINEERING WORKBENCH CONTROLLERS =================
  window.switchCalcTab = function (tabKey) {
    const btnInterchange = document.getElementById('tabBtnInterchange');
    const btnBelt = document.getElementById('tabBtnBelt');
    const btnShaft = document.getElementById('tabBtnShaft');
    const panelInterchange = document.getElementById('panelCalcInterchange');
    const panelBelt = document.getElementById('panelCalcBelt');
    const panelShaft = document.getElementById('panelCalcShaft');

    btnInterchange?.classList.toggle('active', tabKey === 'interchange');
    btnBelt?.classList.toggle('active', tabKey === 'belt');
    btnShaft?.classList.toggle('active', tabKey === 'shaft');

    if (panelInterchange) panelInterchange.style.display = tabKey === 'interchange' ? 'block' : 'none';
    if (panelBelt) panelBelt.style.display = tabKey === 'belt' ? 'block' : 'none';
    if (panelShaft) panelShaft.style.display = tabKey === 'shaft' ? 'block' : 'none';

    if (tabKey === 'interchange') window.runBearingInterchange();
    else if (tabKey === 'belt') window.runBeltCalculator();
    else if (tabKey === 'shaft') window.runShaftTorqueCalculator();
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

    const raw = input.value.toUpperCase().trim() || '6205';

    const match = INTERCHANGE_DATABASE.find(item => raw.includes(item.baseCode) || item.baseCode.includes(raw)) || {
      baseCode: raw,
      dims: "Standard Metric Dimensions",
      d_mm: 25,
      D_mm: 52,
      B_mm: 15,
      weight_kg: "Standard ISO Weight",
      cr: "Standard ISO Rating",
      cor: "Standard ISO Rating",
      speedLimit: "Standard Industrial Rating",
      clearance: "Normal / C3 Radial Clearance",
      app: "Industrial Mills, Crushers, Motors & Transmission Shafts in Nepal",
      stockStatus: "Ready Stock in Siddharthanagar Hub",
      tiers: {
        premium: {
          title: "Premium Heavy-Duty Tier",
          brands: `SKF ${raw} (Sweden 🇸🇪) • NTN ${raw} (Japan 🇯🇵) • FAG ${raw} (Germany 🇩🇪)`,
          durability: "★★★★★ (Max Heavy-Duty Lifespan)",
          listMRP: "List MRP: Inquire Desk",
          counterRate: "Special Walk-in Wholesale Rate",
          savings: "Save 20-30% Walk-in",
          tagClass: "tier-premium"
        },
        standard: {
          title: "Standard Industrial Tier",
          brands: `NBC ${raw} (India 🇮🇳) • ARB ${raw} (India 🇮🇳) • ZKL ${raw} (Czech 🇨🇿)`,
          durability: "★★★★☆ (Standard Plant Workhorse)",
          listMRP: "List MRP: Inquire Desk",
          counterRate: "Special Walk-in Wholesale Rate",
          savings: "Save 20-30% Walk-in",
          tagClass: "tier-standard"
        },
        economy: {
          title: "Budget / Economy Commercial Tier",
          brands: `DPI ${raw} • HI-BOND ${raw} • V-TECH / KG Commercial Line`,
          durability: "★★★☆☆ (Best for Cost-Sensitive / Light Applications)",
          listMRP: "List MRP: Inquire Desk",
          counterRate: "Special Walk-in Wholesale Rate",
          savings: "Save 20-30% Walk-in",
          tagClass: "tier-economy"
        }
      }
    };

    // Update 2D CAD Blueprint SVG Diagram Callouts
    const cadOD = document.getElementById('cadODLabel');
    const cadBore = document.getElementById('cadBoreLabel');
    const cadWidth = document.getElementById('cadWidthLabel');
    const cadBadge = document.getElementById('cadBearingBadge');
    
    if (cadOD) cadOD.textContent = `OD (D) = ${match.D_mm} mm`;
    if (cadBore) cadBore.textContent = `Bore (d) = ${match.d_mm} mm`;
    if (cadWidth) cadWidth.textContent = `Width (B) = ${match.B_mm} mm`;
    if (cadBadge) cadBadge.textContent = `${match.baseCode} CAD Schematic (${match.d_mm}×${match.D_mm}×${match.B_mm} mm)`;

    resultBox.innerHTML = `
      <!-- Strategic Walk-in & Bulk Factory Discount Announcement -->
      <div style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(245, 158, 11, 0.1)); border: 1px solid rgba(249, 115, 22, 0.4); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.6rem;">
        <div style="font-size: 0.85rem; color: #F8FAFC; line-height: 1.45;">
          <strong style="color: var(--orange-electric);"><i class="fa-solid fa-tags"></i> Direct Siddharthanagar Counter Wholesale Discount:</strong><br />
          Official catalog rates reflect List MRP. Visiting our <strong>Siddharthanagar counter</strong> or issuing a factory purchase order unlocks direct <strong>20% to 30% Wholesale Discount</strong> on genuine factory-sealed bearings.
        </div>
        <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Namaste! Inquiring Walk-in Counter Wholesale Discount for ' + raw)}" target="_blank" class="btn-matrix-wa" style="white-space: nowrap; padding: 0.45rem 0.9rem; font-size: 0.8rem;">
          <i class="fa-brands fa-whatsapp"></i> Claim Walk-in Rate
        </a>
      </div>

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
          <div style="margin: 0.5rem 0 0.75rem;">
            <div style="font-size: 0.775rem; color: var(--text-muted); text-decoration: line-through;">List MRP: ${match.tiers.premium.listMRP}</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #34D399; font-family: var(--font-display);">
              Counter Rate: ${match.tiers.premium.counterRate} <span style="background: rgba(16, 185, 129, 0.2); color: #34D399; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 4px;">${match.tiers.premium.savings}</span>
            </div>
          </div>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring Premium Tier (SKF/NTN/FAG) Walk-in Wholesale Rate for ' + raw)}" target="_blank" class="btn-tier-action btn-tier-premium-action">
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
          <div style="margin: 0.5rem 0 0.75rem;">
            <div style="font-size: 0.775rem; color: var(--text-muted); text-decoration: line-through;">List MRP: ${match.tiers.standard.listMRP}</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: var(--cyan-accent); font-family: var(--font-display);">
              Counter Rate: ${match.tiers.standard.counterRate} <span style="background: rgba(56, 189, 248, 0.2); color: var(--cyan-accent); font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 4px;">${match.tiers.standard.savings}</span>
            </div>
          </div>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring Standard Tier (NBC/ARB/ZKL) Walk-in Wholesale Rate for ' + raw)}" target="_blank" class="btn-tier-action btn-tier-standard-action">
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
          <div style="margin: 0.5rem 0 0.75rem;">
            <div style="font-size: 0.775rem; color: var(--text-muted); text-decoration: line-through;">List MRP: ${match.tiers.economy.listMRP}</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: var(--amber-glow); font-family: var(--font-display);">
              Counter Rate: ${match.tiers.economy.counterRate} <span style="background: rgba(245, 158, 11, 0.2); color: var(--amber-glow); font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 4px;">${match.tiers.economy.savings}</span>
            </div>
          </div>
          <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring Budget Economy Tier (DPI/HI-BOND/V-TECH) Walk-in Wholesale Rate for ' + raw)}" target="_blank" class="btn-tier-action btn-tier-economy-action">
            <i class="fa-brands fa-whatsapp"></i> Inquire Budget Rate
          </a>
        </div>

      </div>
    `;
  };

  // ================= 5. V-BELT & PULLEY SIMULATOR CONTROLLER =================
  window.runBeltCalculator = function () {
    const d1 = parseFloat(document.getElementById('calcPulleyD1')?.value) || 6;
    const d2 = parseFloat(document.getElementById('calcPulleyD2')?.value) || 12;
    const c = parseFloat(document.getElementById('calcCenterDist')?.value) || 24;
    const motorRpm = parseFloat(document.getElementById('calcMotorRpm')?.value) || 1440;

    // Update Slider Values if available
    const r1Slider = document.getElementById('calcPulleyD1Range');
    const r2Slider = document.getElementById('calcPulleyD2Range');
    const cSlider = document.getElementById('calcCenterDistRange');
    if (r1Slider) r1Slider.value = d1;
    if (r2Slider) r2Slider.value = d2;
    if (cSlider) cSlider.value = c;

    // Update MM Hints
    const d1Mm = document.getElementById('d1MmHint');
    const d2Mm = document.getElementById('d2MmHint');
    const mmValSpan = document.getElementById('centerDistMmVal');
    if (d1Mm) d1Mm.textContent = `${d1.toFixed(1)}" (${(d1 * 25.4).toFixed(0)} mm)`;
    if (d2Mm) d2Mm.textContent = `${d2.toFixed(1)}" (${(d2 * 25.4).toFixed(0)} mm)`;
    if (mmValSpan) mmValSpan.textContent = `${c.toFixed(1)}" (${(c * 25.4).toFixed(0)} mm)`;

    // Standard Mechanical Engineering Formula:
    // L = 2*C + (pi/2)*(D1 + D2) + ((D2 - D1)^2)/(4*C)
    const pitchLengthInches = (2 * c) + (Math.PI / 2) * (d1 + d2) + (Math.pow(d2 - d1, 2) / (4 * c));
    const pitchLengthMm = pitchLengthInches * 25.4;
    const speedRatio = (d2 / d1).toFixed(2);
    const drivenRpm = (motorRpm / (d2 / d1)).toFixed(0);

    // Linear Belt Velocity: V = (pi * D1_meters * RPM) / 60
    const d1Meters = (d1 * 25.4) / 1000;
    const beltVelocity = ((Math.PI * d1Meters * motorRpm) / 60).toFixed(1);

    // Arc of Contact on Smaller Pulley: theta = 180 - 2 * arcsin((D2-D1)/(2C)) * (180/pi)
    const sinVal = Math.max(-1, Math.min(1, Math.abs(d2 - d1) / (2 * c)));
    const arcOfContact = (180 - (2 * Math.asin(sinVal) * (180 / Math.PI))).toFixed(1);

    // Closest Standard Belt Size
    const approxNumber = Math.round(pitchLengthInches);
    let section = "B";
    if (d1 < 4.5) section = "A";
    else if (d1 >= 9.0) section = "C";

    const beltCode = `V-Belt ${section}-${approxNumber}`;

    // Update Ratio Badge
    const ratioBadge = document.getElementById('beltRatioBadge');
    if (ratioBadge) ratioBadge.textContent = `Ratio: ${speedRatio} : 1 • Driven: ${drivenRpm} RPM`;

    // Update SVG Pulley Visuals
    const svgD1 = document.getElementById('svgPulleyD1');
    const svgD2 = document.getElementById('svgPulleyD2');
    const svgD1Label = document.getElementById('svgD1Label');
    const svgD2Label = document.getElementById('svgD2Label');
    const svgCenterText = document.getElementById('svgCenterDistText');
    const svgBeltPath = document.getElementById('svgBeltPath');

    if (svgD1 && svgD2) {
      const r1 = Math.min(50, Math.max(16, d1 * 4.2));
      const r2 = Math.min(65, Math.max(20, d2 * 4.2));
      svgD1.setAttribute('r', r1);
      svgD2.setAttribute('r', r2);
      if (svgD1Label) svgD1Label.textContent = `D1: ${d1}" (${(d1 * 25.4).toFixed(0)}mm)`;
      if (svgD2Label) svgD2Label.textContent = `D2: ${d2}" (${(d2 * 25.4).toFixed(0)}mm)`;
      if (svgCenterText) svgCenterText.textContent = `Center Distance C = ${c.toFixed(1)}" (${(c * 25.4).toFixed(0)} mm)`;

      if (svgBeltPath) {
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
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 0.5rem;">
          <div class="interchange-spec-tile">
            <span class="spec-tile-label">Calculated Pitch Length ($L_p$)</span>
            <span class="spec-tile-value" style="color: var(--cyan-accent);">${pitchLengthInches.toFixed(2)}" (${pitchLengthMm.toFixed(0)} mm)</span>
          </div>
          <div class="interchange-spec-tile">
            <span class="spec-tile-label">Driven Shaft Speed</span>
            <span class="spec-tile-value" style="color: #34D399;">${drivenRpm} RPM (${speedRatio} : 1)</span>
          </div>
          <div class="interchange-spec-tile">
            <span class="spec-tile-label">Linear Belt Speed ($V$)</span>
            <span class="spec-tile-value">${beltVelocity} m/s ${parseFloat(beltVelocity) > 30 ? '⚠️ (High Speed)' : '✓ (Optimal)'}</span>
          </div>
          <div class="interchange-spec-tile">
            <span class="spec-tile-label">Small Pulley Arc of Contact</span>
            <span class="spec-tile-value">${arcOfContact}° ${parseFloat(arcOfContact) < 140 ? '⚠️ (Use Idler)' : '✓ (Sufficient Grip)'}</span>
          </div>
        </div>
      `;
    }
    if (waCta) {
      waCta.href = `https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring wholesale rate for ' + beltCode + ' calculated for ' + d1 + '" x ' + d2 + '" pulleys at ' + c + '" center distance.')}`;
      waCta.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Inquire Wholesale Rate for ${beltCode}`;
    }
  };

  // ================= 6. MOTOR TORQUE & SHAFT DIAMETER SIZER =================
  window.runShaftTorqueCalculator = function () {
    const rawPower = parseFloat(document.getElementById('shaftMotorHp')?.value) || 15;
    const unit = document.getElementById('shaftPowerUnit')?.value || 'hp';
    const rpm = parseFloat(document.getElementById('shaftRpmInput')?.value) || 1440;
    const ks = parseFloat(document.getElementById('shaftServiceFactor')?.value) || 1.5;
    const resultBox = document.getElementById('shaftCalcResultBox');
    if (!resultBox) return;

    // Convert to kW
    const powerKw = unit === 'hp' ? rawPower * 0.7457 : rawPower;
    const powerHp = unit === 'hp' ? rawPower : rawPower / 0.7457;

    // Nominal Torque: T = (9550 * P_kW) / RPM  [N.m]
    const torqueNm = rpm > 0 ? (9550 * powerKw) / rpm : 0;
    const designTorqueNm = torqueNm * ks;

    // Solid Shaft Diameter under pure torsion:
    // tau_allowable = 40 MPa (40 * 10^6 N/m^2) for standard commercial mild steel
    // d = ( (16 * T_d) / (pi * tau) )^(1/3)
    const tau = 40 * 1e6; // 40 MPa
    const dMeters = Math.pow((16 * designTorqueNm) / (Math.PI * tau), 1/3);
    const minShaftMm = (dMeters * 1000).toFixed(1);
    const stdShaftMm = Math.ceil(parseFloat(minShaftMm) / 5) * 5; // round up to standard 5mm step

    // Standard Parallel Keyway (DIN 6885/1)
    let keyway = "6 × 6 mm (DIN 6885/1)";
    let pillowBlock = "UCP 204 / UCP 205";
    if (stdShaftMm <= 22) { keyway = "6 × 6 mm"; pillowBlock = "UCP 204 (20mm)"; }
    else if (stdShaftMm <= 30) { keyway = "8 × 7 mm"; pillowBlock = "UCP 206 (30mm)"; }
    else if (stdShaftMm <= 38) { keyway = "10 × 8 mm"; pillowBlock = "UCP 207 (35mm)"; }
    else if (stdShaftMm <= 44) { keyway = "12 × 8 mm"; pillowBlock = "UCP 208 (40mm)"; }
    else if (stdShaftMm <= 50) { keyway = "14 × 9 mm"; pillowBlock = "UCP 210 (50mm)"; }
    else if (stdShaftMm <= 58) { keyway = "16 × 10 mm"; pillowBlock = "UCP 211 (55mm)"; }
    else if (stdShaftMm <= 65) { keyway = "18 × 11 mm"; pillowBlock = "UCP 212 (60mm)"; }
    else if (stdShaftMm <= 75) { keyway = "20 × 12 mm"; pillowBlock = "UCP 215 (75mm)"; }
    else { keyway = "22 × 14 mm"; pillowBlock = "UCP 218 (90mm)"; }

    resultBox.innerHTML = `
      <div class="calc-result-heading">Transmitted Shaft Torque &amp; Minimum Steel Shaft Diameter</div>
      <div class="calc-result-value" style="color: #34D399; font-size: 1.4rem;">
        Nominal Torque: ${torqueNm.toFixed(1)} N⋅m • Design Torque (${ks}x): ${designTorqueNm.toFixed(1)} N⋅m
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-top: 1rem;">
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">Minimum Calculated Shaft OD</span>
          <span class="spec-tile-value" style="color: var(--cyan-accent);">${minShaftMm} mm</span>
        </div>
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">Standard Commercial Shaft Size</span>
          <span class="spec-tile-value" style="color: #FFFFFF;">${stdShaftMm} mm (${(stdShaftMm / 25.4).toFixed(2)}")</span>
        </div>
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">DIN 6885/1 Parallel Keyway</span>
          <span class="spec-tile-value" style="color: var(--orange-electric);">${keyway}</span>
        </div>
        <div class="interchange-spec-tile">
          <span class="spec-tile-label">Matching Pillow Block Unit</span>
          <span class="spec-tile-value" style="color: #38BDF8;">${pillowBlock}</span>
        </div>
      </div>

      <div style="margin-top: 1.25rem;">
        <a href="https://wa.me/${SALES_PHONE_CLEAN}?text=${encodeURIComponent('Inquiring shaft, pillow block ' + pillowBlock + ', and pulley machining for ' + powerHp.toFixed(1) + ' HP motor at ' + rpm + ' RPM.')}" target="_blank" class="btn-matrix-wa" style="padding: 0.65rem 1.25rem; font-size: 0.85rem;">
          <i class="fa-brands fa-whatsapp"></i> Inquire Shaft &amp; Bearing ${pillowBlock} Stock
        </a>
      </div>
    `;
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
