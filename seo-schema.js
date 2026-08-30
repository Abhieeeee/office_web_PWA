/**
 * Shree Anjani Belt & Bearing Store — Dynamic Client-Side JSON-LD Schema Injector
 * Injects LocalBusiness, Product/Offer catalog, and FAQPage structured data for Googlebot.
 * PAN: 601249821 | Plus Code: GF83+75V | Siddharthanagar, Nepal
 */

(function () {
  'use strict';

  const STORE_META = {
    name: "Shree Anjani Belt and Bearing Store",
    alternateName: "Shree Balaji Belt Center",
    legalName: "Shree Anjani Belt and Bearing Store",
    panVat: "601249821",
    url: "https://abhieeeee.github.io/office_web_PWA/",
    logo: "https://abhieeeee.github.io/office_web_PWA/assets/logo.png",
    image: "https://abhieeeee.github.io/office_web_PWA/assets/logo.jpg",
    telephone: "+9779804462602",
    secondaryPhone: "+9779847301185",
    priceRange: "NPR 100 - NPR 50000",
    currenciesAccepted: "NPR",
    paymentAccepted: "Cash, Bank Transfer, Fonepay QR, eSewa, Khalti, Bilty To-Pay",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Industrial Corridor, GF83+75V",
      addressLocality: "Siddharthanagar (Bhairahawa)",
      addressRegion: "Lumbini Province",
      postalCode: "32900",
      addressCountry: "NP"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.5048,
      longitude: 83.4502
    }
  };

  /**
   * 1. Inject Global LocalBusiness & AutoPartsStore Schema
   */
  function injectLocalBusinessSchema() {
    const scriptId = 'jsonld-local-business';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": ["AutoPartsStore", "LocalBusiness"],
      "@id": `${STORE_META.url}#store`,
      "name": STORE_META.name,
      "alternateName": STORE_META.alternateName,
      "legalName": STORE_META.legalName,
      "taxID": STORE_META.panVat,
      "url": STORE_META.url,
      "logo": STORE_META.logo,
      "image": STORE_META.image,
      "telephone": STORE_META.telephone,
      "priceRange": STORE_META.priceRange,
      "currenciesAccepted": STORE_META.currenciesAccepted,
      "paymentAccepted": STORE_META.paymentAccepted,
      "address": STORE_META.address,
      "geo": STORE_META.geo,
      "hasMap": "https://www.google.com/maps/search/?api=1&query=GF83%2B75V,+Siddharthanagar,+Nepal",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "24:00",
          "description": "Emergency Breakdown Hotline & Night Dispatch"
        }
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Rupandehi" },
        { "@type": "AdministrativeArea", "name": "Kathmandu" },
        { "@type": "AdministrativeArea", "name": "Pokhara" },
        { "@type": "AdministrativeArea", "name": "Birgunj" },
        { "@type": "AdministrativeArea", "name": "Nepalgunj" },
        { "@type": "AdministrativeArea", "name": "Dang" },
        { "@type": "Country", "name": "Nepal" }
      ]
    };

    script.textContent = JSON.stringify(schema, null, 2);
  }

  /**
   * 2. Inject Dynamic Product & Offer Schemas from Inventory
   */
  async function injectProductCatalogSchema() {
    let items = [];

    // Attempt to load from Supabase REST API (anon key)
    if (window.SupabaseBridge && window.SupabaseBridge.isConfigured()) {
      const remote = await window.SupabaseBridge.fetchProducts();
      if (remote && Array.isArray(remote) && remote.length > 0) {
        items = remote;
      }
    }

    // Fallback to local storage seed if offline or unconfigured
    if (items.length === 0) {
      try {
        const local = localStorage.getItem('shree_anjani_erp_inventory');
        if (local) items = JSON.parse(local);
      } catch (e) {
        console.warn('Local inventory load for schema fallback:', e);
      }
    }

    // Core default schema products if storage is empty
    if (items.length === 0) {
      items = [
        { partNo: '6205 2RS', brand: 'SKF', rate: 480, category: 'Bearings' },
        { partNo: '6309 2RS C3', brand: 'NBC', rate: 1650, category: 'Bearings' },
        { partNo: '22218 EK C3', brand: 'URB', rate: 8500, category: 'Bearings' },
        { partNo: 'UCP 208-24', brand: 'NTN', rate: 2100, category: 'Bearings' },
        { partNo: 'V-Belt B-65', brand: 'Fenner', rate: 620, category: 'Belts & Pulleys' }
      ];
    }

    const scriptId = 'jsonld-product-catalog';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const productEntities = items.slice(0, 30).map(item => {
      const pName = item.part_no || item.partNo || 'Industrial Spare';
      const bName = item.brand_name || item.brand || 'SKF';
      const price = item.wholesale_rate_npr || item.rate || 500;
      const sku = pName.replace(/\s+/g, '-').toUpperCase();

      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${STORE_META.url}#product-${sku}`,
        "name": `${bName} ${pName} Industrial Bearing / V-Belt`,
        "sku": sku,
        "mpn": sku,
        "brand": {
          "@type": "Brand",
          "name": bName
        },
        "description": `Genuine ${bName} ${pName} supplied by Shree Anjani Belt & Bearing Store with 13% Nepal VAT invoice. Ready for immediate dispatch across Nepal.`,
        "image": STORE_META.image,
        "offers": {
          "@type": "Offer",
          "url": `${STORE_META.url}?sku=${sku}`,
          "priceCurrency": "NPR",
          "price": price,
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@id": `${STORE_META.url}#store`
          }
        }
      };
    });

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Verified In-Stock Bearings & V-Belts Catalog (Siddharthanagar, Nepal)",
      "itemListElement": productEntities.map((prod, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": prod
      }))
    };

    script.textContent = JSON.stringify(itemListSchema, null, 2);
  }

  /**
   * 3. Inject Mechanic & Industrial Procurement FAQPage Schema
   */
  function injectFaqSchema() {
    const scriptId = 'jsonld-faq-page';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where is Shree Anjani Belt and Bearing Store located in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are located along the Main Industrial Corridor in Siddharthanagar (Bhairahawa), Rupandehi, Nepal (Google Plus Code: GF83+75V). We provide daily Bilty freight dispatch to Kathmandu, Pokhara, Birgunj, Butwal, Nepalgunj, and Dang."
          }
        },
        {
          "@type": "Question",
          "name": "Are your SKF, NBC, URB, and NTN bearings 100% genuine?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every bearing is sourced through authorized distributor channels with verifiable manufacturer batch codes, holographic security seals, and official 13% Nepal VAT billing (PAN: 601249821)."
          }
        },
        {
          "@type": "Question",
          "name": "What are your emergency breakdown operating hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We operate Sunday to Friday from 8:00 AM to 8:00 PM. On Saturdays, we provide special emergency breakdown service open from 10:00 AM until 12:00 AM (Midnight) with 24/7 on-call dispatch for factory emergencies."
          }
        },
        {
          "@type": "Question",
          "name": "How does Bilty transport dispatch work for out-of-valley orders?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Orders placed before 4:00 PM are dispatched the same evening via Lumbini Transport, Namaste Cargo, or Western Express with overnight transit to major city depots on a To-Pay or Prepaid basis."
          }
        }
      ]
    };

    script.textContent = JSON.stringify(faqSchema, null, 2);
  }

  // Execute Schema Injections
  function initSchemaInjection() {
    injectLocalBusinessSchema();
    injectFaqSchema();
    injectProductCatalogSchema();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchemaInjection);
  } else {
    initSchemaInjection();
  }

  window.refreshProductSchema = injectProductCatalogSchema;

})();
