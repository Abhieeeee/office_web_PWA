# Shree Anjani Belt & Bearing — B2B Wholesale Portal & PWA

> **Formerly Shree Balaji Belt Center**  
> Siddharthanagar (Bhairahawa), Rupandehi District, Lumbini Province, Nepal  
> **Plus Code:** `GF83+75V, Siddharthanagar, Nepal`  
> **Repository:** [Abhieeeee/office_web_PWA](https://github.com/Abhieeeee/office_web_PWA)

---

## 📁 Project Architecture & File Separation

```text
shree-anjani-b2b/
├── index.html          # 🌐 Main Customer-Facing B2B Wholesale Portal
├── styles.css          # 🎨 Industrial Design System (Steel Gray, Navy, Warning Orange)
├── app.js              # ⚡ Public Client Logic & WhatsApp Quote Engine
├── manifest.json       # 📱 PWA Web App Manifest (Installable on Mobile)
├── sw.js               # 🚀 Service Worker (Offline Cache & Lightning Speed)
│
├── .agents/            # 🤖 Antigravity Native Subagent Skills & Coordination Rules
│   ├── rules/          # 📋 Multi-Agent Protocol, Scoring Rubrics & Safety Gates
│   └── skills/         # 🧠 6 Custom Subagent Skills (Gatekeeper, Codebase, UI/UX, Market, UX Persona, Planner)
│
├── agents/             # ⚙️ Python Multi-Agent Swarm Orchestrator Suite
│   ├── orchestrator.py # 🚀 Async 6-Agent Swarm Runner & Retry Engine
│   ├── agents_config.json
│   └── run_agents.bat  # ⚡ 1-Click Multi-Agent Execution on Windows
│
├── reports/            # 📊 Verified Multi-Agent Deliverables & Audits
│   ├── 01_codebase_audit_report.md
│   ├── 02_ui_ux_design_report.md
│   ├── 03_nepal_market_research_report.md
│   ├── 04_user_experience_audit_report.md (Rated 9.6/10 ≥ 9.5)
│   ├── 05_master_phase_execution_plan.md
│   └── master_manager_summary.md (Gatekeeper Certified 9.3/10)
│
├── internal/           # 🔒 Internal Store Management & Operations Console
│   ├── index.html      # 📊 Internal Operations & Inventory Dashboard
│   ├── agent-manager.html # ⚡ Real-Time Web Multi-Agent Manager Dashboard
│   ├── agent-manager.css  # 🎨 Industrial Dark Operations Theme
│   ├── agent-manager.js   # 🛠️ Live Dispatcher, Phase Tracker & Log Streamer
│   ├── internal.css
│   └── internal.js
│
├── .gitignore
└── README.md
```

---

## 🌐 Public B2B Website Features
- **Fast Load Speed**: Instant load across 2G/3G/4G network speeds in Nepal.
- **Top Trust Banner**: *"Nepal's Trusted Independent Wholesale Supplier for Genuine Bearings & Industrial Spares."*
- **Live Nepal Operating Calculator**: Automatically computes live open/closed status for Siddharthanagar timezone (`Asia/Kathmandu` UTC+5:45).
- **100% Genuine Guarantee Box**: Eliminates counterfeit risks for machine owners.
- **Brands We Supply**: High-visibility ticker for **SKF**, **NBC**, **URB**, and **NTN** with distributor disclaimer.
- **Bilingual Promotion Banner**: *"Bulk Order Special - आज Order गर्दा Special Rate उपलब्ध छ!"*
- **4-Column Wholesale Catalog**:
  1. *All Types of Bearings*
  2. *Conveyor Belts & Industrial Pulleys*
  3. *Machinery Spare Parts*
  4. *Machine Workshop Services*
- **Department Split Contact**:
  - 📞 **Sales & Fast Inquiry**: `980-4462602`
  - 🏭 **Warehouse & Support**: `984-7301185`
- **Location & Hours**: Full address `GF83+75V, Siddharthanagar, Nepal` with Google Maps link & extended Saturday hours (open till midnight).
- **Persistent WhatsApp FAB**: Floating action button with pre-filled inquiry messages.

---

## 🔒 Internal System (Phase 2)
The `internal/` directory is cleanly decoupled from the public website to allow building:
1. **Warehouse Inventory & Rack Locater**
2. **Dealer Proforma & VAT Invoicing**
3. **Regional Freight & Transport Logger**
4. **Workshop Job Card Manager**

---

## 🚀 Pushing to GitHub & Going Live (HTTPS)

```bash
# 1. Navigate to the project directory
cd C:\Users\DELL\.gemini\antigravity\scratch\shree-anjani-b2b

# 2. Add remote & push
git init
git remote add origin https://github.com/Abhieeeee/office_web_PWA.git
git branch -M main
git add .
git commit -m "feat: complete public B2B website with PWA and internal system scaffold"
git push -u origin main
```

*(Alternatively, you can double-click [`push_to_github.bat`](file:///C:/Users/DELL/.gemini/antigravity/scratch/shree-anjani-b2b/push_to_github.bat) to push automatically).*

### ⚡ Enable Free Live Hosting via GitHub Pages
1. Go to your GitHub repo: `https://github.com/Abhieeeee/office_web_PWA`
2. Click **Settings** > **Pages**
3. Under **Build and deployment** > **Branch**, select `main` and root `/`
4. Click **Save** — Your website will be live in ~30 seconds at:
   `https://abhieeeee.github.io/office_web_PWA/`
