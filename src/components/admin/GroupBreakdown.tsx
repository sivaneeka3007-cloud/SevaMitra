import React from 'react';
import { MapPin, Users, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SectorConfig, ShiftRecord, Worker } from '../../types';
import { formatINR } from '../../utils/currencyFormatter';

interface GroupBreakdownProps {
  sectorConfig: SectorConfig;
  workers: Worker[];
  shifts: ShiftRecord[];
}

export const GroupBreakdown: React.FC<GroupBreakdownProps> = ({
  sectorConfig,
  workers,
  shifts,
}) => {
  const isConstruction = sectorConfig.id === 'construction';
  const sectorWorkers = workers.filter((w) => w.sectorId === sectorConfig.id);
  const sectorShifts = shifts.filter((s) => s.sectorId === sectorConfig.id);

  const groupStats = sectorConfig.groups.map((group) => {
    const groupWorkers = sectorWorkers.filter((w) => w.group === group);
    const activeGroupWorkers = groupWorkers.filter((w) => w.activeShiftId);
    const groupShifts = sectorShifts.filter((s) => s.group === group);

    const groupOvertimeHours = groupShifts.reduce(
      (sum, s) => sum + (s.overtimeHours || 0),
      0
    );

    const groupViolations = groupShifts.filter(
      (s) => s.restRuleViolations && s.restRuleViolations.length > 0
    );

    return {
      name: group,
      totalWorkers: groupWorkers.length,
      activeWorkers: activeGroupWorkers.length,
      overtimeHours: groupOvertimeHours,
      shiftCount: groupShifts.length,
      violationsCount: groupViolations.length,
    };
  });

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E6DCBF] p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#FAF6EF]">
        <div>
          <h3 className="font-black text-xl text-[#1F2421] flex items-center gap-2">
            <MapPin
              className={`w-6 h-6 ${isConstruction ? 'text-[#D9531E]' : 'text-[#0E8373]'}`}
            />
            {sectorConfig.groupLabel} Operational Breakdown
          </h3>
          <p className="text-xs font-bold text-[#585A56] mt-0.5">
            Shift coverage and overtime distribution across {sectorConfig.name} {sectorConfig.groupLabel.toLowerCase()}s
          </p>
        </div>
        <span className="text-xs font-black text-[#1F2421] bg-[#FAF6EF] border border-[#E6DCBF] px-3 py-1 rounded-full">
          {sectorConfig.groups.length} {sectorConfig.groupLabel}s Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groupStats.map((stat) => (
          <div
            key={stat.name}
            className="p-5 rounded-2xl border-2 border-[#E6DCBF] bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] transition-colors space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-black text-lg text-[#1F2421]">{stat.name}</h4>
                <span className="text-xs font-bold text-[#585A56]">
                  {stat.totalWorkers} assigned staff
                </span>
              </div>
              <span
                className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  stat.activeWorkers > 0
                    ? 'bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]'
                    : 'bg-[#E5E7EB] text-[#374151]'
                }`}
              >
                {stat.activeWorkers > 0 ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    {stat.activeWorkers} active
                  </>
                ) : (
                  'Idle'
                )}
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-bold">
              <div className="flex items-center justify-between text-[#585A56]">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#585A56]" />
                  Total Shifts:
                </span>
                <span className="font-black text-[#1F2421]">{stat.shiftCount}</span>
              </div>

              <div className="flex items-center justify-between text-[#585A56]">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  Overtime:
                </span>
                <span className="font-black text-[#7A5B00] font-mono">
                  {stat.overtimeHours.toFixed(1)} hrs
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#E6DCBF]">
                <span className="text-[#585A56]">Rest Safety:</span>
                {stat.violationsCount > 0 ? (
                  <span className="inline-flex items-center gap-1 font-black text-[#9B1C1C] bg-[#FDE8E8] px-2 py-0.5 rounded border border-[#F8B4B4]">
                    <AlertTriangle className="w-3 h-3" />
                    {stat.violationsCount} Alert{stat.violationsCount > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-black text-[#166534]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
                    Clean
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
