/**
 * Shree Anjani Belt & Bearing — Internal ERP & Store Operations Logic
 * Persistent Data Architecture (LocalStorage) with Full Modules:
 * 1. Overview Dashboard Metrics
 * 2. Inventory & Rack Locator CRUD
 * 3. Proforma Invoicing & 13% Nepal VAT Engine
 * 4. Regional Transport & Bilty Logger
 * 5. Machine Workshop Job Card Manager
 * 6. JSON Backup & Restore
 */

(function () {
  'use strict';

  const STORAGE_KEY_PREFIX = 'shree_anjani_erp_';
  const KEYS = {
    INVENTORY: STORAGE_KEY_PREFIX + 'inventory',
    INVOICES: STORAGE_KEY_PREFIX + 'invoices',
    TRANSPORTS: STORAGE_KEY_PREFIX + 'transports',
    WORKSHOP: STORAGE_KEY_PREFIX + 'workshop'
  };

  // Seed Data for Instant Out-of-the-Box Usage
  const DEFAULT_SEED_DATA = {
    inventory: [
      { id: '1', partNo: '6205 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-01, Shelf 2', qty: 45, rate: 480, lowAlert: 10 },
      { id: '2', partNo: '22218 EK', brand: 'URB', category: 'Bearings', rack: 'Rack B-03, Shelf 1', qty: 12, rate: 8500, lowAlert: 5 },
      { id: '3', partNo: '30209', brand: 'NBC', category: 'Bearings', rack: 'Rack A-04, Shelf 3', qty: 28, rate: 1250, lowAlert: 8 },
      { id: '4', partNo: 'UCP 208-24', brand: 'NTN', category: 'Bearings', rack: 'Rack C-02, Heavy Bin', qty: 16, rate: 2100, lowAlert: 5 },
      { id: '5', partNo: 'V-Belt B-65', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Hanger Belt Wall 1', qty: 60, rate: 620, lowAlert: 15 },
      { id: '6', partNo: 'V-Belt C-112', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Hanger Belt Wall 2', qty: 24, rate: 1450, lowAlert: 8 },
      { id: '7', partNo: '3-Groove B-Section Pulley 10"', brand: 'Other', category: 'Belts & Pulleys', rack: 'Floor Pallet 04', qty: 8, rate: 3200, lowAlert: 4 },
      { id: '8', partNo: 'High Pressure Oil Seal 45x65x10', brand: 'Other', category: 'Machinery Spares', rack: 'Small Parts Bin D-12', qty: 85, rate: 180, lowAlert: 20 },
      { id: '9', partNo: 'Spider Coupling Jaw Set L-095', brand: 'Other', category: 'Machinery Spares', rack: 'Rack D-02, Shelf 2', qty: 18, rate: 950, lowAlert: 6 },
      { id: '10', partNo: 'Roller Chain 08B-1 (10 Feet)', brand: 'Other', category: 'Machinery Spares', rack: 'Rack D-05, Shelf 1', qty: 14, rate: 2400, lowAlert: 4 }
    ],
    invoices: [
      {
        id: 'SA-2026-101',
        date: '2026-08-28',
        clientName: 'Lumbini Modern Rice Mill',
        clientPan: '601249821',
        clientPhone: '9857022345',
        clientCity: 'Siddharthanagar (Bhairahawa)',
        items: [
          { desc: 'V-Belt B-65', brand: 'Fenner', qty: 10, rate: 620, amount: 6200 },
          { desc: 'UCP 208-24 Pillow Block', brand: 'NTN', qty: 4, rate: 2100, amount: 8400 }
        ],
        subtotal: 14600,
        discountPct: 5,
        discountAmount: 730,
        taxable: 13870,
        vat: 1803.10,
        grandTotal: 15673.10
      }
    ],
    transports: [
      {
        id: 'T-101',
        biltyNo: 'LUM-9482',
        date: '2026-08-28',
        service: 'Lumbini Express Cargo',
        destination: 'Pokhara (Baglung Buspark)',
        clientName: 'Annapurna Feed Industries',
        packages: '2 Wooden Crates',
        paymentMode: 'To-Pay (Client Pays)',
        status: 'In-Transit'
      },
      {
        id: 'T-102',
        biltyNo: 'NAM-3120',
        date: '2026-08-29',
        service: 'Namaste Freight Dispatch',
        destination: 'Kathmandu (Kalanki Depot)',
        clientName: 'Shree Krishna Agro Traders',
        packages: '3 Heavy Cartons',
        paymentMode: 'Paid (Prepaid)',
        status: 'Dispatched'
      }
    ],
    workshop: [
      {
        id: 'WS-501',
        date: '2026-08-29',
        jobType: 'Pulley Rebore & Keyway Cutting',
        clientName: 'Western Crusher Works, Butwal',
        notes: '12-inch 3-groove C-section Pulley rebored from 40mm to 55mm with 14mm keyway.',
        charges: 1800,
        status: 'In Machining'
      }
    ]
  };

  // State Management
  let state = {
    inventory: [],
    invoices: [],
    transports: [],
    workshop: [],
    currentGeneratedInvoice: null
  };

  function initStorage() {
    state.inventory = JSON.parse(localStorage.getItem(KEYS.INVENTORY)) || DEFAULT_SEED_DATA.inventory;
    state.invoices = JSON.parse(localStorage.getItem(KEYS.INVOICES)) || DEFAULT_SEED_DATA.invoices;
    state.transports = JSON.parse(localStorage.getItem(KEYS.TRANSPORTS)) || DEFAULT_SEED_DATA.transports;
    state.workshop = JSON.parse(localStorage.getItem(KEYS.WORKSHOP)) || DEFAULT_SEED_DATA.workshop;
    persistAll();
  }

  function persistAll() {
    localStorage.setItem(KEYS.INVENTORY, JSON.stringify(state.inventory));
    localStorage.setItem(KEYS.INVOICES, JSON.stringify(state.invoices));
    localStorage.setItem(KEYS.TRANSPORTS, JSON.stringify(state.transports));
    localStorage.setItem(KEYS.WORKSHOP, JSON.stringify(state.workshop));
  }

  // Live Nepal Time Clock Display
  function updateNepalClock() {
    const clockEl = document.getElementById('clockDisplay');
    if (!clockEl) return;
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const nepalDate = new Date(utc + (5.75 * 3600000));
    
    const hours = String(nepalDate.getHours()).padStart(2, '0');
    const minutes = String(nepalDate.getMinutes()).padStart(2, '0');
    const seconds = String(nepalDate.getSeconds()).padStart(2, '0');
    clockEl.textContent = `Nepal: ${hours}:${minutes}:${seconds} (UTC+5:45)`;
  }
  setInterval(updateNepalClock, 1000);
  updateNepalClock();

  // Tab Navigation Switcher
  window.switchInternalTab = function (tabId) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const targetPanel = document.getElementById(tabId);
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    
    if (targetPanel) targetPanel.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');

    if (tabId === 'tab-overview') renderOverviewDashboard();
    if (tabId === 'tab-inventory') window.renderInventoryTable();
    if (tabId === 'tab-invoicing') renderInvoicingPanel();
    if (tabId === 'tab-transport') renderTransportTable();
    if (tabId === 'tab-workshop') renderWorkshopTable();
  };

  // ================= 1. OVERVIEW DASHBOARD =================
  function renderOverviewDashboard() {
    const skuCountEl = document.getElementById('overviewSkuCount');
    const lowStockCountEl = document.getElementById('overviewLowStockCount');
    const invoiceCountEl = document.getElementById('overviewInvoiceCount');
    const revenueEl = document.getElementById('overviewRevenueVal');
    const dispatchEl = document.getElementById('overviewDispatchCount');
    const workshopEl = document.getElementById('overviewWorkshopCount');

    const totalSkus = state.inventory.length;
    const lowStock = state.inventory.filter(i => i.qty <= (i.lowAlert || 10)).length;
    const totalInvoices = state.invoices.length;
    const totalRev = state.invoices.reduce((acc, inv) => acc + (Number(inv.grandTotal) || 0), 0);
    const activeDispatches = state.transports.filter(t => t.status !== 'Delivered').length;
    const activeJobs = state.workshop.filter(w => w.status !== 'Delivered').length;

    if (skuCountEl) skuCountEl.textContent = totalSkus;
    if (lowStockCountEl) lowStockCountEl.textContent = `${lowStock} items low stock`;
    if (invoiceCountEl) invoiceCountEl.textContent = totalInvoices;
    if (revenueEl) revenueEl.textContent = `NPR ${totalRev.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total`;
    if (dispatchEl) dispatchEl.textContent = activeDispatches;
    if (workshopEl) workshopEl.textContent = activeJobs;

    // Recent Invoices in Overview
    const tbody = document.getElementById('recentInvoicesTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (state.invoices.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No invoices generated yet.</td></tr>`;
      return;
    }

    state.invoices.slice(-5).reverse().forEach(inv => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="item-code-badge">${inv.id}</strong></td>
        <td>${inv.date}</td>
        <td><strong>${inv.clientName}</strong></td>
        <td>${inv.items?.length || 0} items</td>
        <td>NPR ${(Number(inv.subtotal) || 0).toLocaleString('en-IN')}</td>
        <td>NPR ${(Number(inv.vat) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td><strong style="color: var(--accent-orange);">NPR ${(Number(inv.grandTotal) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></td>
        <td>
          <div class="table-btn-group">
            <button class="table-action-btn" title="View & Print" onclick="window.viewInvoice('${inv.id}')"><i class="fa-solid fa-print"></i></button>
            <button class="table-action-btn" title="WhatsApp Invoice" onclick="window.shareSpecificInvoiceWhatsApp('${inv.id}')"><i class="fa-brands fa-whatsapp text-emerald"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ================= 2. INVENTORY CRUD & LOCATOR =================
  window.renderInventoryTable = function () {
    const tbody = document.getElementById('inventoryTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const query = (document.getElementById('inventorySearchInput')?.value || '').toLowerCase().trim();
    const catFilter = document.getElementById('inventoryCategoryFilter')?.value || 'All';
    const brandFilter = document.getElementById('inventoryBrandFilter')?.value || 'All';

    const filtered = state.inventory.filter(item => {
      const matchQuery = !query || item.partNo.toLowerCase().includes(query) || item.rack.toLowerCase().includes(query);
      const matchCat = catFilter === 'All' || item.category === catFilter;
      const matchBrand = brandFilter === 'All' || item.brand === brandFilter;
      return matchQuery && matchCat && matchBrand;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">No inventory matching filters. Click "Add Item" to register a new SKU.</td></tr>`;
      return;
    }

    filtered.forEach(item => {
      const isLow = item.qty <= (item.lowAlert || 10);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="item-code-badge">${item.partNo}</strong></td>
        <td>${item.category}</td>
        <td><strong>${item.brand}</strong></td>
        <td><span class="rack-location-tag"><i class="fa-solid fa-location-dot"></i> ${item.rack}</span></td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="table-action-btn" style="width: 24px; height: 24px;" onclick="window.adjustStock('${item.id}', -1)">-</button>
            <span class="stock-count-badge ${isLow ? 'stock-low' : 'stock-good'}">${item.qty} pcs</span>
            <button class="table-action-btn" style="width: 24px; height: 24px;" onclick="window.adjustStock('${item.id}', 1)">+</button>
          </div>
        </td>
        <td>NPR ${Number(item.rate).toLocaleString('en-IN')}</td>
        <td>${isLow ? '<span class="status-tag" style="background: rgba(239,68,68,0.15); color: #F87171;"><i class="fa-solid fa-triangle-exclamation"></i> Low Stock</span>' : '<span class="status-tag" style="background: rgba(16,185,129,0.15); color: #34D399;"><i class="fa-solid fa-check"></i> Available</span>'}</td>
        <td>
          <div class="table-btn-group">
            <button class="table-action-btn" title="Edit Item" onclick="window.editStockItem('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="table-action-btn" title="Delete Item" style="color: #F87171;" onclick="window.deleteStockItem('${item.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  };

  window.adjustStock = function (id, delta) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    persistAll();
    window.renderInventoryTable();
    renderOverviewDashboard();
  };

  window.openStockModal = function (editId = null) {
    const modal = document.getElementById('stockModal');
    const form = document.getElementById('stockForm');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('stockEditId').value = '';

    if (editId) {
      const item = state.inventory.find(i => i.id === editId);
      if (item) {
        document.getElementById('stockEditId').value = item.id;
        document.getElementById('stockPartNo').value = item.partNo;
        document.getElementById('stockBrand').value = item.brand;
        document.getElementById('stockCategory').value = item.category;
        document.getElementById('stockRackLocation').value = item.rack;
        document.getElementById('stockQuantity').value = item.qty;
        document.getElementById('stockWholesaleRate').value = item.rate;
      }
    }
    modal.style.display = 'flex';
  };

  window.closeStockModal = function () {
    const modal = document.getElementById('stockModal');
    if (modal) modal.style.display = 'none';
  };

  window.saveStockItem = function () {
    const editId = document.getElementById('stockEditId').value;
    const partNo = document.getElementById('stockPartNo').value.trim();
    const brand = document.getElementById('stockBrand').value;
    const category = document.getElementById('stockCategory').value;
    const rack = document.getElementById('stockRackLocation').value.trim();
    const qty = parseInt(document.getElementById('stockQuantity').value, 10) || 0;
    const rate = parseFloat(document.getElementById('stockWholesaleRate').value) || 0;

    if (!partNo || !rack) {
      showToast('Please fill all required fields.');
      return;
    }

    if (editId) {
      const item = state.inventory.find(i => i.id === editId);
      if (item) {
        item.partNo = partNo;
        item.brand = brand;
        item.category = category;
        item.rack = rack;
        item.qty = qty;
        item.rate = rate;
      }
    } else {
      const newItem = {
        id: String(Date.now()),
        partNo,
        brand,
        category,
        rack,
        qty,
        rate,
        lowAlert: 10
      };
      state.inventory.unshift(newItem);
    }

    persistAll();
    window.closeStockModal();
    window.renderInventoryTable();
    renderOverviewDashboard();
    showToast('Inventory SKU saved successfully!');
  };

  window.editStockItem = function (id) {
    window.openStockModal(id);
  };

  window.deleteStockItem = function (id) {
    if (!confirm('Are you sure you want to remove this SKU from warehouse inventory?')) return;
    state.inventory = state.inventory.filter(i => i.id !== id);
    persistAll();
    window.renderInventoryTable();
    renderOverviewDashboard();
    showToast('SKU deleted from inventory.');
  };

  // ================= 3. B2B INVOICING & 13% VAT =================
  let invoiceRows = [];

  function renderInvoicingPanel() {
    const dateInput = document.getElementById('invDate');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    if (invoiceRows.length === 0) {
      window.addInvoiceItemRow();
    }
  }

  window.resetInvoiceForm = function () {
    document.getElementById('invoiceGeneratorForm')?.reset();
    document.getElementById('invDate').value = new Date().toISOString().split('T')[0];
    invoiceRows = [];
    document.getElementById('invoiceItemsRowsContainer').innerHTML = '';
    window.addInvoiceItemRow();
    document.getElementById('invoicePrintableView').style.display = 'none';
  };

  window.addInvoiceItemRow = function (seedDesc = '', seedBrand = 'SKF', seedQty = 1, seedRate = 500) {
    const rowId = 'row_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const container = document.getElementById('invoiceItemsRowsContainer');
    if (!container) return;

    const rowDiv = document.createElement('div');
    rowDiv.className = 'form-3col';
    rowDiv.id = rowId;
    rowDiv.style.marginBottom = '0.75rem';
    rowDiv.style.alignItems = 'flex-end';

    // Populate with inventory datalist options
    const datalistOptions = state.inventory.map(i => `<option value="${i.partNo}">`).join('');

    rowDiv.innerHTML = `
      <div class="input-field-group">
        <label>Part Description / Model *</label>
        <input type="text" class="inv-item-desc" list="invPartDatalist_${rowId}" placeholder="e.g. 6205 2RS or V-Belt B-65" value="${seedDesc}" onchange="window.onPartSelect('${rowId}', this.value)" required />
        <datalist id="invPartDatalist_${rowId}">${datalistOptions}</datalist>
      </div>

      <div class="form-2col" style="margin-bottom: 0;">
        <div class="input-field-group">
          <label>Brand</label>
          <input type="text" class="inv-item-brand" placeholder="e.g. SKF, NBC" value="${seedBrand}" />
        </div>
        <div class="input-field-group">
          <label>Quantity</label>
          <input type="number" class="inv-item-qty" min="1" value="${seedQty}" oninput="window.recalculateInvoiceTotals()" required />
        </div>
      </div>

      <div class="form-2col" style="margin-bottom: 0;">
        <div class="input-field-group">
          <label>Rate (NPR) *</label>
          <input type="number" class="inv-item-rate" min="0" step="10" value="${seedRate}" oninput="window.recalculateInvoiceTotals()" required />
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: flex-end;">
          <button type="button" class="table-action-btn" style="color: #F87171; height: 38px; width: 38px;" onclick="window.removeInvoiceItemRow('${rowId}')" title="Remove Line">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(rowDiv);
    invoiceRows.push(rowId);
  };

  window.onPartSelect = function (rowId, val) {
    const item = state.inventory.find(i => i.partNo.toLowerCase() === val.toLowerCase());
    if (!item) return;
    const rowEl = document.getElementById(rowId);
    if (!rowEl) return;
    rowEl.querySelector('.inv-item-brand').value = item.brand;
    rowEl.querySelector('.inv-item-rate').value = item.rate;
  };

  window.removeInvoiceItemRow = function (rowId) {
    if (invoiceRows.length <= 1) {
      showToast('Invoice must contain at least one item line.');
      return;
    }
    const rowEl = document.getElementById(rowId);
    if (rowEl) rowEl.remove();
    invoiceRows = invoiceRows.filter(id => id !== rowId);
  };

  window.recalculateInvoiceTotals = function () {
    // Dynamic recalculation preview
  };

  window.generateAndSaveInvoice = function () {
    const clientName = document.getElementById('invCustomerName').value.trim();
    const clientPan = document.getElementById('invCustomerPan').value.trim() || 'N/A';
    const clientPhone = document.getElementById('invCustomerPhone').value.trim();
    const clientCity = document.getElementById('invCustomerLocation').value.trim();
    const invDate = document.getElementById('invDate').value || new Date().toISOString().split('T')[0];
    const discountPct = parseFloat(document.getElementById('invDiscountPct').value) || 0;

    const items = [];
    let subtotal = 0;

    invoiceRows.forEach(rowId => {
      const rowEl = document.getElementById(rowId);
      if (!rowEl) return;
      const desc = rowEl.querySelector('.inv-item-desc').value.trim();
      const brand = rowEl.querySelector('.inv-item-brand').value.trim() || 'Genuine';
      const qty = parseInt(rowEl.querySelector('.inv-item-qty').value, 10) || 1;
      const rate = parseFloat(rowEl.querySelector('.inv-item-rate').value) || 0;
      const amount = qty * rate;

      if (desc) {
        items.push({ desc, brand, qty, rate, amount });
        subtotal += amount;
      }
    });

    if (items.length === 0) {
      showToast('Please add at least one item.');
      return;
    }

    const discountAmount = (subtotal * discountPct) / 100;
    const taxable = subtotal - discountAmount;
    const vat = taxable * 0.13; // 13% Nepal VAT
    const grandTotal = taxable + vat;

    const newInvoice = {
      id: 'SA-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      date: invDate,
      clientName,
      clientPan,
      clientPhone,
      clientCity,
      items,
      subtotal,
      discountPct,
      discountAmount,
      taxable,
      vat,
      grandTotal
    };

    state.invoices.unshift(newInvoice);
    state.currentGeneratedInvoice = newInvoice;
    persistAll();
    renderOverviewDashboard();

    // Render Printable View
    displayPrintableInvoice(newInvoice);
    showToast(`Invoice ${newInvoice.id} generated!`);
  };

  function displayPrintableInvoice(inv) {
    const printView = document.getElementById('invoicePrintableView');
    if (!printView) return;

    document.getElementById('printInvNumber').textContent = inv.id;
    document.getElementById('printInvDate').textContent = inv.date;
    document.getElementById('printClientName').textContent = inv.clientName;
    document.getElementById('printClientPan').textContent = inv.clientPan;
    document.getElementById('printClientPhone').textContent = inv.clientPhone;
    document.getElementById('printClientCity').textContent = inv.clientCity;

    const tbody = document.getElementById('printInvTbody');
    tbody.innerHTML = '';

    inv.items.forEach((item, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><strong>${item.desc}</strong></td>
        <td>${item.brand}</td>
        <td>${item.qty}</td>
        <td>NPR ${item.rate.toLocaleString('en-IN')}</td>
        <td style="text-align: right;">NPR ${item.amount.toLocaleString('en-IN')}</td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('printSubtotal').textContent = `NPR ${inv.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    document.getElementById('printDiscount').textContent = `NPR ${inv.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} (${inv.discountPct}%)`;
    document.getElementById('printVat').textContent = `NPR ${inv.vat.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    document.getElementById('printGrandTotal').textContent = `NPR ${inv.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    printView.style.display = 'block';
    printView.scrollIntoView({ behavior: 'smooth' });
  }

  window.viewInvoice = function (invId) {
    const inv = state.invoices.find(i => i.id === invId);
    if (!inv) return;
    window.switchInternalTab('tab-invoicing');
    displayPrintableInvoice(inv);
  };

  window.shareCurrentInvoiceWhatsApp = function () {
    if (!state.currentGeneratedInvoice) return;
    window.shareSpecificInvoiceWhatsApp(state.currentGeneratedInvoice.id);
  };

  window.shareSpecificInvoiceWhatsApp = function (invId) {
    const inv = state.invoices.find(i => i.id === invId);
    if (!inv) return;

    let msg = `*OFFICIAL PROFORMA INVOICE - SHREE ANJANI BELT & BEARING*\n`;
    msg += `*Invoice #:* ${inv.id} | *Date:* ${inv.date}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🏢 *Billed To:* ${inv.clientName}\n`;
    if (inv.clientPan && inv.clientPan !== 'N/A') msg += `📋 *PAN/VAT:* ${inv.clientPan}\n`;
    msg += `📍 *Delivery:* ${inv.clientCity}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*ITEMS:*\n`;
    inv.items.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.desc} (${it.brand}) x ${it.qty} = NPR ${it.amount.toLocaleString('en-IN')}\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `• Subtotal: NPR ${inv.subtotal.toLocaleString('en-IN')}\n`;
    if (inv.discountAmount > 0) msg += `• Discount (${inv.discountPct}%): -NPR ${inv.discountAmount.toLocaleString('en-IN')}\n`;
    msg += `• 13% Nepal VAT: NPR ${inv.vat.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n`;
    msg += `⭐ *GRAND TOTAL:* NPR ${inv.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Shree Anjani Belt & Bearing, Siddharthanagar (980-4462602 / 984-7301185)`;

    const phone = inv.clientPhone.replace(/\D/g, '');
    const waUrl = phone.length >= 10 
      ? `https://wa.me/977${phone.slice(-10)}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/9779804462602?text=${encodeURIComponent(msg)}`;

    window.open(waUrl, '_blank');
  };

  // ================= 4. TRANSPORT DISPATCH LOG =================
  function renderTransportTable() {
    const tbody = document.getElementById('transportTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (state.transports.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">No transport dispatches logged yet.</td></tr>`;
      return;
    }

    state.transports.forEach(trItem => {
      let statusClass = 'dispatched';
      if (trItem.status === 'In-Transit') statusClass = 'in-transit';
      if (trItem.status === 'Delivered') statusClass = 'delivered';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="item-code-badge">${trItem.biltyNo}</strong></td>
        <td>${trItem.date}</td>
        <td><strong>${trItem.service}</strong></td>
        <td><span class="rack-location-tag"><i class="fa-solid fa-map-pin"></i> ${trItem.destination}</span></td>
        <td>${trItem.clientName}</td>
        <td>${trItem.packages}</td>
        <td>${trItem.paymentMode}</td>
        <td>
          <select class="select-filter-control" style="padding: 0.2rem 0.4rem; font-size: 0.75rem;" onchange="window.updateTransportStatus('${trItem.id}', this.value)">
            <option value="Dispatched" ${trItem.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
            <option value="In-Transit" ${trItem.status === 'In-Transit' ? 'selected' : ''}>In-Transit</option>
            <option value="Delivered" ${trItem.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </td>
        <td>
          <button class="table-action-btn" title="Delete" style="color: #F87171;" onclick="window.deleteTransport('${trItem.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.openTransportModal = function () {
    const modal = document.getElementById('transportModal');
    if (modal) {
      document.getElementById('transportForm')?.reset();
      modal.style.display = 'flex';
    }
  };

  window.closeTransportModal = function () {
    const modal = document.getElementById('transportModal');
    if (modal) modal.style.display = 'none';
  };

  window.saveTransportDispatch = function () {
    const biltyNo = document.getElementById('transBiltyNo').value.trim();
    const service = document.getElementById('transService').value.trim();
    const destination = document.getElementById('transDestination').value.trim();
    const clientName = document.getElementById('transClientName').value.trim();
    const packages = document.getElementById('transPackages').value.trim();
    const paymentMode = document.getElementById('transPaymentMode').value;

    if (!biltyNo || !service || !destination || !clientName) {
      showToast('Please fill all required fields.');
      return;
    }

    const newDispatch = {
      id: 'T-' + Date.now(),
      biltyNo,
      date: new Date().toISOString().split('T')[0],
      service,
      destination,
      clientName,
      packages,
      paymentMode,
      status: 'Dispatched'
    };

    state.transports.unshift(newDispatch);
    persistAll();
    window.closeTransportModal();
    renderTransportTable();
    renderOverviewDashboard();
    showToast(`Bilty ${biltyNo} logged successfully!`);
  };

  window.updateTransportStatus = function (id, newStatus) {
    const t = state.transports.find(x => x.id === id);
    if (!t) return;
    t.status = newStatus;
    persistAll();
    renderOverviewDashboard();
    showToast(`Status updated to ${newStatus}`);
  };

  window.deleteTransport = function (id) {
    if (!confirm('Remove this dispatch record?')) return;
    state.transports = state.transports.filter(x => x.id !== id);
    persistAll();
    renderTransportTable();
    renderOverviewDashboard();
  };

  // ================= 5. WORKSHOP JOB CARD MANAGER =================
  function renderWorkshopTable() {
    const tbody = document.getElementById('workshopTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (state.workshop.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">No workshop jobs logged yet.</td></tr>`;
      return;
    }

    state.workshop.forEach(wItem => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="item-code-badge">${wItem.id}</strong></td>
        <td>${wItem.date}</td>
        <td><strong>${wItem.jobType}</strong></td>
        <td>${wItem.clientName}</td>
        <td style="max-width: 250px; font-size: 0.8rem; color: var(--text-secondary);">${wItem.notes}</td>
        <td>NPR ${Number(wItem.charges).toLocaleString('en-IN')}</td>
        <td>
          <select class="select-filter-control" style="padding: 0.2rem 0.4rem; font-size: 0.75rem;" onchange="window.updateWorkshopStatus('${wItem.id}', this.value)">
            <option value="Received" ${wItem.status === 'Received' ? 'selected' : ''}>Received</option>
            <option value="In Machining" ${wItem.status === 'In Machining' ? 'selected' : ''}>In Machining</option>
            <option value="Quality Tested" ${wItem.status === 'Quality Tested' ? 'selected' : ''}>Quality Tested</option>
            <option value="Ready for Pickup" ${wItem.status === 'Ready for Pickup' ? 'selected' : ''}>Ready for Pickup</option>
            <option value="Delivered" ${wItem.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </td>
        <td>
          <button class="table-action-btn" title="Delete" style="color: #F87171;" onclick="window.deleteWorkshopJob('${wItem.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.openWorkshopModal = function () {
    const modal = document.getElementById('workshopModal');
    if (modal) {
      document.getElementById('workshopForm')?.reset();
      modal.style.display = 'flex';
    }
  };

  window.closeWorkshopModal = function () {
    const modal = document.getElementById('workshopModal');
    if (modal) modal.style.display = 'none';
  };

  window.saveWorkshopJob = function () {
    const jobType = document.getElementById('wsJobType').value;
    const clientName = document.getElementById('wsClientName').value.trim();
    const notes = document.getElementById('wsNotes').value.trim();
    const charges = parseFloat(document.getElementById('wsCharges').value) || 0;
    const status = document.getElementById('wsStatus').value;

    if (!clientName || !notes) {
      showToast('Please provide client name and job specifications.');
      return;
    }

    const newJob = {
      id: 'WS-' + Math.floor(100 + Math.random() * 900),
      date: new Date().toISOString().split('T')[0],
      jobType,
      clientName,
      notes,
      charges,
      status
    };

    state.workshop.unshift(newJob);
    persistAll();
    window.closeWorkshopModal();
    renderWorkshopTable();
    renderOverviewDashboard();
    showToast(`Job Card ${newJob.id} created!`);
  };

  window.updateWorkshopStatus = function (id, newStatus) {
    const w = state.workshop.find(x => x.id === id);
    if (!w) return;
    w.status = newStatus;
    persistAll();
    renderOverviewDashboard();
    showToast(`Job status updated to ${newStatus}`);
  };

  window.deleteWorkshopJob = function (id) {
    if (!confirm('Remove this workshop job card?')) return;
    state.workshop = state.workshop.filter(x => x.id !== id);
    persistAll();
    renderWorkshopTable();
    renderOverviewDashboard();
  };

  // ================= 6. DATA BACKUP & RESTORE =================
  window.exportAllDataJSON = function () {
    const exportBundle = {
      store: 'Shree Anjani Belt & Bearing',
      location: 'Siddharthanagar, Nepal',
      exportedAt: new Date().toISOString(),
      data: state
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shree_anjani_erp_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON downloaded successfully!');
  };

  window.importDataJSON = function (e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.data && parsed.data.inventory) {
          state = parsed.data;
          persistAll();
          renderOverviewDashboard();
          showToast('Data restored successfully from backup!');
        } else {
          showToast('Invalid backup file format.');
        }
      } catch (err) {
        showToast('Error reading backup file.');
      }
    };
    reader.readAsText(file);
  };

  window.resetToDemoSeedData = function () {
    if (!confirm('Reset all inventory, invoices, dispatches, and workshop cards to default factory seed data?')) return;
    localStorage.clear();
    initStorage();
    renderOverviewDashboard();
    showToast('System reset to default seed data.');
  };

  // ================= 7. BULK CSV INVENTORY UPLOADER & PARSER =================
  let parsedCsvRows = [];

  window.downloadSampleInventoryCSV = function () {
    const csvContent = `PartNo,Brand,Category,RackLocation,Quantity,WholesaleRate,LowStockAlert\n` +
      `6205 2RS,SKF,Bearings,"Rack A-01, Shelf 2",50,480,10\n` +
      `22218 EK C3,URB,Bearings,"Rack B-03, Shelf 1",15,8500,5\n` +
      `V-Belt B-65,Fenner,Belts & Pulleys,"Hanger Belt Wall 1",60,620,15\n` +
      `UCP 208-24,NTN,Bearings,"Rack C-02, Heavy Bin",20,2100,5\n` +
      `Oil Seal 45x65x10,Other,Machinery Spares,"Small Parts Bin D-12",100,180,20\n` +
      `CI 3-Groove Pulley 10",Other,Belts & Pulleys,"Floor Pallet 04",8,3200,4\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shree_anjani_inventory_template.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Sample CSV template downloaded!');
  };

  window.handleBulkCSVUpload = function (e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const text = event.target.result;
        const lines = text.split(/\r\n|\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) {
          showToast('CSV file is empty or missing data rows.');
          return;
        }

        parsedCsvRows = [];
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
          const row = parseCSVLine(lines[i]);
          if (row.length >= 6) {
            const partNo = row[0].trim();
            const brand = row[1]?.trim() || 'Genuine';
            const category = row[2]?.trim() || 'Bearings';
            const rack = row[3]?.trim() || 'General Rack';
            const qty = parseInt(row[4], 10) || 0;
            const rate = parseFloat(row[5]) || 0;
            const lowAlert = parseInt(row[6], 10) || 10;

            if (partNo) {
              parsedCsvRows.push({
                id: 'sku_' + Date.now() + '_' + i,
                partNo,
                brand,
                category,
                rack,
                qty,
                rate,
                lowAlert
              });
            }
          }
        }

        if (parsedCsvRows.length === 0) {
          showToast('No valid inventory rows found in CSV.');
          return;
        }

        // Render preview
        const tbody = document.getElementById('csvPreviewTbody');
        if (tbody) {
          tbody.innerHTML = '';
          parsedCsvRows.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td><strong class="item-code-badge">${item.partNo}</strong></td>
              <td>${item.brand}</td>
              <td>${item.category}</td>
              <td>${item.rack}</td>
              <td><strong>${item.qty} pcs</strong></td>
              <td>NPR ${item.rate.toLocaleString('en-IN')}</td>
            `;
            tbody.appendChild(tr);
          });
        }

        document.getElementById('csvPreviewContainer').style.display = 'block';
        showToast(`Parsed ${parsedCsvRows.length} SKUs from spreadsheet!`);

      } catch (err) {
        console.error('CSV Parse Error:', err);
        showToast('Error parsing CSV file. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  function parseCSVLine(line) {
    const result = [];
    let insideQuotes = false;
    let currentToken = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        result.push(currentToken.trim());
        currentToken = '';
      } else {
        currentToken += char;
      }
    }
    result.push(currentToken.trim());
    return result;
  }

  window.commitBulkCSVImport = function () {
    if (parsedCsvRows.length === 0) {
      showToast('No records to import.');
      return;
    }

    // Merge logic: Update existing by partNo or add new
    let addedCount = 0;
    let updatedCount = 0;

    parsedCsvRows.forEach(newSku => {
      const existing = state.inventory.find(i => i.partNo.toLowerCase() === newSku.partNo.toLowerCase());
      if (existing) {
        existing.qty = newSku.qty;
        existing.rate = newSku.rate;
        existing.rack = newSku.rack;
        existing.brand = newSku.brand;
        existing.category = newSku.category;
        updatedCount++;
      } else {
        state.inventory.unshift(newSku);
        addedCount++;
      }
    });

    persistAll();
    window.renderInventoryTable();
    renderOverviewDashboard();
    document.getElementById('csvPreviewContainer').style.display = 'none';
    parsedCsvRows = [];
    document.getElementById('bulkCsvFileInput').value = '';

    showToast(`Batch import successful! (${addedCount} added, ${updatedCount} updated).`);
  };

  // Toast Notification
  function showToast(text) {
    const existing = document.querySelector('.internal-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'internal-toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald"></i> <span>${text}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Initialization
  initStorage();
  renderOverviewDashboard();

})();

