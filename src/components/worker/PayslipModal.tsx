import React, { useEffect, useState } from 'react';
import {
  Volume2,
  VolumeX,
  X,
  ShieldCheck,
  TrendingUp,
  Zap,
  Receipt,
  Wallet,
  HelpCircle,
} from 'lucide-react';
import { getTranslations } from '../../i18n';
import { LanguageCode, PayslipBreakdown, SectorConfig } from '../../types';
import { formatINR } from '../../utils/currencyFormatter';
import { getLocalizedRole } from '../../config/sectors';

interface PayslipModalProps {
  isOpen: boolean;
  onClose: () => void;
  payslip: PayslipBreakdown | null;
  sectorConfig: SectorConfig;
  language: LanguageCode;
}

export const PayslipModal: React.FC<PayslipModalProps> = ({
  isOpen,
  onClose,
  payslip,
  language,
}) => {
  const t = getTranslations(language);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !payslip) return null;

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(payslip.spokenSummary);

    if (language === 'ta') {
      utterance.lang = 'ta-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.92;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const localizedRole = getLocalizedRole(payslip.role, language);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payslip-modal-title"
    >
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto border-3 border-[#E6DCBF] shadow-2xl p-4 sm:p-7 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-[#FAF6EF]">
          <div>
            <div className="flex items-center gap-1.5 text-[#D9531E] text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D9531E] shrink-0" />
              <span>{t.unSdgWageNotice}</span>
            </div>
            <h2 id="payslip-modal-title" className="text-xl sm:text-2xl font-black text-[#1F2421] mt-0.5">
              {t.payslipTitle}
            </h2>
            <p className="text-xs font-bold text-[#585A56] mt-0.5">{t.payslipSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] min-w-[48px] rounded-xl p-2 text-[#585A56] hover:text-[#1F2421] hover:bg-[#FAF6EF] flex items-center justify-center transition-colors border border-transparent hover:border-[#E6DCBF] cursor-pointer shrink-0"
            aria-label={t.closeBtn}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Worker Summary Header */}
        <div className="bg-[#FAF6EF] p-3 rounded-2xl border-2 border-[#E6DCBF] flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-black text-[#1F2421] text-base truncate">{payslip.workerName}</h3>
            <p className="text-xs font-black text-[#585A56] truncate">
              {localizedRole} • ID: {payslip.workerId}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-[#585A56] font-black block">
              {t.periodLabel}
            </span>
            <span className="text-xs font-black text-[#1F2421]">{payslip.period}</span>
          </div>
        </div>

        {/* BIG READ ALOUD BUTTON WITH SPEAKER ICON */}
        {speechSupported && (
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`w-full min-h-[54px] sm:min-h-[64px] px-4 py-3 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer border-3 ${
              isSpeaking
                ? 'bg-[#C81E1E] text-white border-[#771D1D] ring-4 ring-[#F8B4B4]'
                : 'bg-[#1F2421] hover:bg-black text-amber-300 border-black ring-4 ring-[#E6DCBF]'
            }`}
            aria-label={isSpeaking ? t.stopAudioBtn : t.readAloudBtn}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-6 h-6 text-white animate-pulse shrink-0" />
                <span className="text-white">{t.stopAudioBtn}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 shrink-0" />
                <div className="text-left min-w-0">
                  <span className="block text-white leading-tight truncate">{t.readAloudBtn}</span>
                  <span className="text-[11px] text-amber-200/90 font-bold block truncate">
                    {t.touchToListenInLang}
                  </span>
                </div>
              </>
            )}
          </button>
        )}

        {/* Visual Breakdown Cards with Icons */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#585A56]">
            {t.itemizedShiftEarnings}
          </h4>

          {/* 1. Base Earnings Card */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#FAF6EF] border-2 border-[#E6DCBF] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#D4C5A5] flex items-center justify-center text-[#D9531E] shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-black text-[#1F2421] text-sm sm:text-base block truncate">{t.basePayLabel}</span>
                <span className="text-xs font-bold text-[#585A56] truncate block">
                  {payslip.regularHours} {t.hoursShort} × {formatINR(payslip.hourlyRate)}/{t.hoursShort}
                </span>
              </div>
            </div>
            <span className="font-black text-base sm:text-lg text-[#1F2421] shrink-0">
              {formatINR(payslip.regularPay)}
            </span>
          </div>

          {/* 2. Overtime Card (1.5x Premium) */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#FFF9E6] border-2 border-[#E6C875] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-black text-[#7A5B00] text-sm sm:text-base truncate">{t.overtimePayLabel}</span>
                  <span className="text-[10px] font-black bg-[#FDE047] text-[#713F12] px-1.5 py-0.2 rounded shrink-0">
                    1.5x
                  </span>
                </div>
                <span className="text-xs font-bold text-[#854D0E] truncate block">
                  {payslip.overtimeHours} {t.hoursShort} × {formatINR(payslip.overtimeRate)}/{t.hoursShort}
                </span>
              </div>
            </div>
            <span className="font-black text-base sm:text-lg text-[#7A5B00] shrink-0">
              {formatINR(payslip.overtimePay)}
            </span>
          </div>

          {/* 3. Statutory Deductions Card */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#FAF6EF] border-2 border-[#E6DCBF] space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E6DCBF]">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#585A56]" />
                <span className="font-black text-[#1F2421] text-sm sm:text-base">{t.deductionsLabel}</span>
              </div>
              <span className="font-black text-sm sm:text-base text-[#C81E1E]">
                -{formatINR(payslip.totalDeductions)}
              </span>
            </div>

            {payslip.deductions.map((d) => {
              const label =
                d.id === 'provident-fund'
                  ? t.providentFundLabel
                  : d.id === 'esi-health'
                  ? t.esiHealthLabel
                  : d.label;
              const desc =
                d.id === 'provident-fund'
                  ? t.providentFundDesc
                  : d.id === 'esi-health'
                  ? t.esiHealthDesc
                  : d.description;

              return (
                <div key={d.id} className="flex items-center justify-between text-xs font-bold text-[#585A56]">
                  <div className="min-w-0 pr-2">
                    <span className="text-[#1F2421] font-black block truncate">{label}</span>
                    <span className="text-[10px] text-[#585A56] truncate block">{desc}</span>
                  </div>
                  <span className="font-black text-[#C81E1E] shrink-0">
                    -{formatINR(d.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. TAKE-HOME PAY (NET PAY IN ₹ SHOWN LARGEST) */}
        <div className="bg-[#1F2421] text-white rounded-2xl p-4 sm:p-5 border-3 border-black shadow-lg flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-amber-300 font-black text-xs uppercase tracking-wider">
              <Wallet className="w-4 h-4" />
              <span>{t.netPayLabel}</span>
            </div>
            <p className="text-[11px] text-white/80 font-bold">
              {t.directPaymentRupees}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight font-mono">
              {formatINR(payslip.netPay)}
            </span>
          </div>
        </div>

        {/* Friendly explanation */}
        <div className="bg-[#FAF6EF] rounded-xl p-3 text-xs text-[#585A56] font-bold border border-[#E6DCBF] flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-[#D9531E] shrink-0 mt-0.5" />
          <p className="leading-tight">
            {t.overtimeExplanationNotice}
          </p>
        </div>

        {/* Close Button */}
        <div>
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#FAF6EF] hover:bg-[#E6DCBF] text-[#1F2421] font-black text-base border-2 border-[#D4C5A5] cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
