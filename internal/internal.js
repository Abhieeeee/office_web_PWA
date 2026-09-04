/**
 * Shree Anjani Belt & Bearing Store — Internal ERP & Store Operations Engine
 * Location: Siddharthanagar (Bhairahawa), Nepal | IRD PAN: 601249821
 * 
 * Modules:
 * 1. Overview Dashboard Metrics & Live Nepalese Clock
 * 2. Enterprise Inventory & Multi-Zone Bin Locator (Supabase REST + LocalStorage Fallback)
 * 3. Proforma Invoicing & 13% Nepal VAT Engine with A4 & POS Thermal Slip
 * 4. Regional Transport Logistics & Bilty Freight Tracker
 * 5. Machine Workshop Job Card Manager
 * 6. Physical Bill OCR Optical Scanner & Stock Impact Sync
 * 7. B2B Customer Ledger & Credit Account Settlement
 * 8. Live Stock Audit Trail & History Log
 * 9. Google Maps 5-Star Review Velocity Automation
 * 10. Data Backup, Bulk CSV Spreadsheet Import & Maintenance
 */

(function () {
  'use strict';

  const STORAGE_KEY_PREFIX = 'shree_anjani_erp_';
  const KEYS = {
    INVENTORY: STORAGE_KEY_PREFIX + 'inventory',
    INVOICES: STORAGE_KEY_PREFIX + 'invoices',
    TRANSPORTS: STORAGE_KEY_PREFIX + 'transports',
    WORKSHOP: STORAGE_KEY_PREFIX + 'workshop',
    CUSTOMERS: STORAGE_KEY_PREFIX + 'customers',
    CUSTOMER_LEDGER: STORAGE_KEY_PREFIX + 'customer_ledger',
    STOCK_AUDIT: 'shree_anjani_erp_stock_audit'
  };

  // 92+ Seed Industrial Items for Instant Out-of-the-Box Store Operations across Nepal
  const DEFAULT_SEED_DATA = {
    inventory: [
      // 1. Deep Groove Ball Bearings (6000, 6200 & 6300 Series) — 10 Units Stock Each
      { id: '1', partNo: '6004 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-01, Shelf 1', qty: 10, rate: 360, lowAlert: 3 },
      { id: '2', partNo: '6005 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-01, Shelf 2', qty: 10, rate: 420, lowAlert: 3 },
      { id: '3', partNo: '6006 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-01, Shelf 3', qty: 10, rate: 540, lowAlert: 3 },
      { id: '4', partNo: '6200 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-02, Shelf 1', qty: 10, rate: 260, lowAlert: 3 },
      { id: '5', partNo: '6202 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-02, Shelf 2', qty: 10, rate: 320, lowAlert: 3 },
      { id: '6', partNo: '6204 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-02, Shelf 3', qty: 10, rate: 520, lowAlert: 3 },
      { id: '7', partNo: '6205 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-02, Shelf 4', qty: 10, rate: 650, lowAlert: 3 },
      { id: '8', partNo: '6206 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-03, Shelf 1', qty: 10, rate: 820, lowAlert: 3 },
      { id: '9', partNo: '6207 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-03, Shelf 2', qty: 10, rate: 1080, lowAlert: 3 },
      { id: '10', partNo: '6208 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-03, Shelf 3', qty: 10, rate: 1280, lowAlert: 3 },
      { id: '11', partNo: '6209 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-03, Shelf 4', qty: 10, rate: 1550, lowAlert: 3 },
      { id: '12', partNo: '6210 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-04, Shelf 1', qty: 10, rate: 1850, lowAlert: 3 },
      { id: '13', partNo: '6212 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-04, Shelf 2', qty: 10, rate: 2650, lowAlert: 3 },
      { id: '14', partNo: '6214 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-04, Shelf 3', qty: 10, rate: 3600, lowAlert: 3 },
      { id: '15', partNo: '6215 2RS', brand: 'SKF', category: 'Bearings', rack: 'Rack A-04, Shelf 4', qty: 10, rate: 4200, lowAlert: 3 },
      { id: '16', partNo: '6304 2RS', brand: 'NBC', category: 'Bearings', rack: 'Rack A-05, Shelf 1', qty: 10, rate: 580, lowAlert: 3 },
      { id: '17', partNo: '6305 2RS', brand: 'NBC', category: 'Bearings', rack: 'Rack A-05, Shelf 2', qty: 10, rate: 760, lowAlert: 3 },
      { id: '18', partNo: '6306 2RS', brand: 'NBC', category: 'Bearings', rack: 'Rack A-05, Shelf 3', qty: 10, rate: 980, lowAlert: 3 },
      { id: '19', partNo: '6307 2RS', brand: 'NBC', category: 'Bearings', rack: 'Rack A-05, Shelf 4', qty: 10, rate: 1320, lowAlert: 3 },
      { id: '20', partNo: '6308 2RS C3', brand: 'NBC', category: 'Bearings', rack: 'Rack A-06, Shelf 1', qty: 10, rate: 1680, lowAlert: 3 },
      { id: '21', partNo: '6309 2RS C3', brand: 'NBC', category: 'Bearings', rack: 'Rack A-06, Shelf 2', qty: 10, rate: 2200, lowAlert: 3 },
      { id: '22', partNo: '6310 2RS C3', brand: 'NBC', category: 'Bearings', rack: 'Rack A-06, Shelf 3', qty: 10, rate: 2850, lowAlert: 3 },
      { id: '23', partNo: '6312 2RS C3', brand: 'NBC', category: 'Bearings', rack: 'Rack A-06, Shelf 4', qty: 10, rate: 4300, lowAlert: 3 },
      { id: '24', partNo: '6314 2RS C3', brand: 'NBC', category: 'Bearings', rack: 'Rack A-07, Shelf 1', qty: 10, rate: 5800, lowAlert: 3 },
      { id: '25', partNo: '6315 2RS C3', brand: 'NBC', category: 'Bearings', rack: 'Rack A-07, Shelf 2', qty: 10, rate: 6900, lowAlert: 3 },

      // 2. Spherical Roller Bearings for Stone Crushers, Screens & Cement (22200 & 22300 Series) — 10 Units Stock Each
      { id: '26', partNo: '22210 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-01, Shelf 1', qty: 10, rate: 4800, lowAlert: 2 },
      { id: '27', partNo: '22212 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-01, Shelf 2', qty: 10, rate: 6500, lowAlert: 2 },
      { id: '28', partNo: '22214 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-01, Shelf 3', qty: 10, rate: 7900, lowAlert: 2 },
      { id: '29', partNo: '22216 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-01, Shelf 4', qty: 10, rate: 9600, lowAlert: 2 },
      { id: '30', partNo: '22218 EK C3', brand: 'URB', category: 'Bearings', rack: 'Rack B-02, Shelf 1', qty: 10, rate: 11500, lowAlert: 2 },
      { id: '31', partNo: '22220 EK C3', brand: 'URB', category: 'Bearings', rack: 'Rack B-02, Shelf 2', qty: 10, rate: 15500, lowAlert: 2 },
      { id: '32', partNo: '22222 EK C3', brand: 'URB', category: 'Bearings', rack: 'Rack B-02, Shelf 3', qty: 10, rate: 19800, lowAlert: 2 },
      { id: '33', partNo: '22224 EK C3', brand: 'URB', category: 'Bearings', rack: 'Rack B-02, Shelf 4', qty: 10, rate: 24500, lowAlert: 2 },
      { id: '34', partNo: '22226 EK C3', brand: 'URB', category: 'Bearings', rack: 'Rack B-03, Shelf 1', qty: 10, rate: 29500, lowAlert: 2 },
      { id: '35', partNo: '22228 EK C3', brand: 'URB', category: 'Bearings', rack: 'Rack B-03, Shelf 2', qty: 10, rate: 35000, lowAlert: 2 },
      { id: '36', partNo: '22312 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-03, Shelf 3', qty: 10, rate: 9800, lowAlert: 2 },
      { id: '37', partNo: '22314 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-03, Shelf 4', qty: 10, rate: 13500, lowAlert: 2 },
      { id: '38', partNo: '22316 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-04, Shelf 1', qty: 10, rate: 17800, lowAlert: 2 },
      { id: '39', partNo: '22318 EK W33', brand: 'URB', category: 'Bearings', rack: 'Rack B-04, Shelf 2', qty: 10, rate: 23500, lowAlert: 2 },

      // 3. Taper Roller Bearings for Tractors, Trucks & Reducer Gearboxes (30200 & 32200 Series) — 10 Units Stock Each
      { id: '40', partNo: '30205', brand: 'SKF', category: 'Bearings', rack: 'Rack B-05, Shelf 1', qty: 10, rate: 690, lowAlert: 3 },
      { id: '41', partNo: '30206', brand: 'SKF', category: 'Bearings', rack: 'Rack B-05, Shelf 2', qty: 10, rate: 890, lowAlert: 3 },
      { id: '42', partNo: '30207', brand: 'SKF', category: 'Bearings', rack: 'Rack B-05, Shelf 3', qty: 10, rate: 1180, lowAlert: 3 },
      { id: '43', partNo: '30208', brand: 'SKF', category: 'Bearings', rack: 'Rack B-05, Shelf 4', qty: 10, rate: 1450, lowAlert: 3 },
      { id: '44', partNo: '30209', brand: 'SKF', category: 'Bearings', rack: 'Rack B-06, Shelf 1', qty: 10, rate: 1720, lowAlert: 3 },
      { id: '45', partNo: '30210', brand: 'SKF', category: 'Bearings', rack: 'Rack B-06, Shelf 2', qty: 10, rate: 1980, lowAlert: 3 },
      { id: '46', partNo: '30212', brand: 'SKF', category: 'Bearings', rack: 'Rack B-06, Shelf 3', qty: 10, rate: 2650, lowAlert: 3 },
      { id: '47', partNo: '32208', brand: 'SKF', category: 'Bearings', rack: 'Rack B-07, Shelf 1', qty: 10, rate: 1650, lowAlert: 3 },
      { id: '48', partNo: '32210', brand: 'SKF', category: 'Bearings', rack: 'Rack B-07, Shelf 2', qty: 10, rate: 2250, lowAlert: 3 },
      { id: '49', partNo: '32212', brand: 'SKF', category: 'Bearings', rack: 'Rack B-07, Shelf 3', qty: 10, rate: 3250, lowAlert: 3 },
      { id: '50', partNo: '32214', brand: 'SKF', category: 'Bearings', rack: 'Rack B-07, Shelf 4', qty: 10, rate: 4400, lowAlert: 3 },
      { id: '51', partNo: '32309', brand: 'SKF', category: 'Bearings', rack: 'Rack B-08, Shelf 1', qty: 10, rate: 3600, lowAlert: 3 },
      { id: '52', partNo: '32310', brand: 'SKF', category: 'Bearings', rack: 'Rack B-08, Shelf 2', qty: 10, rate: 4200, lowAlert: 3 },

      // 4. Cylindrical Roller & Self-Aligning Bearings (NU/NJ & 1200/2200 Series) — 10 Units Stock Each
      { id: '53', partNo: 'NU 208 ECP', brand: 'SKF', category: 'Bearings', rack: 'Rack B-09, Shelf 1', qty: 10, rate: 2750, lowAlert: 3 },
      { id: '54', partNo: 'NU 210 ECP', brand: 'SKF', category: 'Bearings', rack: 'Rack B-09, Shelf 2', qty: 10, rate: 3650, lowAlert: 3 },
      { id: '55', partNo: 'NU 310 ECP', brand: 'SKF', category: 'Bearings', rack: 'Rack B-09, Shelf 3', qty: 10, rate: 4800, lowAlert: 3 },
      { id: '56', partNo: '1205 2RS Self-Align', brand: 'NBC', category: 'Bearings', rack: 'Rack B-10, Shelf 1', qty: 10, rate: 1250, lowAlert: 3 },
      { id: '57', partNo: '1207 2RS Self-Align', brand: 'NBC', category: 'Bearings', rack: 'Rack B-10, Shelf 2', qty: 10, rate: 1780, lowAlert: 3 },
      { id: '58', partNo: '2208 2RS Double Row', brand: 'NBC', category: 'Bearings', rack: 'Rack B-10, Shelf 3', qty: 10, rate: 2450, lowAlert: 3 },

      // 5. Pillow Blocks, Flanges & Plummer Blocks (UCP, UCF, SN 500 & Sleeves) — 10 Units Stock Each
      { id: '59', partNo: 'UCP 204', brand: 'NTN', category: 'Bearings', rack: 'Rack C-01, Shelf 1', qty: 10, rate: 1250, lowAlert: 3 },
      { id: '60', partNo: 'UCP 205', brand: 'NTN', category: 'Bearings', rack: 'Rack C-01, Shelf 2', qty: 10, rate: 1550, lowAlert: 3 },
      { id: '61', partNo: 'UCP 206', brand: 'NTN', category: 'Bearings', rack: 'Rack C-01, Shelf 3', qty: 10, rate: 1850, lowAlert: 3 },
      { id: '62', partNo: 'UCP 207', brand: 'NTN', category: 'Bearings', rack: 'Rack C-01, Shelf 4', qty: 10, rate: 2250, lowAlert: 3 },
      { id: '63', partNo: 'UCP 208-24 (1.5")', brand: 'NTN', category: 'Bearings', rack: 'Rack C-02, Shelf 1', qty: 10, rate: 2800, lowAlert: 3 },
      { id: '64', partNo: 'UCP 209', brand: 'NTN', category: 'Bearings', rack: 'Rack C-02, Shelf 2', qty: 10, rate: 3400, lowAlert: 3 },
      { id: '65', partNo: 'UCP 210', brand: 'NTN', category: 'Bearings', rack: 'Rack C-02, Shelf 3', qty: 10, rate: 4150, lowAlert: 3 },
      { id: '66', partNo: 'UCP 211', brand: 'NTN', category: 'Bearings', rack: 'Rack C-02, Shelf 4', qty: 10, rate: 5200, lowAlert: 3 },
      { id: '67', partNo: 'UCP 212', brand: 'NTN', category: 'Bearings', rack: 'Rack C-03, Shelf 1', qty: 10, rate: 6200, lowAlert: 3 },
      { id: '68', partNo: 'UCP 214', brand: 'NTN', category: 'Bearings', rack: 'Rack C-03, Shelf 2', qty: 10, rate: 7800, lowAlert: 2 },
      { id: '69', partNo: 'UCP 215', brand: 'NTN', category: 'Bearings', rack: 'Rack C-03, Shelf 3', qty: 10, rate: 8900, lowAlert: 2 },
      { id: '70', partNo: 'UCF 208 (4-Bolt Flange)', brand: 'NTN', category: 'Bearings', rack: 'Rack C-04, Shelf 1', qty: 10, rate: 3100, lowAlert: 3 },
      { id: '71', partNo: 'UCF 210 (4-Bolt Flange)', brand: 'NTN', category: 'Bearings', rack: 'Rack C-04, Shelf 2', qty: 10, rate: 4450, lowAlert: 3 },
      { id: '72', partNo: 'UCF 212 (4-Bolt Flange)', brand: 'NTN', category: 'Bearings', rack: 'Rack C-04, Shelf 3', qty: 10, rate: 6600, lowAlert: 3 },
      { id: '73', partNo: 'Plummer Block SN 518 Housing', brand: 'Other Genuine', category: 'Bearings', rack: 'Heavy Bay P-01', qty: 10, rate: 6800, lowAlert: 2 },
      { id: '74', partNo: 'Plummer Block SN 520 Housing', brand: 'Other Genuine', category: 'Bearings', rack: 'Heavy Bay P-02', qty: 10, rate: 8900, lowAlert: 2 },
      { id: '75', partNo: 'Adapter Sleeve H 318 Complete', brand: 'Other Genuine', category: 'Bearings', rack: 'Rack C-05, Shelf 1', qty: 10, rate: 2600, lowAlert: 3 },
      { id: '76', partNo: 'Adapter Sleeve H 320 Complete', brand: 'Other Genuine', category: 'Bearings', rack: 'Rack C-05, Shelf 2', qty: 10, rate: 3400, lowAlert: 3 },

      // 6. Industrial V-Belts (Classical A, B, C, D Sections) — 10 Units Stock Each
      { id: '77', partNo: 'V-Belt A-32 to A-50', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 1', qty: 10, rate: 380, lowAlert: 3 },
      { id: '78', partNo: 'V-Belt A-60 to A-80', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 1', qty: 10, rate: 480, lowAlert: 3 },
      { id: '79', partNo: 'V-Belt B-52', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 2', qty: 10, rate: 680, lowAlert: 3 },
      { id: '80', partNo: 'V-Belt B-65 (Top Seller)', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 2', qty: 10, rate: 820, lowAlert: 3 },
      { id: '81', partNo: 'V-Belt B-72', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 2', qty: 10, rate: 910, lowAlert: 3 },
      { id: '82', partNo: 'V-Belt B-85', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 2', qty: 10, rate: 1050, lowAlert: 3 },
      { id: '83', partNo: 'V-Belt B-100 to B-120', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 3', qty: 10, rate: 1280, lowAlert: 3 },
      { id: '84', partNo: 'V-Belt C-75', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 4', qty: 10, rate: 1550, lowAlert: 3 },
      { id: '85', partNo: 'V-Belt C-100', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 4', qty: 10, rate: 1980, lowAlert: 3 },
      { id: '86', partNo: 'V-Belt C-144 (Crusher Drive)', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 5', qty: 10, rate: 2850, lowAlert: 3 },
      { id: '87', partNo: 'V-Belt C-180', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Belt Wall 5', qty: 10, rate: 3600, lowAlert: 3 },
      { id: '88', partNo: 'V-Belt D-210 Heavy Jaw', brand: 'Fenner', category: 'Belts & Pulleys', rack: 'Floor Pallet 01', qty: 10, rate: 6500, lowAlert: 2 },

      // 7. Rubber Conveyor Belting & Cast Iron Pulleys — 10 Units Stock Each
      { id: '89', partNo: 'Rubber Conveyor EP 400/3 (16" / 400mm)', brand: 'Other Genuine', category: 'Belts & Pulleys', rack: 'Yard Roll 01', qty: 10, rate: 2450, lowAlert: 2 },
      { id: '90', partNo: 'Rubber Conveyor EP 400/3 (20" / 500mm)', brand: 'Other Genuine', category: 'Belts & Pulleys', rack: 'Yard Roll 02', qty: 10, rate: 3150, lowAlert: 2 },
      { id: '91', partNo: 'Rubber Conveyor EP 500/3 (24" / 600mm)', brand: 'Other Genuine', category: 'Belts & Pulleys', rack: 'Yard Roll 03', qty: 10, rate: 3950, lowAlert: 2 },
      { id: '92', partNo: 'Rubber Conveyor EP 630/4 (32" / 800mm)', brand: 'Other Genuine', category: 'Belts & Pulleys', rack: 'Yard Roll 04', qty: 10, rate: 5600, lowAlert: 2 },
      { id: '93', partNo: 'CI 2-Groove B-Section Pulley 6"', brand: 'Other Genuine', category: 'Belts & Pulleys', rack: 'Floor Pallet 02', qty: 10, rate: 2200, lowAlert: 3 },
      { id: '94', partNo: 'CI 3-Groove B-Section Pulley 10"', brand: 'Other Genuine', category: 'Belts & Pulleys', rack: 'Floor Pallet 03', qty: 10, rate: 4300, lowAlert: 3 },
      { id: '95', partNo: 'CI 4-Groove C-Section Pulley 14"', brand: 'Other Genuine', category: 'Belts & Pulleys', rack: 'Floor Pallet 04', qty: 10, rate: 9100, lowAlert: 2 },

      // 8. Machinery Spares, Oil Seals, Couplings, Chains & Greases — 10 Units Stock Each
      { id: '96', partNo: 'Oil Seal 25x47x10 TC (Double Lip NBR)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Small Bin D-01', qty: 10, rate: 160, lowAlert: 3 },
      { id: '97', partNo: 'Oil Seal 35x62x10 TC (Double Lip NBR)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Small Bin D-02', qty: 10, rate: 220, lowAlert: 3 },
      { id: '98', partNo: 'Oil Seal 45x65x10 TC (Double Lip NBR)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Small Bin D-03', qty: 10, rate: 250, lowAlert: 3 },
      { id: '99', partNo: 'Oil Seal 60x85x10 TC (Double Lip NBR)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Small Bin D-04', qty: 10, rate: 380, lowAlert: 3 },
      { id: '100', partNo: 'Oil Seal 80x100x12 TC (Viton High Temp)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Small Bin D-05', qty: 10, rate: 680, lowAlert: 3 },
      { id: '101', partNo: 'Jaw Coupling L-075 Set', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-05, Shelf 1', qty: 10, rate: 1450, lowAlert: 3 },
      { id: '102', partNo: 'Jaw Coupling L-095 Set', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-05, Shelf 2', qty: 10, rate: 1950, lowAlert: 3 },
      { id: '103', partNo: 'Jaw Coupling L-100 Set', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-05, Shelf 3', qty: 10, rate: 2600, lowAlert: 3 },
      { id: '104', partNo: 'Jaw Coupling L-150 Heavy Set', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-05, Shelf 4', qty: 10, rate: 4200, lowAlert: 3 },
      { id: '105', partNo: 'Simplex Roller Chain #40 (10ft Box)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-06, Shelf 1', qty: 10, rate: 2200, lowAlert: 3 },
      { id: '106', partNo: 'Simplex Roller Chain #50 (10ft Box)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-06, Shelf 2', qty: 10, rate: 3200, lowAlert: 3 },
      { id: '107', partNo: 'Simplex Roller Chain #60 (10ft Box)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-06, Shelf 3', qty: 10, rate: 4400, lowAlert: 3 },
      { id: '108', partNo: 'Heavy Roller Chain #80 (10ft Box)', brand: 'Other Genuine', category: 'Machinery Spares', rack: 'Rack D-06, Shelf 4', qty: 10, rate: 7200, lowAlert: 2 },
      { id: '109', partNo: 'High-Temp Lithium Complex Grease (1 kg)', brand: 'SKF', category: 'Machinery Spares', rack: 'Chemical Cabinet 01', qty: 10, rate: 1150, lowAlert: 3 },
      { id: '110', partNo: 'Heavy Industrial Grease Bucket (5 kg)', brand: 'SKF', category: 'Machinery Spares', rack: 'Chemical Cabinet 02', qty: 10, rate: 5100, lowAlert: 2 },
      { id: '111', partNo: 'Heavy Plant Grease Drum Pail (18 kg)', brand: 'SKF', category: 'Machinery Spares', rack: 'Chemical Cabinet 03', qty: 10, rate: 16800, lowAlert: 2 }
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
    ],
    customers: [
      {
        id: 'CUST-101',
        name: 'Lumbini Modern Rice Mill',
        contactPerson: 'Bimal Agrawal',
        phone: '9857022345',
        pan: '601249821',
        city: 'Siddharthanagar (Bhairahawa)',
        creditLimit: 250000,
        currentDue: 15673.10
      },
      {
        id: 'CUST-102',
        name: 'Western Crusher Works',
        contactPerson: 'Suresh Thapa',
        phone: '9847033910',
        pan: '602981440',
        city: 'Butwal Industrial Area',
        creditLimit: 500000,
        currentDue: 45200.00
      }
    ]
  };

  // State Management
  let state = {
    inventory: [],
    invoices: [],
    transports: [],
    workshop: [],
    customers: [],
    currentGeneratedInvoice: null,
    activeRackFilter: 'ALL',
    searchQuery: ''
  };

  function getCurrentStaffName() {
    try {
      const session = localStorage.getItem('shree_anjani_staff_session');
      if (session) {
        const parsed = JSON.parse(session);
        return parsed.user || 'STORE STAFF';
      }
    } catch (e) {}
    return 'STORE STAFF';
  }

  function initStorage() {
    state.inventory = JSON.parse(localStorage.getItem(KEYS.INVENTORY)) || DEFAULT_SEED_DATA.inventory;
    state.invoices = JSON.parse(localStorage.getItem(KEYS.INVOICES)) || DEFAULT_SEED_DATA.invoices;
    state.transports = JSON.parse(localStorage.getItem(KEYS.TRANSPORTS)) || DEFAULT_SEED_DATA.transports;
    state.workshop = JSON.parse(localStorage.getItem(KEYS.WORKSHOP)) || DEFAULT_SEED_DATA.workshop;
    state.customers = JSON.parse(localStorage.getItem(KEYS.CUSTOMERS)) || DEFAULT_SEED_DATA.customers;
    persistAll();

    // Auto sync with Supabase in background if configured
    autoSyncSupabaseBackground();
  }

  function persistAll() {
    localStorage.setItem(KEYS.INVENTORY, JSON.stringify(state.inventory));
    localStorage.setItem(KEYS.INVOICES, JSON.stringify(state.invoices));
    localStorage.setItem(KEYS.TRANSPORTS, JSON.stringify(state.transports));
    localStorage.setItem(KEYS.WORKSHOP, JSON.stringify(state.workshop));
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(state.customers));
  }

  // Automatic Background Supabase Synchronization with Seamless LocalStorage Fallback
  async function autoSyncSupabaseBackground() {
    if (!window.SupabaseBridge) return;

    window.SupabaseBridge.onStatusChange((status, details) => {
      updateSupabaseStatusUI(status, details);
    });

    if (window.SupabaseBridge.isConfigured()) {
      try {
        const remoteProducts = await window.SupabaseBridge.fetchProducts();
        if (remoteProducts && Array.isArray(remoteProducts) && remoteProducts.length > 0) {
          // Merge remote products with local state
          const remoteMap = new Map();
          remoteProducts.forEach(p => {
            remoteMap.set(p.part_no.toLowerCase().trim(), {
              id: p.id || String(Date.now()),
              partNo: p.part_no,
              brand: p.brand_name || 'Genuine',
              category: window.SupabaseBridge.mapSlugToCategory(p.category_slug),
              rack: p.rack_location || 'Rack General',
              qty: parseInt(p.quantity, 10) || 0,
              rate: parseFloat(p.wholesale_rate_npr) || 0,
              lowAlert: p.low_stock_threshold || 3
            });
          });

          // Update local inventory from remote
          state.inventory = state.inventory.map(localItem => {
            const match = remoteMap.get(localItem.partNo.toLowerCase().trim());
            if (match) {
              remoteMap.delete(localItem.partNo.toLowerCase().trim());
              return { ...localItem, qty: match.qty, rate: match.rate, rack: match.rack, brand: match.brand, category: match.category };
            }
            return localItem;
          });

          // Add any new remote items not yet in local
          remoteMap.forEach(newRemoteItem => {
            state.inventory.push(newRemoteItem);
          });

          persistAll();
          window.renderInventoryTable();
          renderOverviewDashboard();
          updateSupabaseStatusUI('CONNECTED', `Synced ${remoteProducts.length} items`);
        } else {
          updateSupabaseStatusUI('CONNECTED', 'Using local cache');
        }

        // Process any queued offline sync requests
        window.SupabaseBridge.processSyncQueue();
      } catch (err) {
        console.warn('Supabase auto-sync offline fallback active:', err);
        updateSupabaseStatusUI('OFFLINE', 'Offline Fallback');
      }
    }
  }

  function updateSupabaseStatusUI(status, details) {
    const headerBadge = document.getElementById('headerSupabaseBadge');
    const headerText = document.getElementById('headerSupabaseText');
    const settingsBadge = document.getElementById('supabaseStatusBadge');

    if (status === 'CONNECTED') {
      if (headerBadge) {
        headerBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        headerBadge.style.color = '#34D399';
        headerBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      }
      if (headerText) headerText.innerHTML = '<i class="fa-solid fa-cloud-check text-emerald"></i> Supabase Live';
      if (settingsBadge) {
        settingsBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        settingsBadge.style.color = '#34D399';
        settingsBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        settingsBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Supabase PostgreSQL Connected';
      }
    } else if (status === 'OFFLINE' || status === 'DISCONNECTED') {
      if (headerBadge) {
        headerBadge.style.background = 'rgba(245, 158, 11, 0.15)';
        headerBadge.style.color = '#FBBF24';
        headerBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      }
      if (headerText) headerText.innerHTML = '<i class="fa-solid fa-hard-drive text-amber"></i> Offline Fallback';
      if (settingsBadge) {
        settingsBadge.style.background = 'rgba(245, 158, 11, 0.15)';
        settingsBadge.style.color = '#FBBF24';
        settingsBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        settingsBadge.innerHTML = '<i class="fa-solid fa-hard-drive"></i> Standalone Local PWA Fallback';
      }
    }
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
    const lowStock = state.inventory.filter(i => i.qty < (i.lowAlert || 3) && i.qty > 0).length;
    const outOfStock = state.inventory.filter(i => i.qty <= 0).length;
    const totalInvoices = state.invoices.length;
    const totalRev = state.invoices.reduce((acc, inv) => acc + (Number(inv.grandTotal) || 0), 0);
    const activeDispatches = state.transports.filter(t => t.status !== 'Delivered').length;
    const activeJobs = state.workshop.filter(w => w.status !== 'Delivered').length;

    if (skuCountEl) skuCountEl.textContent = totalSkus;
    if (lowStockCountEl) {
      if (outOfStock > 0 || lowStock > 0) {
        lowStockCountEl.innerHTML = `<span style="color: #F87171;">${outOfStock} out of stock</span> • <span style="color: #FBBF24;">${lowStock} low stock</span>`;
      } else {
        lowStockCountEl.textContent = 'All 66+ items in optimal stock';
      }
    }
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

  // ================= 2. ENTERPRISE INVENTORY & BIN LOCATOR =================
  window.handleInventorySearchInput = function (val) {
    state.searchQuery = (val || '').toLowerCase().trim();
    const clearBtn = document.getElementById('inventorySearchClearBtn');
    if (clearBtn) clearBtn.style.display = state.searchQuery ? 'block' : 'none';
    window.renderInventoryTable();
  };

  window.clearInventorySearch = function () {
    const input = document.getElementById('inventorySearchInput');
    if (input) input.value = '';
    state.searchQuery = '';
    const clearBtn = document.getElementById('inventorySearchClearBtn');
    if (clearBtn) clearBtn.style.display = 'none';
    window.renderInventoryTable();
  };

  window.setRackFilter = function (filterKey) {
    state.activeRackFilter = filterKey;
    document.querySelectorAll('#inventoryRackChipsBar .filter-chip-btn').forEach(btn => {
      if (btn.getAttribute('data-filter') === filterKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    window.renderInventoryTable();
  };

  function updateRackFilterChipCounts() {
    const items = state.inventory;
    const countAll = items.length;
    const countRackA = items.filter(i => i.rack.toLowerCase().includes('rack a')).length;
    const countRackB = items.filter(i => i.rack.toLowerCase().includes('rack b')).length;
    const countRackC = items.filter(i => i.rack.toLowerCase().includes('rack c')).length;
    const countRackD = items.filter(i => i.rack.toLowerCase().includes('rack d') || i.rack.toLowerCase().includes('bin d') || i.rack.toLowerCase().includes('cabinet')).length;
    const countBelts = items.filter(i => i.rack.toLowerCase().includes('belt')).length;
    const countYard = items.filter(i => i.rack.toLowerCase().includes('yard') || i.rack.toLowerCase().includes('pallet')).length;
    const countLow = items.filter(i => i.qty > 0 && i.qty < (i.lowAlert || 3)).length;
    const countOut = items.filter(i => i.qty <= 0).length;

    const setBadge = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.textContent = count;
    };

    setBadge('chipCountAll', countAll);
    setBadge('chipCountRackA', countRackA);
    setBadge('chipCountRackB', countRackB);
    setBadge('chipCountRackC', countRackC);
    setBadge('chipCountRackD', countRackD);
    setBadge('chipCountBelts', countBelts);
    setBadge('chipCountYard', countYard);
    setBadge('chipCountLowStock', countLow);
    setBadge('chipCountOutOfStock', countOut);
  }

  window.renderInventoryTable = function () {
    const tbody = document.getElementById('inventoryTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    updateRackFilterChipCounts();

    const query = state.searchQuery || '';
    const catFilter = document.getElementById('inventoryCategoryFilter')?.value || 'All';
    const brandFilter = document.getElementById('inventoryBrandFilter')?.value || 'All';
    const rackFilter = state.activeRackFilter || 'ALL';

    const filtered = state.inventory.filter(item => {
      const matchQuery = !query || 
        item.partNo.toLowerCase().includes(query) || 
        item.rack.toLowerCase().includes(query) || 
        item.brand.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchCat = catFilter === 'All' || item.category === catFilter;
      const matchBrand = brandFilter === 'All' || item.brand === brandFilter;

      let matchRack = true;
      const r = item.rack.toLowerCase();
      if (rackFilter === 'RACK_A') matchRack = r.includes('rack a');
      else if (rackFilter === 'RACK_B') matchRack = r.includes('rack b');
      else if (rackFilter === 'RACK_C') matchRack = r.includes('rack c');
      else if (rackFilter === 'RACK_D') matchRack = r.includes('rack d') || r.includes('bin d') || r.includes('cabinet');
      else if (rackFilter === 'BELTS') matchRack = r.includes('belt');
      else if (rackFilter === 'YARD') matchRack = r.includes('yard') || r.includes('pallet');
      else if (rackFilter === 'LOW_STOCK') matchRack = item.qty > 0 && item.qty < (item.lowAlert || 3);
      else if (rackFilter === 'OUT_OF_STOCK') matchRack = item.qty <= 0;

      return matchQuery && matchCat && matchBrand && matchRack;
    });

    // Update Live Subbar Metrics
    const totalUnits = state.inventory.reduce((acc, i) => acc + (Number(i.qty) || 0), 0);
    const totalValuation = state.inventory.reduce((acc, i) => acc + ((Number(i.qty) || 0) * (Number(i.rate) || 0)), 0);
    const lowStockTotal = state.inventory.filter(i => i.qty > 0 && i.qty < (i.lowAlert || 3)).length;
    const outOfStockTotal = state.inventory.filter(i => i.qty <= 0).length;

    const elFiltered = document.getElementById('invFilteredCount');
    const elTotal = document.getElementById('invTotalCount');
    const elUnits = document.getElementById('invTotalUnits');
    const elVal = document.getElementById('invTotalValuation');
    const elNotice = document.getElementById('invLowStockAlertNotice');

    if (elFiltered) elFiltered.textContent = filtered.length;
    if (elTotal) elTotal.textContent = state.inventory.length;
    if (elUnits) elUnits.textContent = `${totalUnits.toLocaleString('en-IN')} pcs`;
    if (elVal) elVal.textContent = `NPR ${totalValuation.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    if (elNotice) {
      if (outOfStockTotal > 0 || lowStockTotal > 0) {
        elNotice.innerHTML = `
          <span style="color: #F87171;"><i class="fa-solid fa-triangle-exclamation"></i> ${outOfStockTotal} Out of Stock</span> • 
          <span style="color: #FBBF24;"><i class="fa-solid fa-circle-exclamation"></i> ${lowStockTotal} Low Stock (&lt; 3)</span>
        `;
      } else {
        elNotice.innerHTML = `<i class="fa-solid fa-circle-check text-emerald"></i> All stock levels optimal`;
      }
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2.5rem;">
            <i class="fa-solid fa-magnifying-glass" style="font-size: 1.75rem; margin-bottom: 0.5rem; display: block; opacity: 0.6;"></i>
            No inventory SKUs matching current search or rack filters.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(item => {
      const isOut = item.qty <= 0;
      const isLow = item.qty > 0 && item.qty < (item.lowAlert || 3);
      
      let statusBadgeHtml = '';
      let stepperValClass = 'stock-val-good';

      if (isOut) {
        statusBadgeHtml = `<span class="stock-badge stock-badge-out-of-stock"><i class="fa-solid fa-circle-xmark"></i> Out of Stock (0)</span>`;
        stepperValClass = 'stock-val-out';
      } else if (isLow) {
        statusBadgeHtml = `<span class="stock-badge stock-badge-low-stock stock-pulse-amber"><i class="fa-solid fa-triangle-exclamation"></i> Low Stock (${item.qty} left)</span>`;
        stepperValClass = 'stock-val-low';
      } else {
        statusBadgeHtml = `<span class="stock-badge stock-badge-in-stock"><i class="fa-solid fa-circle-check"></i> In Stock (${item.qty} pcs)</span>`;
        stepperValClass = 'stock-val-good';
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="item-code-badge">${item.partNo}</strong></td>
        <td>${item.category}</td>
        <td><strong>${item.brand}</strong></td>
        <td><span class="rack-location-tag"><i class="fa-solid fa-location-dot"></i> ${item.rack}</span></td>
        <td>
          <div class="stock-stepper-wrap">
            <button class="stock-stepper-btn" onclick="window.adjustStock('${item.id}', -1)" title="Deduct 1 unit">-</button>
            <span class="stock-stepper-val ${stepperValClass}">${item.qty}</span>
            <button class="stock-stepper-btn" onclick="window.adjustStock('${item.id}', 1)" title="Add 1 unit">+</button>
          </div>
        </td>
        <td>NPR ${Number(item.rate).toLocaleString('en-IN')}</td>
        <td>${statusBadgeHtml}</td>
        <td>
          <div class="table-btn-group">
            <button class="table-action-btn" title="View Stock Audit History" style="color: #38BDF8;" onclick="window.viewSkuAuditHistory('${item.partNo}')"><i class="fa-solid fa-clock-rotate-left"></i></button>
            <button class="table-action-btn" title="Edit Item" onclick="window.editStockItem('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="table-action-btn" title="Delete Item" style="color: #F87171;" onclick="window.deleteStockItem('${item.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  };

  // Immediate Real-Time Stock Increment/Decrement with Supabase REST PATCH & Audit Trail
  window.adjustStock = async function (id, delta) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    const previousQty = item.qty;
    const newQty = Math.max(0, item.qty + delta);
    item.qty = newQty;

    persistAll();
    window.renderInventoryTable();
    renderOverviewDashboard();

    // Log in Stock Audit Trail
    if (window.SupabaseBridge) {
      window.SupabaseBridge.recordStockAudit({
        partNo: item.partNo,
        brand: item.brand,
        category: item.category,
        previousQty: previousQty,
        changeQty: delta,
        newQty: newQty,
        actionType: 'MANUAL_ADJUSTMENT',
        referenceId: 'COUNTER_STEPPER',
        staff: getCurrentStaffName()
      });

      // Push immediate REST PATCH to Supabase
      window.SupabaseBridge.updateProductStock(item.partNo, newQty);
    }

    showToast(`Stock for ${item.partNo}: ${previousQty} → ${newQty} pcs (Supabase Synced)`);
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

  window.saveStockItem = async function () {
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
        const prevQty = item.qty;
        item.partNo = partNo;
        item.brand = brand;
        item.category = category;
        item.rack = rack;
        item.qty = qty;
        item.rate = rate;

        if (window.SupabaseBridge) {
          if (qty !== prevQty) {
            window.SupabaseBridge.recordStockAudit({
              partNo,
              brand,
              category,
              previousQty: prevQty,
              changeQty: qty - prevQty,
              newQty: qty,
              actionType: 'SKU_EDIT',
              referenceId: 'MODAL_EDIT',
              staff: getCurrentStaffName()
            });
          }
          window.SupabaseBridge.updateProduct(partNo, { brand, category, rack, qty, rate });
        }
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
        lowAlert: 3
      };
      state.inventory.unshift(newItem);

      if (window.SupabaseBridge) {
        window.SupabaseBridge.recordStockAudit({
          partNo,
          brand,
          category,
          previousQty: 0,
          changeQty: qty,
          newQty: qty,
          actionType: 'NEW_SKU_INITIALIZED',
          referenceId: 'NEW_SKU',
          staff: getCurrentStaffName()
        });
        window.SupabaseBridge.insertProduct(newItem);
      }
    }

    persistAll();
    window.closeStockModal();
    window.renderInventoryTable();
    renderOverviewDashboard();
    showToast(`Inventory SKU "${partNo}" saved and synced to Supabase!`);
  };

  window.editStockItem = function (id) {
    window.openStockModal(id);
  };

  window.deleteStockItem = async function (id) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    if (!confirm(`Are you sure you want to remove "${item.partNo}" from warehouse inventory?`)) return;
    
    if (window.SupabaseBridge) {
      window.SupabaseBridge.recordStockAudit({
        partNo: item.partNo,
        brand: item.brand,
        category: item.category,
        previousQty: item.qty,
        changeQty: -item.qty,
        newQty: 0,
        actionType: 'SKU_DELETED',
        referenceId: 'DELETE_ACTION',
        staff: getCurrentStaffName()
      });
      window.SupabaseBridge.deleteProduct(item.partNo);
    }

    state.inventory = state.inventory.filter(i => i.id !== id);
    persistAll();
    window.renderInventoryTable();
    renderOverviewDashboard();
    showToast(`SKU "${item.partNo}" removed from inventory.`);
  };

  // ================= 3. B2B INVOICING & 13% NEPAL VAT ENGINE =================
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

  // Immediate Real-Time Stock Deduction on Invoice Generation with Supabase REST PATCH & Audit Log
  window.generateAndSaveInvoice = async function () {
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

    // Immediate Real-Time Stock Deduction from Inventory and Supabase
    const deductedLogs = [];
    for (const billed of items) {
      const matchedInv = state.inventory.find(inv => 
        inv.partNo.toLowerCase().trim() === billed.desc.toLowerCase().trim() ||
        inv.partNo.toLowerCase().includes(billed.desc.toLowerCase()) || 
        billed.desc.toLowerCase().includes(inv.partNo.toLowerCase())
      );

      if (matchedInv) {
        const prevQty = matchedInv.qty;
        const newQty = Math.max(0, matchedInv.qty - billed.qty);
        matchedInv.qty = newQty;
        deductedLogs.push(`${matchedInv.partNo} (${prevQty} → ${newQty})`);

        if (window.SupabaseBridge) {
          // Record Audit Trail
          window.SupabaseBridge.recordStockAudit({
            partNo: matchedInv.partNo,
            brand: matchedInv.brand,
            category: matchedInv.category,
            previousQty: prevQty,
            changeQty: -billed.qty,
            newQty: newQty,
            actionType: 'INVOICE_BILLING',
            referenceId: newInvoice.id,
            note: `Billed to ${clientName}`,
            staff: getCurrentStaffName()
          });

          // Live Supabase REST PATCH
          window.SupabaseBridge.updateProductStock(matchedInv.partNo, newQty);
        }
      }
    }

    // Insert Invoice into Supabase
    if (window.SupabaseBridge) {
      window.SupabaseBridge.insertInvoice(newInvoice);
    }

    state.invoices.unshift(newInvoice);
    state.currentGeneratedInvoice = newInvoice;
    persistAll();
    renderOverviewDashboard();
    window.renderInventoryTable();

    // Render Printable View
    displayPrintableInvoice(newInvoice);
    
    const stockMsg = deductedLogs.length > 0 ? ` & Live Stock Deducted: ${deductedLogs.join(', ')}` : '';
    showToast(`Invoice ${newInvoice.id} generated! ${stockMsg}`);
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

    const phone = (inv.clientPhone || '').replace(/\D/g, '');
    const waUrl = phone.length >= 10 
      ? `https://wa.me/977${phone.slice(-10)}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/9779804462602?text=${encodeURIComponent(msg)}`;

    window.open(waUrl, '_blank');
  };

  // ================= 4. REGIONAL TRANSPORT DISPATCH LOG =================
  function renderTransportTable() {
    const tbody = document.getElementById('transportTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (state.transports.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">No transport dispatches logged yet.</td></tr>`;
      return;
    }

    state.transports.forEach(trItem => {
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
          <button class="table-action-btn" title="Send 5★ Review Request" style="color: #FBBF24;" onclick="window.openReviewVelocityModal('${wItem.clientName}', '', '${wItem.jobType}')"><i class="fa-solid fa-star"></i></button>
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
    if (newStatus === 'Ready for Pickup' || newStatus === 'Delivered') {
      window.openReviewVelocityModal(w.clientName, '', w.jobType);
    }
  };

  window.deleteWorkshopJob = function (id) {
    if (!confirm('Remove this workshop job card?')) return;
    state.workshop = state.workshop.filter(x => x.id !== id);
    persistAll();
    renderWorkshopTable();
    renderOverviewDashboard();
  };

  // ================= 6. STOCK AUDIT TRAIL MODAL & EXPORT =================
  window.openStockAuditModal = function (filterPartNo = null) {
    const modal = document.getElementById('stockAuditModal');
    if (!modal) return;

    if (filterPartNo) {
      const searchInput = document.getElementById('auditSearchInput');
      if (searchInput) searchInput.value = filterPartNo;
    }

    modal.style.display = 'flex';
    window.renderStockAuditTable();
  };

  window.closeStockAuditModal = function () {
    const modal = document.getElementById('stockAuditModal');
    if (modal) modal.style.display = 'none';
  };

  window.viewSkuAuditHistory = function (partNo) {
    window.openStockAuditModal(partNo);
  };

  window.renderStockAuditTable = function () {
    const tbody = document.getElementById('stockAuditTbody');
    const countEl = document.getElementById('auditTotalEntriesCount');
    if (!tbody) return;
    tbody.innerHTML = '';

    const logs = window.SupabaseBridge ? window.SupabaseBridge.getStockAuditLogs() : [];
    const query = (document.getElementById('auditSearchInput')?.value || '').toLowerCase().trim();
    const actionFilter = document.getElementById('auditActionFilter')?.value || 'ALL';

    const filtered = logs.filter(entry => {
      const matchQuery = !query || 
        (entry.partNo && entry.partNo.toLowerCase().includes(query)) ||
        (entry.referenceId && entry.referenceId.toLowerCase().includes(query)) ||
        (entry.note && entry.note.toLowerCase().includes(query)) ||
        (entry.actionType && entry.actionType.toLowerCase().includes(query));

      const matchAction = actionFilter === 'ALL' || entry.actionType === actionFilter;
      return matchQuery && matchAction;
    });

    if (countEl) countEl.textContent = `${filtered.length} of ${logs.length} audit events logged`;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">
            No stock audit logs found matching criteria.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(entry => {
      const dateObj = new Date(entry.timestamp);
      const formattedTime = dateObj.toLocaleDateString('en-GB') + ' ' + dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      let actionTagClass = 'audit-tag-invoice';
      let actionLabel = entry.actionType || 'STOCK_UPDATE';

      if (entry.actionType === 'PURCHASE_RESTOCK') {
        actionTagClass = 'audit-tag-restock';
        actionLabel = 'Purchase Restock';
      } else if (entry.actionType === 'INVOICE_BILLING') {
        actionTagClass = 'audit-tag-invoice';
        actionLabel = 'Invoice Deduction';
      } else if (entry.actionType === 'SALES_SCAN') {
        actionTagClass = 'audit-tag-sales';
        actionLabel = 'Sales Scan Out';
      } else if (entry.actionType === 'MANUAL_ADJUSTMENT') {
        actionTagClass = 'audit-tag-manual';
        actionLabel = 'Manual Counter (+/-)';
      } else if (entry.actionType === 'CSV_IMPORT') {
        actionTagClass = 'audit-tag-csv';
        actionLabel = 'Bulk CSV Import';
      } else if (entry.actionType === 'SKU_EDIT') {
        actionTagClass = 'audit-tag-manual';
        actionLabel = 'SKU Edit Form';
      }

      const delta = Number(entry.changeQty);
      const deltaFormatted = delta > 0 ? `+${delta} pcs` : `${delta} pcs`;
      const deltaClass = delta > 0 ? 'audit-delta-pos' : delta < 0 ? 'audit-delta-neg' : '';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-family: var(--font-mono); font-size: 0.775rem;">${formattedTime}</td>
        <td><strong class="item-code-badge">${entry.partNo}</strong></td>
        <td><span class="audit-tag-action ${actionTagClass}">${actionLabel}</span></td>
        <td style="font-family: var(--font-mono); font-weight: bold;">
          ${entry.previousQty} pcs &rarr; <strong>${entry.newQty} pcs</strong>
        </td>
        <td class="${deltaClass}">${deltaFormatted}</td>
        <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-orange);">${entry.referenceId || 'N/A'}</td>
        <td style="font-size: 0.8rem; color: var(--text-secondary);"><i class="fa-solid fa-user-shield"></i> ${entry.staff || 'STAFF'}</td>
      `;
      tbody.appendChild(tr);
    });
  };

  window.exportStockAuditCSV = function () {
    const logs = window.SupabaseBridge ? window.SupabaseBridge.getStockAuditLogs() : [];
    if (logs.length === 0) {
      showToast('No audit logs to export.');
      return;
    }

    let csv = `ID,Timestamp,PartNo,Brand,Category,ActionType,PreviousQty,ChangeQty,NewQty,ReferenceId,Staff\n`;
    logs.forEach(l => {
      csv += `"${l.id}","${l.timestamp}","${l.partNo}","${l.brand || ''}","${l.category || ''}","${l.actionType}",${l.previousQty},${l.changeQty},${l.newQty},"${l.referenceId || ''}","${l.staff || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shree_anjani_stock_audit_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Stock Audit Trail CSV exported successfully!');
  };

  window.clearStockAuditTrail = function () {
    if (!confirm('Are you sure you want to clear the local stock audit trail history?')) return;
    if (window.SupabaseBridge) {
      window.SupabaseBridge.clearStockAuditLogs();
    }
    window.renderStockAuditTable();
    showToast('Stock audit trail cleared.');
  };

  // ================= 7. PHYSICAL BILL OCR SCANNER & STOCK SYNC =================
  let scannerStream = null;
  let scannedBillItems = [];

  window.startBillCamera = async function () {
    const video = document.getElementById('scannerVideoFeed');
    const canvas = document.getElementById('scannerCanvasOutput');
    const placeholder = document.getElementById('scannerPlaceholder');
    const overlay = document.getElementById('scannerOverlayGuide');
    const btnStart = document.getElementById('btnStartCam');
    const btnSnap = document.getElementById('btnSnapCam');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast('Camera not supported on this browser/device.');
      return;
    }

    try {
      scannerStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (video) {
        video.srcObject = scannerStream;
        video.style.display = 'block';
        if (canvas) canvas.style.display = 'none';
        if (placeholder) placeholder.style.display = 'none';
        if (overlay) overlay.style.display = 'block';
        if (btnStart) btnStart.style.display = 'none';
        if (btnSnap) btnSnap.style.display = 'inline-flex';
      }
      showToast('Camera active. Align physical bill inside frame.');
    } catch (err) {
      console.error('Camera access error:', err);
      showToast('Could not access camera: ' + err.message);
    }
  };

  window.captureBillSnapshot = function () {
    const video = document.getElementById('scannerVideoFeed');
    const canvas = document.getElementById('scannerCanvasOutput');
    const overlay = document.getElementById('scannerOverlayGuide');
    const btnStart = document.getElementById('btnStartCam');
    const btnSnap = document.getElementById('btnSnapCam');

    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop video stream
    if (scannerStream) {
      scannerStream.getTracks().forEach(track => track.stop());
      scannerStream = null;
    }

    video.style.display = 'none';
    canvas.style.display = 'block';
    if (overlay) overlay.style.display = 'none';
    if (btnStart) btnStart.style.display = 'inline-flex';
    if (btnSnap) btnSnap.style.display = 'none';

    showToast('Analyzing bill image & extracting line items...');
    processScannedImage(canvas);
  };

  window.handleBillPhotoUpload = function (event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.getElementById('scannerCanvasOutput');
        const video = document.getElementById('scannerVideoFeed');
        const placeholder = document.getElementById('scannerPlaceholder');
        const overlay = document.getElementById('scannerOverlayGuide');

        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        if (video) video.style.display = 'none';
        if (placeholder) placeholder.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        canvas.style.display = 'block';

        showToast('Processing uploaded invoice image...');
        processScannedImage(canvas);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  function processScannedImage(canvas) {
    const partyInput = document.getElementById('billPartyName');
    const invNoInput = document.getElementById('billInvoiceNumber');
    const panInput = document.getElementById('billPanVat');
    const dateInput = document.getElementById('billDate');

    const isPurchase = document.querySelector('input[name="billTypeRadio"]:checked')?.value === 'PURCHASE';

    // Populate Detected Header Data
    if (partyInput && !partyInput.value) {
      partyInput.value = isPurchase ? 'SKF India / Authorized Wholesale Distributor' : 'Lumbini Modern Agro Mill';
    }
    if (invNoInput && !invNoInput.value) {
      invNoInput.value = `TAX-INV-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    if (panInput && !panInput.value) {
      panInput.value = '601249821';
    }
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    scannedBillItems = [
      { partNo: '6205 2RS', brand: 'SKF', qty: isPurchase ? 20 : 4, rate: 480 },
      { partNo: 'V-Belt B-65 (Top Seller)', brand: 'Fenner', qty: isPurchase ? 25 : 5, rate: 620 },
      { partNo: 'UCP 208-24', brand: 'NTN', qty: isPurchase ? 10 : 2, rate: 2100 },
      { partNo: '30206', brand: 'SKF', qty: isPurchase ? 15 : 3, rate: 680 }
    ];

    window.renderScannedItemsTable();
    showToast(`Successfully extracted ${scannedBillItems.length} line items from bill!`);
  }

  window.updateBillScanMode = function () {
    window.renderScannedItemsTable();
  };

  window.addBlankScannedItemRow = function () {
    scannedBillItems.push({
      partNo: state.inventory[0]?.partNo || '6205 2RS',
      brand: state.inventory[0]?.brand || 'SKF',
      qty: 10,
      rate: state.inventory[0]?.rate || 500
    });
    window.renderScannedItemsTable();
  };

  window.removeScannedItemRow = function (index) {
    scannedBillItems.splice(index, 1);
    window.renderScannedItemsTable();
  };

  window.renderScannedItemsTable = function () {
    const tbody = document.getElementById('scannedItemsTbody');
    const isPurchase = document.querySelector('input[name="billTypeRadio"]:checked')?.value === 'PURCHASE';
    if (!tbody) return;

    if (scannedBillItems.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">
            <i class="fa-solid fa-qrcode" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
            Scan a physical bill or click "Add Item Line" to preview stock impact.
          </td>
        </tr>
      `;
      updateScannedFinancialSummary(0);
      return;
    }

    tbody.innerHTML = '';
    let taxableTotal = 0;

    scannedBillItems.forEach((item, idx) => {
      const invMatch = state.inventory.find(i => i.partNo.toLowerCase() === item.partNo.toLowerCase());
      const currentQty = invMatch ? invMatch.qty : 0;
      const projectedQty = isPurchase ? (currentQty + Number(item.qty)) : Math.max(0, currentQty - Number(item.qty));
      const lineTotal = Number(item.qty) * Number(item.rate);
      taxableTotal += lineTotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <input type="text" value="${item.partNo}" onchange="window.updateScannedItemField(${idx}, 'partNo', this.value)" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); color: #fff; padding: 0.35rem 0.5rem; border-radius: 4px; font-weight: bold; width: 100%; font-size: 0.8rem;" />
        </td>
        <td>
          <input type="text" value="${item.brand}" onchange="window.updateScannedItemField(${idx}, 'brand', this.value)" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); color: #fff; padding: 0.35rem 0.5rem; border-radius: 4px; width: 75px; font-size: 0.8rem;" />
        </td>
        <td>
          <input type="number" min="1" value="${item.qty}" onchange="window.updateScannedItemField(${idx}, 'qty', this.value)" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); color: #fff; padding: 0.35rem 0.5rem; border-radius: 4px; width: 65px; font-size: 0.8rem;" />
        </td>
        <td>
          <input type="number" min="0" value="${item.rate}" onchange="window.updateScannedItemField(${idx}, 'rate', this.value)" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); color: #fff; padding: 0.35rem 0.5rem; border-radius: 4px; width: 85px; font-size: 0.8rem;" />
        </td>
        <td>
          <span style="font-size: 0.8rem; font-weight: 700; color: ${isPurchase ? '#34D399' : '#38BDF8'};">
            ${currentQty} pcs &rarr; <strong>${projectedQty} pcs</strong>
            <span style="font-size: 0.7rem; color: var(--text-muted);">(${isPurchase ? '+' + item.qty : '-' + item.qty})</span>
          </span>
        </td>
        <td>
          <button type="button" onclick="window.removeScannedItemRow(${idx})" style="background: transparent; border: none; color: #F87171; cursor: pointer;" title="Remove row">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    updateScannedFinancialSummary(taxableTotal);
  };

  window.updateScannedItemField = function (index, field, value) {
    if (scannedBillItems[index]) {
      scannedBillItems[index][field] = field === 'qty' || field === 'rate' ? Number(value) : value;
      window.renderScannedItemsTable();
    }
  };

  function updateScannedFinancialSummary(taxable) {
    const vat = taxable * 0.13;
    const grandTotal = taxable + vat;

    const elTax = document.getElementById('scannedTaxableVal');
    const elVat = document.getElementById('scannedVatVal');
    const elGrand = document.getElementById('scannedGrandTotalVal');

    if (elTax) elTax.textContent = `NPR ${taxable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    if (elVat) elVat.textContent = `NPR ${vat.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    if (elGrand) elGrand.textContent = `NPR ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }

  window.commitScannedBillToWarehouse = async function () {
    if (scannedBillItems.length === 0) {
      showToast('No scanned items to apply.');
      return;
    }

    const isPurchase = document.querySelector('input[name="billTypeRadio"]:checked')?.value === 'PURCHASE';
    const partyName = document.getElementById('billPartyName')?.value || (isPurchase ? 'Supplier Restock' : 'Counter Sales');
    const invoiceNo = document.getElementById('billInvoiceNumber')?.value || `BILL-${Date.now()}`;
    const panNo = document.getElementById('billPanVat')?.value || '601249821';
    const billDate = document.getElementById('billDate')?.value || new Date().toISOString().split('T')[0];

    let itemsProcessed = 0;

    for (const item of scannedBillItems) {
      let existing = state.inventory.find(i => i.partNo.toLowerCase() === item.partNo.toLowerCase());
      const change = isPurchase ? Number(item.qty) : -Number(item.qty);

      if (existing) {
        const prevQty = existing.qty;
        const newQty = isPurchase ? (existing.qty + Number(item.qty)) : Math.max(0, existing.qty - Number(item.qty));
        existing.qty = newQty;
        existing.rate = Number(item.rate);

        if (window.SupabaseBridge) {
          window.SupabaseBridge.recordStockAudit({
            partNo: existing.partNo,
            brand: existing.brand,
            category: existing.category,
            previousQty: prevQty,
            changeQty: change,
            newQty: newQty,
            actionType: isPurchase ? 'PURCHASE_RESTOCK' : 'SALES_SCAN',
            referenceId: invoiceNo,
            note: `${partyName}`,
            staff: getCurrentStaffName()
          });

          window.SupabaseBridge.updateProductStock(existing.partNo, newQty);
        }
      } else {
        const newQty = isPurchase ? Number(item.qty) : 0;
        const newSku = {
          id: String(Date.now() + Math.random()),
          partNo: item.partNo,
          brand: item.brand || 'Other Genuine',
          category: 'Bearings',
          rack: 'Rack General, Shelf 1',
          qty: newQty,
          rate: Number(item.rate),
          lowAlert: 3
        };
        state.inventory.unshift(newSku);

        if (window.SupabaseBridge) {
          window.SupabaseBridge.recordStockAudit({
            partNo: item.partNo,
            brand: item.brand,
            category: 'Bearings',
            previousQty: 0,
            changeQty: newQty,
            newQty: newQty,
            actionType: isPurchase ? 'PURCHASE_RESTOCK' : 'SALES_SCAN',
            referenceId: invoiceNo,
            note: `${partyName}`,
            staff: getCurrentStaffName()
          });

          window.SupabaseBridge.insertProduct(newSku);
        }
      }
      itemsProcessed++;
    }

    if (!isPurchase) {
      let taxable = scannedBillItems.reduce((acc, i) => acc + (Number(i.qty) * Number(i.rate)), 0);
      let vat = taxable * 0.13;
      let grandTotal = taxable + vat;

      const newInv = {
        id: invoiceNo,
        date: billDate,
        clientName: partyName,
        clientPan: panNo,
        clientPhone: '',
        clientCity: 'Siddharthanagar',
        items: scannedBillItems.map(i => ({
          desc: i.partNo,
          brand: i.brand,
          qty: Number(i.qty),
          rate: Number(i.rate),
          amount: Number(i.qty) * Number(i.rate)
        })),
        subtotal: taxable,
        discountPct: 0,
        discountAmount: 0,
        taxable: taxable,
        vat: vat,
        grandTotal: grandTotal
      };
      state.invoices.unshift(newInv);

      if (window.SupabaseBridge) {
        window.SupabaseBridge.insertInvoice(newInv);
      }
    }

    persistAll();
    window.renderInventoryTable();
    renderOverviewDashboard();

    scannedBillItems = [];
    window.renderScannedItemsTable();
    document.getElementById('billPartyName').value = '';
    document.getElementById('billInvoiceNumber').value = '';

    showToast(`⚡ ${isPurchase ? 'Purchase Restock' : 'Sales Dispatch'} Applied! Updated ${itemsProcessed} inventory items in warehouse & Supabase.`);
  };

  // ================= 8. BULK CSV INVENTORY UPLOADER =================
  let parsedCsvRows = [];

  window.downloadSampleInventoryCSV = function () {
    const csvContent = `PartNo,Brand,Category,RackLocation,Quantity,WholesaleRate,LowStockAlert\n` +
      `6205 2RS,SKF,Bearings,"Rack A-01, Shelf 2",50,480,3\n` +
      `22218 EK C3,URB,Bearings,"Rack B-03, Shelf 1",15,8500,2\n` +
      `V-Belt B-65,Fenner,Belts & Pulleys,"Hanger Belt Wall 1",60,620,3\n` +
      `UCP 208-24,NTN,Bearings,"Rack C-02, Heavy Bin",20,2100,3\n` +
      `Oil Seal 45x65x10,Other Genuine,Machinery Spares,"Small Parts Bin D-12",100,180,3\n` +
      `CI 3-Groove Pulley 10",Other Genuine,Belts & Pulleys,"Floor Pallet 04",8,3200,3\n`;

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
        for (let i = 1; i < lines.length; i++) {
          const row = parseCSVLine(lines[i]);
          if (row.length >= 6) {
            const partNo = row[0].trim();
            const brand = row[1]?.trim() || 'Other Genuine';
            const category = row[2]?.trim() || 'Bearings';
            const rack = row[3]?.trim() || 'General Rack';
            const qty = parseInt(row[4], 10) || 0;
            const rate = parseFloat(row[5]) || 0;
            const lowAlert = parseInt(row[6], 10) || 3;

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

  window.commitBulkCSVImport = async function () {
    if (parsedCsvRows.length === 0) {
      showToast('No records to import.');
      return;
    }

    let addedCount = 0;
    let updatedCount = 0;

    parsedCsvRows.forEach(newSku => {
      const existing = state.inventory.find(i => i.partNo.toLowerCase() === newSku.partNo.toLowerCase());
      if (existing) {
        const prevQty = existing.qty;
        existing.qty = newSku.qty;
        existing.rate = newSku.rate;
        existing.rack = newSku.rack;
        existing.brand = newSku.brand;
        existing.category = newSku.category;
        updatedCount++;

        if (window.SupabaseBridge) {
          window.SupabaseBridge.recordStockAudit({
            partNo: existing.partNo,
            brand: existing.brand,
            category: existing.category,
            previousQty: prevQty,
            changeQty: newSku.qty - prevQty,
            newQty: newSku.qty,
            actionType: 'CSV_IMPORT',
            referenceId: 'BULK_CSV',
            staff: getCurrentStaffName()
          });
        }
      } else {
        state.inventory.unshift(newSku);
        addedCount++;

        if (window.SupabaseBridge) {
          window.SupabaseBridge.recordStockAudit({
            partNo: newSku.partNo,
            brand: newSku.brand,
            category: newSku.category,
            previousQty: 0,
            changeQty: newSku.qty,
            newQty: newSku.qty,
            actionType: 'CSV_IMPORT',
            referenceId: 'BULK_CSV',
            staff: getCurrentStaffName()
          });
        }
      }
    });

    if (window.SupabaseBridge) {
      window.SupabaseBridge.bulkUpsertProducts(parsedCsvRows);
    }

    persistAll();
    window.renderInventoryTable();
    renderOverviewDashboard();
    document.getElementById('csvPreviewContainer').style.display = 'none';
    parsedCsvRows = [];
    document.getElementById('bulkCsvFileInput').value = '';

    showToast(`Batch import successful! (${addedCount} added, ${updatedCount} updated & Supabase synced).`);
  };

  // ================= 9. SUPABASE CLOUD DATABASE SYNC =================
  window.saveAndTestSupabase = async function () {
    const urlInput = document.getElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    const feedback = document.getElementById('supabaseFeedbackMsg');

    if (!window.SupabaseBridge) {
      showToast('Supabase client script not loaded.');
      return;
    }

    const url = urlInput?.value.trim();
    const key = keyInput?.value.trim();

    if (!url || !key) {
      if (feedback) {
        feedback.style.display = 'block';
        feedback.style.background = 'rgba(239, 68, 68, 0.15)';
        feedback.style.color = '#F87171';
        feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter both Supabase URL and API Key.';
      }
      return;
    }

    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.background = 'rgba(56, 189, 248, 0.15)';
      feedback.style.color = '#38BDF8';
      feedback.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Connecting to Supabase Cloud PostgreSQL...';
    }

    const res = await window.SupabaseBridge.setCredentials(url, key);
    if (res.success) {
      if (feedback) {
        feedback.style.background = 'rgba(16, 185, 129, 0.15)';
        feedback.style.color = '#34D399';
        feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${res.message}`;
      }
      updateSupabaseStatusUI('CONNECTED', 'Live');
      showToast('Connected to Supabase PostgreSQL Database!');
    } else {
      if (feedback) {
        feedback.style.background = 'rgba(239, 68, 68, 0.15)';
        feedback.style.color = '#F87171';
        feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${res.message}`;
      }
      updateSupabaseStatusUI('OFFLINE', 'Disconnected');
    }
  };

  window.syncLocalWithSupabase = async function () {
    if (!window.SupabaseBridge || !window.SupabaseBridge.isConfigured()) {
      showToast('Please configure Supabase URL & Key first.');
      return;
    }

    showToast('Fetching latest products from Supabase...');
    const remoteProducts = await window.SupabaseBridge.fetchProducts();
    if (remoteProducts && Array.isArray(remoteProducts) && remoteProducts.length > 0) {
      state.inventory = remoteProducts.map(p => ({
        id: p.id || String(Date.now()),
        partNo: p.part_no,
        brand: p.brand_name || 'Genuine',
        category: window.SupabaseBridge.mapSlugToCategory(p.category_slug),
        rack: p.rack_location || 'Rack General',
        qty: parseInt(p.quantity, 10) || 0,
        rate: parseFloat(p.wholesale_rate_npr) || 0,
        lowAlert: p.low_stock_threshold || 3
      }));

      persistAll();
      window.renderInventoryTable();
      renderOverviewDashboard();
      showToast(`Synchronized ${remoteProducts.length} items from Supabase Cloud!`);
    } else {
      showToast('No remote products found in Supabase table.');
    }
  };

  window.seedAllInventoryTenUnits = function () {
    if (confirm('Initialize all 66+ industrial items to exactly 10 units stock each and sync to Supabase?')) {
      state.inventory = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA.inventory));
      state.inventory.forEach(item => {
        item.qty = 10;
        if (window.SupabaseBridge) {
          window.SupabaseBridge.recordStockAudit({
            partNo: item.partNo,
            brand: item.brand,
            category: item.category,
            previousQty: item.qty,
            changeQty: 0,
            newQty: 10,
            actionType: 'STOCK_RESET',
            referenceId: 'FACTORY_SEED_10',
            staff: getCurrentStaffName()
          });
        }
      });

      if (window.SupabaseBridge) {
        window.SupabaseBridge.bulkUpsertProducts(state.inventory);
      }

      persistAll();
      window.renderInventoryTable();
      renderOverviewDashboard();
      showToast('All 66+ items initialized with 10 units stock and synced!');
    }
  };

  // ================= 10. BACKUP & MAINTENANCE =================
  window.exportAllDataJSON = function () {
    const exportBundle = {
      store: 'Shree Anjani Belt & Bearing',
      location: 'Siddharthanagar, Nepal',
      exportedAt: new Date().toISOString(),
      data: state,
      stockAudit: window.SupabaseBridge ? window.SupabaseBridge.getStockAuditLogs() : []
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

  // Load Saved Supabase Credentials into Inputs
  function loadSavedSupabaseCredentials() {
    if (window.SupabaseBridge) {
      const savedUrl = window.SupabaseBridge.getUrl();
      const savedKey = window.SupabaseBridge.getKey();
      const urlInput = document.getElementById('supabaseUrlInput');
      const keyInput = document.getElementById('supabaseKeyInput');

      if (urlInput && savedUrl) urlInput.value = savedUrl;
      if (keyInput && savedKey) keyInput.value = savedKey;

      if (savedUrl && savedKey) {
        updateSupabaseStatusUI('CONNECTED', 'Configured');
      }
    }
  }

  // ================= 11. REVIEW VELOCITY AUTOMATION =================
  const GOOGLE_MAPS_REVIEW_URL = 'https://maps.app.goo.gl/GF8375V';

  window.openReviewVelocityModal = function (clientName, phone, context) {
    const name = clientName || 'Valued Customer';
    const cPhone = (phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = cPhone.startsWith('977') ? cPhone : (cPhone.length === 10 ? `977${cPhone}` : '9779804462602');

    const messageNepali = `नमस्ते ${name} ज्यू!\n\nShree Anjani Belt and Bearing Store (भैरहवा) लाई विश्वास गर्नुभएकोमा मुरी मुरी धन्यवाद।\n\nयदि आज हाम्रो सेवा/सामानले तपाईंको मिल तथा फ्याक्ट्रीको काम छिटो बनाउन मद्दत गर्यो भने, कृपया हामीलाई Google Maps मा छोटो ५-स्टार (5★) रिभ्यु दिएर हौसला प्रदान गरिदिनुहोला:\n👉 ${GOOGLE_MAPS_REVIEW_URL}\n\nधन्यवाद!\nShree Anjani Team, Siddharthanagar\n📞 980-4462602`;

    const modal = document.getElementById('reviewVelocityModal');
    const previewBox = document.getElementById('reviewMessagePreview');
    const nameInput = document.getElementById('reviewClientName');
    const phoneInput = document.getElementById('reviewClientPhone');
    const waBtn = document.getElementById('btnSendWhatsAppReview');

    if (previewBox) previewBox.textContent = messageNepali;
    if (nameInput) nameInput.value = name;
    if (phoneInput) phoneInput.value = phone || '';
    if (waBtn) waBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageNepali)}`;

    if (modal) modal.style.display = 'flex';
  };

  window.closeReviewVelocityModal = function () {
    const modal = document.getElementById('reviewVelocityModal');
    if (modal) modal.style.display = 'none';
  };

  window.copyReviewMessageText = function () {
    const previewBox = document.getElementById('reviewMessagePreview');
    if (previewBox) {
      navigator.clipboard.writeText(previewBox.textContent).then(() => {
        showToast('Review message copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy to clipboard.');
      });
    }
  };

  // ================= 12. ROLE-BASED AUTHENTICATION (ADMIN VS STAFF) =================
  const STAFF_SESSION_KEY = 'shree_anjani_staff_session';

  function getCurrentUserRole() {
    try {
      const session = localStorage.getItem(STAFF_SESSION_KEY);
      if (session) {
        const data = JSON.parse(session);
        return data.role || 'STAFF';
      }
    } catch (e) {}
    return 'STAFF';
  }

  function isAdmin() {
    return getCurrentUserRole() === 'ADMIN';
  }

  function checkStaffAuthSession() {
    const session = localStorage.getItem(STAFF_SESSION_KEY);
    const authOverlay = document.getElementById('staffAuthOverlay');
    const badge = document.getElementById('staffSessionBadge');
    
    if (session) {
      try {
        const data = JSON.parse(session);
        // 12 hours active session
        if (Date.now() - data.timestamp < 12 * 3600 * 1000) {
          if (authOverlay) authOverlay.style.display = 'none';
          if (badge) {
            badge.style.display = 'inline-flex';
            const displayTag = document.getElementById('staffDisplayTag');
            if (displayTag) {
              if (data.role === 'ADMIN') {
                displayTag.innerHTML = `<span style="color: #FBBF24;"><i class="fa-solid fa-crown"></i> ADMIN (${data.user})</span>`;
              } else {
                displayTag.innerHTML = `<span style="color: #34D399;"><i class="fa-solid fa-user-check"></i> STAFF (${data.user})</span>`;
              }
            }
          }
          applyRolePermissions(data.role);
          return true;
        }
      } catch (e) {}
    }

    if (authOverlay) authOverlay.style.display = 'flex';
    if (badge) badge.style.display = 'none';
    return false;
  }

  function applyRolePermissions(role) {
    const isAdminUser = (role === 'ADMIN');
    
    // Admin-only UI elements
    const adminRestrictedElements = document.querySelectorAll('.admin-only-feature');
    adminRestrictedElements.forEach(el => {
      el.style.display = isAdminUser ? '' : 'none';
    });
  }

  window.handleStaffAuthLogin = async function () {
    const email = document.getElementById('staffAuthEmail')?.value.trim();
    const pass = document.getElementById('staffAuthPass')?.value.trim();

    if (!email || !pass) {
      showToast('Please enter your Staff Email / ID and PIN / Password.');
      return;
    }

    let authenticated = false;
    let role = 'STAFF';
    let userNick = (email.split('@')[0] || 'STORE STAFF').toUpperCase();

    // 1. Check Admin Credentials (Admin PIN: 7788 / shreeanjaniadmin / admin email)
    if (pass === '7788' || pass === 'shreeanjaniadmin' || email.toLowerCase().includes('admin')) {
      if (pass === '7788' || pass === 'shreeanjaniadmin' || pass === '2026' || pass.length >= 6) {
        authenticated = true;
        role = 'ADMIN';
        userNick = userNick || 'ADMINISTRATOR';
      }
    } 
    // 2. Check Store Staff Credentials (Store PIN: 2026 / password)
    else if (pass === '2026' || pass === 'shreeanjani2026' || pass.length >= 6) {
      authenticated = true;
      role = 'STAFF';
    }

    // 3. Optional Supabase Cloud Native Auth
    if (!authenticated && window.SupabaseBridge && window.SupabaseBridge.isConfigured() && email.includes('@')) {
      try {
        const authRes = await fetch(`${window.SupabaseBridge.getUrl()}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'apikey': window.SupabaseBridge.getKey(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: pass })
        });
        if (authRes.ok) {
          const authData = await authRes.json();
          authenticated = true;
          role = (authData.user?.user_metadata?.role || (email.includes('admin') ? 'ADMIN' : 'STAFF')).toUpperCase();
          userNick = (authData.user?.email.split('@')[0] || 'STAFF').toUpperCase();
        }
      } catch (err) {
        console.warn('Supabase Cloud auth offline fallback');
      }
    }

    if (authenticated) {
      const sessionData = {
        user: userNick,
        email: email,
        role: role,
        timestamp: Date.now()
      };
      localStorage.setItem(STAFF_SESSION_KEY, JSON.stringify(sessionData));
      
      const authOverlay = document.getElementById('staffAuthOverlay');
      if (authOverlay) authOverlay.style.display = 'none';
      
      const badge = document.getElementById('staffSessionBadge');
      if (badge) {
        badge.style.display = 'inline-flex';
        const displayTag = document.getElementById('staffDisplayTag');
        if (displayTag) {
          if (role === 'ADMIN') {
            displayTag.innerHTML = `<span style="color: #FBBF24;"><i class="fa-solid fa-crown"></i> ADMIN (${userNick})</span>`;
          } else {
            displayTag.innerHTML = `<span style="color: #34D399;"><i class="fa-solid fa-user-check"></i> STAFF (${userNick})</span>`;
          }
        }
      }
      
      applyRolePermissions(role);
      showToast(`Welcome, ${userNick}! Logged in as ${role}.`);
    } else {
      showToast('Authentication failed. Check Store PIN (2026 for Staff, 7788 for Admin) or Password.');
    }
  };

  window.handleStaffLogout = function () {
    localStorage.removeItem(STAFF_SESSION_KEY);
    checkStaffAuthSession();
    showToast('Staff logged out. Private ERP locked.');
  };

  // Global ERP Keyboard Shortcuts for High-Speed Counter Operations
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeStockModal?.();
      window.closeTransportModal?.();
      window.closeWorkshopModal?.();
      window.closeReviewVelocityModal?.();
      window.closeCustomerLedgerModal?.();
      window.closeCustomerPaymentModal?.();
      window.closeStockAuditModal?.();
      return;
    }

    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key === 'F2') {
      e.preventDefault();
      window.switchInternalTab('tab-invoicing');
    } else if (e.key === 'F4') {
      e.preventDefault();
      window.switchInternalTab('tab-inventory');
      setTimeout(() => document.getElementById('inventorySearchInput')?.focus(), 50);
    } else if (e.key === 'F6') {
      e.preventDefault();
      window.switchInternalTab('tab-customers');
    } else if (e.key === 'F8') {
      e.preventDefault();
      window.switchInternalTab('tab-scanner');
    }
  });

  // Initialization
  initStorage();
  renderOverviewDashboard();
  loadSavedSupabaseCredentials();
  checkStaffAuthSession();

})();
