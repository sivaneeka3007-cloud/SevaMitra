# FairShift — UN SDG 8 Decent Work Platform

> **FairShift** is a friendly, mobile-first decent work and fair remuneration platform designed for shift-based workers and employers. Built in direct alignment with **United Nations Sustainable Development Goal 8 (Decent Work and Economic Growth)**.

---

## 1. Problem Statement

Shift-based workers across intensive sectors—such as civil construction and emergency healthcare—face pervasive systemic challenges:
1. **Unrecorded Overtime & Wage Theft**: Manual attendance sheets and informal rosters often fail to credit hours worked beyond statutory limits, depriving workers of legally mandated overtime rates (SDG 8.5).
2. **Extreme Fatigue & Dangerous Working Conditions**: High-risk sectors regularly exceed safe working hours or rotate night shifts without restorative rest, causing preventable occupational injuries and clinical errors (SDG 8.8).
3. **Language & Literacy Barriers**: Migrant and multilingual shift workers struggle to understand opaque pay deductions, terms of employment, or grievance procedures.
4. **Dispute Vulnerability**: Without verifiable receipts, workers cannot prove check-in times or challenge arbitrary wage deductions.

---

## 2. Core Features & Currency (Indian Rupees ₹)

- **Currency in Indian Rupees (₹)**: All amounts are displayed in Indian Rupees formatted via `Intl.NumberFormat('en-IN')` (e.g. ₹1,25,000, ₹110/hr).
- **Realistic Indian Wage Rates**:
  - **Construction Site**: ₹95 to ₹150 per hour depending on trade (Site Mason ₹110/hr, Scaffold Erector ₹100/hr, Crane Operator ₹150/hr, Site Electrician ₹140/hr).
  - **Hospital & Healthcare**: ₹120 to ₹320 per hour depending on clinical specialty (Ward Attendant ₹130/hr, Registered Staff Nurse ₹240/hr, ICU Specialist Nurse ₹320/hr).
- **1-Tap Check-In / Check-Out**: Huge round action button designed for glove-wearing construction workers and on-the-go clinical nurses. Minimum 48px touch targets throughout.
- **Live Shift Timer**: Second-by-second ticking duration tracker with real-time regular vs. overtime separation.
- **Automatic 1.5x Overtime Calculation**: Every hour worked past the standard 8-hour daily limit automatically qualifies for 150% overtime pay in Indian Rupees.
- **Tamper-Evident Paper Shift Receipts**: Every check-in and check-out generates a paper-styled receipt card with a unique code (e.g. `FS-8B29F`) tied to an append-only cryptographic ledger.
- **WhatsApp Shift Proof Sharing**: Large green button on the Receipt screen generating an instant verified shift summary via `https://wa.me/?text=` in the worker's chosen language (English, Tamil, Hindi) with receipt code, hours, overtime, earnings in ₹, and *"Verified by FairShift"*.
- **Transparent Payslip with Voice Read-Aloud**: Plain-language itemized earnings (regular pay, 1.5x overtime, statutory Provident Fund and ESI healthcare deductions, net payout) paired with browser Speech Synthesis (`window.speechSynthesis`).
- **Rupee Voice Readout**:
  - **English**: Pronounces "rupees"
  - **Tamil (தமிழ்)**: Pronounces "ரூபாய்"
  - **Hindi (हिन्दी)**: Pronounces "रुपये"
- **Multi-Channel Status Indicators**: Never relies on color alone; always combines color + icon + clear status word (e.g. green tick "OK / On Duty", amber alert "Overtime Active", red warning "Shift Too Long").
- **Focused Admin Navigation**: Dedicated operational controls covering **Operational Overview** (live attendance, overtime hours, group breakdowns by zone or ward) and the **Audit Ledger** (tamper-evident immutable hash chain).

---

## 3. How FairShift Supports UN SDG 8

| SDG Target | FairShift Implementation |
| :--- | :--- |
| **Target 8.5 (Full & Productive Employment and Equal Pay)** | Transparent, automated 1.5x overtime multiplier in Indian Rupees (₹), itemized payslips with zero hidden deductions, and WhatsApp proof sharing. |
| **Target 8.8 (Protect Labor Rights & Promote Safe Working Environments)** | Configurable rest rules that hard-cap excessive shifts (Construction: max 10h/day) and enforce recovery windows (Hospital: min 11h between shifts, max 2 consecutive night shifts). |
| **Target 8.b (Operationalize Youth & Migrant Employment)** | Multilingual accessibility (English, Tamil, Hindi) and voice readout removes literacy and language barriers. |

---

## 4. Two Industry Use Cases

### Use Case A: Construction Site
- **Operational Environment**: Civil engineering works, scaffolding, masonry, crane operations, concrete pouring.
- **Accent Theming**: Warm saffron/orange (`#D9531E`) with hard-hat icon.
- **Groups (Zones)**: Block A, Block B, Foundation Zone, Heavy Plant Yard.
- **Pay Scale**: ₹95 – ₹150 / hour.
- **Rest Rule**: **Maximum 10 hours work per 24h window**. Heavy machinery and scaffold working risks rise sharply with physical exhaustion.
- **Complaints Response SLA**: **48 Hours** for workplace hazards, heat stress, or equipment failures.
- **Hazards Tracked**: Fall risks from heights (> 2m), heavy plant traffic, silica dust, electrical hazards.

### Use Case B: Hospital & Healthcare
- **Operational Environment**: 24/7 acute clinical care, ICU, emergency medicine, surgical inpatient wings.
- **Accent Theming**: Calm teal/green (`#0E8373`) with medical-cross icon.
- **Groups (Wards)**: ICU, Emergency, General Ward, Pediatrics, Surgical Wing.
- **Pay Scale**: ₹120 – ₹320 / hour.
- **Rest Rules**:
  - **Minimum 11 hours continuous rest** between consecutive shifts.
  - **Maximum 2 consecutive night shifts** to prevent circadian disruption and medical dosing errors.
- **Complaints Response SLA**: **24 Hours** for biohazard exposure or acute staffing emergencies.
- **Hazards Tracked**: Airborne pathogens, needlestick/blood exposure, radiation proximity, ergonomic patient-lifting strain.

---

## 5. Architecture & Sector Config (`src/config/sectors.ts`)

All business logic, role titles, hazard categories, rest rules, group names, and complaint response time limits are loaded dynamically from `src/config/sectors.ts`.

```
src/
├── config/
│   └── sectors.ts          # Single source of truth (currency: 'INR', currencySymbol: '₹')
├── types/
│   └── index.ts            # Core TypeScript schemas
├── utils/
│   ├── currencyFormatter.ts# Shared Intl.NumberFormat('en-IN') utility
│   ├── whatsappProof.ts    # Pure functions for localized WhatsApp proof text & deep links
│   ├── shiftCalculations.ts# Pure functions for hours & overtime breakdown
│   ├── payslipCalculations.ts# Pure functions for payslips & INR voice summaries
│   ├── restRuleChecks.ts   # Pure functions for sector rest rule validation
│   ├── receiptGenerator.ts # Pure functions for receipt codes & cryptographic hashes
│   └── __tests__/          # Vitest unit test suite (12 passing tests)
├── i18n/
│   ├── translations.ts     # Multilingual dictionaries (EN, TA, HI)
│   └── index.ts
├── data/
│   └── seedData.ts         # 10 fictional workers per sector + 1 week of shifts (in ₹)
├── hooks/
│   └── useFairShiftStore.ts# Reactive shared localStorage store
├── components/
│   ├── common/             # Header, SectorPicker, LanguagePicker
│   ├── worker/             # CheckInOutCard, PayslipModal, ReceiptDisplay, WorkerDashboard
│   └── admin/              # AttendanceOverview, GroupBreakdown, AuditLogViewer
└── pages/
    ├── HomeScreen.tsx      # Role switcher & Sector selector
    ├── WorkerPage.tsx
    └── AdminPage.tsx
```

---

## 6. How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 7. How to Test

Run the Vitest test suite:

```bash
npm test
```

### Test Coverage Highlights:
- Capping standard hours at 8 and routing remainder to overtime.
- Overtime 1.5x pay multiplier and itemized statutory deductions in Indian Rupees (₹).
- Multilingual speech synthesis narrative output in English ("rupees"), Tamil ("ரூபாய்"), and Hindi ("रुपये").
- Construction daily 10-hour limit detection.
- Hospital 11-hour minimum rest gap and 2-consecutive night shift limit violations.
- Deterministic cryptographic hashing and receipt validation.
- Valid seed shift generation without date parsing errors.
- Localized WhatsApp proof message generator in English, Tamil, and Hindi with Indian Rupee formatting.
