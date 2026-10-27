import { LanguageCode } from '../types';
import { TRANSLATIONS, TranslationDictionary } from './translations';

export const SUPPORTED_LANGUAGES: { code: LanguageCode; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

export function getTranslations(lang: LanguageCode): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export * from './translations';
