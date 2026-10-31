/**
 * Sector Configuration for FairShift
 *
 * Defines domain-specific operational rules, groups, roles, hazard profiles,
 * and safety rest rules for both Construction and Healthcare sectors.
 * All application logic reads from this config rather than hardcoding sector names.
 */

import { LanguageCode, SectorConfig, SectorId } from '../types';

export const SECTOR_CONFIGS: Record<SectorId, SectorConfig> = {
  construction: {
    id: 'construction',
    name: 'Construction Site',
    shortName: 'Construction',
    iconName: 'hard-hat',
    tagline: 'Civil infrastructure, building works & field trades',
    currency: 'INR',
    currencySymbol: '₹',
    groupLabel: 'Zone',
    groups: ['Block A', 'Block B', 'Foundation Zone', 'Heavy Plant Yard'],
    jobRoles: [
      'Site Mason',
      'Scaffold Erector',
      'Site Electrician',
      'Heavy Crane Operator',
      'Structural Welder',
      'Concrete Specialist',
      'Safety Marshal',
      'Carpentry Lead',
    ],
    shiftTypes: [
      { id: 'c-morning', name: 'Morning Shift', startTime: '07:00', endTime: '15:30', isNight: false },
      { id: 'c-evening', name: 'Evening Shift', startTime: '15:00', endTime: '23:30', isNight: false },
      { id: 'c-night', name: 'Night Shift', startTime: '23:00', endTime: '07:00', isNight: true },
    ],
    hazardCategories: [
      'Working at Heights (> 2m fall risk)',
      'Heavy Machinery & Traffic Proximity',
      'Silica Dust & Chemical Exposure',
      'Electrical & High-Voltage Equipment',
      'Noise & Vibration Strain',
    ],
    restRules: {
      standardDailyHours: 8,
      maxDailyHours: 10, // Hard cap per day to prevent exhaustion & catastrophic accidents
      ruleDescription: 'Maximum 10 hours work per 24h window (SDG 8.8 physical fatigue safeguard)',
    },
    complaintResponseTimeLimitHours: 48,
  },
  hospital: {
    id: 'hospital',
    name: 'Hospital & Healthcare',
    shortName: 'Hospital',
    iconName: 'stethoscope',
    tagline: '24/7 Clinical inpatient, critical care & emergency wards',
    currency: 'INR',
    currencySymbol: '₹',
    groupLabel: 'Ward',
    groups: ['ICU', 'Emergency', 'General Ward', 'Pediatrics', 'Surgical Wing'],
    jobRoles: [
      'Registered Staff Nurse',
      'ICU Specialist Nurse',
      'Emergency Medical Technician',
      'Ward Attendant',
      'Radiology Technician',
      'Clinical Care Assistant',
      'Pharmacy Dispenser',
      'Sanitation Specialist',
    ],
    shiftTypes: [
      { id: 'h-day', name: 'Day Shift', startTime: '07:00', endTime: '15:30', isNight: false },
      { id: 'h-afternoon', name: 'Afternoon Shift', startTime: '15:00', endTime: '23:30', isNight: false },
      { id: 'h-night', name: 'Night Shift', startTime: '23:00', endTime: '07:30', isNight: true },
    ],
    hazardCategories: [
      'Biological Pathogens & Airborne Viruses',
      'Sharp Needlestick & Bio-Fluid Exposure',
      'High Ergonomic Patient-Lifting Strain',
      'Diagnostic Radiation Proximity',
      'Acute Shift-Work Sleep Disorder / Burnout',
    ],
    restRules: {
      standardDailyHours: 8,
      minRestHoursBetweenShifts: 11, // Mandatory continuous rest between consecutive shifts
      maxConsecutiveNightShifts: 2, // No more than 2 consecutive night rotations
      ruleDescription:
        'Minimum 11 hours rest between shifts & maximum 2 consecutive night shifts (Patient & Nurse safety safeguard)',
    },
    complaintResponseTimeLimitHours: 24,
  },
};

export const AVAILABLE_SECTORS: SectorConfig[] = Object.values(SECTOR_CONFIGS);

export function getSectorConfig(sectorId: SectorId): SectorConfig {
  const config = SECTOR_CONFIGS[sectorId];
  if (!config) {
    throw new Error(`Unsupported sector ID: ${sectorId}`);
  }
  return config;
}

// Multilingual role translations
const ROLE_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  // Construction
  'Site Mason': {
    en: 'Site Mason',
    ta: 'கட்டுமான மேஸ்திரி / கொத்தனார்',
    hi: 'साइट राजमिस्त्री',
  },
  'Scaffold Erector': {
    en: 'Scaffold Erector',
    ta: 'சாரக்கட்டு அமைப்பாளர்',
    hi: 'मचान निर्माता',
  },
  'Site Electrician': {
    en: 'Site Electrician',
    ta: 'தள மின்பணியாளர்',
    hi: 'साइट इलेक्ट्रीशियन',
  },
  'Heavy Crane Operator': {
    en: 'Heavy Crane Operator',
    ta: 'கனரக கிரேன் ஆபரேட்டர்',
    hi: 'भारी क्रेन ऑपरेटर',
  },
  'Structural Welder': {
    en: 'Structural Welder',
    ta: 'கட்டமைப்பு வெல்டர்',
    hi: 'स्ट्रक्चरल वेल्डर',
  },
  'Concrete Specialist': {
    en: 'Concrete Specialist',
    ta: 'கான்கிரீட் நிபுணர்',
    hi: 'कंक्रीट विशेषज्ञ',
  },
  'Safety Marshal': {
    en: 'Safety Marshal',
    ta: 'பாதுகாப்பு மேற்பார்வையாளர்',
    hi: 'सुरक्षा मार्शल',
  },
  'Carpentry Lead': {
    en: 'Carpentry Lead',
    ta: 'தச்சு தலைமை பணியாளர்',
    hi: 'बढ़ईगीरी लीड',
  },

  // Hospital
  'Registered Staff Nurse': {
    en: 'Registered Staff Nurse',
    ta: 'பதிவுசெய்யப்பட்ட செவிலியர்',
    hi: 'स्टाफ नर्स',
  },
  'ICU Specialist Nurse': {
    en: 'ICU Specialist Nurse',
    ta: 'தீவிர சிகிச்சைப் பிரிவு செவிலியர்',
    hi: 'आईसीयू विशेषज्ञ नर्स',
  },
  'Emergency Medical Technician': {
    en: 'Emergency Medical Technician',
    ta: 'அவசர மருத்துவ தொழில்நுட்ப வல்லுநர்',
    hi: 'आपातकालीन चिकित्सा तकनीशियन',
  },
  'Ward Attendant': {
    en: 'Ward Attendant',
    ta: 'வார்டு உதவியாளர்',
    hi: 'वार्ड अटेंडेंट',
  },
  'Radiology Technician': {
    en: 'Radiology Technician',
    ta: 'கதிரியக்க தொழில்நுட்ப வல்லுநர்',
    hi: 'रेडियोलॉजी तकनीशियन',
  },
  'Clinical Care Assistant': {
    en: 'Clinical Care Assistant',
    ta: 'மருத்துவ பராமரிப்பு உதவியாளர்',
    hi: 'क्लिनिकल केयर सहायक',
  },
  'Pharmacy Dispenser': {
    en: 'Pharmacy Dispenser',
    ta: 'மருந்தக விநியோகஸ்தர்',
    hi: 'फार्मेसी डिस्पेंसर',
  },
  'Sanitation Specialist': {
    en: 'Sanitation Specialist',
    ta: 'சுகாதார தூய்மை நிபுணர்',
    hi: 'स्वच्छता विशेषज्ञ',
  },
};

// Multilingual zone / ward group translations
const GROUP_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  // Construction
  'Block A': {
    en: 'Block A',
    ta: 'பகுதி அ (Block A)',
    hi: 'ब्लॉक ए',
  },
  'Block B': {
    en: 'Block B',
    ta: 'பகுதி ஆ (Block B)',
    hi: 'ब्लॉक बी',
  },
  'Foundation Zone': {
    en: 'Foundation Zone',
    ta: 'அடித்தள மண்டலம்',
    hi: 'नींव क्षेत्र',
  },
  'Heavy Plant Yard': {
    en: 'Heavy Plant Yard',
    ta: 'கனரக இயந்திர தளம்',
    hi: 'भारी मशीनरी यार्ड',
  },

  // Hospital
  ICU: {
    en: 'ICU',
    ta: 'தீவிர சிகிச்சை (ICU)',
    hi: 'आईसीयू (ICU)',
  },
  Emergency: {
    en: 'Emergency',
    ta: 'அவசர சிகிச்சை',
    hi: 'आपातकालीन वार्ड',
  },
  'General Ward': {
    en: 'General Ward',
    ta: 'பொது வார்டு',
    hi: 'सामान्य वार्ड',
  },
  Pediatrics: {
    en: 'Pediatrics',
    ta: 'குழந்தைகள் பிரிவு',
    hi: 'बाल रोग वार्ड',
  },
  'Surgical Wing': {
    en: 'Surgical Wing',
    ta: 'அறுவை சிகிச்சை பிரிவு',
    hi: 'शल्य चिकित्सा विंग',
  },
};

// Multilingual shift types
const SHIFT_TYPE_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Morning Shift': {
    en: 'Morning Shift',
    ta: 'காலை ஷிப்ட்',
    hi: 'सुबह की शिफ्ट',
  },
  'Evening Shift': {
    en: 'Evening Shift',
    ta: 'மாலை ஷிப்ட்',
    hi: 'शाम की शिफ्ट',
  },
  'Night Shift': {
    en: 'Night Shift',
    ta: 'இரவு ஷிப்ட்',
    hi: 'रात की शिफ्ट',
  },
  'Day Shift': {
    en: 'Day Shift',
    ta: 'பகல் ஷிப்ட்',
    hi: 'दिन की शिफ्ट',
  },
  'Afternoon Shift': {
    en: 'Afternoon Shift',
    ta: 'மதிய ஷிப்ட்',
    hi: 'दोपहर की शिफ्ट',
  },
};

// Multilingual hazard translations
const HAZARD_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Working at Heights (> 2m fall risk)': {
    en: 'Working at Heights (> 2m fall risk)',
    ta: 'உயரத்தில் வேலை (2 மீட்டருக்கு மேல் விழும் அபாயம்)',
    hi: 'ऊंचाई पर कार्य (> 2 मी गिरने का जोखिम)',
  },
  'Heavy Machinery & Traffic Proximity': {
    en: 'Heavy Machinery & Traffic Proximity',
    ta: 'கனரக இயந்திரங்கள் மற்றும் வாகன நடமாட்ட அபாயம்',
    hi: 'भारी मशीनरी एवं वाहन निकटता',
  },
  'Silica Dust & Chemical Exposure': {
    en: 'Silica Dust & Chemical Exposure',
    ta: 'சிலிக்கா தூசி மற்றும் இரசாயன வெளிப்பாடு',
    hi: 'सिलिका धूल एवं रासायनिक जोखिम',
  },
  'Electrical & High-Voltage Equipment': {
    en: 'Electrical & High-Voltage Equipment',
    ta: 'மின்சார மற்றும் உயர் மின்னழுத்த உபகரணங்கள்',
    hi: 'विद्युत एवं उच्च वोल्टेज उपकरण',
  },
  'Noise & Vibration Strain': {
    en: 'Noise & Vibration Strain',
    ta: 'இரைச்சல் மற்றும் அதிர்வு உடல் அழுத்தம்',
    hi: 'शोर एवं कंपन से शारीरिक तनाव',
  },
  'Biological Pathogens & Airborne Viruses': {
    en: 'Biological Pathogens & Airborne Viruses',
    ta: 'உயிரியல் கிருமிகள் மற்றும் காற்றில் பரவும் வைரஸ்கள்',
    hi: 'जैविक रोगजनक एवं वायुजनित वायरस',
  },
  'Sharp Needlestick & Bio-Fluid Exposure': {
    en: 'Sharp Needlestick & Bio-Fluid Exposure',
    ta: 'கூர்மையான ஊசி குத்துதல் மற்றும் உடல் திரவ வெளிப்பாடு',
    hi: 'नुकीली सुई एवं जैविक तरल पदार्थ का जोखिम',
  },
  'High Ergonomic Patient-Lifting Strain': {
    en: 'High Ergonomic Patient-Lifting Strain',
    ta: 'நோயாளிகளை தூக்குவதால் ஏற்படும் கடுமையான உடல் சோர்வு',
    hi: 'मरीजों को उठाने से भारी शारीरिक तनाव',
  },
  'Diagnostic Radiation Proximity': {
    en: 'Diagnostic Radiation Proximity',
    ta: 'கதிரியக்க பரிசோதனை கதிர்வீச்சு அருகாமை',
    hi: 'नैदानिक विकिरण निकटता',
  },
  'Acute Shift-Work Sleep Disorder / Burnout': {
    en: 'Acute Shift-Work Sleep Disorder / Burnout',
    ta: 'ஷிப்ட் வேலை தூக்கக் கோளாறு / கடுமையான மன அழுத்தம்',
    hi: 'शिफ्ट कार्य जनित अनिद्रा विकार एवं अत्यधिक थकान',
  },
};

const SECTOR_META_TRANSLATIONS: Record<
  SectorId,
  Record<
    LanguageCode,
    {
      name: string;
      shortName: string;
      tagline: string;
      groupLabel: string;
      restRuleDesc: string;
    }
  >
> = {
  construction: {
    en: {
      name: 'Construction Site',
      shortName: 'Construction',
      tagline: 'Civil infrastructure, building works & field trades',
      groupLabel: 'Zone',
      restRuleDesc: 'Maximum 10 hours work per 24h window (SDG 8.8 physical fatigue safeguard)',
    },
    ta: {
      name: 'கட்டுமான தளம்',
      shortName: 'கட்டுமானம்',
      tagline: 'கட்டுமானப் பணிகள், கட்டட கட்டமைப்பு மற்றும் களத் தொழில்கள்',
      groupLabel: 'மண்டலம்',
      restRuleDesc: '24 மணி நேரத்தில் அதிகபட்சம் 10 மணி நேர வேலை (SDG 8.8 உடல் சோர்வு பாதுகாப்பு விதி)',
    },
    hi: {
      name: 'निर्माण स्थल',
      shortName: 'निर्माण',
      tagline: 'नागरिक बुनियादी ढांचा, भवन निर्माण एवं फील्ड ट्रेड',
      groupLabel: 'जोन',
      restRuleDesc: '24 घंटे में अधिकतम 10 घंटे काम (SDG 8.8 शारीरिक थकान सुरक्षा नियम)',
    },
  },
  hospital: {
    en: {
      name: 'Hospital & Healthcare',
      shortName: 'Hospital',
      tagline: '24/7 Clinical inpatient, critical care & emergency wards',
      groupLabel: 'Ward',
      restRuleDesc:
        'Minimum 11 hours rest between shifts & maximum 2 consecutive night shifts (Patient & Nurse safety safeguard)',
    },
    ta: {
      name: 'மருத்துவமனை & சுகாதாரம்',
      shortName: 'மருத்துவமனை',
      tagline: '24/7 உள்நோயாளி பராமரிப்பு, தீவிர சிகிச்சை மற்றும் அவசர பிரிவுகள்',
      groupLabel: 'வார்டு',
      restRuleDesc:
        'ஷிப்டுகளுக்கு இடையே குறைந்தபட்சம் 11 மணி நேர ஓய்வு & தொடர்ந்து அதிகபட்சம் 2 இரவு ஷிப்டுகள் (நோயாளி மற்றும் செவிலியர் பாதுகாப்பு விதி)',
    },
    hi: {
      name: 'अस्पताल एवं स्वास्थ्य सेवा',
      shortName: 'अस्पताल',
      tagline: '24/7 इनपेशेंट क्लिनिकल, क्रिटिकल केयर एवं इमरजेंसी वार्ड',
      groupLabel: 'वार्ड',
      restRuleDesc:
        'शिफ्टों के बीच न्यूनतम 11 घंटे का विश्राम और अधिकतम 2 लगातार रात की शिफ्ट (मरीज एवं नर्स सुरक्षा नियम)',
    },
  },
};

export function getLocalizedRole(role: string, language: LanguageCode = 'en'): string {
  return ROLE_TRANSLATIONS[role]?.[language] || role;
}

export function getLocalizedGroup(group: string, language: LanguageCode = 'en'): string {
  return GROUP_TRANSLATIONS[group]?.[language] || group;
}

export function getLocalizedShiftType(shiftType: string, language: LanguageCode = 'en'): string {
  return SHIFT_TYPE_TRANSLATIONS[shiftType]?.[language] || shiftType;
}

export function getLocalizedHazard(hazard: string, language: LanguageCode = 'en'): string {
  return HAZARD_TRANSLATIONS[hazard]?.[language] || hazard;
}

export function getLocalizedComplaintSla(hours: number, language: LanguageCode = 'en'): string {
  if (language === 'ta') {
    return `${hours} மணி நேர புகார் தீர்வு வரம்பு`;
  }
  if (language === 'hi') {
    return `${hours} घंटे में शिकायत निवारण सीमा`;
  }
  return `${hours} hours complaint response limit`;
}

/**
 * Returns a sector config with translated textual fields based on the selected language.
 * Numerical rules and IDs remain intact for calculations.
 */
export function getLocalizedSectorConfig(sectorId: SectorId, language: LanguageCode = 'en'): SectorConfig {
  const base = getSectorConfig(sectorId);
  const meta = SECTOR_META_TRANSLATIONS[sectorId]?.[language] || SECTOR_META_TRANSLATIONS[sectorId]?.en;

  return {
    ...base,
    name: meta ? meta.name : base.name,
    shortName: meta ? meta.shortName : base.shortName,
    tagline: meta ? meta.tagline : base.tagline,
    groupLabel: meta ? meta.groupLabel : base.groupLabel,
    groups: base.groups.map((g) => getLocalizedGroup(g, language)),
    jobRoles: base.jobRoles.map((r) => getLocalizedRole(r, language)),
    shiftTypes: base.shiftTypes.map((st) => ({
      ...st,
      name: getLocalizedShiftType(st.name, language),
    })),
    hazardCategories: base.hazardCategories.map((h) => getLocalizedHazard(h, language)),
    restRules: {
      ...base.restRules,
      ruleDescription: meta ? meta.restRuleDesc : base.restRules.ruleDescription,
    },
  };
}
