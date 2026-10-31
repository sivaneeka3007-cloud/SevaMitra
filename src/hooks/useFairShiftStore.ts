/**
 * Shared Zustand-style Hook / LocalStorage Data Store for FairShift
 * Both Worker UI and Admin UI share this persisted store in real-time.
 */

import { useCallback, useEffect, useState } from 'react';
import { getLocalizedSectorConfig, getSectorConfig } from '../config/sectors';
import { generateSeedShifts, SEEDED_WORKERS } from '../data/seedData';
import { LanguageCode, SectorId, ShiftRecord, TimeLogEvent, Worker } from '../types';
import { calculatePayslip } from '../utils/payslipCalculations';
import { generateAuditHash, generateReceiptCode } from '../utils/receiptGenerator';
import { checkRestRules } from '../utils/restRuleChecks';
import { calculateShiftHours, ShiftHoursBreakdown } from '../utils/shiftCalculations';

const STORAGE_KEY = 'fairshift_demo_store_v1';
const EVENT_CUSTOM_UPDATE = 'fairshift_store_updated';

export interface FairShiftStoreState {
  activeSectorId: SectorId;
  activeWorkerId: string;
  language: LanguageCode;
  workers: Worker[];
  shifts: ShiftRecord[];
  logs: TimeLogEvent[];
}

function getInitialState(): FairShiftStoreState {
  const savedLang = (typeof window !== 'undefined' ? localStorage.getItem('fairshift_language') : null) as LanguageCode | null;
  const initialLang: LanguageCode = (savedLang === 'ta' || savedLang === 'hi' || savedLang === 'en') ? savedLang : 'en';

  if (typeof window === 'undefined') {
    const { shifts, logs } = generateSeedShifts();
    return {
      activeSectorId: 'construction',
      activeWorkerId: 'C-01',
      language: initialLang,
      workers: SEEDED_WORKERS,
      shifts,
      logs,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.workers) && Array.isArray(parsed.shifts) && Array.isArray(parsed.logs) && parsed.shifts.length > 0) {
        return {
          ...parsed,
          language: initialLang || parsed.language || 'en',
        };
      }
    }
  } catch (err) {
    console.error('Failed to parse FairShift local storage', err);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  // Generate pristine seed
  const { shifts, logs } = generateSeedShifts();
  const initial: FairShiftStoreState = {
    activeSectorId: 'construction',
    activeWorkerId: 'C-01',
    language: initialLang,
    workers: SEEDED_WORKERS,
    shifts,
    logs,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // Ignore storage quota
  }

  return initial;
}

export function useFairShiftStore() {
  const [state, setState] = useState<FairShiftStoreState>(getInitialState);

  // Sync state across window events and storage
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          setState(JSON.parse(raw));
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener(EVENT_CUSTOM_UPDATE, handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener(EVENT_CUSTOM_UPDATE, handleUpdate);
    };
  }, []);

  const saveState = useCallback((updater: (prev: FairShiftStoreState) => FairShiftStoreState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(EVENT_CUSTOM_UPDATE));
      } catch (err) {
        console.error('Could not save FairShift store:', err);
      }
      return next;
    });
  }, []);

  const setActiveSectorId = useCallback(
    (sectorId: SectorId) => {
      saveState((prev) => {
        // Find default worker for this sector if current worker belongs to other sector
        const sectorWorkers = prev.workers.filter((w) => w.sectorId === sectorId);
        const nextWorkerId = sectorWorkers.find((w) => w.id === prev.activeWorkerId)
          ? prev.activeWorkerId
          : sectorWorkers[0]?.id || 'C-01';

        return {
          ...prev,
          activeSectorId: sectorId,
          activeWorkerId: nextWorkerId,
        };
      });
    },
    [saveState]
  );

  const setActiveWorkerId = useCallback(
    (workerId: string) => {
      saveState((prev) => {
        const worker = prev.workers.find((w) => w.id === workerId);
        return {
          ...prev,
          activeWorkerId: workerId,
          activeSectorId: worker ? worker.sectorId : prev.activeSectorId,
        };
      });
    },
    [saveState]
  );

  const setLanguage = useCallback(
    (language: LanguageCode) => {
      try {
        localStorage.setItem('fairshift_language', language);
      } catch {
        // ignore
      }
      saveState((prev) => ({
        ...prev,
        language,
      }));
    },
    [saveState]
  );

  /**
   * Check In Worker
   */
  const checkInWorker = useCallback(
    (workerId: string, group?: string, shiftType?: string) => {
      let createdShift: ShiftRecord | null = null;
      let receiptCode = '';
      let violations: string[] = [];

      saveState((prev) => {
        const worker = prev.workers.find((w) => w.id === workerId);
        if (!worker) return prev;

        const sectorConfig = getSectorConfig(worker.sectorId);
        const assignedGroup = group || worker.group || sectorConfig.groups[0];
        const assignedShiftType = shiftType || sectorConfig.shiftTypes[0].name;
        const nowIso = new Date().toISOString();
        const dateStr = nowIso.split('T')[0];

        receiptCode = generateReceiptCode('FS');
        const shiftId = `SHIFT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const workerPastShifts = prev.shifts.filter((s) => s.workerId === workerId);

        const provisionalShift: Partial<ShiftRecord> = {
          id: shiftId,
          workerId,
          sectorId: worker.sectorId,
          date: dateStr,
          shiftType: assignedShiftType,
          group: assignedGroup,
          checkInTime: nowIso,
          durationHours: 0,
        };

        const ruleCheck = checkRestRules(provisionalShift, workerPastShifts, sectorConfig);
        violations = ruleCheck.violations;

        const newShift: ShiftRecord = {
          id: shiftId,
          workerId,
          sectorId: worker.sectorId,
          date: dateStr,
          shiftType: assignedShiftType,
          group: assignedGroup,
          checkInTime: nowIso,
          checkOutTime: null,
          durationHours: 0,
          regularHours: 0,
          overtimeHours: 0,
          status: 'active',
          checkInReceipt: receiptCode,
          restRuleViolations: violations,
        };

        createdShift = newShift;

        // Append to immutable log
        const lastLog = prev.logs[prev.logs.length - 1];
        const prevHash = lastLog ? lastLog.hash : '0x1000000000000000';
        const hash = generateAuditHash(`IN:${workerId}:${nowIso}:${receiptCode}`, prevHash);

        const newLog: TimeLogEvent = {
          id: `LOG-${Date.now()}-${receiptCode}`,
          timestamp: nowIso,
          workerId: worker.id,
          workerName: worker.name,
          sectorId: worker.sectorId,
          eventType: 'CHECK_IN',
          receiptCode,
          hash,
          group: assignedGroup,
          details: `Check-in recorded at ${assignedGroup} (${assignedShiftType})`,
        };

        const updatedWorkers = prev.workers.map((w) =>
          w.id === workerId ? { ...w, activeShiftId: shiftId, group: assignedGroup } : w
        );

        return {
          ...prev,
          workers: updatedWorkers,
          shifts: [newShift, ...prev.shifts],
          logs: [...prev.logs, newLog],
        };
      });

      return {
        shift: createdShift,
        receiptCode,
        violations,
      };
    },
    [saveState]
  );

  /**
   * Check Out Worker
   */
  const checkOutWorker = useCallback(
    (workerId: string) => {
      let receiptCode = '';
      let hoursBreakdown: ShiftHoursBreakdown = {
        totalHours: 0,
        regularHours: 0,
        overtimeHours: 0,
        isOvertimeActive: false,
      };
      let completedShift: ShiftRecord | null = null;

      saveState((prev) => {
        const worker = prev.workers.find((w) => w.id === workerId);
        if (!worker) return prev;

        const activeShift = prev.shifts.find(
          (s) => s.workerId === workerId && s.status === 'active'
        );
        if (!activeShift) return prev;

        const sectorConfig = getSectorConfig(worker.sectorId);
        const nowIso = new Date().toISOString();
        receiptCode = generateReceiptCode('FS');

        hoursBreakdown = calculateShiftHours(
          activeShift.checkInTime,
          nowIso,
          sectorConfig.restRules.standardDailyHours
        );

        const workerPastShifts = prev.shifts.filter((s) => s.workerId === workerId && s.id !== activeShift.id);

        const updatedShiftData: ShiftRecord = {
          ...activeShift,
          checkOutTime: nowIso,
          durationHours: hoursBreakdown.totalHours,
          regularHours: hoursBreakdown.regularHours,
          overtimeHours: hoursBreakdown.overtimeHours,
          status: 'completed',
          checkOutReceipt: receiptCode,
        };

        const ruleCheck = checkRestRules(updatedShiftData, workerPastShifts, sectorConfig);
        updatedShiftData.restRuleViolations = Array.from(
          new Set([...activeShift.restRuleViolations, ...ruleCheck.violations])
        );

        completedShift = updatedShiftData;

        // Append to immutable log
        const lastLog = prev.logs[prev.logs.length - 1];
        const prevHash = lastLog ? lastLog.hash : '0x1000000000000000';
        const hash = generateAuditHash(
          `OUT:${workerId}:${nowIso}:${hoursBreakdown.totalHours}H`,
          prevHash
        );

        const newLog: TimeLogEvent = {
          id: `LOG-${Date.now()}-${receiptCode}`,
          timestamp: nowIso,
          workerId: worker.id,
          workerName: worker.name,
          sectorId: worker.sectorId,
          eventType: 'CHECK_OUT',
          receiptCode,
          hash,
          group: activeShift.group,
          details: `Shift concluded: ${hoursBreakdown.totalHours.toFixed(1)}h total (${hoursBreakdown.regularHours.toFixed(1)}h regular + ${hoursBreakdown.overtimeHours.toFixed(1)}h OT @ 1.5x)`,
        };

        const updatedWorkers = prev.workers.map((w) =>
          w.id === workerId ? { ...w, activeShiftId: null } : w
        );

        const updatedShifts = prev.shifts.map((s) =>
          s.id === activeShift.id ? updatedShiftData : s
        );

        return {
          ...prev,
          workers: updatedWorkers,
          shifts: updatedShifts,
          logs: [...prev.logs, newLog],
        };
      });

      return {
        receiptCode,
        hoursBreakdown,
        shift: completedShift,
      };
    },
    [saveState]
  );

  /**
   * Reset data to pristine demo state
   */
  const resetToDemoData = useCallback(() => {
    const { shifts, logs } = generateSeedShifts();
    const fresh: FairShiftStoreState = {
      activeSectorId: 'construction',
      activeWorkerId: 'C-01',
      language: 'en',
      workers: SEEDED_WORKERS,
      shifts,
      logs,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      window.dispatchEvent(new Event(EVENT_CUSTOM_UPDATE));
      setState(fresh);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Current active worker object
  const currentWorker =
    state.workers.find((w) => w.id === state.activeWorkerId) ||
    state.workers.find((w) => w.sectorId === state.activeSectorId) ||
    state.workers[0];

  // Current sector config (base and localized)
  const currentSectorConfig = getSectorConfig(state.activeSectorId);
  const currentLocalizedSectorConfig = getLocalizedSectorConfig(state.activeSectorId, state.language);

  // Active shift for current worker if any
  const currentActiveShift = state.shifts.find(
    (s) => s.workerId === currentWorker?.id && s.status === 'active'
  );

  // Completed shifts for current worker
  const currentWorkerShifts = state.shifts.filter(
    (s) => s.workerId === currentWorker?.id
  );

  // Payslip for current worker
  const currentPayslip = currentWorker
    ? calculatePayslip(
        currentWorker,
        currentWorkerShifts,
        'Current Pay Period (Past 7 Days)',
        currentSectorConfig,
        state.language
      )
    : null;

  return {
    state,
    activeSectorId: state.activeSectorId,
    activeWorkerId: state.activeWorkerId,
    language: state.language,
    workers: state.workers,
    shifts: state.shifts,
    logs: state.logs,
    currentWorker,
    currentSectorConfig,
    currentLocalizedSectorConfig,
    currentActiveShift,
    currentWorkerShifts,
    currentPayslip,
    setActiveSectorId,
    setActiveWorkerId,
    setLanguage,
    checkInWorker,
    checkOutWorker,
    resetToDemoData,
  };
}
