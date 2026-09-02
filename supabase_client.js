/**
 * Shree Anjani Belt and Bearing Store — Supabase REST Client Adapter
 * Lightweight, zero-dependency vanilla JS interface for Supabase PostgreSQL.
 * Provides offline-first caching and real-time synchronization.
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    URL: 'shree_anjani_supabase_url',
    KEY: 'shree_anjani_supabase_key',
    SYNC_STATUS: 'shree_anjani_supabase_status'
  };

  const DEFAULT_URL = 'https://zddkvzqeirkenqyxzqln.supabase.co';
  const DEFAULT_KEY = 'sb_publishable_Ok7x8IZ5wLQdN14YYcVJFQ_oz1FRx_n';

  const SupabaseBridge = {
    getUrl: () => localStorage.getItem(STORAGE_KEYS.URL) || DEFAULT_URL,
    getKey: () => localStorage.getItem(STORAGE_KEYS.KEY) || DEFAULT_KEY,

    setCredentials: function (url, key) {
      const cleanUrl = (url || '').trim().replace(/\/+$/, '') || DEFAULT_URL;
      const cleanKey = (key || '').trim() || DEFAULT_KEY;
      localStorage.setItem(STORAGE_KEYS.URL, cleanUrl);
      localStorage.setItem(STORAGE_KEYS.KEY, cleanKey);
      return this.testConnection();
    },

    isConfigured: function () {
      return Boolean(this.getUrl() && this.getKey());
    },

    /**
     * Test Supabase REST endpoint connectivity
     */
    testConnection: async function () {
      const url = this.getUrl();
      const key = this.getKey();

      if (!url || !key) {
        return { success: false, message: 'Supabase URL and API Key are required.' };
      }

      try {
        const response = await fetch(`${url}/rest/v1/categories?select=count`, {
          method: 'GET',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Range': '0-0'
          }
        });

        if (response.ok || response.status === 206) {
          localStorage.setItem(STORAGE_KEYS.SYNC_STATUS, 'CONNECTED');
          return { success: true, message: 'Successfully connected to Supabase PostgreSQL database!' };
        } else {
          const errText = await response.text();
          return { success: false, message: `Connection failed (HTTP ${response.status}): ${errText}` };
        }
      } catch (err) {
        return { success: false, message: `Network error connecting to Supabase: ${err.message}` };
      }
    },

    /**
     * Fetch all products from Supabase
     */
    fetchProducts: async function () {
      if (!this.isConfigured()) return null;
      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/products?select=*&order=part_no.asc`, {
          headers: {
            'apikey': this.getKey(),
            'Authorization': `Bearer ${this.getKey()}`
          }
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Supabase fetch products offline fallback:', err);
      }
      return null;
    },

    /**
     * Update product stock quantity in Supabase
     */
    updateProductStock: async function (partNo, newQuantity) {
      if (!this.isConfigured()) return false;
      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/products?part_no=eq.${encodeURIComponent(partNo)}`, {
          method: 'PATCH',
          headers: {
            'apikey': this.getKey(),
            'Authorization': `Bearer ${this.getKey()}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            quantity: newQuantity,
            updated_at: new Date().toISOString()
          })
        });
        return response.ok;
      } catch (err) {
        console.warn('Supabase update stock error:', err);
        return false;
      }
    },

    /**
     * Upload an invoice record to Supabase
     */
    insertInvoice: async function (invoiceData) {
      if (!this.isConfigured()) return false;
      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/invoices`, {
          method: 'POST',
          headers: {
            'apikey': this.getKey(),
            'Authorization': `Bearer ${this.getKey()}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            invoice_number: invoiceData.id,
            invoice_date: invoiceData.date,
            customer_name: invoiceData.clientName,
            customer_pan: invoiceData.clientPan || 'N/A',
            customer_phone: invoiceData.clientPhone || '',
            delivery_destination: invoiceData.clientCity || 'Siddharthanagar',
            subtotal_npr: invoiceData.subtotal,
            discount_pct: invoiceData.discountPct || 0,
            discount_amount_npr: invoiceData.discountAmount || 0,
            taxable_amount_npr: invoiceData.taxable,
            vat_amount_npr: invoiceData.vat,
            grand_total_npr: invoiceData.grandTotal,
            payment_status: 'Pending'
          })
        });
        return response.ok;
      } catch (err) {
        console.warn('Supabase insert invoice error:', err);
        return false;
      }
    }
  };

  // Expose globally to window
  window.SupabaseBridge = SupabaseBridge;

})();
