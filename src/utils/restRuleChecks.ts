/**
 * Sector-aware Rest Rule Checking Functions
 * Enforces UN SDG 8.8 (Promote safe and secure working environments for all workers).
 *
 * Reads rules directly from SectorConfig:
 * - Construction: Max 10 hours per day
 * - Hospital: Min 11 hours rest between consecutive shifts, max 2 consecutive night shifts
 */

import { RestRuleCheckResult, SectorConfig, ShiftRecord } from '../types';

/**
 * Check if a single shift or worker shift history violates the sector's rest rules.
 */
export function checkRestRules(
  currentShift: Partial<ShiftRecord>,
  workerShifts: ShiftRecord[],
  sectorConfig: SectorConfig
): RestRuleCheckResult {
  const violations: string[] = [];
  const warnings: string[] = [];
  const { restRules } = sectorConfig;

  // 1. Max daily hours rule (Construction)
  if (restRules.maxDailyHours) {
    const shiftDuration = currentShift.durationHours || 0;
    if (shiftDuration > restRules.maxDailyHours) {
      violations.push(
        `Exceeded daily maximum of ${restRules.maxDailyHours} hours (Shift duration: ${shiftDuration.toFixed(1)} hrs). Risk of extreme fatigue!`
      );
    } else if (shiftDuration >= restRules.maxDailyHours - 0.5) {
      warnings.push(
        `Approaching safety limit of ${restRules.maxDailyHours} hours per day (Currently ${shiftDuration.toFixed(1)} hrs).`
      );
    }
  }

  // Sort worker's completed shifts chronologically
  const sortedShifts = [...workerShifts]
    .filter((s) => s.id !== currentShift.id && s.checkInTime)
    .sort((a, b) => new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime());

  // 2. Minimum rest between shifts rule (Hospital)
  if (restRules.minRestHoursBetweenShifts && currentShift.checkInTime && sortedShifts.length > 0) {
    const currentStart = new Date(currentShift.checkInTime).getTime();

    // Find the immediately preceding shift that ended before or near currentStart
    const priorShifts = sortedShifts.filter((s) => s.checkOutTime && new Date(s.checkOutTime).getTime() <= currentStart);
    if (priorShifts.length > 0) {
      const lastShift = priorShifts[priorShifts.length - 1];
      const lastEnd = new Date(lastShift.checkOutTime!).getTime();
      const restHours = (currentStart - lastEnd) / (1000 * 60 * 60);

      if (restHours < restRules.minRestHoursBetweenShifts) {
        violations.push(
          `Insufficient rest between shifts: only ${restHours.toFixed(1)} hrs rest observed (Mandatory minimum: ${restRules.minRestHoursBetweenShifts} hrs).`
        );
      } else if (restHours < restRules.minRestHoursBetweenShifts + 2) {
        warnings.push(
          `Borderline rest recovery (${restHours.toFixed(1)} hrs rest). Monitor worker vigilance.`
        );
      }
    }
  }

  // 3. Maximum consecutive night shifts rule (Hospital)
  if (restRules.maxConsecutiveNightShifts && currentShift.shiftType) {
    const isCurrentNight = currentShift.shiftType.toLowerCase().includes('night');

    if (isCurrentNight) {
      // Look at past consecutive shifts
      let consecutiveNights = 1; // including current
      for (let i = sortedShifts.length - 1; i >= 0; i--) {
        const s = sortedShifts[i];
        if (s.shiftType.toLowerCase().includes('night')) {
          consecutiveNights++;
        } else {
          break; // broke the night streak
        }
      }

      if (consecutiveNights > restRules.maxConsecutiveNightShifts) {
        violations.push(
          `Consecutive night shift limit exceeded: ${consecutiveNights} nights scheduled (Maximum allowed: ${restRules.maxConsecutiveNightShifts} consecutive nights). Circadian disruption risk!`
        );
      }
    }
  }

  return {
    hasViolation: violations.length > 0,
    violations,
    warnings,
  };
}
