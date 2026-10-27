import React from 'react';
import {
  MessageSquareWarning,
  CalendarDays,
  HeartPulse,
  Clock,
  ShieldCheck,
  AlertOctagon,
  Info,
} from 'lucide-react';
import { SectorConfig } from '../../types';

export type PlaceholderType = 'complaints' | 'planner' | 'health';

interface PlaceholderSectionProps {
  type: PlaceholderType;
  sectorConfig: SectorConfig;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({
  type,
  sectorConfig,
}) => {
  const isConstruction = sectorConfig.id === 'construction';

  if (type === 'complaints') {
    return (
      <div className="bg-white rounded-2xl border-2 border-[#E6DCBF] p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#FAF6EF]">
          <div>
            <div className="flex items-center gap-2 text-[#C81E1E] text-xs font-black uppercase tracking-wider">
              <MessageSquareWarning className="w-5 h-5 text-[#C81E1E]" />
              <span>UN SDG 8.8 • Worker Protection & Grievance SLA</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1F2421] mt-1">
              Complaints & Grievances
            </h3>
            <p className="text-sm font-bold text-[#585A56] mt-0.5">
              Confidential dispute intake and whistleblower protection channel.
            </p>
          </div>

          <div className="bg-[#FDE8E8] border-2 border-[#F8B4B4] px-4 py-2 rounded-xl flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#9B1C1C]" />
            <div>
              <span className="text-xs font-black text-[#9B1C1C] uppercase block">
                Mandatory Response SLA
              </span>
              <span className="text-xl font-black text-[#771D1D]">
                Within {sectorConfig.complaintResponseTimeLimitHours} Hours
              </span>
            </div>
          </div>
        </div>

        {/* Sector SLA Rule Note */}
        <div className="bg-[#FAF6EF] border-2 border-[#E6DCBF] rounded-2xl p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#585A56] shrink-0 mt-0.5" />
          <div className="text-sm font-bold text-[#3E423A] space-y-1">
            <strong className="text-[#1F2421] font-black block">
              {sectorConfig.name} Statutory Response Protocol:
            </strong>
            <p className="leading-relaxed">
              Under FairShift standards for {sectorConfig.name}, all worker grievances must receive verified managerial investigation and an immutable status response within <strong>{sectorConfig.complaintResponseTimeLimitHours} hours</strong>. Unresolved disputes escalate automatically to the independent labor council.
            </p>
          </div>
        </div>

        {/* Empty State Banner */}
        <div className="py-12 px-6 rounded-2xl border-3 border-dashed border-[#E6DCBF] bg-[#FAF6EF]/50 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E6DCBF]/70 text-[#585A56] flex items-center justify-center mx-auto">
            <MessageSquareWarning className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-black text-[#1F2421] text-lg">No Active Grievance Cases</h4>
            <p className="text-sm font-bold text-[#585A56] max-w-md mx-auto mt-1">
              This section is reserved for worker complaint management. When workers submit confidential grievance filings, they will appear here with a strict {sectorConfig.complaintResponseTimeLimitHours}-hour resolution countdown.
            </p>
          </div>
          <span className="inline-block text-xs font-black text-[#585A56] bg-white border border-[#D4C5A5] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Empty Section (Phase 2 Roadmap)
          </span>
        </div>
      </div>
    );
  }

  if (type === 'planner') {
    return (
      <div className="bg-white rounded-2xl border-2 border-[#E6DCBF] p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#FAF6EF]">
          <div>
            <div className="flex items-center gap-2 text-[#0E8373] text-xs font-black uppercase tracking-wider">
              <CalendarDays className="w-5 h-5 text-[#0E8373]" />
              <span>UN SDG 8.5 • Fatigue-Safe Roster Scheduling</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1F2421] mt-1">Shift Planner</h3>
            <p className="text-sm font-bold text-[#585A56] mt-0.5">
              Automated roster balancing with algorithmic rest rule enforcement.
            </p>
          </div>

          <div className="bg-[#EEF9F7] border-2 border-[#80D1C6] px-4 py-2 rounded-xl">
            <span className="text-xs font-black text-[#074C42] uppercase block">
              Configured Shifts
            </span>
            <span className="text-xl font-black text-[#0E8373]">
              {sectorConfig.shiftTypes.length} Shift Rotations
            </span>
          </div>
        </div>

        {/* Sector Rest Rules Overview */}
        <div className="bg-[#FAF6EF] border-2 border-[#E6DCBF] rounded-2xl p-5 space-y-2">
          <h4 className="text-sm font-black uppercase tracking-wider text-[#1F2421] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0E8373]" />
            Configured Rest Safeguards for {sectorConfig.name}
          </h4>
          <p className="text-sm font-bold text-[#3E423A] leading-relaxed">
            {sectorConfig.restRules.ruleDescription}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold">
            <div className="bg-white p-3 rounded-xl border border-[#D4C5A5]">
              <span className="text-[#585A56] block">Standard Daily Hours:</span>
              <strong className="text-base font-black text-[#1F2421]">
                {sectorConfig.restRules.standardDailyHours} Hours / Day
              </strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#D4C5A5]">
              <span className="text-[#585A56] block">Target Areas:</span>
              <strong className="text-base font-black text-[#1F2421]">
                {sectorConfig.groups.join(', ')}
              </strong>
            </div>
          </div>
        </div>

        {/* Empty State Banner */}
        <div className="py-12 px-6 rounded-2xl border-3 border-dashed border-[#E6DCBF] bg-[#FAF6EF]/50 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E6DCBF]/70 text-[#585A56] flex items-center justify-center mx-auto">
            <CalendarDays className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-black text-[#1F2421] text-lg">Roster Engine Initialized</h4>
            <p className="text-sm font-bold text-[#585A56] max-w-md mx-auto mt-1">
              This section is reserved for intelligent shift rostering. In future updates, the planner will prevent double bookings, guarantee minimum rest gaps, and balance overtime fairly across all workers.
            </p>
          </div>
          <span className="inline-block text-xs font-black text-[#585A56] bg-white border border-[#D4C5A5] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Empty Section (Phase 2 Roadmap)
          </span>
        </div>
      </div>
    );
  }

  // Site Health
  return (
    <div className="bg-white rounded-2xl border-2 border-[#E6DCBF] p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#FAF6EF]">
        <div>
          <div className="flex items-center gap-2 text-[#0E8373] text-xs font-black uppercase tracking-wider">
            <HeartPulse className="w-5 h-5 text-[#0E8373]" />
            <span>UN SDG 8.8 • Occupational Health & Safety</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#1F2421] mt-1">Site Health & Hazards</h3>
          <p className="text-sm font-bold text-[#585A56] mt-0.5">
            Hazard surveillance, PPE tracking, and workplace environmental monitoring.
          </p>
        </div>

        <div className="bg-[#FAF6EF] border-2 border-[#E6DCBF] px-4 py-2 rounded-xl">
          <span className="text-xs font-black text-[#585A56] uppercase block">
            Monitored Hazards
          </span>
          <span className="text-xl font-black text-[#1F2421]">
            {sectorConfig.hazardCategories.length} Categories
          </span>
        </div>
      </div>

      {/* Monitored Sector Hazards */}
      <div className="space-y-3">
        <h4 className="text-sm font-black uppercase tracking-wider text-[#1F2421] flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-amber-600" />
          Identified Hazard Profiles for {sectorConfig.name}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sectorConfig.hazardCategories.map((hazard, index) => (
            <div
              key={hazard}
              className="p-3.5 bg-[#FFF9E6] border border-[#E6C875] rounded-xl text-sm text-[#7A5B00] flex items-center gap-3 font-bold"
            >
              <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black text-xs shrink-0">
                {index + 1}
              </span>
              <span>{hazard}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State Banner */}
      <div className="py-12 px-6 rounded-2xl border-3 border-dashed border-[#E6DCBF] bg-[#FAF6EF]/50 text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#E6DCBF]/70 text-[#585A56] flex items-center justify-center mx-auto">
          <HeartPulse className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-black text-[#1F2421] text-lg">Health & Safety Ledger Ready</h4>
          <p className="text-sm font-bold text-[#585A56] max-w-md mx-auto mt-1">
            This section is reserved for occupational health audits. In future updates, daily site inspections, air quality readings, and PPE compliance checklists will be cataloged here.
          </p>
        </div>
        <span className="inline-block text-xs font-black text-[#585A56] bg-white border border-[#D4C5A5] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Empty Section (Phase 2 Roadmap)
        </span>
      </div>
    </div>
  );
};
