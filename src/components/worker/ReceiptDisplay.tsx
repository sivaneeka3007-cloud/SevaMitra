import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, Clock, FileCheck, CheckCircle2 } from 'lucide-react';
import { ShiftRecord, Worker, LanguageCode } from '../../types';
import { getTranslations } from '../../i18n';
import { getWhatsAppProofUrl } from '../../utils/whatsappProof';
import { getLocalizedGroup, getLocalizedShiftType } from '../../config/sectors';
import { formatDate } from '../../utils/dateTimeFormatter';

interface ReceiptDisplayProps {
  latestReceiptCode?: string | null;
  latestReceiptType?: 'CHECK_IN' | 'CHECK_OUT';
  recentShifts: ShiftRecord[];
  language: LanguageCode;
  worker?: Worker;
}

export const ReceiptDisplay: React.FC<ReceiptDisplayProps> = ({
  latestReceiptCode,
  latestReceiptType = 'CHECK_IN',
  recentShifts,
  language,
  worker,
}) => {
  const t = getTranslations(language);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Determine active receipt code (explicit code or latest shift's check-out / check-in receipt)
  const activeCode =
    latestReceiptCode ||
    recentShifts[0]?.checkOutReceipt ||
    recentShifts[0]?.checkInReceipt;

  // Find corresponding shift data or fallback to defaults
  const targetShift =
    recentShifts.find(
      (s) => s.checkInReceipt === activeCode || s.checkOutReceipt === activeCode
    ) || recentShifts[0];

  const workerName = worker?.name || 'Worker';
  const shiftDate = targetShift?.date || new Date().toISOString().split('T')[0];
  const totalHours = targetShift ? targetShift.durationHours : (latestReceiptType === 'CHECK_IN' ? 8 : 8);
  const overtimeHours = targetShift ? targetShift.overtimeHours : 0;
  const regularHours = targetShift ? targetShift.regularHours : Math.max(0, totalHours - overtimeHours);
  const hourlyRate = worker?.hourlyRate || 120;
  const earningsINR = Math.round(regularHours * hourlyRate + overtimeHours * hourlyRate * 1.5);

  const mainWhatsAppUrl = activeCode
    ? getWhatsAppProofUrl({
        receiptCode: activeCode,
        workerName,
        date: shiftDate,
        totalHours,
        overtimeHours,
        earningsINR,
        language,
      })
    : '#';

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Active / Latest Paper Receipt Card */}
      {activeCode && (
        <div className="receipt-paper rounded-2xl p-4 sm:p-8 space-y-4 relative overflow-hidden border-3 border-[#D4C5A5] w-full">
          {/* Paper Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#D4C5A5]">
            <div className="flex items-center gap-1.5 text-[#2E7D32]">
              <CheckCircle2 className="w-5 h-5 fill-current text-white shrink-0" />
              <span className="font-black text-xs sm:text-sm uppercase tracking-wider text-[#166534] truncate">
                {t.receiptNotice}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-black bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-md border border-[#A5D6A7] shrink-0">
              {t.verified}
            </span>
          </div>

          {/* Receipt Body */}
          <div className="text-center py-2 sm:py-4 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-[#585A56] block">
              {latestReceiptType === 'CHECK_IN' ? t.checkInCode : t.checkOutCode}
            </span>
            <div className="text-3xl sm:text-5xl font-black font-mono tracking-wider sm:tracking-widest text-[#1F2421] bg-[#FAF6EF] py-3 px-4 rounded-xl border-2 border-[#E6DCBF] inline-block shadow-inner max-w-full truncate">
              {activeCode}
            </div>
            <p className="text-xs font-bold text-[#585A56]">
              {t.keepReceiptNotice}
            </p>
          </div>

          {/* Action Buttons: Large Green Send Proof Button + Copy Code Button */}
          <div className="space-y-2.5 pt-1">
            {/* Large Green Send Proof on WhatsApp Button (UN SDG 8 Proof of Labor) */}
            <a
              href={mainWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[54px] sm:min-h-[58px] px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da851] text-white rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md border-2 border-[#1da851] cursor-pointer transition-all active:scale-98 no-underline"
              aria-label={t.sendProofWhatsApp}
            >
              {/* WhatsApp SVG Icon */}
              <svg
                className="w-6 h-6 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left leading-tight min-w-0">
                <span className="truncate">{t.sendProofWhatsApp}</span>
                <span className="text-[11px] font-bold text-white/90 hidden xs:inline truncate">
                  {t.verifiedWorkReceiptSub}
                </span>
              </div>
            </a>

            {/* Large Copy Button (min 48px tap target) */}
            <button
              type="button"
              onClick={() => handleCopy(activeCode)}
              className="w-full min-h-[50px] px-4 py-3 bg-[#1F2421] hover:bg-black text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-98"
              aria-label={t.copyReceipt}
            >
              {copiedCode === activeCode ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>{t.copyReceipt}</span>
                </>
              )}
            </button>
          </div>

          {/* Ledger Proof line */}
          <div className="pt-2 border-t-2 border-dashed border-[#D4C5A5] flex flex-wrap items-center justify-between text-xs text-[#585A56] font-bold gap-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              {t.tamperProofProof}
            </span>
            <span>UN SDG 8.5</span>
          </div>
        </div>
      )}

      {/* Recent Paper Shift Receipts List */}
      <div className="bg-white rounded-2xl border-3 border-[#E6DCBF] p-4 sm:p-6 shadow-sm space-y-3 w-full">
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#FAF6EF]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FAF6EF] border border-[#E6DCBF] flex items-center justify-center text-[#D9531E] shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-[#1F2421]">
                {t.recentReceiptsTitle}
              </h3>
              <p className="text-[11px] sm:text-xs font-bold text-[#585A56]">
                {t.recentReceiptsSub}
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-[#585A56] bg-[#FAF6EF] px-2.5 py-0.5 rounded-full border border-[#E6DCBF] shrink-0">
            {recentShifts.length} {t.shiftsCount}
          </span>
        </div>

        {recentShifts.length === 0 ? (
          <p className="text-base font-bold text-[#585A56] py-6 text-center">{t.noRecentReceipts}</p>
        ) : (
          <div className="space-y-2.5">
            {recentShifts.slice(0, 5).map((shift) => {
              const shiftProofCode = shift.checkOutReceipt || shift.checkInReceipt;
              const shiftEarnings = Math.round(
                shift.regularHours * hourlyRate + shift.overtimeHours * hourlyRate * 1.5
              );
              const shiftProofUrl = getWhatsAppProofUrl({
                receiptCode: shiftProofCode,
                workerName,
                date: shift.date,
                totalHours: shift.durationHours,
                overtimeHours: shift.overtimeHours,
                earningsINR: shiftEarnings,
                language,
              });

              const localizedShiftGroup = getLocalizedGroup(shift.group, language);
              const localizedShiftType = getLocalizedShiftType(shift.shiftType, language);
              const formattedShiftDate = formatDate(shift.date, language);

              return (
                <div
                  key={shift.id}
                  className="p-3.5 rounded-xl border-2 border-[#E6DCBF] bg-[#FAF6EF]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-black text-[#1F2421] bg-white border border-[#D4C5A5] px-2 py-0.5 rounded-md font-mono shrink-0">
                        {formattedShiftDate}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[#1F2421] truncate">
                        {localizedShiftGroup} • {localizedShiftType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#585A56]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D9531E]" />
                        {shift.durationHours.toFixed(1)} {t.hoursShort}
                      </span>
                      {shift.overtimeHours > 0 && (
                        <span className="text-[#854D0E] font-black bg-[#FEF08A] px-1.5 py-0.2 rounded border border-[#FACC15]">
                          +{shift.overtimeHours} {t.hoursShort} {t.overtimeShort}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Receipt Code Stamps + WhatsApp quick share */}
                  <div className="flex items-center gap-1.5 font-mono flex-wrap shrink-0">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#D4C5A5]">
                      <span className="text-[10px] font-black text-[#585A56] font-sans">{t.inLabel}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(shift.checkInReceipt)}
                        className="text-xs font-black text-[#166534] hover:underline cursor-pointer"
                        title={t.copyReceipt}
                      >
                        {shift.checkInReceipt}
                      </button>
                    </div>
                    {shift.checkOutReceipt && (
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#D4C5A5]">
                        <span className="text-[10px] font-black text-[#585A56] font-sans">{t.outLabel}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(shift.checkOutReceipt!)}
                          className="text-xs font-black text-[#1F2421] hover:underline cursor-pointer"
                          title={t.copyReceipt}
                        >
                          {shift.checkOutReceipt}
                        </button>
                      </div>
                    )}
                    <a
                      href={shiftProofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs font-black flex items-center gap-1 shadow-2xs no-underline shrink-0"
                      title={t.sendProofWhatsApp}
                      aria-label={t.sendProofWhatsApp}
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>{t.share}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
