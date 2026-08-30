// Supabase Edge Function: Dynamic XML Sitemap Generator (Deno / TypeScript)
// Fetches live inventory from PostgreSQL products table and renders dynamic sitemap.xml

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://abhieeeee.github.io/office_web_PWA";

const CORRIDORS = [
  "pokhara",
  "birgunj",
  "kathmandu",
  "butwal",
  "nepalgunj",
  "dang"
];

serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch active products
    const { data: products, error } = await supabase
      .from("products")
      .select("part_no, brand_name, updated_at")
      .eq("is_active", true)
      .limit(500);

    if (error) {
      console.error("Error querying products:", error);
    }

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    // 1. Homepage
    xml += `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/" />\n    <xhtml:link rel="alternate" hreflang="ne" href="${BASE_URL}/?lang=ne" />\n  </url>\n`;

    // 2. Nepali Homepage
    xml += `  <url>\n    <loc>${BASE_URL}/?lang=ne</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

    // 3. Master Delivery Page
    xml += `  <url>\n    <loc>${BASE_URL}/delivery.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

    // 4. Regional Delivery Corridors
    for (const city of CORRIDORS) {
      xml += `  <url>\n    <loc>${BASE_URL}/delivery.html?city=${city}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    }

    // 5. Dynamic Products from Database
    if (products && products.length > 0) {
      for (const p of products) {
        const sku = `${p.brand_name || ""}-${p.part_no || ""}`.replace(/\s+/g, "-").toUpperCase();
        const lastmod = p.updated_at ? p.updated_at.split("T")[0] : today;
        xml += `  <url>\n    <loc>${BASE_URL}/?sku=${encodeURIComponent(sku)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400"
      },
      status: 200
    });
  } catch (err) {
    return new Response(`Error generating sitemap: ${err.message}`, { status: 500 });
  }
});
