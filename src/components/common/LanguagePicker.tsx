import React from 'react';
import { getTranslations, SUPPORTED_LANGUAGES } from '../../i18n';
import { LanguageCode } from '../../types';

interface LanguagePickerProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  className?: string;
  variant?: 'header' | 'prominent';
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  currentLanguage,
  onSelectLanguage,
  className = '',
  variant = 'header',
}) => {
  const t = getTranslations(languageToCode(currentLanguage));

  function languageToCode(lang: string): LanguageCode {
    if (lang === 'ta' || lang === 'hi') return lang;
    return 'en';
  }

  return (
    <div className={`w-full ${className}`}>
      <span className="sr-only">{t.changeLanguage}</span>
      <div
        className="grid grid-cols-3 gap-1 w-full bg-[#FAF6EF] p-1 rounded-2xl border-2 border-[#E6DCBF] shadow-xs"
        role="radiogroup"
        aria-label={t.changeLanguage}
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectLanguage(lang.code)}
              className={`min-h-[48px] px-2 py-2 rounded-xl text-base font-extrabold transition-all cursor-pointer flex items-center justify-center text-center truncate ${
                isSelected
                  ? 'bg-[#1F2421] text-white shadow-xs font-black'
                  : 'text-[#4A4D48] hover:text-[#1F2421] hover:bg-white/90'
              }`}
            >
              <span className="truncate">{lang.nativeName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
