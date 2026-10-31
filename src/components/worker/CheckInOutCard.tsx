import React, { useEffect, useState } from 'react';
import {
  Play,
  Square,
  Clock,
  MapPin,
  Zap,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
} from 'lucide-react';
import { getTranslations } from '../../i18n';
import { LanguageCode, SectorConfig, ShiftRecord, Worker } from '../../types';
import { formatDuration } from '../../utils/shiftCalculations';
import { formatHourlyRate } from '../../utils/currencyFormatter';

interface CheckInOutCardProps {
  worker: Worker;
  activeShift?: ShiftRecord;
  sectorConfig: SectorConfig;
  language: LanguageCode;
  onCheckIn: (workerId: string, group: string, shiftType: string) => void;
  onCheckOut: (workerId: string) => void;
}

export const CheckInOutCard: React.FC<CheckInOutCardProps> = ({
  worker,
  activeShift,
  sectorConfig,
  language,
  onCheckIn,
  onCheckOut,
}) => {
  const t = getTranslations(language);
  const isOnDuty = Boolean(activeShift);
  const isConstruction = sectorConfig.id === 'construction';

  const [selectedGroup, setSelectedGroup] = useState<string>(worker.group || sectorConfig.groups[0]);
  const [selectedShiftType, setSelectedShiftType] = useState<string>(sectorConfig.shiftTypes[0].name);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (!sectorConfig.groups.includes(selectedGroup)) {
      setSelectedGroup(sectorConfig.groups[0]);
    }
    if (!sectorConfig.shiftTypes.find((st) => st.name === selectedShiftType)) {
      setSelectedShiftType(sectorConfig.shiftTypes[0].name);
    }
  }, [sectorConfig, selectedGroup, selectedShiftType]);

  // Live timer interval
  useEffect(() => {
    if (!activeShift?.checkInTime) {
      setElapsedSeconds(0);
      return;
    }

    const updateTimer = () => {
      const startMs = new Date(activeShift.checkInTime).getTime();
      const nowMs = Date.now();
      const diffSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000));
      setElapsedSeconds(diffSeconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeShift?.checkInTime]);

  const currentDurationHours = elapsedSeconds / 3600;
  const isOvertimeActive = isOnDuty && currentDurationHours > sectorConfig.restRules.standardDailyHours;
  const isTooLong = isOnDuty && sectorConfig.restRules.maxDailyHours && currentDurationHours > sectorConfig.restRules.maxDailyHours;
  const overtimeHoursLive = isOvertimeActive
    ? Math.max(0, currentDurationHours - sectorConfig.restRules.standardDailyHours)
    : 0;

  const handleActionClick = () => {
    if (isOnDuty) {
      onCheckOut(worker.id);
    } else {
      onCheckIn(worker.id, selectedGroup, selectedShiftType);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-3 border-[#E6DCBF] shadow-md p-4 sm:p-7 space-y-5 w-full">
      {/* Top Status Header: Color + Icon + Word */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 pb-3 border-b-2 border-[#FAF6EF]">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-[#585A56] block">
            {t.currentShift}
          </span>
          <div>
            {isOnDuty ? (
              isTooLong ? (
                <div className="inline-flex items-center gap-1.5 bg-[#FDE8E8] text-[#9B1C1C] px-3 py-1 rounded-full border-2 border-[#F8B4B4] font-black text-base">
                  <AlertOctagon className="w-5 h-5 text-[#9B1C1C] shrink-0" />
                  <span>{t.statusShiftTooLong}</span>
                </div>
              ) : isOvertimeActive ? (
                <div className="inline-flex items-center gap-1.5 bg-[#FEF08A] text-[#854D0E] px-3 py-1 rounded-full border-2 border-[#FACC15] font-black text-base">
                  <AlertTriangle className="w-5 h-5 text-[#854D0E] shrink-0" />
                  <span>{t.statusOvertime}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full border-2 border-[#86EFAC] font-black text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0" />
                  <span>{t.statusOnDuty}</span>
                </div>
              )
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-[#F3F4F6] text-[#374151] px-3 py-1 rounded-full border-2 border-[#D1D5DB] font-black text-base">
                <span className="w-3.5 h-3.5 rounded-full bg-[#9CA3AF] shrink-0" />
                <span>{t.statusOffDuty}</span>
              </div>
            )}
          </div>
        </div>

        {/* Wage Rate in Indian Rupees (₹) */}
        <div className="xs:text-right">
          <span className="text-xs font-bold text-[#585A56] block uppercase tracking-wider">
            {t.hourlyRateLabel}
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#1F2421]">
            {formatHourlyRate(worker.hourlyRate, language)}
          </p>
        </div>
      </div>

      {/* Main Focus: Giant Round Action Button & Large Digits Live Timer */}
      <div className="text-center py-2 space-y-4">
        {/* Live Timer (Visible when on duty) */}
        {isOnDuty && (
          <div className="bg-[#FAF6EF] rounded-2xl p-4 sm:p-6 border-2 border-[#E6DCBF] max-w-md mx-auto space-y-1.5 w-full">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-[#585A56] uppercase tracking-wider">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D9531E]" />
              <span>{t.elapsedTime}</span>
            </div>

            <div
              className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-[#1F2421] py-1"
              aria-live="polite"
            >
              {formatDuration(elapsedSeconds)}
            </div>

            {/* Overtime friendly badge */}
            <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
              <span className="font-bold text-[#585A56]">
                {t.regularShort}: <strong>{Math.min(8, currentDurationHours).toFixed(1)}h</strong>
              </span>
              {isOvertimeActive && (
                <span className="inline-flex items-center gap-1 font-black text-[#854D0E] bg-[#FEF08A] px-2 py-0.5 rounded-full border border-[#FACC15]">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {t.overtimeShort}: +{overtimeHoursLive.toFixed(1)}h @ 1.5x
                </span>
              )}
            </div>
          </div>
        )}

        {/* Off-duty Location / Shift Selector (Big buttons) */}
        {!isOnDuty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left w-full">
            <div className="bg-[#FAF6EF] p-3 rounded-2xl border-2 border-[#E6DCBF]">
              <label
                htmlFor="worker-location-select"
                className="text-xs font-black text-[#585A56] uppercase tracking-wider block mb-1 flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#D9531E]" />
                {sectorConfig.groupLabel} ({t.zoneWardLabel})
              </label>
              <select
                id="worker-location-select"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full min-h-[48px] px-3 py-2 bg-white border-2 border-[#D4C5A5] rounded-xl text-[#1F2421] font-black text-base focus:border-[#D9531E] cursor-pointer"
              >
                {sectorConfig.groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#FAF6EF] p-3 rounded-2xl border-2 border-[#E6DCBF]">
              <label
                htmlFor="worker-shift-select"
                className="text-xs font-black text-[#585A56] uppercase tracking-wider block mb-1 flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4 text-[#D9531E]" />
                {t.shiftHoursLabel}
              </label>
              <select
                id="worker-shift-select"
                value={selectedShiftType}
                onChange={(e) => setSelectedShiftType(e.target.value)}
                className="w-full min-h-[48px] px-3 py-2 bg-white border-2 border-[#D4C5A5] rounded-xl text-[#1F2421] font-black text-base focus:border-[#D9531E] cursor-pointer"
              >
                {sectorConfig.shiftTypes.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name} ({st.startTime} - {st.endTime})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* HUGE ROUND CHECK-IN / CHECK-OUT BUTTON */}
        <div className="flex flex-col items-center justify-center pt-2">
          <button
            type="button"
            onClick={handleActionClick}
            className={`w-40 h-40 sm:w-52 sm:h-52 rounded-full font-black text-lg sm:text-2xl uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 sm:gap-2 transition-all transform active:scale-95 shadow-lg border-4 cursor-pointer focus:outline-hidden ${
              isOnDuty
                ? 'bg-[#C81E1E] hover:bg-[#9B1C1C] text-white border-[#771D1D] ring-4 ring-[#F8B4B4]'
                : isConstruction
                ? 'bg-[#D9531E] hover:bg-[#BF4212] text-white border-[#8C2C07] ring-4 ring-[#F7B591]'
                : 'bg-[#0E8373] hover:bg-[#0A695C] text-white border-[#074C42] ring-4 ring-[#80D1C6]'
            }`}
            aria-label={isOnDuty ? t.btnCheckOut : t.btnCheckIn}
          >
            {isOnDuty ? (
              <>
                <Square className="w-10 h-10 sm:w-12 sm:h-12 fill-current" />
                <span className="text-center px-2 leading-tight">{t.btnCheckOut}</span>
                <span className="text-[11px] font-bold uppercase tracking-normal opacity-90">{t.touchToFinish}</span>
              </>
            ) : (
              <>
                <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current ml-1" />
                <span className="text-center px-2 leading-tight">{t.btnCheckIn}</span>
                <span className="text-[11px] font-bold uppercase tracking-normal opacity-90">{t.touchToStart}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Safety Notice Card: Color + Icon + Simple Words */}
      <div className="bg-[#FAF6EF] border-2 border-[#E6DCBF] rounded-2xl p-3.5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm font-bold text-[#3E423A] leading-tight">
          <strong className="block text-[#1F2421] font-black">
            {sectorConfig.name} {t.restRulePrefix}
          </strong>
          <span>{sectorConfig.restRules.ruleDescription}</span>
        </div>
      </div>
    </div>
  );
};
