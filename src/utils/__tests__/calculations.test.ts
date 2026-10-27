import { describe, expect, it } from 'vitest';
import { SECTOR_CONFIGS } from '../../config/sectors';
import { ShiftRecord, Worker } from '../../types';
import { calculatePayslip, generateSpokenSummary } from '../payslipCalculations';
import { generateAuditHash, generateReceiptCode } from '../receiptGenerator';
import { checkRestRules } from '../restRuleChecks';
import { aggregateShiftHours, calculateShiftHours, formatDuration } from '../shiftCalculations';

describe('Shift and Overtime Calculations', () => {
  it('calculates regular hours accurately when under daily limit', () => {
    const checkIn = '2026-10-26T08:00:00.000Z';
    const checkOut = '2026-10-26T14:30:00.000Z'; // 6.5 hours
    const result = calculateShiftHours(checkIn, checkOut, 8);

    expect(result.totalHours).toBe(6.5);
    expect(result.regularHours).toBe(6.5);
    expect(result.overtimeHours).toBe(0);
    expect(result.isOvertimeActive).toBe(false);
  });

  it('automatically allocates hours beyond 8 as overtime', () => {
    const checkIn = '2026-10-26T07:00:00.000Z';
    const checkOut = '2026-10-26T17:30:00.000Z'; // 10.5 hours
    const result = calculateShiftHours(checkIn, checkOut, 8);

    expect(result.totalHours).toBe(10.5);
    expect(result.regularHours).toBe(8);
    expect(result.overtimeHours).toBe(2.5);
    expect(result.isOvertimeActive).toBe(true);
  });

  it('formats live timer seconds cleanly into HH:MM:SS', () => {
    expect(formatDuration(0)).toBe('00:00:00');
    expect(formatDuration(3665)).toBe('01:01:05');
  });

  it('aggregates multiple shifts correctly', () => {
    const shifts = [
      { regularHours: 8, overtimeHours: 1.5 },
      { regularHours: 7.5, overtimeHours: 0 },
      { regularHours: 8, overtimeHours: 2.0 },
    ];
    const total = aggregateShiftHours(shifts);
    expect(total.regularHours).toBe(23.5);
    expect(total.overtimeHours).toBe(3.5);
    expect(total.totalHours).toBe(27.0);
  });
});

describe('Payslip and 1.5x Overtime Calculations', () => {
  const dummyWorker: Worker = {
    id: 'W-TEST-1',
    sectorId: 'construction',
    name: 'David Silva',
    role: 'Site Mason',
    group: 'Block A',
    hourlyRate: 100, // ₹100/hr
    phone: '+91 98401 23451',
    joinedDate: '2026-01-15',
  };

  const dummyShifts: ShiftRecord[] = [
    {
      id: 'S-1',
      workerId: 'W-TEST-1',
      sectorId: 'construction',
      date: '2026-10-20',
      shiftType: 'Morning Shift',
      group: 'Block A',
      checkInTime: '2026-10-20T07:00:00.000Z',
      checkOutTime: '2026-10-20T17:00:00.000Z', // 10 hrs = 8 reg + 2 ot
      durationHours: 10,
      regularHours: 8,
      overtimeHours: 2,
      status: 'completed',
      checkInReceipt: 'FS-AAA01',
      restRuleViolations: [],
    },
  ];

  it('applies 1.5x multiplier to overtime hours with Indian Rupee rates', () => {
    const payslip = calculatePayslip(dummyWorker, dummyShifts, 'Week 43, Oct 2026', SECTOR_CONFIGS.construction, 'en');

    expect(payslip.regularHours).toBe(8);
    expect(payslip.overtimeHours).toBe(2);
    expect(payslip.hourlyRate).toBe(100);
    expect(payslip.overtimeRate).toBe(150); // 100 * 1.5
    expect(payslip.regularPay).toBe(800); // 8 * 100
    expect(payslip.overtimePay).toBe(300); // 2 * 150
    expect(payslip.grossPay).toBe(1100); // 800 + 300

    // Deductions: 4% PF (44.00) + 1.5% ESI (16.50) = 60.50
    expect(payslip.totalDeductions).toBe(60.5);
    expect(payslip.netPay).toBe(1039.5);
    expect(payslip.currencySymbol).toBe('₹');
  });

  it('produces localized speech summaries for all three languages with correct rupee words', () => {
    const enSpeech = generateSpokenSummary({
      workerName: 'Raj',
      role: 'Mason',
      regularHours: 8,
      overtimeHours: 2,
      regularPay: 800,
      overtimePay: 300,
      grossPay: 1100,
      totalDeductions: 60.5,
      netPay: 1039.5,
      currencySymbol: '₹',
      language: 'en',
      periodLabel: 'Week 43',
    });
    expect(enSpeech).toContain('Hello Raj');
    expect(enSpeech).toContain('rupees');
    expect(enSpeech).toContain('1.5 times pay rate');

    const taSpeech = generateSpokenSummary({
      workerName: 'ராஜ்',
      role: 'Mason',
      regularHours: 8,
      overtimeHours: 2,
      regularPay: 800,
      overtimePay: 300,
      grossPay: 1100,
      totalDeductions: 60.5,
      netPay: 1039.5,
      currencySymbol: '₹',
      language: 'ta',
      periodLabel: 'Week 43',
    });
    expect(taSpeech).toContain('வணக்கம்');
    expect(taSpeech).toContain('ரூபாய்');

    const hiSpeech = generateSpokenSummary({
      workerName: 'राज',
      role: 'Mason',
      regularHours: 8,
      overtimeHours: 2,
      regularPay: 800,
      overtimePay: 300,
      grossPay: 1100,
      totalDeductions: 60.5,
      netPay: 1039.5,
      currencySymbol: '₹',
      language: 'hi',
      periodLabel: 'Week 43',
    });
    expect(hiSpeech).toContain('नमस्ते');
    expect(hiSpeech).toContain('रुपये');
  });
});

describe('Sector Rest Rule Enforcement', () => {
  it('detects Construction max 10 hours per day violation', () => {
    const excessiveShift: Partial<ShiftRecord> = {
      durationHours: 11.5,
    };
    const check = checkRestRules(excessiveShift, [], SECTOR_CONFIGS.construction);
    expect(check.hasViolation).toBe(true);
    expect(check.violations[0]).toContain('Exceeded daily maximum of 10 hours');
  });

  it('detects Hospital minimum 11 hours rest violation', () => {
    const priorShift: ShiftRecord = {
      id: 'S-PREV',
      workerId: 'H-W1',
      sectorId: 'hospital',
      date: '2026-10-25',
      shiftType: 'Day Shift',
      group: 'ICU',
      checkInTime: '2026-10-25T07:00:00.000Z',
      checkOutTime: '2026-10-25T15:30:00.000Z',
      durationHours: 8.5,
      regularHours: 8,
      overtimeHours: 0.5,
      status: 'completed',
      checkInReceipt: 'FS-H001',
      restRuleViolations: [],
    };

    // New shift starts only 7.5 hours later (23:00) instead of mandatory 11 hours
    const nextShift: Partial<ShiftRecord> = {
      id: 'S-NEXT',
      checkInTime: '2026-10-25T23:00:00.000Z',
      shiftType: 'Night Shift',
    };

    const check = checkRestRules(nextShift, [priorShift], SECTOR_CONFIGS.hospital);
    expect(check.hasViolation).toBe(true);
    expect(check.violations[0]).toContain('Insufficient rest between shifts');
  });

  it('detects Hospital >2 consecutive night shifts violation', () => {
    const pastNight1: ShiftRecord = {
      id: 'S-N1',
      workerId: 'H-W1',
      sectorId: 'hospital',
      date: '2026-10-23',
      shiftType: 'Night Shift',
      group: 'Emergency',
      checkInTime: '2026-10-23T23:00:00.000Z',
      checkOutTime: '2026-10-24T07:30:00.000Z',
      durationHours: 8.5,
      regularHours: 8,
      overtimeHours: 0.5,
      status: 'completed',
      checkInReceipt: 'FS-N01',
      restRuleViolations: [],
    };

    const pastNight2: ShiftRecord = {
      id: 'S-N2',
      workerId: 'H-W1',
      sectorId: 'hospital',
      date: '2026-10-24',
      shiftType: 'Night Shift',
      group: 'Emergency',
      checkInTime: '2026-10-24T23:00:00.000Z',
      checkOutTime: '2026-10-25T07:30:00.000Z',
      durationHours: 8.5,
      regularHours: 8,
      overtimeHours: 0.5,
      status: 'completed',
      checkInReceipt: 'FS-N02',
      restRuleViolations: [],
    };

    // Third consecutive night
    const pastNight3: Partial<ShiftRecord> = {
      id: 'S-N3',
      shiftType: 'Night Shift',
      checkInTime: '2026-10-25T23:00:00.000Z',
    };

    const check = checkRestRules(pastNight3, [pastNight1, pastNight2], SECTOR_CONFIGS.hospital);
    expect(check.hasViolation).toBe(true);
    expect(check.violations[0]).toContain('Consecutive night shift limit exceeded');
  });
});

describe('Receipt and Audit Trail Generator', () => {
  it('generates a clean 5-char code prefixed with FS-', () => {
    const receipt = generateReceiptCode('FS');
    expect(receipt).toMatch(/^FS-[2-9A-Z]{5}$/);
  });

  it('produces deterministic audit hashes', () => {
    const hash1 = generateAuditHash('CHECK_IN:W-1:2026-10-26T08:00:00.000Z', '0x123');
    const hash2 = generateAuditHash('CHECK_IN:W-1:2026-10-26T08:00:00.000Z', '0x123');
    const hash3 = generateAuditHash('CHECK_IN:W-2:2026-10-26T08:00:00.000Z', '0x123');

    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
    expect(hash1.startsWith('0x')).toBe(true);
  });
});

describe('Seed Data Generation', () => {
  it('generates valid seed shifts and logs without date errors', async () => {
    const { generateSeedShifts } = await import('../../data/seedData');
    const { shifts, logs } = generateSeedShifts();

    expect(shifts.length).toBeGreaterThan(20);
    expect(logs.length).toBeGreaterThan(20);

    // Verify all ISO strings are parseable and valid
    for (const shift of shifts) {
      expect(isNaN(new Date(shift.checkInTime).getTime())).toBe(false);
      if (shift.checkOutTime) {
        expect(isNaN(new Date(shift.checkOutTime).getTime())).toBe(false);
      }
    }

    for (const log of logs) {
      expect(isNaN(new Date(log.timestamp).getTime())).toBe(false);
    }
  });
});

describe('WhatsApp Shift Proof Generator', () => {
  it('formats verified shift proof text and wa.me URL correctly', async () => {
    const { generateWhatsAppProofMessage, getWhatsAppProofUrl } = await import('../whatsappProof');
    
    const params = {
      receiptCode: 'FS-9K12A',
      workerName: 'Priya Raman',
      date: '2026-10-26',
      totalHours: 9.5,
      overtimeHours: 1.5,
      earningsINR: 1435,
      language: 'en' as const,
    };

    const text = generateWhatsAppProofMessage(params);
    expect(text).toContain('FS-9K12A');
    expect(text).toContain('Priya Raman');
    expect(text).toContain('9.5 hrs');
    expect(text).toContain('1.5 hrs');
    expect(text).toContain('Verified by FairShift');

    const url = getWhatsAppProofUrl(params);
    expect(url.startsWith('https://wa.me/?text=')).toBe(true);
    expect(url).toContain(encodeURIComponent('FS-9K12A'));
    expect(url).toContain(encodeURIComponent('Verified by FairShift'));

    // Test Tamil and Hindi proof generation
    const taText = generateWhatsAppProofMessage({ ...params, language: 'ta' });
    expect(taText).toContain('ஃபேர்ஷிப்ட் சரிபார்க்கப்பட்ட பணி ஆதாரம்');
    expect(taText).toContain('FS-9K12A');
    expect(taText).toContain('Verified by FairShift');

    const hiText = generateWhatsAppProofMessage({ ...params, language: 'hi' });
    expect(hiText).toContain('फेयरशिफ्ट सत्यापित शिफ्ट प्रमाण');
    expect(hiText).toContain('FS-9K12A');
    expect(hiText).toContain('Verified by FairShift');
  });
});
