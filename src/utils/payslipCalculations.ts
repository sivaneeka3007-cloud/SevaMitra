/**
 * Pure functions for payslip generation and speech synthesis summaries.
 * Aligned with UN SDG 8.5 (Equal pay for work of equal value & transparent remuneration).
 * Currency: Indian Rupees (₹) with localized speech readout.
 */

import { DeductionItem, LanguageCode, PayslipBreakdown, SectorConfig, ShiftRecord, Worker } from '../types';

export const OVERTIME_MULTIPLIER = 1.5;

/**
 * Calculate full payslip breakdown with 1.5x overtime and itemized statutory deductions.
 */
export function calculatePayslip(
  worker: Worker,
  shifts: ShiftRecord[],
  periodLabel: string,
  sectorConfig: SectorConfig,
  language: LanguageCode = 'en'
): PayslipBreakdown {
  const completedShifts = shifts.filter((s) => s.workerId === worker.id);

  let regularHours = 0;
  let overtimeHours = 0;

  for (const s of completedShifts) {
    regularHours += s.regularHours;
    overtimeHours += s.overtimeHours;
  }

  regularHours = Math.round(regularHours * 100) / 100;
  overtimeHours = Math.round(overtimeHours * 100) / 100;

  const hourlyRate = worker.hourlyRate;
  const overtimeRate = Math.round(hourlyRate * OVERTIME_MULTIPLIER * 100) / 100;

  const regularPay = Math.round(regularHours * hourlyRate * 100) / 100;
  const overtimePay = Math.round(overtimeHours * overtimeRate * 100) / 100;
  const grossPay = Math.round((regularPay + overtimePay) * 100) / 100;

  // Realistic Indian statutory welfare deductions in plain words
  const deductions: DeductionItem[] = [
    {
      id: 'provident-fund',
      label: 'Provident Fund (PF)',
      amount: Math.round(grossPay * 0.04 * 100) / 100, // 4% worker welfare savings
      description: 'Retirement savings and long-term financial security for your family.',
    },
    {
      id: 'esi-health',
      label: 'ESI Health Insurance',
      amount: Math.round(grossPay * 0.015 * 100) / 100, // 1.5% ESI healthcare
      description: 'Free medical treatment, sickness benefits, and accident protection.',
    },
  ];

  const totalDeductions = Math.round(deductions.reduce((sum, d) => sum + d.amount, 0) * 100) / 100;
  const netPay = Math.max(0, Math.round((grossPay - totalDeductions) * 100) / 100);

  const spokenSummary = generateSpokenSummary({
    workerName: worker.name,
    role: worker.role,
    regularHours,
    overtimeHours,
    regularPay,
    overtimePay,
    grossPay,
    totalDeductions,
    netPay,
    currencySymbol: sectorConfig.currencySymbol,
    language,
    periodLabel,
  });

  return {
    workerId: worker.id,
    workerName: worker.name,
    role: worker.role,
    period: periodLabel,
    regularHours,
    overtimeHours,
    hourlyRate,
    overtimeRate,
    regularPay,
    overtimePay,
    grossPay,
    deductions,
    totalDeductions,
    netPay,
    currencySymbol: sectorConfig.currencySymbol,
    spokenSummary,
  };
}

interface SpokenSummaryParams {
  workerName: string;
  role: string;
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
  totalDeductions: number;
  netPay: number;
  currencySymbol: string;
  language: LanguageCode;
  periodLabel: string;
}

/**
 * Generate human-friendly spoken text for browser speech synthesis in Indian Rupees.
 * Specifically pronounces:
 * - "rupees" in English
 * - "ரூபாய்" in Tamil
 * - "रुपये" in Hindi
 */
export function generateSpokenSummary(params: SpokenSummaryParams): string {
  const {
    workerName,
    regularHours,
    overtimeHours,
    regularPay,
    overtimePay,
    totalDeductions,
    netPay,
    language,
    periodLabel,
  } = params;

  if (language === 'ta') {
    return `வணக்கம் ${workerName}. ${periodLabel} காலத்திற்கான உங்களது சம்பள விவரம்: நீங்கள் ${regularHours} வழக்கமான மணிநேரம் பணிபுரிந்து ${regularPay} ரூபாய் சம்பாதித்துள்ளீர்கள். மேலும் ${overtimeHours} மணிநேரம் கூடுதல் நேரம் பணிபுரிந்து ஒன்றரை மடங்கு விகிதத்தில் ${overtimePay} ரூபாய் பெற்றுள்ளீர்கள். பி.எஃப் மற்றும் இ.எஸ்.ஐ பிடித்தங்கள் ${totalDeductions} ரூபாய் கழித்த பிறகு, உங்கள் கையில் கிடைக்கும் நிகர ஊதியம் ${netPay} ரூபாய் ஆகும்.`;
  }

  if (language === 'hi') {
    return `नमस्ते ${workerName}. ${periodLabel} अवधि के लिए आपका वेतन विवरण: आपने ${regularHours} नियमित घंटे काम करके ${regularPay} रुपये कमाए हैं। साथ ही ${overtimeHours} घंटे ओवरटाइम काम करके डेढ़ गुना दर से ${overtimePay} रुपये अर्जित किए हैं। पीएफ और ईएसआई कटौती ${totalDeductions} रुपये के बाद, आपका कुल शुद्ध भुगतान ${netPay} रुपये है।`;
  }

  return `Hello ${workerName}. Here is your payslip breakdown for ${periodLabel}. You worked ${regularHours} regular hours earning ${regularPay} rupees, plus ${overtimeHours} overtime hours at 1.5 times pay rate earning ${overtimePay} rupees. Total gross is ${params.grossPay} rupees. After statutory deductions of ${totalDeductions} rupees, your final net take-home pay is ${netPay} rupees.`;
}
