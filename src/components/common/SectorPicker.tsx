import React from 'react';
import { AVAILABLE_SECTORS, getLocalizedSectorConfig } from '../../config/sectors';
import { getTranslations } from '../../i18n';
import { LanguageCode, SectorId } from '../../types';
import { HardHat, PlusSquare } from 'lucide-react';

interface SectorPickerProps {
  activeSectorId: SectorId;
  onSelectSector: (sectorId: SectorId) => void;
  language?: LanguageCode;
  className?: string;
  variant?: 'compact' | 'cards';
}

export const SectorPicker: React.FC<SectorPickerProps> = ({
  activeSectorId,
  onSelectSector,
  language = 'en',
  className = '',
  variant = 'compact',
}) => {
  const t = getTranslations(language);

  const getSectorIcon = (id: SectorId, className = 'w-4 h-4 sm:w-5 sm:h-5 shrink-0') => {
    if (id === 'construction') {
      return <HardHat className={className} aria-hidden="true" />;
    }
    return <PlusSquare className={className} aria-hidden="true" />;
  };

  if (variant === 'cards') {
    return (
      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}
        role="radiogroup"
        aria-label={t.sectorSelection}
      >
        {AVAILABLE_SECTORS.map((rawSector) => {
          const sector = getLocalizedSectorConfig(rawSector.id, language);
          const isSelected = activeSectorId === sector.id;
          const isConstruction = sector.id === 'construction';

          return (
            <button
              key={sector.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectSector(sector.id)}
              className={`p-3.5 sm:p-5 rounded-2xl border-3 text-left transition-all flex items-center gap-3 min-h-[58px] sm:min-h-[80px] cursor-pointer shadow-xs w-full ${
                isSelected
                  ? isConstruction
                    ? 'border-[#D9531E] bg-[#FFF2EB] text-[#8C2C07] shadow-md ring-2 ring-[#D9531E]/30'
                    : 'border-[#0E8373] bg-[#EEF9F7] text-[#074C42] shadow-md ring-2 ring-[#0E8373]/30'
                  : 'border-[#E6DCBF] bg-white hover:border-[#D4C5A5] hover:bg-[#FAF6EF]'
              }`}
            >
              <div
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center shrink-0 border-2 font-bold ${
                  isSelected
                    ? isConstruction
                      ? 'bg-[#D9531E] text-white border-[#8C2C07]'
                      : 'bg-[#0E8373] text-white border-[#074C42]'
                    : 'bg-[#FAF6EF] text-[#585A56] border-[#E6DCBF]'
                }`}
              >
                {getSectorIcon(sector.id, 'w-6 h-6 sm:w-7 sm:h-7')}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1F2421]">
                    {sector.name}
                  </h3>
                  {isSelected && (
                    <span
                      className={`text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-full text-white shrink-0 ${
                        isConstruction ? 'bg-[#D9531E]' : 'bg-[#0E8373]'
                      }`}
                    >
                      {t.selected}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#585A56] mt-0.5">
                  {sector.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact variant: Equal width 2 buttons grid with no truncation on mobile
  return (
    <div
      className={`w-full grid grid-cols-2 gap-1 p-1 bg-[#FAF6EF] rounded-2xl border-2 border-[#E6DCBF] ${className}`}
      role="radiogroup"
      aria-label={t.selectSector}
    >
      {AVAILABLE_SECTORS.map((rawSector) => {
        const sector = getLocalizedSectorConfig(rawSector.id, language);
        const isSelected = activeSectorId === sector.id;
        const isConstruction = sector.id === 'construction';

        return (
          <button
            key={sector.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectSector(sector.id)}
            className={`min-h-[48px] px-1.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-base font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center leading-tight whitespace-normal ${
              isSelected
                ? isConstruction
                  ? 'bg-[#D9531E] text-white shadow-sm border border-[#8C2C07]'
                  : 'bg-[#0E8373] text-white shadow-sm border border-[#074C42]'
                : 'text-[#4A4D48] hover:text-[#1F2421] hover:bg-white/90'
            }`}
          >
            {getSectorIcon(sector.id, 'w-4 h-4 sm:w-5 sm:h-5 shrink-0')}
            <span className="whitespace-normal leading-tight">{sector.shortName}</span>
          </button>
        );
      })}
    </div>
  );
};
