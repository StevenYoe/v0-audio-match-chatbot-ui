import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIDR(price: number | string) {
  if (typeof price === 'string' && price.startsWith('Start From Rp')) {
    return price;
  }

  let numericPrice: number;
  
  if (typeof price === 'number') {
    numericPrice = price;
  } else {
    const cleaned = price.replace(/\D/g, '');
    numericPrice = parseInt(cleaned, 10);
  }
  
  if (isNaN(numericPrice)) return price;

  return `Start From Rp ${new Intl.NumberFormat('id-ID').format(numericPrice)}`;
}

/**
 * Formats numbers found inside a text string into IDR format (with dots)
 * Example: "Harga Rp 2200000.00" -> "Harga Rp 2.200.000"
 */
export function formatNumbersInText(text: string) {
  if (!text) return text;

  // 1. Match Rp/IDR followed by numbers (with optional decimals)
  // 2. Match large numbers (4+ digits) that look like prices
  return text.replace(/(Rp\s?|IDR\s?)?(\d{4,})(\.\d+)?/g, (match, prefix, number, decimals) => {
    // If it's a date or year (like 2024, 2025, 2026), don't format if there's no Rp prefix
    if (!prefix && (parseInt(number, 10) >= 2000 && parseInt(number, 10) <= 2100)) {
      return match;
    }

    const formattedNumber = new Intl.NumberFormat('id-ID').format(parseInt(number, 10));
    
    // If we have a prefix, use it. If no prefix but it's a large number, 
    // we only format if it's very likely a price (e.g. >= 10000)
    if (prefix) {
      return `${prefix}${formattedNumber}`;
    } else if (parseInt(number, 10) >= 10000) {
      return formattedNumber;
    }
    
    return match;
  });
}
