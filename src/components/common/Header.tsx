import React from 'react';
import { ShieldCheck, RotateCcw, Home, User, Building2 } from 'lucide-react';
import { LanguagePicker } from './LanguagePicker';
import { SectorPicker } from './SectorPicker';
import { LanguageCode, SectorId } from '../../types';
import { getTranslations } from '../../i18n';

interface HeaderProps {
  currentView: 'home' | 'worker' | 'admin';
  onNavigate: (view: 'home' | 'worker' | 'admin') => void;
  activeSectorId: SectorId;
  onSelectSector: (id: SectorId) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onResetDemoData?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  activeSectorId,
  onSelectSector,
  language,
  onSelectLanguage,
  onResetDemoData,
}) => {
  const t = getTranslations(language);
  const isConstruction = activeSectorId === 'construction';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EF]/98 backdrop-blur-md border-b-2 border-[#E6DCBF] shadow-xs">
      {/* ROW 1: App Name & Logo + Demo data badge & Reset (no cramped / cut-off buttons) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 border-b border-[#E6DCBF]/70 sm:border-b-0">
        {/* App Title & Home link */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-left group p-0.5 rounded-xl cursor-pointer"
          aria-label="FairShift Home"
        >
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-black text-white shadow-xs border-2 transition-transform group-hover:scale-105 ${
              isConstruction
                ? 'bg-[#D9531E] border-[#8C2C07]'
                : 'bg-[#0E8373] border-[#074C42]'
            }`}
          >
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1F2421]">FairShift</span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.2 rounded-md text-white ${
                  isConstruction ? 'bg-[#D9531E]' : 'bg-[#0E8373]'
                }`}
              >
                SDG 8
              </span>
            </div>
            <p className="text-[11px] text-[#585A56] font-bold hidden sm:block">Shift Workers & Employers</p>
          </div>
        </button>

        {/* Right side: Demo data badge + reset */}
        <div className="flex items-center gap-2">
          <span className="bg-amber-300 text-amber-950 font-black px-2 py-0.5 rounded-md text-[11px] sm:text-xs uppercase tracking-wider border border-amber-400">
            {t.demoDataBadge}
          </span>

          {onResetDemoData && (
            <button
              onClick={onResetDemoData}
              title="Reset demo shift data"
              aria-label="Reset demo shift data"
              className="text-[#585A56] hover:text-[#1F2421] p-1.5 rounded-lg flex items-center justify-center cursor-pointer min-h-[36px] min-w-[36px]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ROW 2: Sector and Language toggles in one slim row/section below */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="w-full sm:w-auto flex-1 max-w-sm">
          <SectorPicker
            activeSectorId={activeSectorId}
            onSelectSector={onSelectSector}
            variant="compact"
          />
        </div>

        <div className="w-full sm:w-auto flex-1 max-w-sm">
          <LanguagePicker
            currentLanguage={language}
            onSelectLanguage={onSelectLanguage}
            variant="header"
          />
        </div>
      </div>

      {/* ROW 3: Inner Screens Navigation Switch Bar (Home, Worker, Admin) */}
      {currentView !== 'home' && (
        <div className="border-t-2 border-[#E6DCBF] bg-[#F3EDE2] px-3 sm:px-6 py-2">
          <nav
            aria-label="Inner Screen Navigation"
            className="max-w-md mx-auto w-full grid grid-cols-3 gap-1.5 sm:gap-2.5"
          >
            {/* Button 1: Home */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="min-h-[48px] px-2 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer border-2 active:scale-98 bg-white text-[#1F2421] hover:bg-[#FAF6EF] border-[#D4C5A5] shadow-2xs"
              aria-label="Home"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#D9531E]" />
              <span className="truncate">Home</span>
            </button>

            {/* Button 2: Worker */}
            <button
              type="button"
              onClick={() => onNavigate('worker')}
              className={`min-h-[48px] px-2 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer border-2 active:scale-98 ${
                currentView === 'worker'
                  ? isConstruction
                    ? 'bg-[#D9531E] text-white border-[#8C2C07] shadow-xs'
                    : 'bg-[#0E8373] text-white border-[#074C42] shadow-xs'
                  : 'bg-white text-[#1F2421] hover:bg-[#FAF6EF] border-[#D4C5A5] shadow-2xs'
              }`}
              aria-label="Worker"
              aria-current={currentView === 'worker' ? 'page' : undefined}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">Worker</span>
            </button>

            {/* Button 3: Admin */}
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className={`min-h-[48px] px-2 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer border-2 active:scale-98 ${
                currentView === 'admin'
                  ? 'bg-[#1F2421] text-white border-black shadow-xs'
                  : 'bg-white text-[#1F2421] hover:bg-[#FAF6EF] border-[#D4C5A5] shadow-2xs'
              }`}
              aria-label="Admin"
              aria-current={currentView === 'admin' ? 'page' : undefined}
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-amber-400" />
              <span className="truncate">Admin</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
