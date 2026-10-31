import { LanguageCode } from '../types';

export type TranslationKey =
  // App & Common
  | 'appName'
  | 'appSubtitle'
  | 'sdgBadge'
  | 'demoDataBadge'
  | 'resetDemoData'
  | 'home'
  | 'worker'
  | 'admin'
  | 'changeLanguage'
  | 'selected'
  | 'selectSector'
  | 'sectorSelection'
  | 'chooseRole'
  | 'workerTitle'
  | 'adminTitle'
  | 'footerSdgTitle'
  | 'footerSdgDesc'

  // Home Screen
  | 'heroTagline'
  | 'iAmWorker'
  | 'workerCardDesc'
  | 'enterAsWorker'
  | 'iAmAdmin'
  | 'adminCardDesc'
  | 'enterAsAdmin'

  // Worker Interface
  | 'welcomeWorker'
  | 'switchWorker'
  | 'activeSector'
  | 'currentShift'
  | 'hoursWorkedToday'
  | 'regularHoursLabel'
  | 'overtimeHoursLabel'
  | 'regularHoursNote'
  | 'overtimeHoursNote'
  | 'overtimeRateNote'
  | 'hourlyRateLabel'
  | 'statusOnDuty'
  | 'statusOffDuty'
  | 'statusOvertime'
  | 'statusShiftTooLong'
  | 'btnCheckIn'
  | 'btnCheckOut'
  | 'touchToStart'
  | 'touchToFinish'
  | 'elapsedTime'
  | 'zoneWardLabel'
  | 'shiftHoursLabel'
  | 'restRulePrefix'
  | 'tabShift'
  | 'tabReceipts'
  | 'tabPayslip'
  | 'viewPayslipBtn'
  | 'overtimePaidBanner'
  | 'listenWageSummary'
  | 'fullSlip'
  | 'directPaymentRupees'
  | 'calculatedWithOvertime'
  | 'noShiftDataAvailable'
  | 'hoursShort'
  | 'regularShort'
  | 'overtimeShort'

  // Receipts
  | 'receiptNotice'
  | 'receiptCodeLabel'
  | 'checkInCode'
  | 'checkOutCode'
  | 'verified'
  | 'keepReceiptNotice'
  | 'sendProofWhatsApp'
  | 'verifiedWorkReceiptSub'
  | 'copyReceipt'
  | 'copied'
  | 'tamperProofProof'
  | 'recentReceiptsTitle'
  | 'recentReceiptsSub'
  | 'noRecentReceipts'
  | 'shiftsCount'
  | 'inLabel'
  | 'outLabel'
  | 'share'

  // Payslip Modal
  | 'payslipTitle'
  | 'payslipSubtitle'
  | 'periodLabel'
  | 'basePayLabel'
  | 'overtimePayLabel'
  | 'deductionsLabel'
  | 'netPayLabel'
  | 'takeHomeLabel'
  | 'readAloudBtn'
  | 'stopAudioBtn'
  | 'speaking'
  | 'touchToListenInLang'
  | 'itemizedShiftEarnings'
  | 'overtimeExplanationNotice'
  | 'closeBtn'
  | 'unSdgWageNotice'
  | 'providentFundLabel'
  | 'providentFundDesc'
  | 'esiHealthLabel'
  | 'esiHealthDesc'
  | 'safetyRestNotice'
  | 'safetyRestAlert'
  | 'checkedInAt'
  | 'checkedOutAt'
  | 'switchRoleBtn'
  | 'deductionExplanation'
  | 'overtimeRuleDesc'

  // Admin Dashboard
  | 'adminPortalTitle'
  | 'adminCommand'
  | 'adminHeaderDesc'
  | 'workerScreenBtn'
  | 'tabOperationalOverview'
  | 'tabAuditLedger'
  | 'onShift'
  | 'activeNow'
  | 'overtime'
  | 'loggedAtRate'
  | 'loggedShifts'
  | 'past7Days'
  | 'receiptVerified100'
  | 'safetyStatus'
  | 'compliance'
  | 'restViolations'
  | 'allLimitsRespected'
  | 'sdgRestAlert'
  | 'infractions'
  | 'infraction'
  | 'actionRequired'
  | 'inspectFlaggedNotice'
  | 'operationalBreakdown'
  | 'shiftCoverageDesc'
  | 'activeLocations'
  | 'assignedStaff'
  | 'idle'
  | 'totalShifts'
  | 'restSafety'
  | 'clean'
  | 'alerts'
  | 'alert'
  | 'staffRosterTitle'
  | 'staffRosterDesc'
  | 'filterBy'
  | 'all'
  | 'thWorker'
  | 'thRole'
  | 'thStatus'
  | 'thHourlyRate'
  | 'thRestSafety'
  | 'thActions'
  | 'onShiftBadge'
  | 'offDutyBadge'
  | 'safeBadge'
  | 'testWorkerBtn'
  | 'tamperEvidentLedger'
  | 'auditTrailTitle'
  | 'auditTrailDesc'
  | 'searchPlaceholder'
  | 'noAuditLogs'
  | 'thTime'
  | 'thAction'
  | 'thLocation'
  | 'thReceiptCode'
  | 'thLedgerSignature';

export type TranslationDictionary = Record<TranslationKey, string>;

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: 'FairShift',
    appSubtitle: 'Shift Workers & Employers',
    sdgBadge: 'SDG 8',
    demoDataBadge: 'Demo data',
    resetDemoData: 'Reset demo shift data',
    home: 'Home',
    worker: 'Worker',
    admin: 'Admin',
    changeLanguage: 'Language',
    selected: 'Selected',
    selectSector: 'Select Sector',
    sectorSelection: 'Industry Sector Selection',
    chooseRole: 'Select Interface',
    workerTitle: 'Worker Portal',
    adminTitle: 'Employer & Admin Portal',
    footerSdgTitle: 'FairShift • United Nations Sustainable Development Goal 8',
    footerSdgDesc:
      'Promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all.',

    heroTagline: 'Honest shift hours & safe rest for every worker.',
    iAmWorker: 'I am a Worker',
    workerCardDesc:
      "Start or stop your shift. Check today's hours, get your verified paper receipt code, and hear your earnings read aloud in your language.",
    enterAsWorker: 'Tap to Enter as Worker',
    iAmAdmin: 'I am an Admin',
    adminCardDesc:
      'Live site attendance, total overtime hours in ₹, zone/ward breakdown, rest rule safety warnings, and immutable receipts ledger.',
    enterAsAdmin: 'Tap to Enter as Admin',

    welcomeWorker: 'Welcome back',
    switchWorker: 'Switch Worker Profile',
    activeSector: 'Industry Sector',
    currentShift: 'Current Shift Session',
    hoursWorkedToday: 'Hours Worked Today',
    regularHoursLabel: 'Regular Hours',
    overtimeHoursLabel: 'Overtime Hours',
    regularHoursNote: 'Up to 8 hours per day',
    overtimeHoursNote: 'Above 8 hours at 1.5x rate',
    overtimeRateNote:
      'Hours beyond 8 per day earn 1.5x regular wage rate automatically.',
    hourlyRateLabel: 'Hourly Wage Rate',
    statusOnDuty: 'ON DUTY (Active Shift)',
    statusOffDuty: 'OFF DUTY (Resting)',
    statusOvertime: 'OVERTIME (1.5x Pay Active)',
    statusShiftTooLong: 'ALERT: Shift Too Long',
    btnCheckIn: 'CHECK IN NOW',
    btnCheckOut: 'CHECK OUT NOW',
    touchToStart: 'Touch to Start',
    touchToFinish: 'Touch to Finish',
    elapsedTime: 'Shift Timer',
    zoneWardLabel: 'Assigned Location',
    shiftHoursLabel: 'Shift Hours',
    restRulePrefix: 'Rest Rule:',
    tabShift: 'Shift',
    tabReceipts: 'Receipts',
    tabPayslip: 'Payslip',
    viewPayslipBtn: 'VIEW MY PAYSLIP',
    overtimePaidBanner: 'Overtime paid at 1.5x in Rupees (₹)',
    listenWageSummary: 'Listen to Wage Summary Aloud',
    fullSlip: 'Full Slip',
    directPaymentRupees: 'Direct payment in Rupees',
    calculatedWithOvertime: 'Calculated with 1.5x overtime',
    noShiftDataAvailable: 'No shift data available for this worker.',
    hoursShort: 'hrs',
    regularShort: 'Regular',
    overtimeShort: 'Overtime',

    receiptNotice: 'Tamper-Proof Receipt Generated',
    receiptCodeLabel: 'Receipt Code',
    checkInCode: 'Check-In Code',
    checkOutCode: 'Check-Out Code',
    verified: 'VERIFIED',
    keepReceiptNotice: 'Keep this short code as proof of your attendance.',
    sendProofWhatsApp: 'Send Proof on WhatsApp',
    verifiedWorkReceiptSub: 'Verified work & pay receipt',
    copyReceipt: 'Copy Receipt',
    copied: 'Copied!',
    tamperProofProof: 'Saved to tamper-evident register',
    recentReceiptsTitle: 'My Verified Shift Receipts',
    recentReceiptsSub: 'Shift receipts from past 7 days',
    noRecentReceipts: 'No shift receipts recorded yet today.',
    shiftsCount: 'shifts',
    inLabel: 'IN:',
    outLabel: 'OUT:',
    share: 'Share',

    payslipTitle: 'Transparent Payslip & Earnings',
    payslipSubtitle:
      'Clear breakdown with zero hidden deductions (SDG 8.5 Fair Remuneration)',
    periodLabel: 'Pay Period',
    basePayLabel: 'Base Wage Earnings',
    overtimePayLabel: 'Overtime Pay (1.5x Premium)',
    deductionsLabel: 'Statutory Deductions',
    netPayLabel: 'Total Net Payout',
    takeHomeLabel: '(Take-Home)',
    readAloudBtn: 'Read Aloud (Voice Assist)',
    stopAudioBtn: 'Stop Audio',
    speaking: 'Playing speech summary...',
    touchToListenInLang: 'Touch to listen in your language',
    itemizedShiftEarnings: 'Itemized Shift Earnings',
    overtimeExplanationNotice:
      'All overtime beyond 8 hours is automatically paid at 1.5 times in Indian Rupees (₹).',
    closeBtn: 'Close Window',
    unSdgWageNotice: 'UN SDG 8.5 • Wages in Rupees (₹)',
    providentFundLabel: 'Provident Fund (PF)',
    providentFundDesc:
      'Retirement savings and long-term financial security for your family.',
    esiHealthLabel: 'ESI Health Insurance',
    esiHealthDesc:
      'Free medical treatment, sickness benefits, and accident protection.',
    safetyRestNotice: 'SDG 8 Rest Safeguard',
    safetyRestAlert:
      'Rest period safety notice: Please verify your rest duration before overtime.',
    checkedInAt: 'Checked In',
    checkedOutAt: 'Checked Out',
    switchRoleBtn: 'Return to Role Switcher',
    deductionExplanation:
      'Statutory healthcare and standardized safety equipment contribution.',
    overtimeRuleDesc:
      'Daily threshold: 8.0 hours. Overtime calculated automatically at 150% rate.',

    adminPortalTitle: 'Portal',
    adminCommand: 'Employer & Operations Command',
    adminHeaderDesc:
      'Shift hours, transparent overtime in Rupees (₹), and rest rule compliance (UN SDG 8).',
    workerScreenBtn: 'Worker Screen',
    tabOperationalOverview: 'Operational Overview',
    tabAuditLedger: 'Audit Ledger',
    onShift: 'On Shift',
    activeNow: 'Active now',
    overtime: 'Overtime',
    loggedAtRate: 'logged @ 1.5x',
    loggedShifts: 'Logged Shifts',
    past7Days: 'past 7 days',
    receiptVerified100: '100% receipt verified',
    safetyStatus: 'Safety Status',
    compliance: 'compliance',
    restViolations: 'rest violations',
    allLimitsRespected: 'All limits respected',
    sdgRestAlert: 'SDG 8.8 Rest Alert',
    infractions: 'Infractions',
    infraction: 'Infraction',
    actionRequired: 'Action Required',
    inspectFlaggedNotice:
      'Inspect flagged shift records below to prevent worker fatigue.',
    operationalBreakdown: 'Operational Breakdown',
    shiftCoverageDesc: 'Shift coverage and overtime distribution across',
    activeLocations: 'Active',
    assignedStaff: 'assigned staff',
    idle: 'Idle',
    totalShifts: 'Total Shifts:',
    restSafety: 'Rest Safety:',
    clean: 'Clean',
    alerts: 'Alerts',
    alert: 'Alert',
    staffRosterTitle: 'Staff Roster & Safety Register',
    staffRosterDesc:
      'Real-time duty status, wage rates in Indian Rupees (₹), and rest rule alerts',
    filterBy: 'Filter',
    all: 'All',
    thWorker: 'Worker',
    thRole: 'Role',
    thStatus: 'Status',
    thHourlyRate: 'Hourly Rate (₹)',
    thRestSafety: 'Rest Safety',
    thActions: 'Actions',
    onShiftBadge: 'ON SHIFT',
    offDutyBadge: 'Off Duty',
    safeBadge: 'Safe',
    testWorkerBtn: 'Test Worker',
    tamperEvidentLedger: 'Append-Only Tamper-Evident Ledger',
    auditTrailTitle: 'Worker Time Event Audit Trail',
    auditTrailDesc: 'Cryptographically chained check-in & check-out receipts',
    searchPlaceholder: 'Search worker, receipt, or hash...',
    noAuditLogs: 'No audit logs matching',
    thTime: 'Time',
    thAction: 'Action',
    thLocation: 'Location',
    thReceiptCode: 'Receipt Code',
    thLedgerSignature: 'Ledger Signature',
  },
  ta: {
    appName: 'ஃபேர்ஷிப்ட் (FairShift)',
    appSubtitle: 'ஷிப்ட் தொழிலாளர்கள் & முதலாளிகள்',
    sdgBadge: 'SDG 8',
    demoDataBadge: 'மாதிரித் தரவு',
    resetDemoData: 'மாதிரித் தரவை மீட்டமை',
    home: 'முகப்பு',
    worker: 'தொழிலாளர்',
    admin: 'நிர்வாகி',
    changeLanguage: 'மொழி (Language)',
    selected: 'தேர்ந்தெடுக்கப்பட்டது',
    selectSector: 'துறையைத் தேர்ந்தெடுக்கவும்',
    sectorSelection: 'தொழில் துறை தேர்வு',
    chooseRole: 'பயனாளர் இடைமுகத்தை தேர்வு செய்யவும்',
    workerTitle: 'தொழிலாளர் போர்டல்',
    adminTitle: 'முதலாளி & நிர்வாகி போர்டல்',
    footerSdgTitle: 'ஃபேர்ஷிப்ட் • ஐக்கிய நாடுகள் நீடித்த நிலையான வளர்ச்சி இலக்கு 8',
    footerSdgDesc:
      'அனைவருக்கும் நீடித்த, உள்ளடக்கிய மற்றும் நிலையான பொருளாதார வளர்ச்சி, முழுமையான மற்றும் பயனுள்ள வேலைவாய்ப்பு மற்றும் கண்ணியமான வேலையை ஊக்குவித்தல்.',

    heroTagline: 'ஒவ்வொரு தொழிலாளிக்கும் நியாயமான வேலை நேரம் மற்றும் பாதுகாப்பான ஓய்வு.',
    iAmWorker: 'நான் ஒரு தொழிலாளி',
    workerCardDesc:
      'உங்கள் ஷிப்டைத் தொடங்கவும் அல்லது முடிக்கவும். இன்றைய வேலை நேரத்தை சரிபார்க்கவும், சரிபார்க்கப்பட்ட ரசீது குறியீட்டைப் பெறவும், உங்கள் மொழியில் சம்பள விவரத்தைக் கேட்கவும்.',
    enterAsWorker: 'தொழிலாளராக நுழைய தொடவும்',
    iAmAdmin: 'நான் ஒரு நிர்வாகி',
    adminCardDesc:
      'நேரடி வருகை, ரூபாயில் கூடுதல் நேர ஊதியம், மண்டல/வார்டு நிலவரம், ஓய்வு பாதுகாப்பு எச்சரிக்கைகள் மற்றும் ரசீது பதிவேடு.',
    enterAsAdmin: 'நிர்வாகியாக நுழைய தொடவும்',

    welcomeWorker: 'நல்வரவு',
    switchWorker: 'தொழிலாளர் சுயவிவரத்தை மாற்றவும்',
    activeSector: 'தொழில் துறை',
    currentShift: 'தற்போதைய ஷிப்ட் அமர்வு',
    hoursWorkedToday: 'இன்று பணிபுரிந்த மணிநேரம்',
    regularHoursLabel: 'வழக்கமான நேரம்',
    overtimeHoursLabel: 'கூடுதல் நேரம்',
    regularHoursNote: 'ஒரு நாளுக்கு 8 மணி நேரம் வரை',
    overtimeHoursNote: '8 மணிக்கு மேல் 1.5 மடங்கு ஊதியம்',
    overtimeRateNote:
      'ஒரு நாளுக்கு 8 மணி நேரத்திற்கு மேல் பணிபுரிந்தால் 1.5 மடங்கு அதிக ஊதியம் தானாகவே கணக்கிடப்படும்.',
    hourlyRateLabel: 'மணிநேர ஊதிய விகிதம்',
    statusOnDuty: 'பணியில் உள்ளார் (ஷிப்ட் இயங்குகிறது)',
    statusOffDuty: 'ஓய்வில் உள்ளார் (வேலை இல்லை)',
    statusOvertime: 'கூடுதல் நேரம் (1.5x கூடுதல் ஊதியம்)',
    statusShiftTooLong: 'எச்சரிக்கை: மிக நீண்ட ஷிப்ட்',
    btnCheckIn: 'இப்போது பணி தொடங்கவும் (CHECK IN)',
    btnCheckOut: 'பணியை முடிக்கவும் (CHECK OUT)',
    touchToStart: 'தொடங்க தொடவும்',
    touchToFinish: 'முடிக்க தொடவும்',
    elapsedTime: 'ஷிப்ட் டைமர்',
    zoneWardLabel: 'ஒதுக்கப்பட்ட இடம்',
    shiftHoursLabel: 'ஷிப்ட் நேரம்',
    restRulePrefix: 'ஓய்வு விதி:',
    tabShift: 'பணி',
    tabReceipts: 'ரசீது',
    tabPayslip: 'சம்பளம்',
    viewPayslipBtn: 'எனது சம்பளச் சீட்டைப் பார்க்கவும்',
    overtimePaidBanner: 'கூடுதல் நேரத்திற்கு 1.5 மடங்கு ரூபாயில் ஊதியம்',
    listenWageSummary: 'ஊதிய விவரத்தை சத்தமாகக் கேட்கவும்',
    fullSlip: 'முழு சீட்டு',
    directPaymentRupees: 'ரூபாயில் நேரடி ஊதியம்',
    calculatedWithOvertime: '1.5x கூடுதல் நேர ஊதியத்துடன் கணக்கிடப்பட்டது',
    noShiftDataAvailable: 'இந்தத் தொழிலாளிக்கான ஷிப்ட் விவரங்கள் எதுவும் இல்லை.',
    hoursShort: 'மணி',
    regularShort: 'சாதாரண',
    overtimeShort: 'கூடுதல்',

    receiptNotice: 'பாதுகாப்பான பணி ரசீது உருவாக்கப்பட்டது',
    receiptCodeLabel: 'ரசீது குறியீடு',
    checkInCode: 'பணி தொடக்கக் குறியீடு',
    checkOutCode: 'பணி முடிவுக் குறியீடு',
    verified: 'சரிபார்க்கப்பட்டது',
    keepReceiptNotice: 'உங்கள் வருகைக்கான ஆதாரமாக இந்த குறியீட்டை வைத்திருங்கள்.',
    sendProofWhatsApp: 'வாட்ஸ்அப்பில் ஆதாரம் அனுப்பு',
    verifiedWorkReceiptSub: 'சரிபார்க்கப்பட்ட பணி ரசீது',
    copyReceipt: 'ரசீதை நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது!',
    tamperProofProof: 'மாற்ற முடியாத பதிவேட்டில் பதிவு செய்யப்பட்டது',
    recentReceiptsTitle: 'எனது சரிபார்க்கப்பட்ட ஷிப்ட் ரசீதுகள்',
    recentReceiptsSub: 'கடந்த 7 நாட்களின் ஷிப்ட் ரசீதுகள்',
    noRecentReceipts: 'இன்று இதுவரை ஷிப்ட் ரசீதுகள் எதுவும் இல்லை.',
    shiftsCount: 'ஷிப்டுகள்',
    inLabel: 'தொடக்கம்:',
    outLabel: 'முடிவு:',
    share: 'பகிர்',

    payslipTitle: 'வெளிப்படையான சம்பளச் சீட்டு',
    payslipSubtitle:
      'மறைமுக பிடித்தங்கள் இல்லாத தெளிவான ஊதிய விவரம் (SDG 8.5 நியாயமான ஊதியம்)',
    periodLabel: 'சம்பள காலம்',
    basePayLabel: 'அடிப்படை ஊதியம்',
    overtimePayLabel: 'கூடுதல் நேர ஊதியம் (1.5 மடங்கு)',
    deductionsLabel: 'சட்டரீதியான பிடித்தங்கள்',
    netPayLabel: 'நிகர ஊதியம் (கையில் கிடைக்கும் தொகை)',
    takeHomeLabel: '(கையில் கிடைக்கும்)',
    readAloudBtn: 'சத்தமாக வாசிக்கவும் (குரல் உதவி)',
    stopAudioBtn: 'ஆடியோவை நிறுத்து',
    speaking: 'குரல் சுருக்கம் ஒலிக்கிறது...',
    touchToListenInLang: 'உங்கள் மொழியில் கேட்க தொடவும்',
    itemizedShiftEarnings: 'ஷிப்ட் ஊதிய விவரங்கள்',
    overtimeExplanationNotice:
      '8 மணி நேரத்திற்கு மேல் உள்ள அனைத்து கூடுதல் நேரத்திற்கும் தானாகவே 1.5 மடங்கு ரூபாயில் ஊதியம் வழங்கப்படும்.',
    closeBtn: 'மூடவும்',
    unSdgWageNotice: 'ஐ.நா. SDG 8.5 • ரூபாயில் ஊதியம் (₹)',
    providentFundLabel: 'வருங்கால வைப்பு நிதி (PF)',
    providentFundDesc:
      'குடும்பத்திற்கான எதிர்கால சேமிப்பு மற்றும் ஓய்வூதிய பாதுகாப்பு.',
    esiHealthLabel: 'இ.எஸ்.ஐ மருத்துவக் காப்பீடு (ESI)',
    esiHealthDesc:
      'இலவச மருத்துவ சிகிச்சை, நோய் பலன்கள் மற்றும் விபத்துப் பாதுகாப்பு.',
    safetyRestNotice: 'SDG 8 ஓய்வு பாதுகாப்பு விதி',
    safetyRestAlert:
      'ஓய்வு எச்சரிக்கை: கூடுதல் பணிக்கு முன் போதிய ஓய்வை உறுதிசெய்யவும்.',
    checkedInAt: 'பணி தொடங்கிய நேரம்',
    checkedOutAt: 'பணி முடிந்த நேரம்',
    switchRoleBtn: 'முகப்புத் திரைக்குத் திரும்பு',
    deductionExplanation:
      'சட்டரீதியான மருத்துவக் காப்பீடு மற்றும் பாதுகாப்பு உபகரண பங்களிப்பு.',
    overtimeRuleDesc:
      'தினசரி வரம்பு: 8 மணிநேரம். கூடுதல் நேரம் 150% விகிதத்தில் தானாக கணக்கிடப்படுகிறது.',

    adminPortalTitle: 'போர்டல்',
    adminCommand: 'முதலாளி & செயல்பாட்டு கட்டளை',
    adminHeaderDesc:
      'ஷிப்ட் வேலை நேரம், வெளிப்படையான கூடுதல் நேர ஊதியம் மற்றும் ஓய்வு பாதுகாப்பு விதிமுறை (UN SDG 8).',
    workerScreenBtn: 'தொழிலாளர் திரை',
    tabOperationalOverview: 'செயல்பாட்டு கண்ணோட்டம்',
    tabAuditLedger: 'தணிக்கை பதிவேடு',
    onShift: 'பணியில் உள்ளோர்',
    activeNow: 'தற்போது பணியில்',
    overtime: 'கூடுதல் நேரம்',
    loggedAtRate: '1.5x வீதத்தில் பதிவானது',
    loggedShifts: 'பதிவான ஷிப்டுகள்',
    past7Days: 'கடந்த 7 நாட்கள்',
    receiptVerified100: '100% ரசீது சரிபார்க்கப்பட்டது',
    safetyStatus: 'பாதுகாப்பு நிலை',
    compliance: 'இணக்கம்',
    restViolations: 'ஓய்வு விதிமீறல்கள்',
    allLimitsRespected: 'அனைத்து விதிகளும் பின்பற்றப்பட்டன',
    sdgRestAlert: 'SDG 8.8 ஓய்வு எச்சரிக்கை',
    infractions: 'விதிமீறல்கள்',
    infraction: 'விதிமீறல்',
    actionRequired: 'நடவடிக்கை தேவை',
    inspectFlaggedNotice:
      'தொழிலாளர் சோர்வைத் தடுக்க கீழே உள்ள எச்சரிக்கை பதிவுகளை ஆய்வு செய்யவும்.',
    operationalBreakdown: 'செயல்பாட்டு விவரம்',
    shiftCoverageDesc: 'பல்வேறு பகுதிகளில் ஷிப்ட் மற்றும் கூடுதல் நேர பணிப்பகிர்வு',
    activeLocations: 'செயலில் உள்ளது',
    assignedStaff: 'ஒதுக்கப்பட்ட ஊழியர்கள்',
    idle: 'பணியில் இல்லை',
    totalShifts: 'மொத்த ஷிப்டுகள்:',
    restSafety: 'ஓய்வு பாதுகாப்பு:',
    clean: 'பாதுகாப்பானது',
    alerts: 'எச்சரிக்கைகள்',
    alert: 'எச்சரிக்கை',
    staffRosterTitle: 'ஊழியர் பட்டியல் & பாதுகாப்பு பதிவேடு',
    staffRosterDesc:
      'நேரடி பணி நிலை, இந்திய ரூபாயில் (₹) ஊதிய விகிதம் மற்றும் ஓய்வு எச்சரிக்கைகள்',
    filterBy: 'வடிகட்டு',
    all: 'அனைத்தும்',
    thWorker: 'தொழிலாளர்',
    thRole: 'பணிப் பொறுப்பு',
    thStatus: 'பணி நிலை',
    thHourlyRate: 'மணிநேர ஊதியம் (₹)',
    thRestSafety: 'ஓய்வு பாதுகாப்பு',
    thActions: 'செயல்கள்',
    onShiftBadge: 'பணியில்',
    offDutyBadge: 'ஓய்வில்',
    safeBadge: 'பாதுகாப்பானது',
    testWorkerBtn: 'பரிசோதிக்க',
    tamperEvidentLedger: 'மாற்ற முடியாத பாதுகாப்பு தணிக்கை பதிவேடு',
    auditTrailTitle: 'தொழிலாளர் நேர நிகழ்வு தணிக்கை பாதை',
    auditTrailDesc: 'கிரிப்டோகிராஃபிக் முறையில் பாதுகாக்கப்பட்ட ரசீதுகள்',
    searchPlaceholder: 'தொழிலாளர், ரசீது அல்லது குறியீட்டைத் தேடவும்...',
    noAuditLogs: 'பொருந்தும் பதிவுகள் எதுவும் இல்லை:',
    thTime: 'நேரம்',
    thAction: 'செயல்',
    thLocation: 'இடம்',
    thReceiptCode: 'ரசீது குறியீடு',
    thLedgerSignature: 'பதிவேடு கையொப்பம்',
  },
  hi: {
    appName: 'फेयरशिफ्ट (FairShift)',
    appSubtitle: 'शिफ्ट श्रमिक एवं नियोक्ता',
    sdgBadge: 'SDG 8',
    demoDataBadge: 'डेमो डेटा',
    resetDemoData: 'डेमो डेटा रीसेट करें',
    home: 'होम',
    worker: 'श्रमिक',
    admin: 'एडमिन',
    changeLanguage: 'भाषा (Language)',
    selected: 'चयनित',
    selectSector: 'क्षेत्र चुनें',
    sectorSelection: 'उद्योग क्षेत्र चयन',
    chooseRole: 'उपयोगकर्ता इंटरफ़ेस चुनें',
    workerTitle: 'श्रमिक पोर्टल',
    adminTitle: 'नियोक्ता एवं एडमिन पोर्टल',
    footerSdgTitle: 'फेयरशिफ्ट • संयुक्त राष्ट्र सतत विकास लक्ष्य 8',
    footerSdgDesc:
      'सभी के लिए निरंतर, समावेशी और सतत आर्थिक विकास, पूर्ण और उत्पादक रोजगार तथा सम्मानजनक कार्य को बढ़ावा देना।',

    heroTagline: 'प्रत्येक श्रमिक के लिए ईमानदार काम के घंटे और सुरक्षित विश्राम।',
    iAmWorker: 'मैं एक श्रमिक हूँ',
    workerCardDesc:
      'अपनी शिफ्ट शुरू या समाप्त करें। आज के काम के घंटे देखें, सत्यापित रसीद कोड प्राप्त करें और अपनी भाषा में कमाई का विवरण सुनें।',
    enterAsWorker: 'श्रमिक के रूप में प्रवेश करें',
    iAmAdmin: 'मैं एक एडमिन हूँ',
    adminCardDesc:
      'लाइव कार्यस्थल उपस्थिति, रुपयों में ओवरटाइम, जोन/वार्ड विवरण, विश्राम सुरक्षा चेतावनी और अपरिवर्तनीय रसीद रजिस्टर।',
    enterAsAdmin: 'एडमिन के रूप में प्रवेश करें',

    welcomeWorker: 'स्वागत है',
    switchWorker: 'श्रमिक प्रोफ़ाइल बदलें',
    activeSector: 'उद्योग क्षेत्र',
    currentShift: 'वर्तमान शिफ्ट सत्र',
    hoursWorkedToday: 'आज काम किए गए घंटे',
    regularHoursLabel: 'नियमित घंटे',
    overtimeHoursLabel: 'ओवरटाइम घंटे',
    regularHoursNote: 'प्रतिदिन 8 घंटे तक',
    overtimeHoursNote: '8 घंटे से अधिक पर 1.5x दर',
    overtimeRateNote:
      'प्रतिदिन 8 घंटे से अधिक कार्य करने पर 1.5 गुना दर से अतिरिक्त वेतन स्वतः जुड़ेगा।',
    hourlyRateLabel: 'प्रति घंटा मजदूरी दर',
    statusOnDuty: 'कार्यरत (ड्यूटी चालू है)',
    statusOffDuty: 'विश्राम पर (ड्यूटी समाप्त)',
    statusOvertime: 'ओवरटाइम (1.5x वेतन लागू)',
    statusShiftTooLong: 'चेतावनी: अत्यधिक लंबी शिफ्ट',
    btnCheckIn: 'ड्यूटी शुरू करें (CHECK IN)',
    btnCheckOut: 'ड्यूटी समाप्त करें (CHECK OUT)',
    touchToStart: 'शुरू करने के लिए स्पर्श करें',
    touchToFinish: 'समाप्त करने के लिए स्पर्श करें',
    elapsedTime: 'शिफ्ट टाइमर',
    zoneWardLabel: 'निर्धारित कार्यस्थान',
    shiftHoursLabel: 'शिफ्ट समय',
    restRulePrefix: 'विश्राम नियम:',
    tabShift: 'ड्यूटी',
    tabReceipts: 'रसीद',
    tabPayslip: 'पेस्लिप',
    viewPayslipBtn: 'मेरी पेस्लिप देखें',
    overtimePaidBanner: 'ओवरटाइम 1.5 गुना दर से रुपयों (₹) में देय',
    listenWageSummary: 'वेतन विवरण बोलकर सुनें',
    fullSlip: 'पूरी स्लिप',
    directPaymentRupees: 'रुपयों में सीधा भुगतान',
    calculatedWithOvertime: '1.5x ओवरटाइम के साथ परिकलित',
    noShiftDataAvailable: 'इस श्रमिक के लिए कोई शिफ्ट डेटा उपलब्ध नहीं है।',
    hoursShort: 'घंटे',
    regularShort: 'नियमित',
    overtimeShort: 'ओवरटाइम',

    receiptNotice: 'सुरक्षित शिफ्ट रसीद तैयार हुई',
    receiptCodeLabel: 'रसीद कोड',
    checkInCode: 'ड्यूटी शुरू कोड',
    checkOutCode: 'ड्यूटी समाप्ति कोड',
    verified: 'सत्यापित',
    keepReceiptNotice: 'अपनी उपस्थिति के प्रमाण के रूप में इस कोड को सुरक्षित रखें।',
    sendProofWhatsApp: 'व्हाट्सएप पर प्रमाण भेजें',
    verifiedWorkReceiptSub: 'सत्यापित काम और कमाई रसीद',
    copyReceipt: 'रसीद कॉपी करें',
    copied: 'कॉपी हो गया!',
    tamperProofProof: 'अपरिवर्तनीय डिजिटल रजिस्टर में दर्ज',
    recentReceiptsTitle: 'मेरी सत्यापित शिफ्ट रसीदें',
    recentReceiptsSub: 'पिछले 7 दिनों की शिफ्ट रसीदें',
    noRecentReceipts: 'आज अभी तक कोई शिफ्ट रसीद दर्ज नहीं हुई है।',
    shiftsCount: 'शिफ्ट',
    inLabel: 'शुरू:',
    outLabel: 'समाप्त:',
    share: 'साझा करें',

    payslipTitle: 'पारदर्शी पेस्लिप एवं कमाई',
    payslipSubtitle:
      'बिना किसी छिपी कटौती के स्पष्ट वेतन विवरण (SDG 8.5 उचित पारिश्रमिक)',
    periodLabel: 'वेतन अवधि',
    basePayLabel: 'मूल वेतन कमाई',
    overtimePayLabel: 'ओवरटाइम वेतन (1.5x प्रीमियम)',
    deductionsLabel: 'वैधानिक कटौतियाँ',
    netPayLabel: 'कुल शुद्ध भुगतान (Net Pay)',
    takeHomeLabel: '(हाथ में मिलने वाला)',
    readAloudBtn: 'बोलकर सुनाएँ (आवाज सहायता)',
    stopAudioBtn: 'आवाज बंद करें',
    speaking: 'वेतन विवरण बोला जा रहा है...',
    touchToListenInLang: 'अपनी भाषा में सुनने के लिए स्पर्श करें',
    itemizedShiftEarnings: 'मदवार शिफ्ट कमाई',
    overtimeExplanationNotice:
      '8 घंटे से अधिक के सभी ओवरटाइम का भुगतान स्वतः 1.5 गुना दर से भारतीय रुपयों (₹) में किया जाता है।',
    closeBtn: 'बंद करें',
    unSdgWageNotice: 'यूएन SDG 8.5 • रुपयों (₹) में मजदूरी',
    providentFundLabel: 'भविष्य निधि (PF)',
    providentFundDesc:
      'आपके परिवार के लिए सेवानिवृत्ति बचत एवं दीर्घकालिक वित्तीय सुरक्षा।',
    esiHealthLabel: 'ईएसआई स्वास्थ्य बीमा (ESI)',
    esiHealthDesc:
      'मुफ्त चिकित्सा उपचार, बीमारी लाभ एवं दुर्घटना सुरक्षा।',
    safetyRestNotice: 'SDG 8 विश्राम सुरक्षा नियम',
    safetyRestAlert:
      'विश्राम सुरक्षा सूचना: कृपया ओवरटाइम से पहले पर्याप्त आराम सुनिश्चित करें।',
    checkedInAt: 'ड्यूटी शुरू समय',
    checkedOutAt: 'ड्यूटी समाप्ति समय',
    switchRoleBtn: 'रोल चयनकर्ता पर लौटें',
    deductionExplanation:
      'वैधानिक स्वास्थ्य सेवा एवं सुरक्षा उपकरण अंशदान।',
    overtimeRuleDesc:
      'दैनिक सीमा: 8.0 घंटे। 150% की दर से ओवरटाइम स्वतः परिकलित।',

    adminPortalTitle: 'पोर्टल',
    adminCommand: 'नियोक्ता एवं परिचालन कमान',
    adminHeaderDesc:
      'शिफ्ट घंटे, रुपयों (₹) में पारदर्शी ओवरटाइम और विश्राम नियम अनुपालन (UN SDG 8)।',
    workerScreenBtn: 'श्रमिक स्क्रीन',
    tabOperationalOverview: 'परिचालन विवरण',
    tabAuditLedger: 'ऑडिट रजिस्टर',
    onShift: 'ड्यूटी पर',
    activeNow: 'अभी सक्रिय',
    overtime: 'ओवरटाइम',
    loggedAtRate: '1.5x पर दर्ज',
    loggedShifts: 'दर्ज शिफ्ट',
    past7Days: 'पिछले 7 दिन',
    receiptVerified100: '100% रसीद सत्यापित',
    safetyStatus: 'सुरक्षा स्थिति',
    compliance: 'अनुपालन',
    restViolations: 'विश्राम उल्लंघन',
    allLimitsRespected: 'सभी नियमों का पालन',
    sdgRestAlert: 'SDG 8.8 विश्राम चेतावनी',
    infractions: 'उल्लंघन',
    infraction: 'उल्लंघन',
    actionRequired: 'कार्रवाई आवश्यक',
    inspectFlaggedNotice:
      'श्रमिकों की थकान रोकने के लिए नीचे चिह्नित शिफ्ट रिकॉर्ड्स की जाँच करें।',
    operationalBreakdown: 'परिचालन विवरण',
    shiftCoverageDesc: 'विभिन्न स्थानों में शिफ्ट और ओवरटाइम का वितरण',
    activeLocations: 'सक्रिय',
    assignedStaff: 'नियुक्त कर्मचारी',
    idle: 'खाली',
    totalShifts: 'कुल शिफ्ट:',
    restSafety: 'विश्राम सुरक्षा:',
    clean: 'सुरक्षित',
    alerts: 'चेतावनी',
    alert: 'चेतावनी',
    staffRosterTitle: 'कर्मचारी सूची एवं सुरक्षा रजिस्टर',
    staffRosterDesc:
      'वास्तविक समय ड्यूटी स्थिति, भारतीय रुपयों (₹) में मजदूरी दर और विश्राम चेतावनी',
    filterBy: 'फ़िल्टर',
    all: 'सभी',
    thWorker: 'श्रमिक',
    thRole: 'पद / काम',
    thStatus: 'स्थिति',
    thHourlyRate: 'प्रति घंटा दर (₹)',
    thRestSafety: 'विश्राम सुरक्षा',
    thActions: 'कार्रवाई',
    onShiftBadge: 'ड्यूटी पर',
    offDutyBadge: 'ड्यूटी समाप्त',
    safeBadge: 'सुरक्षित',
    testWorkerBtn: 'जाँचें',
    tamperEvidentLedger: 'अपरिवर्तनीय डिजिटल ऑडिट रजिस्टर',
    auditTrailTitle: 'श्रमिक समय और उपस्थिति ऑडिट ट्रेल',
    auditTrailDesc: 'क्रिप्टोग्राफिक रूप से सुरक्षित चेक-इन और चेक-आउट रसीदें',
    searchPlaceholder: 'श्रमिक, रसीद या कोड खोजें...',
    noAuditLogs: 'कोई मेल खाता रिकॉर्ड नहीं मिला:',
    thTime: 'समय',
    thAction: 'कार्रवाई',
    thLocation: 'स्थान',
    thReceiptCode: 'रसीद कोड',
    thLedgerSignature: 'रजिस्टर हस्ताक्षर',
  },
};
