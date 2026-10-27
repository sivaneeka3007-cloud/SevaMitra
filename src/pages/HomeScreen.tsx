import React from 'react';
import {
  User,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { LanguageCode, SectorConfig, SectorId } from '../types';
import { getTranslations } from '../i18n';

interface HomeScreenProps {
  activeSectorConfig: SectorConfig;
  onSelectSector?: (id: SectorId) => void;
  language: LanguageCode;
  onSelectLanguage?: (lang: LanguageCode) => void;
  onSelectRole: (role: 'worker' | 'admin') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeSectorConfig,
  language,
  onSelectRole,
}) => {
  const t = getTranslations(language);
  const isConstruction = activeSectorConfig.id === 'construction';

  return (
    <div className="py-2 sm:py-4 px-3 sm:px-6 max-w-5xl mx-auto space-y-3 sm:space-y-5">
      {/* Short Friendly Hero (Single line on mobile, zero clutter) */}
      <div className="text-center space-y-0.5 sm:space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1F2421] tracking-tight">
          FairShift
        </h1>
        <p className="text-xs sm:text-base font-bold text-[#4A4D48]">
          Honest shift hours & safe rest for every worker.
        </p>
      </div>

      {/* THE TWO MAIN CARDS: Worker & Admin (Visible without scrolling on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-5">
        {/* Card 1: I am a Worker */}
        <button
          type="button"
          onClick={() => onSelectRole('worker')}
          className={`group bg-white hover:bg-[#FFFDF9] rounded-2xl border-3 p-3.5 sm:p-6 text-left transition-all shadow-md hover:shadow-lg flex flex-col justify-between gap-2.5 sm:gap-4 cursor-pointer w-full ${
            isConstruction
              ? 'border-[#D9531E] hover:border-[#BF4212]'
              : 'border-[#0E8373] hover:border-[#0A695C]'
          }`}
          aria-label="I am a Worker"
        >
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-white shadow-sm border-2 shrink-0 ${
                  isConstruction
                    ? 'bg-[#D9531E] border-[#8C2C07]'
                    : 'bg-[#0E8373] border-[#074C42]'
                }`}
              >
                <User className="w-7 h-7 sm:w-10 sm:h-10" />
              </div>

              <div>
                <span
                  className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isConstruction ? 'bg-[#FFF2EB] text-[#D9531E]' : 'bg-[#EEF9F7] text-[#0E8373]'
                  }`}
                >
                  {t.workerTitle}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1F2421] mt-0.5 leading-tight">
                  I am a Worker
                </h2>
              </div>
            </div>

            {/* Inline SVG Worker Illustration */}
            <svg
              className="w-12 h-12 sm:w-18 sm:h-18 text-[#E6DCBF] shrink-0"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="46" fill="#FAF6EF" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="40" r="16" fill={isConstruction ? '#F7B591' : '#80D1C6'} />
              {isConstruction ? (
                <path d="M32 36 C32 24 68 24 68 36 L72 38 L28 38 Z" fill="#D9531E" stroke="#8C2C07" strokeWidth="2" />
              ) : (
                <path d="M34 32 L66 32 L64 26 L36 26 Z" fill="#0E8373" stroke="#074C42" strokeWidth="2" />
              )}
              <path
                d="M26 80 C26 62 38 56 50 56 C62 56 74 62 74 80 Z"
                fill={isConstruction ? '#D9531E' : '#0E8373'}
                stroke={isConstruction ? '#8C2C07' : '#074C42'}
                strokeWidth="3"
              />
              <circle cx="70" cy="68" r="10" fill="#2E7D32" />
              <path d="M66 68 L69 71 L75 65" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#585A56] leading-relaxed hidden sm:block">
            Start or stop your shift. Check today's hours, get your verified paper receipt code, and hear your earnings read aloud in your language.
          </p>

          <div
            className={`min-h-[48px] px-4 py-2 rounded-xl text-white font-black text-sm sm:text-base flex items-center justify-between shadow-xs transition-transform group-hover:translate-x-1 ${
              isConstruction ? 'bg-[#D9531E]' : 'bg-[#0E8373]'
            }`}
          >
            <span>Tap to Enter as Worker</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>

        {/* Card 2: I am an Employer / Admin */}
        <button
          type="button"
          onClick={() => onSelectRole('admin')}
          className="group bg-white hover:bg-[#FFFDF9] rounded-2xl border-3 border-[#1F2421] hover:border-black p-3.5 sm:p-6 text-left transition-all shadow-md hover:shadow-lg flex flex-col justify-between gap-2.5 sm:gap-4 cursor-pointer w-full"
          aria-label="I am an Employer or Admin"
        >
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#1F2421] text-amber-300 flex items-center justify-center font-black shadow-sm border-2 border-black shrink-0">
                <Building2 className="w-7 h-7 sm:w-10 sm:h-10" />
              </div>

              <div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#585A56] bg-[#FAF6EF] px-2 py-0.5 rounded-md">
                  {t.adminTitle}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1F2421] mt-0.5 leading-tight">
                  I am an Admin
                </h2>
              </div>
            </div>

            {/* Inline SVG Admin Illustration */}
            <svg
              className="w-12 h-12 sm:w-18 sm:h-18 text-[#E6DCBF] shrink-0"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="46" fill="#FAF6EF" stroke="currentColor" strokeWidth="3" />
              <rect x="30" y="22" width="40" height="56" rx="4" fill="white" stroke="#1F2421" strokeWidth="3" />
              <rect x="40" y="16" width="20" height="10" rx="3" fill="#D9531E" stroke="#8C2C07" strokeWidth="2" />
              <line x1="38" y1="36" x2="62" y2="36" stroke="#1F2421" strokeWidth="3" strokeLinecap="round" />
              <line x1="38" y1="46" x2="62" y2="46" stroke="#1F2421" strokeWidth="3" strokeLinecap="round" />
              <line x1="38" y1="56" x2="54" y2="56" stroke="#1F2421" strokeWidth="3" strokeLinecap="round" />
              <circle cx="68" cy="68" r="12" fill="#E65100" />
              <path d="M63 68 L66 71 L73 64" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#585A56] leading-relaxed hidden sm:block">
            Live site attendance, total overtime hours in ₹, zone/ward breakdown, rest rule safety warnings, and immutable receipts ledger.
          </p>

          <div className="min-h-[48px] px-4 py-2 rounded-xl bg-[#1F2421] text-white font-black text-sm sm:text-base flex items-center justify-between shadow-xs transition-transform group-hover:translate-x-1">
            <span>Tap to Enter as Admin</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </div>
        </button>
      </div>
    </div>
  );
};
