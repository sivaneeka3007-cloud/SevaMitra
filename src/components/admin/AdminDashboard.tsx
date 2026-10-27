import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SectorConfig, ShiftRecord, TimeLogEvent, Worker } from '../../types';
import { AttendanceOverview } from './AttendanceOverview';
import { GroupBreakdown } from './GroupBreakdown';
import { AuditLogViewer } from './AuditLogViewer';
import { formatHourlyRate } from '../../utils/currencyFormatter';

interface AdminDashboardProps {
  sectorConfig: SectorConfig;
  workers: Worker[];
  shifts: ShiftRecord[];
  logs: TimeLogEvent[];
  onSelectWorkerForPreview?: (workerId: string) => void;
  onNavigateToWorkerUI?: () => void;
}

type AdminTab = 'overview' | 'ledger';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  sectorConfig,
  workers,
  shifts,
  logs,
  onSelectWorkerForPreview,
  onNavigateToWorkerUI,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');
  const isConstruction = sectorConfig.id === 'construction';

  const sectorWorkers = workers.filter((w) => w.sectorId === sectorConfig.id);
  const sectorShifts = shifts.filter((s) => s.sectorId === sectorConfig.id);
  const sectorLogs = logs.filter((l) => l.sectorId === sectorConfig.id);

  const filteredWorkers = sectorWorkers.filter((w) => {
    if (selectedGroupFilter === 'all') return true;
    return w.group === selectedGroupFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Top Admin Banner */}
      <div className="bg-[#1F2421] text-white rounded-2xl p-4 sm:p-7 shadow-md border-3 border-black flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Employer & Operations Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            {sectorConfig.name} Portal
          </h1>
          <p className="text-xs sm:text-sm font-bold text-white/80 mt-0.5">
            Shift hours, transparent overtime in Rupees (₹), and rest rule compliance (UN SDG 8).
          </p>
        </div>

        {onNavigateToWorkerUI && (
          <button
            type="button"
            onClick={onNavigateToWorkerUI}
            className={`min-h-[48px] px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2 shadow-sm transition-all border-2 cursor-pointer ${
              isConstruction
                ? 'bg-[#D9531E] hover:bg-[#BF4212] text-white border-[#8C2C07]'
                : 'bg-[#0E8373] hover:bg-[#0A695C] text-white border-[#074C42]'
            }`}
          >
            <span>Worker Screen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Admin Navigation: Only Working Sections */}
      <nav aria-label="Admin Navigation Tabs" className="flex border-b-2 border-[#E6DCBF] gap-2 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`min-h-[48px] px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-black flex items-center gap-2 transition-all cursor-pointer border-2 ${
            activeTab === 'overview'
              ? isConstruction
                ? 'bg-[#D9531E] text-white border-[#8C2C07] shadow-sm'
                : 'bg-[#0E8373] text-white border-[#074C42] shadow-sm'
              : 'border-transparent text-[#585A56] hover:text-[#1F2421] hover:bg-[#FAF6EF]'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          <span>Operational Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ledger')}
          className={`min-h-[48px] px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-black flex items-center gap-2 transition-all cursor-pointer border-2 ${
            activeTab === 'ledger'
              ? isConstruction
                ? 'bg-[#D9531E] text-white border-[#8C2C07] shadow-sm'
                : 'bg-[#0E8373] text-white border-[#074C42] shadow-sm'
              : 'border-transparent text-[#585A56] hover:text-[#1F2421] hover:bg-[#FAF6EF]'
          }`}
        >
          <FileSpreadsheet className="w-5 h-5 shrink-0" />
          <span>Audit Ledger</span>
          <span className="text-xs bg-[#FAF6EF] text-[#585A56] font-mono font-black px-2 py-0.5 rounded-full border border-[#E6DCBF]">
            {sectorLogs.length}
          </span>
        </button>
      </nav>

      {/* Tab 1: Operational Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4 sm:space-y-6">
          <AttendanceOverview
            sectorConfig={sectorConfig}
            workers={workers}
            shifts={shifts}
          />

          <GroupBreakdown
            sectorConfig={sectorConfig}
            workers={workers}
            shifts={shifts}
          />

          {/* Tidy Staff Roster & Safety Register */}
          <div className="bg-white rounded-2xl border-2 border-[#E6DCBF] p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[#FAF6EF]">
              <div>
                <h3 className="font-black text-lg sm:text-xl text-[#1F2421]">
                  {sectorConfig.name} Staff Roster & Safety Register
                </h3>
                <p className="text-xs font-bold text-[#585A56] mt-0.5">
                  Real-time duty status, wage rates in Indian Rupees (₹), and rest rule alerts
                </p>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#585A56]">Filter {sectorConfig.groupLabel}:</span>
                <select
                  value={selectedGroupFilter}
                  onChange={(e) => setSelectedGroupFilter(e.target.value)}
                  className="min-h-[44px] px-3.5 py-1.5 bg-[#FAF6EF] border-2 border-[#D4C5A5] rounded-xl text-xs font-black text-[#1F2421] cursor-pointer"
                >
                  <option value="all">All {sectorConfig.groupLabel}s</option>
                  {sectorConfig.groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#E6DCBF] text-[#585A56] font-black uppercase tracking-wider text-xs bg-[#FAF6EF]">
                    <th className="py-3 px-3.5">Worker</th>
                    <th className="py-3 px-3.5">Role</th>
                    <th className="py-3 px-3.5">{sectorConfig.groupLabel}</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5">Hourly Rate (₹)</th>
                    <th className="py-3 px-3.5">Rest Safety</th>
                    <th className="py-3 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DCBF]">
                  {filteredWorkers.map((worker) => {
                    const isOnDuty = Boolean(worker.activeShiftId);
                    const workerShifts = sectorShifts.filter((s) => s.workerId === worker.id);
                    const violations = workerShifts.flatMap((s) => s.restRuleViolations || []);

                    return (
                      <tr key={worker.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                        <td className="py-3.5 px-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#FAF6EF] border border-[#D4C5A5] text-[#1F2421] font-black text-xs flex items-center justify-center shrink-0">
                              {worker.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <span className="font-black text-[#1F2421] block leading-tight">{worker.name}</span>
                              <span className="text-[11px] text-[#585A56] font-mono font-bold">
                                ID: {worker.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3.5 font-bold text-[#1F2421]">{worker.role}</td>

                        <td className="py-3.5 px-3.5">
                          <span className="inline-flex items-center gap-1 font-bold text-[#3E423A] bg-[#FAF6EF] border border-[#E6DCBF] px-2 py-0.5 rounded-lg text-xs">
                            <MapPin className="w-3.5 h-3.5 text-[#585A56]" />
                            {worker.group}
                          </span>
                        </td>

                        <td className="py-3.5 px-3.5">
                          {isOnDuty ? (
                            <span className="inline-flex items-center gap-1 text-xs font-black text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-2.5 py-0.5 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                              ON SHIFT
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#585A56] bg-[#F3F4F6] border border-[#D1D5DB] px-2.5 py-0.5 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                              Off Duty
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-3.5 font-black text-[#1F2421]">
                          {formatHourlyRate(worker.hourlyRate)}
                        </td>

                        <td className="py-3.5 px-3.5">
                          {violations.length > 0 ? (
                            <span
                              title={violations[0]}
                              className="inline-flex items-center gap-1 font-black text-xs text-[#9B1C1C] bg-[#FDE8E8] border border-[#F8B4B4] px-2 py-0.5 rounded-lg"
                            >
                              <AlertTriangle className="w-3.5 h-3.5 text-[#9B1C1C] shrink-0" />
                              <span>{violations.length} Alert{violations.length > 1 ? 's' : ''}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-[#166534] font-black flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                              Safe
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-3.5 text-right">
                          {onSelectWorkerForPreview && (
                            <button
                              type="button"
                              onClick={() => onSelectWorkerForPreview(worker.id)}
                              className="min-h-[38px] px-3 py-1 rounded-xl bg-[#FAF6EF] hover:bg-[#E6DCBF] border border-[#D4C5A5] text-[#1F2421] font-black text-xs transition-colors cursor-pointer"
                            >
                              Test Worker
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Working Immutable Audit Ledger */}
      {activeTab === 'ledger' && (
        <AuditLogViewer logs={sectorLogs} sectorName={sectorConfig.name} />
      )}
    </div>
  );
};
