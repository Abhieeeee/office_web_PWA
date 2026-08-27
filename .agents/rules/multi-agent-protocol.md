# Multi-Agent Coordination Protocol & Scoring Rules

This document defines the inter-agent operational protocols, score rubrics, phase boundaries, and safety gates for the **Shree Anjani Belt & Bearing** AI agent swarm.

---

## 1. Agent Swarm Roles

| Agent ID | Name | Core Responsibility | Pass Threshold |
| :--- | :--- | :--- | :--- |
| **`AGT-01`** | **Quality Gatekeeper & Evaluator** | Multi-dimensional scoring, strict quality gating, critique generation & retry loop management | **≥ 8.0 / 10.0** |
| **`AGT-02`** | **Codebase & Bug Auditor** | HTML5, CSS3, JS, PWA (Service Worker), network latency profiling on Nepal telcos (NTC/Ncell), and drop-in code fixes | Verified Code Patch |
| **`AGT-03`** | **UI/UX & Layout Specialist** | Industrial visual hierarchy, mobile layout ergonomics, WhatsApp RFQ widgets, and bilingual localization | Visual Consistency |
| **`AGT-04`** | **Nepal Market Researcher** | Pan-Nepal & corridor demand (Bhairahawa-Butwal, Birgunj, Kathmandu, Biratnagar), genuine brands (SKF, NBC, URB, NTN), VAT & credit norms | Strategic Intelligence |
| **`AGT-05`** | **User Experience Persona Auditor** | Real-world persona simulation (Plant Engineer, Rice Mill Owner, Workshop Mechanic), fault inventory, and end-to-end journey scoring | **≥ 9.5 / 10.0** |
| **`AGT-06`** | **Master Phase Planner & Controller** | Sequential 4-phase execution roadmap, pre-execution safety gate checks, and autonomous execution orchestration | 100% Phase Sign-off |

---

## 2. Gated 4-Phase Execution Pipeline

```mermaid
graph TD
    subgraph Phase 1: Diagnostics & Foundation
        A1[AGT-02: Codebase Audit]
        A2[AGT-03: UI/UX Assessment]
    end

    subgraph Phase 2: Market & Context Intelligence
        B1[AGT-04: Nepal Market Research]
    end

    subgraph Phase 3: Persona Simulation & UX Gating
        C1[AGT-05: User Experience Persona Auditor]
        C2{Score >= 9.5 / 10?}
        C1 --> C2
        C2 -- No (< 9.5) --> C3[Critique & Patch Friction Points]
        C3 --> C1
        C2 -- Yes (>= 9.5) --> D1
    end

    subgraph Phase 4: Gatekeeper Evaluation & Master Sign-Off
        D1[AGT-01: Quality Gatekeeper Assessment]
        D2{Overall Score >= 8.0 / 10?}
        D1 --> D2
        D2 -- No (< 8.0) --> D3[Auto-Retry Refinement Loop Max 3]
        D3 --> D1
        D2 -- Yes (>= 8.0) --> E1[AGT-06: Master Executive Summary & Final Delivery]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
    Phase 3 --> Phase 4
```

---

## 3. Scoring Rubric (10-Point Standard)

Each agent output is evaluated by `AGT-01` against 4 core criteria (2.5 points each):

1. **Completeness & Rigor (0–2.5 pts)**: All project files, requirements, and edge-cases addressed.
2. **Technical Accuracy & Correctness (0–2.5 pts)**: Zero syntax bugs, valid CSS/JS, valid JSON-LD schemas, offline PWA compliance.
3. **Nepal Market Context Fit (0–2.5 pts)**: Local industrial terminology, WhatsApp inquiry ergonomics, NTC/Ncell 3G/4G bandwidth tolerance, and genuine brand protection.
4. **Actionability & Polish (0–2.5 pts)**: Clear copyable code patches, structured markdown formatting, zero vague placeholders.

### Gating Conditions:
- **`Score >= 8.0`**: **PASSED**. Approved for pipeline progression.
- **`Score < 8.0`**: **RETRY REQUIRED**. The Gatekeeper attaches an actionable critique. The worker agent must address all critique points in a new iteration (maximum 3 iterations).
- **`UX Agent (AGT-05) Requirement`**: Requires an exceptional **≥ 9.5 / 10.0** user experience score. If `< 9.5`, all identified friction points must be addressed before the final UX report is published.
