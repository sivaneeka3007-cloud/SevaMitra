import { LanguageCode } from '../types';

export interface TranslationDictionary {
  appName: string;
  demoDataBadge: string;
  chooseRole: string;
  workerTitle: string;
  adminTitle: string;
  welcomeWorker: string;
  switchWorker: string;
  activeSector: string;
  statusOnDuty: string;
  statusOffDuty: string;
  statusOvertime: string;
  btnCheckIn: string;
  btnCheckOut: string;
  currentShift: string;
  hoursWorkedToday: string;
  regularHoursLabel: string;
  overtimeHoursLabel: string;
  overtimeRateNote: string;
  receiptNotice: string;
  receiptCodeLabel: string;
  tamperProofProof: string;
  copyReceipt: string;
  copied: string;
  viewPayslipBtn: string;
  payslipTitle: string;
  payslipSubtitle: string;
  periodLabel: string;
  basePayLabel: string;
  overtimePayLabel: string;
  deductionsLabel: string;
  netPayLabel: string;
  readAloudBtn: string;
  stopAudioBtn: string;
  speaking: string;
  closeBtn: string;
  recentReceiptsTitle: string;
  noRecentReceipts: string;
  safetyRestNotice: string;
  safetyRestAlert: string;
  checkedInAt: string;
  checkedOutAt: string;
  elapsedTime: string;
  zoneWardLabel: string;
  hourlyRateLabel: string;
  deductionExplanation: string;
  overtimeRuleDesc: string;
  switchRoleBtn: string;
  changeLanguage: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: 'FairShift',
    demoDataBadge: 'Demo data',
    chooseRole: 'Select Interface',
    workerTitle: 'Worker Portal',
    adminTitle: 'Employer & Admin Portal',
    welcomeWorker: 'Welcome back',
    switchWorker: 'Switch Worker Profile',
    activeSector: 'Industry Sector',
    statusOnDuty: 'ON DUTY (Active Shift)',
    statusOffDuty: 'OFF DUTY (Resting)',
    statusOvertime: 'OVERTIME (1.5x Pay Active)',
    btnCheckIn: 'CHECK IN NOW',
    btnCheckOut: 'CHECK OUT NOW',
    currentShift: 'Current Shift Session',
    hoursWorkedToday: 'Hours Worked Today',
    regularHoursLabel: 'Regular Hours (Up to 8h)',
    overtimeHoursLabel: 'Overtime Hours (Above 8h)',
    overtimeRateNote: 'Hours beyond 8 per day earn 1.5x regular wage rate automatically.',
    receiptNotice: 'Tamper-Proof Receipt Generated',
    receiptCodeLabel: 'Receipt Code',
    tamperProofProof: 'Append-only audit record saved to ledger.',
    copyReceipt: 'Copy Receipt',
    copied: 'Copied!',
    viewPayslipBtn: 'VIEW MY PAYSLIP',
    payslipTitle: 'Transparent Payslip & Earnings',
    payslipSubtitle: 'Clear breakdown with zero hidden deductions (SDG 8.5 Fair Remuneration)',
    periodLabel: 'Pay Period',
    basePayLabel: 'Base Wage Earnings',
    overtimePayLabel: 'Overtime Pay (1.5x Premium)',
    deductionsLabel: 'Statutory Deductions',
    netPayLabel: 'Total Net Payout',
    readAloudBtn: 'Read Aloud (Voice Assist)',
    stopAudioBtn: 'Stop Audio',
    speaking: 'Playing speech summary...',
    closeBtn: 'Close Window',
    recentReceiptsTitle: 'My Verified Shift Receipts',
    noRecentReceipts: 'No shift receipts recorded yet today.',
    safetyRestNotice: 'SDG 8 Rest Safeguard',
    safetyRestAlert: 'Rest period safety notice: Please verify your rest duration before overtime.',
    checkedInAt: 'Checked In',
    checkedOutAt: 'Checked Out',
    elapsedTime: 'Shift Timer',
    zoneWardLabel: 'Assigned Location',
    hourlyRateLabel: 'Hourly Wage Rate',
    deductionExplanation: 'Statutory healthcare and standardized safety equipment contribution.',
    overtimeRuleDesc: 'Daily threshold: 8.0 hours. Overtime calculated automatically at 150% rate.',
    switchRoleBtn: 'Return to Role Switcher',
    changeLanguage: 'Language',
  },
  ta: {
    appName: 'ஃபேர்ஷிப்ட் (FairShift)',
    demoDataBadge: 'மாதிரித் தரவு (Demo data)',
    chooseRole: 'பயனாளர் இடைமுகத்தை தேர்வு செய்யவும்',
    workerTitle: 'தொழிலாளர் போர்டல்',
    adminTitle: 'நிர்வாகி & முதலாளி போர்டல்',
    welcomeWorker: 'நல்வரவு',
    switchWorker: 'தொழிலாளர் சுயவிவரத்தை மாற்றவும்',
    activeSector: 'தொழில் துறை',
    statusOnDuty: 'பணியில் உள்ளார் (ஷிப்ட் இயங்குகிறது)',
    statusOffDuty: 'ஓய்வில் உள்ளார் (வேலை இல்லை)',
    statusOvertime: 'கூடுதல் நேரம் (1.5x கூடுதல் ஊதியம்)',
    btnCheckIn: 'இப்போது பணி தொடங்கவும் (CHECK IN)',
    btnCheckOut: 'பணியை முடிக்கவும் (CHECK OUT)',
    currentShift: 'தற்போதைய ஷிப்ட் அமர்வு',
    hoursWorkedToday: 'இன்று பணிபுரிந்த மணிநேரம்',
    regularHoursLabel: 'சாதாரண நேரம் (8 மணி வரை)',
    overtimeHoursLabel: 'கூடுதல் நேரம் (8 மணிக்கு மேல்)',
    overtimeRateNote: 'ஒரு நாளுக்கு 8 மணி நேரத்திற்கு மேல் பணிபுரிந்தால் 1.5 மடங்கு அதிக ஊதியம் தானாகவே கணக்கிடப்படும்.',
    receiptNotice: 'பாதுகாப்பான பணி ரசீது உருவாக்கப்பட்டது',
    receiptCodeLabel: 'ரசீது குறியீடு',
    tamperProofProof: 'மாற்ற முடியாத பதிவேட்டில் பதிவு செய்யப்பட்டது.',
    copyReceipt: 'ரசீதை நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது!',
    viewPayslipBtn: 'எனது சம்பள சீட்டைப் பார்க்கவும்',
    payslipTitle: 'வெளிப்படையான சம்பளச் சீட்டு',
    payslipSubtitle: 'மறைமுக பிடித்தங்கள் இல்லாத தெளிவான ஊதிய விவரம் (SDG 8.5 நியாயமான ஊதியம்)',
    periodLabel: 'சம்பள காலம்',
    basePayLabel: 'அடிப்படை ஊதியம்',
    overtimePayLabel: 'கூடுதல் நேர ஊதியம் (1.5 மடங்கு)',
    deductionsLabel: 'சட்டரீதியான பிடித்தங்கள்',
    netPayLabel: 'நிகர ஊதியம் (கையில் கிடைக்கும் தொகை)',
    readAloudBtn: 'சத்தமாக வாசிக்கவும் (குரல் உதவி)',
    stopAudioBtn: 'ஆடியோவை நிறுத்து',
    speaking: 'குரல் சுருக்கம் ஒலிக்கிறது...',
    closeBtn: 'மூடவும்',
    recentReceiptsTitle: 'எனது சரிபார்க்கப்பட்ட ஷிப்ட் ரசீதுகள்',
    noRecentReceipts: 'இன்று இதுவரை ஷிப்ட் ரசீதுகள் எதுவும் இல்லை.',
    safetyRestNotice: 'SDG 8 ஓய்வு பாதுகாப்பு விதி',
    safetyRestAlert: 'ஓய்வு எச்சரிக்கை: கூடுதல் பணிக்கு முன் போதிய ஓய்வை உறுதிசெய்யவும்.',
    checkedInAt: 'பணி தொடங்கிய நேரம்',
    checkedOutAt: 'பணி முடிந்த நேரம்',
    elapsedTime: 'ஷிப்ட் டைமர்',
    zoneWardLabel: 'ஒதுக்கப்பட்ட இடம்',
    hourlyRateLabel: 'மணிநேர ஊதிய விகிதம்',
    deductionExplanation: 'சட்டரீதியான மருத்துவக் காப்பீடு மற்றும் பாதுகாப்பு உபகரண பங்களிப்பு.',
    overtimeRuleDesc: 'தினசரி வரம்பு: 8 மணிநேரம். கூடுதல் நேரம் 150% விகிதத்தில் தானாக கணக்கிடப்படுகிறது.',
    switchRoleBtn: 'முகப்புத் திரைக்குத் திரும்பு',
    changeLanguage: 'மொழி (Language)',
  },
  hi: {
    appName: 'फेयरशिफ्ट (FairShift)',
    demoDataBadge: 'डेमो डेटा (Demo data)',
    chooseRole: 'उपयोगकर्ता इंटरफ़ेस चुनें',
    workerTitle: 'श्रमिक पोर्टल (Worker Portal)',
    adminTitle: 'नियोक्ता एवं एडमिन पोर्टल',
    welcomeWorker: 'स्वागत है',
    switchWorker: 'श्रमिक प्रोफ़ाइल बदलें',
    activeSector: 'उद्योग क्षेत्र',
    statusOnDuty: 'कार्यरत (ड्यूटी चालू है)',
    statusOffDuty: 'विश्राम पर (ड्यूटी समाप्त)',
    statusOvertime: 'ओवरटाइम (1.5x वेतन लागू)',
    btnCheckIn: 'ड्यूटी शुरू करें (CHECK IN)',
    btnCheckOut: 'ड्यूटी समाप्त करें (CHECK OUT)',
    currentShift: 'वर्तमान शिफ्ट सत्र',
    hoursWorkedToday: 'आज काम किए गए घंटे',
    regularHoursLabel: 'नियमित घंटे (8 घंटे तक)',
    overtimeHoursLabel: 'ओवरटाइम घंटे (8 घंटे से अधिक)',
    overtimeRateNote: 'प्रतिदिन 8 घंटे से अधिक कार्य करने पर 1.5 गुना दर से अतिरिक्त वेतन स्वतः जुड़ेगा।',
    receiptNotice: 'सुरक्षित शिफ्ट रसीद तैयार हुई',
    receiptCodeLabel: 'रसीद कोड',
    tamperProofProof: 'अपरिवर्तनीय डिजिटल रजिस्टर में दर्ज।',
    copyReceipt: 'रसीद कॉपी करें',
    copied: 'कॉपी हो गया!',
    viewPayslipBtn: 'मेरी पेस्लिप देखें',
    payslipTitle: 'पारदर्शी पेस्लिप एवं कमाई',
    payslipSubtitle: 'बिना किसी छिपी कटौती के स्पष्ट वेतन विवरण (SDG 8.5 उचित पारिश्रमिक)',
    periodLabel: 'वेतन अवधि',
    basePayLabel: 'मूल वेतन कमाई',
    overtimePayLabel: 'ओवरटाइम वेतन (1.5x प्रीमियम)',
    deductionsLabel: 'वैधानिक कटौतियाँ',
    netPayLabel: 'कुल शुद्ध भुगतान (Net Pay)',
    readAloudBtn: 'बोलकर सुनाएँ (आवाज सहायता)',
    stopAudioBtn: 'आवाज बंद करें',
    speaking: 'वेतन विवरण बोला जा रहा है...',
    closeBtn: 'बंद करें',
    recentReceiptsTitle: 'मेरी सत्यापित शिफ्ट रसीदें',
    noRecentReceipts: 'आज अभी तक कोई शिफ्ट रसीद दर्ज नहीं हुई है।',
    safetyRestNotice: 'SDG 8 विश्राम सुरक्षा नियम',
    safetyRestAlert: 'विश्राम सुरक्षा सूचना: कृपया ओवरटाइम से पहले पर्याप्त आराम सुनिश्चित करें।',
    checkedInAt: 'ड्यूटी शुरू समय',
    checkedOutAt: 'ड्यूटी समाप्ति समय',
    elapsedTime: 'शिफ्ट टाइमर',
    zoneWardLabel: 'निर्धारित कार्यस्थान',
    hourlyRateLabel: 'प्रति घंटा मजदूरी दर',
    deductionExplanation: 'वैधानिक स्वास्थ्य सेवा एवं सुरक्षा उपकरण अंशदान।',
    overtimeRuleDesc: 'दैनिक सीमा: 8.0 घंटे। 150% की दर से ओवरटाइम स्वतः परिकलित।',
    switchRoleBtn: 'रोल चयनकर्ता पर लौटें',
    changeLanguage: 'भाषा (Language)',
  },
};
