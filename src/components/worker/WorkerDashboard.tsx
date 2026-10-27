import React, { useState } from 'react';
import {
  Clock,
  FileCheck,
  Wallet,
  ChevronDown,
  Volume2,
} from 'lucide-react';
import { getTranslations } from '../../i18n';
import { LanguageCode, SectorConfig, ShiftRecord, TimeLogEvent, Worker, PayslipBreakdown } from '../../types';
import { CheckInOutCard } from './CheckInOutCard';
import { PayslipModal } from './PayslipModal';
import { ReceiptDisplay } from './ReceiptDisplay';
import { formatINR } from '../../utils/currencyFormatter';

interface WorkerDashboardProps {
  worker: Worker;
  allWorkers: Worker[];
  onSelectWorker: (workerId: string) => void;
  activeShift?: ShiftRecord;
  shifts: ShiftRecord[];
  logs: TimeLogEvent[];
  sectorConfig: SectorConfig;
  language: LanguageCode;
  payslip: PayslipBreakdown | null;
  onCheckIn: (workerId: string, group: string, shiftType: string) => { receiptCode: string };
  onCheckOut: (workerId: string) => { receiptCode: string };
  onSelectLanguage?: (lang: LanguageCode) => void;
}

type WorkerTab = 'shift' | 'receipts' | 'payslip';

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({
  worker,
  allWorkers,
  onSelectWorker,
  activeShift,
  shifts,
  logs,
  sectorConfig,
  language,
  payslip,
  onCheckIn,
  onCheckOut,
  onSelectLanguage,
}) => {
  const t = getTranslations(language);
  const [activeTab, setActiveTab] = useState<WorkerTab>('shift');
  const [isPayslipModalOpen, setIsPayslipModalOpen] = useState(false);
  const [latestReceipt, setLatestReceipt] = useState<{
    code: string;
    type: 'CHECK_IN' | 'CHECK_OUT';
  } | null>(null);

  const isConstruction = sectorConfig.id === 'construction';
  const sectorWorkers = allWorkers.filter((w) => w.sectorId === sectorConfig.id);
  const workerShifts = shifts.filter((s) => s.workerId === worker.id);

  const handleCheckInWrapper = (workerId: string, group: string, shiftType: string) => {
    const res = onCheckIn(workerId, group, shiftType);
    if (res?.receiptCode) {
      setLatestReceipt({ code: res.receiptCode, type: 'CHECK_IN' });
      setActiveTab('receipts');
    }
  };

  const handleCheckOutWrapper = (workerId: string) => {
    const res = onCheckOut(workerId);
    if (res?.receiptCode) {
      setLatestReceipt({ code: res.receiptCode, type: 'CHECK_OUT' });
      setActiveTab('receipts');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 pt-3 pb-24 sm:pb-28 space-y-4 sm:space-y-6 w-full">
      {/* Worker Profile Header with Simple Switcher */}
      <div className="bg-white rounded-2xl border-3 border-[#E6DCBF] p-4 sm:p-5 shadow-xs flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-xs border-2 shrink-0 ${
              isConstruction ? 'bg-[#D9531E] border-[#8C2C07]' : 'bg-[#0E8373] border-[#074C42]'
            }`}
          >
            {worker.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-[#1F2421] tracking-tight truncate">
                {worker.name}
              </h1>
              <span className="text-[11px] font-black text-[#585A56] bg-[#FAF6EF] border border-[#E6DCBF] px-2 py-0.5 rounded-full shrink-0">
                {worker.id}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#585A56] truncate">
              {worker.role} • {sectorConfig.groupLabel}: <strong>{worker.group}</strong>
            </p>
          </div>
        </div>

        {/* Worker Switcher Dropdown */}
        <div className="w-full xs:w-auto shrink-0">
          <label htmlFor="worker-switcher-select" className="sr-only">
            {t.switchWorker}
          </label>
          <div className="relative">
            <select
              id="worker-switcher-select"
              value={worker.id}
              onChange={(e) => onSelectWorker(e.target.value)}
              className="w-full xs:w-auto min-h-[48px] pl-3 pr-8 py-2 bg-[#FAF6EF] hover:bg-[#F3EDE2] border-2 border-[#D4C5A5] rounded-xl text-xs sm:text-sm font-black text-[#1F2421] appearance-none cursor-pointer truncate"
            >
              {sectorWorkers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.role}) {w.activeShiftId ? '• ON SHIFT' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#585A56] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* MAIN SCREEN: One Main Action per Screen based on active tab */}
      {activeTab === 'shift' && (
        <div className="space-y-4 sm:space-y-6 w-full">
          <CheckInOutCard
            worker={worker}
            activeShift={activeShift}
            sectorConfig={sectorConfig}
            language={language}
            onCheckIn={handleCheckInWrapper}
            onCheckOut={handleCheckOutWrapper}
          />

          {/* Quick Payslip Shortcut Banner */}
          <button
            type="button"
            onClick={() => setActiveTab('payslip')}
            className="w-full p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#E6DCBF] hover:border-[#D4C5A5] flex items-center justify-between shadow-xs cursor-pointer text-left transition-all hover:bg-[#FFFDF9] gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#FAF6EF] border border-[#E6DCBF] text-[#D9531E] flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="font-black text-[#1F2421] text-base sm:text-lg block truncate">{t.viewPayslipBtn}</span>
                <span className="text-xs font-bold text-[#585A56] truncate block">
                  Overtime paid at 1.5x in Rupees (₹)
                </span>
              </div>
            </div>
            {payslip && (
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#585A56] block uppercase">{t.netPayLabel}</span>
                <span className="text-lg sm:text-xl font-black text-[#1F2421] font-mono">
                  {formatINR(payslip.netPay)}
                </span>
              </div>
            )}
          </button>
        </div>
      )}

      {activeTab === 'receipts' && (
        <div className="space-y-4 sm:space-y-6 w-full">
          <ReceiptDisplay
            latestReceiptCode={
              latestReceipt?.code ||
              activeShift?.checkInReceipt ||
              workerShifts[0]?.checkOutReceipt ||
              workerShifts[0]?.checkInReceipt
            }
            latestReceiptType={latestReceipt?.type || (activeShift ? 'CHECK_IN' : 'CHECK_OUT')}
            recentShifts={workerShifts}
            language={language}
            worker={worker}
          />
        </div>
      )}

      {activeTab === 'payslip' && (
        <div className="bg-white rounded-2xl border-3 border-[#E6DCBF] p-4 sm:p-7 space-y-4 sm:space-y-6 shadow-sm w-full">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#FAF6EF]">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-black text-[#1F2421] truncate">
                {t.payslipTitle}
              </h2>
              <p className="text-xs font-bold text-[#585A56]">
                Shift earnings in Indian Rupees (₹)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPayslipModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#FAF6EF] border-2 border-[#D4C5A5] font-black text-xs sm:text-sm text-[#1F2421] hover:bg-[#E6DCBF] cursor-pointer shrink-0"
            >
              Full Slip
            </button>
          </div>

          {payslip ? (
            <div className="space-y-4">
              {/* Take-home Pay Largest */}
              <div className="bg-[#1F2421] text-white rounded-2xl p-4 sm:p-6 border-3 border-black text-center space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  {t.netPayLabel} (Take-Home)
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-amber-300 py-1 truncate">
                  {formatINR(payslip.netPay)}
                </div>
                <p className="text-[11px] text-white/80 font-bold">
                  Calculated with 1.5x overtime
                </p>
              </div>

              {/* Big Read Aloud Button (min 48px tap target) */}
              <button
                type="button"
                onClick={() => setIsPayslipModalOpen(true)}
                className="w-full min-h-[52px] sm:min-h-[60px] rounded-2xl bg-[#D9531E] hover:bg-[#BF4212] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md border-2 border-[#8C2C07] cursor-pointer"
              >
                <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                <span className="truncate">Listen to Wage Summary Aloud</span>
              </button>

              {/* Summary Items */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#E6DCBF]">
                  <span className="text-xs font-bold text-[#585A56] block truncate">{t.basePayLabel}</span>
                  <span className="text-lg font-black text-[#1F2421] block truncate">{formatINR(payslip.regularPay)}</span>
                  <span className="text-xs text-[#585A56] block mt-0.5">{payslip.regularHours} hrs</span>
                </div>
                <div className="bg-[#FFF9E6] p-3 rounded-xl border border-[#E6C875]">
                  <span className="text-xs font-bold text-[#854D0E] block truncate">{t.overtimePayLabel}</span>
                  <span className="text-lg font-black text-[#7A5B00] block truncate">{formatINR(payslip.overtimePay)}</span>
                  <span className="text-xs text-[#854D0E] block mt-0.5">{payslip.overtimeHours} hrs (1.5x)</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center py-6 text-[#585A56]">No shift data available for this worker.</p>
          )}
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR: Large Icon + Label Tabs for Low-Literacy Usability */}
      <nav
        aria-label="Worker Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t-2 border-[#E6DCBF] shadow-xl px-2 py-2"
      >
        <div className="max-w-md mx-auto grid grid-cols-3 gap-1.5">
          {/* Tab 1: Shift */}
          <button
            type="button"
            onClick={() => setActiveTab('shift')}
            className={`min-h-[50px] py-1.5 px-2 rounded-xl font-black flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
              activeTab === 'shift'
                ? isConstruction
                  ? 'bg-[#D9531E] text-white shadow-sm'
                  : 'bg-[#0E8373] text-white shadow-sm'
                : 'text-[#585A56] hover:bg-[#FAF6EF] hover:text-[#1F2421]'
            }`}
          >
            <Clock className="w-5 h-5 shrink-0" />
            <span className="text-xs font-extrabold uppercase tracking-wider truncate">
              {language === 'ta' ? 'பணி' : language === 'hi' ? 'ड्यूटी' : 'Shift'}
            </span>
          </button>

          {/* Tab 2: Receipts */}
          <button
            type="button"
            onClick={() => setActiveTab('receipts')}
            className={`min-h-[50px] py-1.5 px-2 rounded-xl font-black flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer relative ${
              activeTab === 'receipts'
                ? isConstruction
                  ? 'bg-[#D9531E] text-white shadow-sm'
                  : 'bg-[#0E8373] text-white shadow-sm'
                : 'text-[#585A56] hover:bg-[#FAF6EF] hover:text-[#1F2421]'
            }`}
          >
            <FileCheck className="w-5 h-5 shrink-0" />
            <span className="text-xs font-extrabold uppercase tracking-wider truncate">
              {language === 'ta' ? 'ரசீது' : language === 'hi' ? 'रसीद' : 'Receipts'}
            </span>
            {latestReceipt && (
              <span className="absolute top-1 right-5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
            )}
          </button>

          {/* Tab 3: Payslip */}
          <button
            type="button"
            onClick={() => setActiveTab('payslip')}
            className={`min-h-[50px] py-1.5 px-2 rounded-xl font-black flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
              activeTab === 'payslip'
                ? isConstruction
                  ? 'bg-[#D9531E] text-white shadow-sm'
                  : 'bg-[#0E8373] text-white shadow-sm'
                : 'text-[#585A56] hover:bg-[#FAF6EF] hover:text-[#1F2421]'
            }`}
          >
            <Wallet className="w-5 h-5 shrink-0" />
            <span className="text-xs font-extrabold uppercase tracking-wider truncate">
              {language === 'ta' ? 'சம்பளம்' : language === 'hi' ? 'पेस्लिप' : 'Payslip'}
            </span>
          </button>
        </div>
      </nav>

      {/* Payslip Modal */}
      <PayslipModal
        isOpen={isPayslipModalOpen}
        onClose={() => setIsPayslipModalOpen(false)}
        payslip={payslip}
        sectorConfig={sectorConfig}
        language={language}
      />
    </div>
  );
};
