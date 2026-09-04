/**
 * Shree Anjani Belt and Bearing Store — Enterprise Supabase REST Client Adapter
 * Location: Siddharthanagar (Bhairahawa), Nepal | IRD PAN: 601249821
 * Lightweight, zero-dependency vanilla JS interface for Supabase PostgreSQL.
 * Provides offline-first caching, real-time sync queue, and stock audit logging.
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    URL: 'shree_anjani_supabase_url',
    KEY: 'shree_anjani_supabase_key',
    SYNC_STATUS: 'shree_anjani_supabase_status',
    SYNC_QUEUE: 'shree_anjani_sync_queue',
    STOCK_AUDIT: 'shree_anjani_erp_stock_audit'
  };

  const DEFAULT_URL = 'https://zddkvzqeirkenqyxzqln.supabase.co';
  const DEFAULT_KEY = 'sb_publishable_Ok7x8IZ5wLQdN14YYcVJFQ_oz1FRx_n';

  const listeners = [];

  const SupabaseBridge = {
    getUrl: function () {
      return localStorage.getItem(STORAGE_KEYS.URL) || DEFAULT_URL;
    },

    getKey: function () {
      return localStorage.getItem(STORAGE_KEYS.KEY) || DEFAULT_KEY;
    },

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

    onStatusChange: function (callback) {
      if (typeof callback === 'function') {
        listeners.push(callback);
      }
    },

    notifyStatus: function (status, details) {
      localStorage.setItem(STORAGE_KEYS.SYNC_STATUS, status);
      listeners.forEach(cb => {
        try { cb(status, details); } catch (e) { console.error(e); }
      });
    },

    getHeaders: function (extraHeaders = {}) {
      const key = this.getKey();
      return {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...extraHeaders
      };
    },

    /**
     * Test Supabase REST endpoint connectivity
     */
    testConnection: async function () {
      const url = this.getUrl();
      const key = this.getKey();

      if (!url || !key) {
        this.notifyStatus('DISCONNECTED', 'Supabase URL and API Key are required.');
        return { success: false, message: 'Supabase URL and API Key are required.' };
      }

      try {
        const response = await fetch(`${url}/rest/v1/products?select=count`, {
          method: 'GET',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Range': '0-0'
          }
        });

        if (response.ok || response.status === 206) {
          this.notifyStatus('CONNECTED', 'Successfully connected to Supabase PostgreSQL database');
          // Process any queued offline actions
          this.processSyncQueue();
          return { success: true, message: 'Successfully connected to Supabase PostgreSQL database!' };
        } else {
          const errText = await response.text();
          this.notifyStatus('ERROR', `HTTP ${response.status}`);
          return { success: false, message: `Connection failed (HTTP ${response.status}): ${errText}` };
        }
      } catch (err) {
        this.notifyStatus('OFFLINE', err.message);
        return { success: false, message: `Network error connecting to Supabase: ${err.message}` };
      }
    },

    /**
     * Fetch all products from Supabase PostgreSQL
     */
    fetchProducts: async function () {
      if (!this.isConfigured()) return null;
      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/products?select=*&is_active=eq.true&order=part_no.asc`, {
          method: 'GET',
          headers: this.getHeaders()
        });
        if (response.ok) {
          const data = await response.json();
          this.notifyStatus('CONNECTED', `Fetched ${data.length} products`);
          return data;
        } else {
          console.warn('Supabase fetchProducts returned status:', response.status);
        }
      } catch (err) {
        console.warn('Supabase fetch products offline fallback:', err);
        this.notifyStatus('OFFLINE', 'Offline fallback active');
      }
      return null;
    },

    /**
     * Insert a single new product SKU into Supabase
     */
    insertProduct: async function (productData) {
      if (!this.isConfigured()) {
        this.queueSyncAction({ type: 'INSERT_PRODUCT', payload: productData });
        return { success: true, offline: true };
      }

      const payload = {
        part_no: productData.partNo || productData.part_no,
        brand_name: productData.brand || productData.brand_name || 'Other Genuine',
        category_slug: this.mapCategoryToSlug(productData.category || productData.category_slug),
        dimensions: productData.dimensions || '',
        clearance_rating: productData.clearance || productData.clearance_rating || 'Normal / C3',
        quantity: parseInt(productData.qty !== undefined ? productData.qty : productData.quantity, 10) || 0,
        wholesale_rate_npr: parseFloat(productData.rate !== undefined ? productData.rate : productData.wholesale_rate_npr) || 0,
        rack_location: productData.rack || productData.rack_location || 'Rack General',
        low_stock_threshold: parseInt(productData.lowAlert !== undefined ? productData.lowAlert : productData.low_stock_threshold, 10) || 3,
        application_notes: productData.notes || productData.application_notes || '',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/products`, {
          method: 'POST',
          headers: this.getHeaders({ 'Prefer': 'return=representation' }),
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          return { success: true, data: data[0] };
        } else {
          const errText = await response.text();
          console.warn('Supabase insertProduct failed:', errText);
          this.queueSyncAction({ type: 'INSERT_PRODUCT', payload: productData });
          return { success: false, error: errText, offlineQueued: true };
        }
      } catch (err) {
        console.warn('Supabase insertProduct network error:', err);
        this.queueSyncAction({ type: 'INSERT_PRODUCT', payload: productData });
        return { success: true, offline: true };
      }
    },

    /**
     * Update an entire product SKU record in Supabase
     */
    updateProduct: async function (partNo, productData) {
      if (!this.isConfigured()) {
        this.queueSyncAction({ type: 'UPDATE_PRODUCT', partNo, payload: productData });
        return { success: true, offline: true };
      }

      const payload = {
        updated_at: new Date().toISOString()
      };

      if (productData.brand || productData.brand_name) payload.brand_name = productData.brand || productData.brand_name;
      if (productData.category || productData.category_slug) payload.category_slug = this.mapCategoryToSlug(productData.category || productData.category_slug);
      if (productData.rack || productData.rack_location) payload.rack_location = productData.rack || productData.rack_location;
      if (productData.qty !== undefined || productData.quantity !== undefined) {
        payload.quantity = parseInt(productData.qty !== undefined ? productData.qty : productData.quantity, 10);
      }
      if (productData.rate !== undefined || productData.wholesale_rate_npr !== undefined) {
        payload.wholesale_rate_npr = parseFloat(productData.rate !== undefined ? productData.rate : productData.wholesale_rate_npr);
      }
      if (productData.lowAlert !== undefined || productData.low_stock_threshold !== undefined) {
        payload.low_stock_threshold = parseInt(productData.lowAlert !== undefined ? productData.lowAlert : productData.low_stock_threshold, 10);
      }
      if (productData.dimensions !== undefined) payload.dimensions = productData.dimensions;
      if (productData.notes !== undefined || productData.application_notes !== undefined) {
        payload.application_notes = productData.notes || productData.application_notes;
      }

      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/products?part_no=eq.${encodeURIComponent(partNo)}`, {
          method: 'PATCH',
          headers: this.getHeaders({ 'Prefer': 'return=representation' }),
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          return { success: true, data: data[0] };
        } else {
          this.queueSyncAction({ type: 'UPDATE_PRODUCT', partNo, payload: productData });
          return { success: false, offlineQueued: true };
        }
      } catch (err) {
        this.queueSyncAction({ type: 'UPDATE_PRODUCT', partNo, payload: productData });
        return { success: true, offline: true };
      }
    },

    /**
     * Update product stock quantity in Supabase immediately via REST PATCH
     */
    updateProductStock: async function (partNo, newQuantity) {
      if (!this.isConfigured()) {
        this.queueSyncAction({ type: 'UPDATE_STOCK', partNo, newQuantity });
        return true;
      }

      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/products?part_no=eq.${encodeURIComponent(partNo)}`, {
          method: 'PATCH',
          headers: this.getHeaders({ 'Prefer': 'return=representation' }),
          body: JSON.stringify({
            quantity: Math.max(0, parseInt(newQuantity, 10)),
            updated_at: new Date().toISOString()
          })
        });

        if (response.ok) {
          return true;
        } else {
          this.queueSyncAction({ type: 'UPDATE_STOCK', partNo, newQuantity });
          return false;
        }
      } catch (err) {
        console.warn('Supabase update stock offline fallback:', err);
        this.queueSyncAction({ type: 'UPDATE_STOCK', partNo, newQuantity });
        return false;
      }
    },

    /**
     * Delete product SKU from Supabase (soft delete by setting is_active = false)
     */
    deleteProduct: async function (partNo, hardDelete = false) {
      if (!this.isConfigured()) {
        this.queueSyncAction({ type: 'DELETE_PRODUCT', partNo, hardDelete });
        return true;
      }

      try {
        if (hardDelete) {
          const response = await fetch(`${this.getUrl()}/rest/v1/products?part_no=eq.${encodeURIComponent(partNo)}`, {
            method: 'DELETE',
            headers: this.getHeaders()
          });
          return response.ok;
        } else {
          const response = await fetch(`${this.getUrl()}/rest/v1/products?part_no=eq.${encodeURIComponent(partNo)}`, {
            method: 'PATCH',
            headers: this.getHeaders({ 'Prefer': 'return=representation' }),
            body: JSON.stringify({
              is_active: false,
              updated_at: new Date().toISOString()
            })
          });
          return response.ok;
        }
      } catch (err) {
        console.warn('Supabase delete product error:', err);
        this.queueSyncAction({ type: 'DELETE_PRODUCT', partNo, hardDelete });
        return false;
      }
    },

    /**
     * Bulk upsert multiple products into Supabase
     */
    bulkUpsertProducts: async function (productsArray) {
      if (!this.isConfigured() || !Array.isArray(productsArray) || productsArray.length === 0) return false;

      const payload = productsArray.map(p => ({
        part_no: p.partNo || p.part_no,
        brand_name: p.brand || p.brand_name || 'Other Genuine',
        category_slug: this.mapCategoryToSlug(p.category || p.category_slug),
        dimensions: p.dimensions || '',
        clearance_rating: p.clearance || p.clearance_rating || 'Normal / C3',
        quantity: parseInt(p.qty !== undefined ? p.qty : p.quantity, 10) || 0,
        wholesale_rate_npr: parseFloat(p.rate !== undefined ? p.rate : p.wholesale_rate_npr) || 0,
        rack_location: p.rack || p.rack_location || 'Rack General',
        low_stock_threshold: parseInt(p.lowAlert !== undefined ? p.lowAlert : p.low_stock_threshold, 10) || 3,
        application_notes: p.notes || p.application_notes || '',
        is_active: true,
        updated_at: new Date().toISOString()
      }));

      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/products`, {
          method: 'POST',
          headers: this.getHeaders({
            'Prefer': 'resolution=merge-duplicates,return=representation'
          }),
          body: JSON.stringify(payload)
        });
        return response.ok;
      } catch (err) {
        console.warn('Supabase bulkUpsert error:', err);
        return false;
      }
    },

    /**
     * Upload an invoice record to Supabase
     */
    insertInvoice: async function (invoiceData) {
      if (!this.isConfigured()) {
        this.queueSyncAction({ type: 'INSERT_INVOICE', payload: invoiceData });
        return false;
      }

      try {
        const response = await fetch(`${this.getUrl()}/rest/v1/invoices`, {
          method: 'POST',
          headers: this.getHeaders({ 'Prefer': 'return=representation' }),
          body: JSON.stringify({
            invoice_number: invoiceData.id,
            invoice_date: invoiceData.date || new Date().toISOString().split('T')[0],
            customer_name: invoiceData.clientName || 'Cash Customer',
            customer_pan: invoiceData.clientPan || 'N/A',
            customer_phone: invoiceData.clientPhone || '',
            delivery_destination: invoiceData.clientCity || 'Siddharthanagar (Bhairahawa)',
            subtotal_npr: parseFloat(invoiceData.subtotal) || 0,
            discount_pct: parseFloat(invoiceData.discountPct) || 0,
            discount_amount_npr: parseFloat(invoiceData.discountAmount) || 0,
            taxable_amount_npr: parseFloat(invoiceData.taxable) || 0,
            vat_amount_npr: parseFloat(invoiceData.vat) || 0,
            grand_total_npr: parseFloat(invoiceData.grandTotal) || 0,
            payment_status: 'Pending',
            created_at: new Date().toISOString()
          })
        });

        if (response.ok) {
          const inserted = await response.json();
          const invoiceId = inserted[0]?.id;

          // If line items exist and we got an invoice UUID, insert invoice_items
          if (invoiceId && Array.isArray(invoiceData.items) && invoiceData.items.length > 0) {
            const itemsPayload = invoiceData.items.map(it => ({
              invoice_id: invoiceId,
              item_description: it.desc || it.item_description || 'Item',
              brand_name: it.brand || 'Genuine',
              quantity: parseInt(it.qty || it.quantity, 10) || 1,
              unit_rate_npr: parseFloat(it.rate || it.unit_rate_npr) || 0,
              line_total_npr: parseFloat(it.amount || it.line_total_npr) || 0
            }));

            try {
              await fetch(`${this.getUrl()}/rest/v1/invoice_items`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(itemsPayload)
              });
            } catch (itemErr) {
              console.warn('Supabase invoice_items error:', itemErr);
            }
          }
          return true;
        } else {
          this.queueSyncAction({ type: 'INSERT_INVOICE', payload: invoiceData });
          return false;
        }
      } catch (err) {
        console.warn('Supabase insert invoice error:', err);
        this.queueSyncAction({ type: 'INSERT_INVOICE', payload: invoiceData });
        return false;
      }
    },

    /**
     * Map friendly UI category to Supabase category slug
     */
    mapCategoryToSlug: function (cat) {
      if (!cat) return 'bearings';
      const c = cat.toLowerCase();
      if (c.includes('belt') || c.includes('pulley')) return 'belts-pulleys';
      if (c.includes('spare') || c.includes('seal') || c.includes('chain') || c.includes('machinery')) return 'machinery-spares';
      if (c.includes('workshop') || c.includes('service') || c.includes('lathe')) return 'workshop-services';
      return 'bearings';
    },

    /**
     * Map Supabase category slug to friendly UI category
     */
    mapSlugToCategory: function (slug) {
      if (!slug) return 'Bearings';
      const s = slug.toLowerCase();
      if (s === 'belts-pulleys') return 'Belts & Pulleys';
      if (s === 'machinery-spares') return 'Machinery Spares';
      if (s === 'workshop-services') return 'Workshop Services';
      return 'Bearings';
    },

    // ================= OFFLINE SYNC QUEUE =================
    queueSyncAction: function (action) {
      try {
        const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE) || '[]');
        queue.push({
          id: 'SYNC-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          timestamp: new Date().toISOString(),
          ...action
        });
        localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
      } catch (e) {
        console.error('Failed to queue sync action:', e);
      }
    },

    getPendingQueueCount: function () {
      try {
        const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE) || '[]');
        return queue.length;
      } catch (e) {
        return 0;
      }
    },

    processSyncQueue: async function () {
      if (!this.isConfigured()) return;
      try {
        const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE) || '[]');
        if (queue.length === 0) return;

        console.log(`Processing ${queue.length} pending offline actions to Supabase...`);
        const remaining = [];

        for (const item of queue) {
          try {
            let success = false;
            if (item.type === 'UPDATE_STOCK') {
              success = await this.updateProductStock(item.partNo, item.newQuantity);
            } else if (item.type === 'INSERT_PRODUCT') {
              const res = await this.insertProduct(item.payload);
              success = res && res.success && !res.offline;
            } else if (item.type === 'UPDATE_PRODUCT') {
              const res = await this.updateProduct(item.partNo, item.payload);
              success = res && res.success && !res.offline;
            } else if (item.type === 'DELETE_PRODUCT') {
              success = await this.deleteProduct(item.partNo, item.hardDelete);
            } else if (item.type === 'INSERT_INVOICE') {
              success = await this.insertInvoice(item.payload);
            }

            if (!success) {
              remaining.push(item);
            }
          } catch (itemErr) {
            remaining.push(item);
          }
        }

        localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(remaining));
      } catch (e) {
        console.error('Error in processSyncQueue:', e);
      }
    },

    // ================= STOCK AUDIT LOG TRAIL =================
    recordStockAudit: function (auditData) {
      try {
        const auditLog = JSON.parse(localStorage.getItem(STORAGE_KEYS.STOCK_AUDIT) || '[]');
        const entry = {
          id: 'AUDIT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          timestamp: new Date().toISOString(),
          partNo: auditData.partNo,
          brand: auditData.brand || 'Genuine',
          category: auditData.category || 'Bearings',
          previousQty: Number(auditData.previousQty) || 0,
          changeQty: Number(auditData.changeQty) || 0,
          newQty: Number(auditData.newQty) || 0,
          actionType: auditData.actionType || 'STOCK_UPDATE', // 'INVOICE_BILLING', 'PURCHASE_RESTOCK', 'SALES_SCAN', 'MANUAL_ADJUSTMENT', 'SKU_EDIT', 'CSV_IMPORT'
          referenceId: auditData.referenceId || 'MANUAL',
          note: auditData.note || '',
          staff: auditData.staff || 'STORE STAFF'
        };

        auditLog.unshift(entry);
        // Keep up to last 500 audit entries
        if (auditLog.length > 500) auditLog.length = 500;
        localStorage.setItem(STORAGE_KEYS.STOCK_AUDIT, JSON.stringify(auditLog));
        return entry;
      } catch (e) {
        console.error('Failed to write stock audit log:', e);
        return null;
      }
    },

    getStockAuditLogs: function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.STOCK_AUDIT) || '[]');
      } catch (e) {
        return [];
      }
    },

    clearStockAuditLogs: function () {
      localStorage.setItem(STORAGE_KEYS.STOCK_AUDIT, JSON.stringify([]));
    }
  };

  // Expose globally to window
  window.SupabaseBridge = SupabaseBridge;

})();
