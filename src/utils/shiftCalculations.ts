/**
 * Pure functions for shift hours and overtime calculation.
 * UN SDG 8 Decent Work compliance: standard workday capped at 8 hours.
 * Hours worked beyond 8 hours per shift/day automatically register as overtime.
 */

export interface ShiftHoursBreakdown {
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  isOvertimeActive: boolean;
}

/**
 * Calculate total, regular, and overtime hours given check-in and check-out timestamps.
 * If check-out is not yet recorded, optional asOfTime provides live computation.
 */
export function calculateShiftHours(
  checkInIso: string,
  checkOutIso: string | null,
  standardDailyHours = 8,
  asOfIso?: string
): ShiftHoursBreakdown {
  const start = new Date(checkInIso).getTime();
  const end = checkOutIso ? new Date(checkOutIso).getTime() : asOfIso ? new Date(asOfIso).getTime() : Date.now();

  if (isNaN(start) || isNaN(end) || end <= start) {
    return {
      totalHours: 0,
      regularHours: 0,
      overtimeHours: 0,
      isOvertimeActive: false,
    };
  }

  const durationMs = end - start;
  const rawHours = durationMs / (1000 * 60 * 60);
  const totalHours = Math.round(rawHours * 100) / 100;

  const regularHours = Math.min(totalHours, standardDailyHours);
  const overtimeHours = Math.max(0, Math.round((totalHours - regularHours) * 100) / 100);

  return {
    totalHours,
    regularHours,
    overtimeHours,
    isOvertimeActive: overtimeHours > 0,
  };
}

/**
 * Format total seconds into HH:MM:SS string for the live timer.
 */
export function formatDuration(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safeSeconds / 3600);
  const mins = Math.floor((safeSeconds % 3600) / 60);
  const secs = safeSeconds % 60;

  return [
    hrs.toString().padStart(2, '0'),
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':');
}

/**
 * Aggregate total regular and overtime hours from a list of shifts.
 */
export function aggregateShiftHours(shifts: { regularHours: number; overtimeHours: number }[]): {
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
} {
  return shifts.reduce<{ totalHours: number; regularHours: number; overtimeHours: number }>(
    (acc, shift) => {
      acc.regularHours = Math.round((acc.regularHours + (shift.regularHours || 0)) * 100) / 100;
      acc.overtimeHours = Math.round((acc.overtimeHours + (shift.overtimeHours || 0)) * 100) / 100;
      acc.totalHours = Math.round((acc.regularHours + acc.overtimeHours) * 100) / 100;
      return acc;
    },
    { totalHours: 0, regularHours: 0, overtimeHours: 0 }
  );
}
