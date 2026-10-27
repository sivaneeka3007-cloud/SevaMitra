/**
 * Core type definitions for FairShift - UN SDG 8 Decent Work Platform
 */

export type SectorId = 'construction' | 'hospital';

export type LanguageCode = 'en' | 'ta' | 'hi';

export interface SectorConfig {
  id: SectorId;
  name: string;
  shortName: string;
  iconName: 'hard-hat' | 'stethoscope';
  tagline: string;
  currency: string;
  currencySymbol: string;
  groupLabel: string; // e.g. "Zone" or "Ward"
  groups: string[]; // Zones or Wards
  jobRoles: string[];
  shiftTypes: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    isNight?: boolean;
  }[];
  hazardCategories: string[];
  restRules: {
    standardDailyHours: number;
    maxDailyHours?: number; // Construction rule
    minRestHoursBetweenShifts?: number; // Hospital rule
    maxConsecutiveNightShifts?: number; // Hospital rule
    ruleDescription: string;
  };
  complaintResponseTimeLimitHours: number; // 48 for construction, 24 for hospital
}

export interface Worker {
  id: string;
  sectorId: SectorId;
  name: string;
  role: string;
  group: string; // zone or ward
  hourlyRate: number;
  phone: string;
  joinedDate: string;
  activeShiftId?: string | null;
}

export interface ShiftRecord {
  id: string;
  workerId: string;
  sectorId: SectorId;
  date: string; // YYYY-MM-DD
  shiftType: string;
  group: string;
  checkInTime: string; // ISO String
  checkOutTime: string | null; // ISO String or null if in progress
  durationHours: number;
  regularHours: number;
  overtimeHours: number;
  status: 'active' | 'completed';
  checkInReceipt: string;
  checkOutReceipt?: string;
  restRuleViolations: string[];
}

export interface TimeLogEvent {
  id: string;
  timestamp: string; // ISO string
  workerId: string;
  workerName: string;
  sectorId: SectorId;
  eventType: 'CHECK_IN' | 'CHECK_OUT';
  receiptCode: string;
  hash: string;
  group: string;
  details: string;
}

export interface DeductionItem {
  id: string;
  label: string;
  amount: number;
  description: string;
}

export interface PayslipBreakdown {
  workerId: string;
  workerName: string;
  role: string;
  period: string;
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  overtimeRate: number;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
  deductions: DeductionItem[];
  totalDeductions: number;
  netPay: number;
  currencySymbol: string;
  spokenSummary: string;
}

export interface RestRuleCheckResult {
  hasViolation: boolean;
  violations: string[];
  warnings: string[];
}
