/**
 * WhatsApp Proof Message Generator
 * Generates verified shift attendance and earnings proof message
 * in the worker's selected language (English, Tamil, Hindi)
 * for one-click sharing via https://wa.me/?text=
 */

import { LanguageCode } from '../types';
import { formatINR } from './currencyFormatter';

export interface WhatsAppProofParams {
  receiptCode: string;
  workerName: string;
  date: string;
  totalHours: number;
  overtimeHours: number;
  earningsINR: number;
  language: LanguageCode;
}

/**
 * Pure function to format localized WhatsApp proof message text.
 */
export function generateWhatsAppProofMessage(params: WhatsAppProofParams): string {
  const {
    receiptCode,
    workerName,
    date,
    totalHours,
    overtimeHours,
    earningsINR,
    language,
  } = params;

  const formattedPay = formatINR(earningsINR, false);

  if (language === 'ta') {
    return [
      `*ஃபேர்ஷிப்ட் சரிபார்க்கப்பட்ட பணி ஆதாரம் (FairShift Proof)*`,
      `தொழிலாளர்: ${workerName}`,
      `தேதி: ${date}`,
      `ரசீது குறியீடு: ${receiptCode}`,
      `மொத்த நேரம்: ${totalHours.toFixed(1)} மணிநேரம்`,
      `கூடுதல் நேரம் (1.5x): ${overtimeHours.toFixed(1)} மணிநேரம்`,
      `மதிப்பீட்டு ஊதியம்: ${formattedPay}`,
      `Verified by FairShift (UN SDG 8 Decent Work Platform)`,
    ].join('\n');
  }

  if (language === 'hi') {
    return [
      `*फेयरशिफ्ट सत्यापित शिफ्ट प्रमाण (FairShift Proof)*`,
      `श्रमिक: ${workerName}`,
      `दिनांक: ${date}`,
      `रसीद कोड: ${receiptCode}`,
      `कुल काम के घंटे: ${totalHours.toFixed(1)} घंटे`,
      `ओवरटाइम (1.5x): ${overtimeHours.toFixed(1)} घंटे`,
      `अनुमानित कमाई: ${formattedPay}`,
      `Verified by FairShift (UN SDG 8 Decent Work Platform)`,
    ].join('\n');
  }

  return [
    `*FairShift Verified Work Proof*`,
    `Worker: ${workerName}`,
    `Date: ${date}`,
    `Receipt Code: ${receiptCode}`,
    `Total Hours: ${totalHours.toFixed(1)} hrs`,
    `Overtime Hours (1.5x): ${overtimeHours.toFixed(1)} hrs`,
    `Shift Earnings: ${formattedPay}`,
    `Verified by FairShift (UN SDG 8 Decent Work Platform)`,
  ].join('\n');
}

/**
 * Pure function returning the full https://wa.me/?text= url with URL-encoded message
 */
export function getWhatsAppProofUrl(params: WhatsAppProofParams): string {
  const message = generateWhatsAppProofMessage(params);
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
