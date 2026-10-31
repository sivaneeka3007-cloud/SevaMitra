import React from 'react';
import { Users, Clock, AlertTriangle, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';
import { LanguageCode, SectorConfig, ShiftRecord, Worker } from '../../types';
import { formatINR } from '../../utils/currencyFormatter';
import { getTranslations } from '../../i18n';

interface AttendanceOverviewProps {
  sectorConfig: SectorConfig;
  workers: Worker[];
  shifts: ShiftRecord[];
  language?: LanguageCode;
}

export const AttendanceOverview: React.FC<AttendanceOverviewProps> = ({
  sectorConfig,
  workers,
  shifts,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const isConstruction = sectorConfig.id === 'construction';
  const sectorWorkers = workers.filter((w) => w.sectorId === sectorConfig.id);
  const sectorShifts = shifts.filter((s) => s.sectorId === sectorConfig.id);

  // Active workers
  const activeWorkers = sectorWorkers.filter((w) => w.activeShiftId !== null && w.activeShiftId !== undefined);

  // Total overtime hours
  const totalOvertimeHours = sectorShifts.reduce(
    (sum, s) => sum + (s.overtimeHours || 0),
    0
  );

  // Approximate overtime wage cost in Indian Rupees
  const estimatedOvertimeCost = sectorShifts.reduce((sum, s) => {
    const worker = sectorWorkers.find((w) => w.id === s.workerId);
    const rate = worker?.hourlyRate || 100;
    return sum + (s.overtimeHours || 0) * (rate * 1.5);
  }, 0);

  // Shifts with rest rule violations
  const shiftsWithViolations = sectorShifts.filter(
    (s) => s.restRuleViolations && s.restRuleViolations.length > 0
  );

  const violationCount = shiftsWithViolations.length;

  return (
    <div className="space-y-4">
      {/* Rest rule alert banner if violations exist */}
      {violationCount > 0 && (
        <div className="bg-[#FDE8E8] border-3 border-[#F8B4B4] rounded-2xl p-5 flex items-start gap-3.5 shadow-xs">
          <ShieldAlert className="w-7 h-7 text-[#9B1C1C] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-black text-[#9B1C1C] text-lg flex items-center gap-2">
              <span>{t.sdgRestAlert}: {violationCount} {violationCount > 1 ? t.infractions : t.infraction}</span>
              <span className="text-xs bg-[#9B1C1C] text-white px-2 py-0.5 rounded-full font-bold">
                {t.actionRequired}
              </span>
            </h3>
            <p className="text-sm font-bold text-[#771D1D] leading-relaxed">
              {sectorConfig.name}: {sectorConfig.restRules.ruleDescription}. {t.inspectFlaggedNotice}
            </p>
          </div>
        </div>
      )}

      {/* Metrics Grid: 4 Tidy Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full">
        {/* Card 1: On Duty Now */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border-2 border-[#E6DCBF] shadow-xs space-y-1.5 min-w-0">
          <div className="flex items-center justify-between text-[#585A56]">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider truncate">{t.onShift}</span>
            <div
              className={`p-1.5 sm:p-2 rounded-xl text-white font-bold shrink-0 ${
                isConstruction ? 'bg-[#D9531E]' : 'bg-[#0E8373]'
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-2xl sm:text-4xl font-black text-[#1F2421]">{activeWorkers.length}</span>
            <span className="text-xs font-bold text-[#585A56]">/ {sectorWorkers.length}</span>
          </div>
          <p className="text-[11px] text-[#166534] font-black flex items-center gap-1 truncate">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
            {t.activeNow}
          </p>
        </div>

        {/* Card 2: Total Overtime in Indian Rupees */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border-2 border-[#E6DCBF] shadow-xs space-y-1.5 min-w-0">
          <div className="flex items-center justify-between text-[#585A56]">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider truncate">{t.overtime}</span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-400 text-amber-950 font-bold shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-3xl font-black text-[#7A5B00] font-mono truncate">
              {formatINR(estimatedOvertimeCost)}
            </span>
          </div>
          <p className="text-[11px] text-[#854D0E] font-bold truncate">
            {totalOvertimeHours.toFixed(1)}{t.hoursShort} {t.loggedAtRate}
          </p>
        </div>

        {/* Card 3: Total Shifts Logged */}
        <div className="bg-white p-5 rounded-2xl border-2 border-[#E6DCBF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#585A56]">
            <span className="text-xs font-black uppercase tracking-wider">{t.loggedShifts}</span>
            <div className="p-2.5 rounded-xl bg-[#FAF6EF] text-[#1F2421] border border-[#E6DCBF] font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#1F2421]">{sectorShifts.length}</span>
            <span className="text-xs font-bold text-[#585A56]">{t.past7Days}</span>
          </div>
          <p className="text-xs text-[#585A56] font-bold">
            {t.receiptVerified100}
          </p>
        </div>

        {/* Card 4: Rest Rule Safety Status */}
        <div className="bg-white p-5 rounded-2xl border-2 border-[#E6DCBF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#585A56]">
            <span className="text-xs font-black uppercase tracking-wider">{t.safetyStatus}</span>
            <div
              className={`p-2.5 rounded-xl text-white ${
                violationCount === 0 ? 'bg-[#2E7D32]' : 'bg-[#C81E1E]'
              }`}
            >
              {violationCount === 0 ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-4xl font-black ${
                violationCount === 0 ? 'text-[#166534]' : 'text-[#9B1C1C]'
              }`}
            >
              {violationCount === 0
                ? '100%'
                : `${Math.round(((sectorShifts.length - violationCount) / (sectorShifts.length || 1)) * 100)}%`}
            </span>
            <span className="text-xs font-bold text-[#585A56]">{t.compliance}</span>
          </div>
          <p className="text-xs font-bold text-[#585A56]">
            {violationCount > 0 ? (
              <span className="text-[#9B1C1C] font-black">⚠️ {violationCount} {t.restViolations}</span>
            ) : (
              <span className="text-[#166534] font-black">✓ {t.allLimitsRespected}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
