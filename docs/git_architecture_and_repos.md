# Enterprise Git Architecture & Curated Open-Source Repositories

**Project**: Shree Anjani Belt & Bearing Store — Offline-First PWA & Enterprise ERP  
**Location**: Siddharthanagar (Bhairahawa), Nepal  
**Document Version**: 2.4.0 (Staff Engineering Standards)  

---

## Part 1: Curated High-Impact Open-Source Repositories

To unlock the true enterprise potential of the Shree Anjani Belt & Bearing platform, the following open-source codebases represent the gold standard in industrial inventory management, local-first offline synchronization, 3D CAD component inspection, and automated counter OCR.

```
+-----------------------------------------------------------------------------------+
|                  ENTERPRISE INDUSTRIAL COMMERCE ECOSYSTEM                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ 1. Core ERP & Ledger ]       [ 2. 3D CAD & Digital Twin ]                      |
|  * ERPNext (frappe/erpnext)     * Three.js (mrdoob/three.js)                      |
|  * Invoice Ninja (invoiceninja) * Open CASCADE Web (donalffons/opencascade.js)    |
|                                                                                   |
|  [ 3. Local-First & Sync ]      [ 4. Hardware & Counter OCR ]                     |
|  * RxDB (pubkey/rxdb)           * Tesseract.js (naptha/tesseract.js)              |
|  * Supabase (supabase/supabase) * WebUSB / ESC-POS Thermal Engine                 |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 1. Enterprise ERP, B2B Invoicing & Double-Entry Accounting
| Repository | GitHub Stars / URL | Key Capabilities & Value for Shree Anjani |
| :--- | :--- | :--- |
| **ERPNext** | `frappe/erpnext` | Complete industrial manufacturing, multi-warehouse batch tracking, serial numbers, supplier procurement, and Nepal VAT compliance workflows. |
| **Invoice Ninja** | `invoiceninja/invoiceninja` | Clean B2B proforma and tax invoicing, automated payment reminders via WhatsApp/SMS, client portal, and multi-currency exchange rates (NPR/INR). |
| **Dolibarr ERP & CRM** | `Dolibarr/dolibarr` | Lightweight, modular inventory tracking, physical bin/shelf location mapping, and customer credit ledger management. |

### 2. Interactive 3D CAD & Industrial WebGL Component Visualization
| Repository | GitHub Stars / URL | Key Capabilities & Value for Shree Anjani |
| :--- | :--- | :--- |
| **Three.js** | `mrdoob/three.js` | Ultra-fast WebGL rendering engine powering our real-time interactive 3D bearing breakdown (Inner/Outer rings, ball cages, roller bearings, exploded view inspection). |
| **OpenCASCADE.js** | `donalffons/opencascade.js` | WebAssembly port of Open CASCADE CAD kernel. Enables browser-native viewing and dimension measurements of STEP/IGES engineering drawings directly from mill operators. |
| **CadQuery** | `CadQuery/cadquery` | Parametric Python CAD scripting for generating accurate 3D models of customized industrial pulleys, taper bushes, and bearing pillow blocks. |

### 3. Local-First Offline Synchronization & Database Engines
| Repository | GitHub Stars / URL | Key Capabilities & Value for Shree Anjani |
| :--- | :--- | :--- |
| **RxDB** | `pubkey/rxdb` | Reactive, offline-first client database with zero-latency local queries and automatic peer-to-peer or server synchronization (WebSockets / HTTP). |
| **Supabase JS Client** | `supabase/supabase-js` | PostgreSQL REST & Realtime subscription client providing live stock deduction across multiple counter terminals simultaneously. |
| **WatermelonDB** | `Nozbe/WatermelonDB` | SQLite-backed reactive database optimized for 10,000+ SKU lookups at 60 FPS on low-spec counter Android tablets and POS terminals. |

### 4. Computer Vision, OCR & Hardware Thermal Printing
| Repository | GitHub Stars / URL | Key Capabilities & Value for Shree Anjani |
| :--- | :--- | :--- |
| **Tesseract.js** | `naptha/tesseract.js` | Pure WebAssembly OCR engine for scanning paper bills, supplier tax invoices, and stamped bearing part numbers (e.g. `6205-2RS`, `UCF 208`) without cloud dependencies. |
| **ESC/POS Web Print** | `song940/node-escpos` | WebUSB and WebBluetooth thermal printer integration for instantaneous 80mm/58mm counter receipts and warehouse bin barcoding. |

---

## Part 2: Enterprise Git Repository Management & Professional Standards

To ensure long-term codebase hygiene, zero regressions, and seamless team collaboration, this project adheres to the following professional Git standards.

### 1. Branching Strategy: Trunk-Based Development
* **`main`**: Production-ready branch. Continuous deployment to Cloudflare Pages & GitHub Pages. Every commit must pass all CI checks.
* **`develop`**: Integration branch for pre-release features.
* **`feat/<feature-name>`**: Short-lived feature branches (e.g. `feat/ocr-bill-scanner`, `feat/webcrypto-rbac`).
* **`fix/<bug-name>`**: Bugfix branches (e.g. `fix/vat-rounding-calc`).
* **`perf/<optimization>`**: Performance improvements (e.g. `perf/threejs-drawcall-reduction`).

### 2. Conventional Commits Specification
All commit messages must strictly follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description in imperative mood>

[optional body explaining motivation and architectural decisions]

[optional footer referencing issue IDs or breaking changes]
```

#### Approved Commit Types:
* `feat`: New user-facing feature or internal capability (e.g., `feat(auth): implement WebCrypto SHA-256 PBKDF2 hashing`).
* `fix`: Bug fix in business logic, UI, or calculation (e.g., `fix(invoice): correct 13% Nepal VAT precision on discounted subtotal`).
* `refactor`: Code change that neither fixes a bug nor adds a feature (e.g., `refactor(inventory): modularize state store`).
* `perf`: Code change that improves performance or bundle size (e.g., `perf(rendering): optimize 3D bearing vertex buffers`).
* `sec`: Security hardening or vulnerability remediation (e.g., `sec(lockout): enforce 15-minute inactivity watchdog`).
* `docs`: Documentation updates (e.g., `docs(git): add curated repository architecture guide`).
* `ci`: Continuous Integration pipeline changes (e.g., `ci(actions): add Node.js syntax audit job`).

### 3. Automated CI/CD Pipeline (`.github/workflows/ci.yml`)
Every push and Pull Request triggers an automated GitHub Actions pipeline validating:
1. **JavaScript AST Syntax Check**: `node -c` compilation across all core modules.
2. **PWA Manifest Validation**: Verifies schema integrity for both public PWA and Private ERP.
3. **Security Secret Scan**: Scans against leakage of private keys (`service_role`, `.pem`).

---
*Authored by Senior Staff Software Engineering Team*  
*Shree Anjani Belt & Bearing Store, Siddharthanagar, Nepal*
