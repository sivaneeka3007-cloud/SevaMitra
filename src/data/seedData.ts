/**
 * Fictional Seed Data for FairShift (UN SDG 8 Decent Work Platform)
 * Strictly labelled as DEMO DATA.
 * Generates ~10 workers per sector with realistic past shifts and active status.
 */

import { ShiftRecord, TimeLogEvent, Worker } from '../types';
import { generateAuditHash, generateReceiptCode } from '../utils/receiptGenerator';

export const SEEDED_WORKERS: Worker[] = [
  // --- Construction Site Workers (10) ---
  {
    id: 'C-01',
    sectorId: 'construction',
    name: 'David Silva',
    role: 'Site Mason',
    group: 'Block A',
    hourlyRate: 110.0,
    phone: '+91 98401 23451',
    joinedDate: '2026-02-10',
    activeShiftId: null,
  },
  {
    id: 'C-02',
    sectorId: 'construction',
    name: 'Marcus Chen',
    role: 'Scaffold Erector',
    group: 'Block A',
    hourlyRate: 100.0,
    phone: '+91 98401 23452',
    joinedDate: '2026-03-01',
    activeShiftId: null,
  },
  {
    id: 'C-03',
    sectorId: 'construction',
    name: 'Priya Raman',
    role: 'Site Electrician',
    group: 'Block B',
    hourlyRate: 140.0,
    phone: '+91 98401 23453',
    joinedDate: '2026-01-18',
    activeShiftId: 'C-ACTIVE-03', // checked-in live demo
  },
  {
    id: 'C-04',
    sectorId: 'construction',
    name: 'Ahmed Al-Mansoor',
    role: 'Heavy Crane Operator',
    group: 'Foundation Zone',
    hourlyRate: 150.0,
    phone: '+91 98401 23454',
    joinedDate: '2025-11-05',
    activeShiftId: null,
  },
  {
    id: 'C-05',
    sectorId: 'construction',
    name: 'Elena Rostova',
    role: 'Structural Welder',
    group: 'Block B',
    hourlyRate: 130.0,
    phone: '+91 98401 23455',
    joinedDate: '2026-02-22',
    activeShiftId: null,
  },
  {
    id: 'C-06',
    sectorId: 'construction',
    name: 'John Kamau',
    role: 'Concrete Specialist',
    group: 'Foundation Zone',
    hourlyRate: 95.0,
    phone: '+91 98401 23456',
    joinedDate: '2026-03-15',
    activeShiftId: null,
  },
  {
    id: 'C-07',
    sectorId: 'construction',
    name: 'Maria Gonzalez',
    role: 'Safety Marshal',
    group: 'Block A',
    hourlyRate: 135.0,
    phone: '+91 98401 23457',
    joinedDate: '2025-09-12',
    activeShiftId: null,
  },
  {
    id: 'C-08',
    sectorId: 'construction',
    name: 'Samuel Okafor',
    role: 'Carpentry Lead',
    group: 'Block B',
    hourlyRate: 120.0,
    phone: '+91 98401 23458',
    joinedDate: '2026-01-30',
    activeShiftId: null,
  },
  {
    id: 'C-09',
    sectorId: 'construction',
    name: 'Vikram Patel',
    role: 'Site Mason',
    group: 'Heavy Plant Yard',
    hourlyRate: 110.0,
    phone: '+91 98401 23459',
    joinedDate: '2026-04-02',
    activeShiftId: null,
  },
  {
    id: 'C-10',
    sectorId: 'construction',
    name: "Liam O'Connor",
    role: 'Scaffold Erector',
    group: 'Heavy Plant Yard',
    hourlyRate: 100.0,
    phone: '+91 98401 23460',
    joinedDate: '2026-02-14',
    activeShiftId: null,
  },

  // --- Hospital Healthcare Workers (10) ---
  {
    id: 'H-01',
    sectorId: 'hospital',
    name: 'Sarah Jenkins',
    role: 'Registered Staff Nurse',
    group: 'Emergency',
    hourlyRate: 240.0,
    phone: '+91 98402 34561',
    joinedDate: '2025-08-14',
    activeShiftId: null,
  },
  {
    id: 'H-02',
    sectorId: 'hospital',
    name: 'Dr. Ananya Iyer',
    role: 'ICU Specialist Nurse',
    group: 'ICU',
    hourlyRate: 320.0,
    phone: '+91 98402 34562',
    joinedDate: '2025-05-19',
    activeShiftId: 'H-ACTIVE-02', // checked-in live demo
  },
  {
    id: 'H-03',
    sectorId: 'hospital',
    name: 'Miguel Santos',
    role: 'Emergency Medical Technician',
    group: 'Emergency',
    hourlyRate: 200.0,
    phone: '+91 98402 34563',
    joinedDate: '2026-01-10',
    activeShiftId: null,
  },
  {
    id: 'H-04',
    sectorId: 'hospital',
    name: 'Fatima Noor',
    role: 'Ward Attendant',
    group: 'General Ward',
    hourlyRate: 130.0,
    phone: '+91 98402 34564',
    joinedDate: '2026-03-05',
    activeShiftId: null,
  },
  {
    id: 'H-05',
    sectorId: 'hospital',
    name: 'Kenji Takahashi',
    role: 'Radiology Technician',
    group: 'Surgical Wing',
    hourlyRate: 280.0,
    phone: '+91 98402 34565',
    joinedDate: '2025-10-11',
    activeShiftId: null,
  },
  {
    id: 'H-06',
    sectorId: 'hospital',
    name: 'Blessing Adebayo',
    role: 'Clinical Care Assistant',
    group: 'Pediatrics',
    hourlyRate: 160.0,
    phone: '+91 98402 34566',
    joinedDate: '2026-02-18',
    activeShiftId: null,
  },
  {
    id: 'H-07',
    sectorId: 'hospital',
    name: 'Rohan Mehra',
    role: 'Pharmacy Dispenser',
    group: 'General Ward',
    hourlyRate: 190.0,
    phone: '+91 98402 34567',
    joinedDate: '2026-01-22',
    activeShiftId: null,
  },
  {
    id: 'H-08',
    sectorId: 'hospital',
    name: 'Chloe Dubois',
    role: 'Registered Staff Nurse',
    group: 'ICU',
    hourlyRate: 240.0,
    phone: '+91 98402 34568',
    joinedDate: '2025-12-01',
    activeShiftId: null,
  },
  {
    id: 'H-09',
    sectorId: 'hospital',
    name: 'Tariq Qasim',
    role: 'Sanitation Specialist',
    group: 'Surgical Wing',
    hourlyRate: 120.0,
    phone: '+91 98402 34569',
    joinedDate: '2026-03-20',
    activeShiftId: null,
  },
  {
    id: 'H-10',
    sectorId: 'hospital',
    name: 'Grace Wanjiku',
    role: 'Registered Staff Nurse',
    group: 'Pediatrics',
    hourlyRate: 240.0,
    phone: '+91 98402 34570',
    joinedDate: '2025-11-28',
    activeShiftId: null,
  },
];

/**
 * Generate historical seed shifts covering past 7 days
 */
export function generateSeedShifts(): { shifts: ShiftRecord[]; logs: TimeLogEvent[] } {
  const shifts: ShiftRecord[] = [];
  const logs: TimeLogEvent[] = [];

  const now = new Date();
  let prevHash = '0x1000000000000000';

  // Seed shifts for Construction
  SEEDED_WORKERS.filter((w) => w.sectorId === 'construction').forEach((worker, wIdx) => {
    // Each worker has 4 to 6 past shifts
    for (let dayOffset = 6; dayOffset >= 1; dayOffset--) {
      // 5-day work week pattern
      if ((wIdx + dayOffset) % 7 === 0) continue;

      const shiftDate = new Date(now.getTime() - dayOffset * 24 * 3600 * 1000);
      const dateStr = shiftDate.toISOString().split('T')[0];

      // Standard 8h, or occasional 9.5h overtime, or one fatigue violation for worker 0
      let durationHours = 8.0;
      let violations: string[] = [];

      if (wIdx === 0 && dayOffset === 2) {
        durationHours = 10.75; // Exceeds Construction max 10h rule!
        violations.push(
          'Exceeded daily maximum of 10 hours (Shift duration: 10.8 hrs). Risk of extreme fatigue!'
        );
      } else if ((wIdx + dayOffset) % 3 === 0) {
        durationHours = 9.5; // 1.5h overtime
      }

      const regularHours = Math.min(8, durationHours);
      const overtimeHours = Math.max(0, Math.round((durationHours - regularHours) * 100) / 100);

      const checkInHour = 7 + (wIdx % 2); // 7am or 8am
      const hourStr = String(checkInHour).padStart(2, '0');
      const checkInDate = new Date(`${dateStr}T${hourStr}:00:00.000Z`);
      const checkInTime = checkInDate.toISOString();
      const checkOutMs = checkInDate.getTime() + durationHours * 3600 * 1000;
      const checkOutTime = new Date(checkOutMs).toISOString();

      const inReceipt = generateReceiptCode('FS');
      const outReceipt = generateReceiptCode('FS');
      const shiftId = `S-C-${worker.id}-${dayOffset}`;

      shifts.push({
        id: shiftId,
        workerId: worker.id,
        sectorId: 'construction',
        date: dateStr,
        shiftType: 'Morning Shift',
        group: worker.group,
        checkInTime,
        checkOutTime,
        durationHours,
        regularHours,
        overtimeHours,
        status: 'completed',
        checkInReceipt: inReceipt,
        checkOutReceipt: outReceipt,
        restRuleViolations: violations,
      });

      // Append check in log
      const inHash = generateAuditHash(`IN:${worker.id}:${checkInTime}`, prevHash);
      prevHash = inHash;
      logs.push({
        id: `LOG-IN-${shiftId}`,
        timestamp: checkInTime,
        workerId: worker.id,
        workerName: worker.name,
        sectorId: 'construction',
        eventType: 'CHECK_IN',
        receiptCode: inReceipt,
        hash: inHash,
        group: worker.group,
        details: `Checked in to ${worker.group} as ${worker.role}`,
      });

      // Append check out log
      const outHash = generateAuditHash(`OUT:${worker.id}:${checkOutTime}`, prevHash);
      prevHash = outHash;
      logs.push({
        id: `LOG-OUT-${shiftId}`,
        timestamp: checkOutTime,
        workerId: worker.id,
        workerName: worker.name,
        sectorId: 'construction',
        eventType: 'CHECK_OUT',
        receiptCode: outReceipt,
        hash: outHash,
        group: worker.group,
        details: `Checked out (${durationHours}h total, ${overtimeHours}h OT)`,
      });
    }
  });

  // Active shift for Construction worker Priya Raman (C-03)
  const cActiveStart = new Date(now.getTime() - 4.5 * 3600 * 1000).toISOString();
  const cActiveReceipt = generateReceiptCode('FS');
  shifts.push({
    id: 'C-ACTIVE-03',
    workerId: 'C-03',
    sectorId: 'construction',
    date: now.toISOString().split('T')[0],
    shiftType: 'Morning Shift',
    group: 'Block B',
    checkInTime: cActiveStart,
    checkOutTime: null,
    durationHours: 4.5,
    regularHours: 4.5,
    overtimeHours: 0,
    status: 'active',
    checkInReceipt: cActiveReceipt,
    restRuleViolations: [],
  });

  const cActiveHash = generateAuditHash(`IN:C-03:${cActiveStart}`, prevHash);
  prevHash = cActiveHash;
  logs.push({
    id: 'LOG-C-ACTIVE-03',
    timestamp: cActiveStart,
    workerId: 'C-03',
    workerName: 'Priya Raman',
    sectorId: 'construction',
    eventType: 'CHECK_IN',
    receiptCode: cActiveReceipt,
    hash: cActiveHash,
    group: 'Block B',
    details: 'Checked in to Block B as Site Electrician',
  });

  // Seed shifts for Hospital
  SEEDED_WORKERS.filter((w) => w.sectorId === 'hospital').forEach((worker, wIdx) => {
    for (let dayOffset = 6; dayOffset >= 1; dayOffset--) {
      if ((wIdx + dayOffset) % 6 === 0) continue;

      const shiftDate = new Date(now.getTime() - dayOffset * 24 * 3600 * 1000);
      const dateStr = shiftDate.toISOString().split('T')[0];

      let durationHours = 8.0;
      let violations: string[] = [];
      let shiftType = 'Day Shift';

      // Seed rest rule violations for Hospital
      if (wIdx === 0 && dayOffset === 2) {
        shiftType = 'Night Shift';
        violations.push(
          'Insufficient rest between shifts: only 7.5 hrs rest observed (Mandatory minimum: 11 hrs).'
        );
      } else if (wIdx === 2 && (dayOffset === 3 || dayOffset === 2 || dayOffset === 1)) {
        shiftType = 'Night Shift';
        if (dayOffset === 1) {
          violations.push(
            'Consecutive night shift limit exceeded: 3 nights scheduled (Maximum allowed: 2 consecutive nights). Circadian disruption risk!'
          );
        }
      } else if (dayOffset % 2 === 0) {
        durationHours = 9.0; // 1 hr overtime
      }

      const regularHours = Math.min(8, durationHours);
      const overtimeHours = Math.max(0, Math.round((durationHours - regularHours) * 100) / 100);

      const checkInHour = shiftType === 'Night Shift' ? 23 : 7;
      const hourStr = String(checkInHour).padStart(2, '0');
      const checkInDate = new Date(`${dateStr}T${hourStr}:00:00.000Z`);
      const checkInTime = checkInDate.toISOString();
      const checkOutMs = checkInDate.getTime() + durationHours * 3600 * 1000;
      const checkOutTime = new Date(checkOutMs).toISOString();

      const inReceipt = generateReceiptCode('FS');
      const outReceipt = generateReceiptCode('FS');
      const shiftId = `S-H-${worker.id}-${dayOffset}`;

      shifts.push({
        id: shiftId,
        workerId: worker.id,
        sectorId: 'hospital',
        date: dateStr,
        shiftType,
        group: worker.group,
        checkInTime,
        checkOutTime,
        durationHours,
        regularHours,
        overtimeHours,
        status: 'completed',
        checkInReceipt: inReceipt,
        checkOutReceipt: outReceipt,
        restRuleViolations: violations,
      });

      const inHash = generateAuditHash(`IN:${worker.id}:${checkInTime}`, prevHash);
      prevHash = inHash;
      logs.push({
        id: `LOG-IN-${shiftId}`,
        timestamp: checkInTime,
        workerId: worker.id,
        workerName: worker.name,
        sectorId: 'hospital',
        eventType: 'CHECK_IN',
        receiptCode: inReceipt,
        hash: inHash,
        group: worker.group,
        details: `Checked in to ${worker.group} (${shiftType})`,
      });

      const outHash = generateAuditHash(`OUT:${worker.id}:${checkOutTime}`, prevHash);
      prevHash = outHash;
      logs.push({
        id: `LOG-OUT-${shiftId}`,
        timestamp: checkOutTime,
        workerId: worker.id,
        workerName: worker.name,
        sectorId: 'hospital',
        eventType: 'CHECK_OUT',
        receiptCode: outReceipt,
        hash: outHash,
        group: worker.group,
        details: `Checked out (${durationHours}h total, ${overtimeHours}h OT)`,
      });
    }
  });

  // Active shift for Hospital worker Dr. Ananya Iyer (H-02)
  const hActiveStart = new Date(now.getTime() - 6.2 * 3600 * 1000).toISOString();
  const hActiveReceipt = generateReceiptCode('FS');
  shifts.push({
    id: 'H-ACTIVE-02',
    workerId: 'H-02',
    sectorId: 'hospital',
    date: now.toISOString().split('T')[0],
    shiftType: 'Day Shift',
    group: 'ICU',
    checkInTime: hActiveStart,
    checkOutTime: null,
    durationHours: 6.2,
    regularHours: 6.2,
    overtimeHours: 0,
    status: 'active',
    checkInReceipt: hActiveReceipt,
    restRuleViolations: [],
  });

  const hActiveHash = generateAuditHash(`IN:H-02:${hActiveStart}`, prevHash);
  logs.push({
    id: 'LOG-H-ACTIVE-02',
    timestamp: hActiveStart,
    workerId: 'H-02',
    workerName: 'Dr. Ananya Iyer',
    sectorId: 'hospital',
    eventType: 'CHECK_IN',
    receiptCode: hActiveReceipt,
    hash: hActiveHash,
    group: 'ICU',
    details: 'Checked in to ICU as ICU Specialist Nurse',
  });

  return { shifts, logs };
}
