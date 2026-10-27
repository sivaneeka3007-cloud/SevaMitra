/**
 * Sector Configuration for FairShift
 *
 * Defines domain-specific operational rules, groups, roles, hazard profiles,
 * and safety rest rules for both Construction and Healthcare sectors.
 * All application logic reads from this config rather than hardcoding sector names.
 */

import { SectorConfig, SectorId } from '../types';

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
      ruleDescription: 'Minimum 11 hours rest between shifts & maximum 2 consecutive night shifts (Patient & Nurse safety safeguard)',
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
