import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIDR(price: number | string) {
  if (typeof price === 'string' && price.startsWith('Start From Rp')) {
    return price;
  }

  // If it's a string, try to extract numbers. 
  // If it has dots and commas, it's tricky. 
  // Usually backend returns raw number or string number like "13000000"
  let numericPrice: number;
  
  if (typeof price === 'number') {
    numericPrice = price;
  } else {
    // Remove everything except digits
    const cleaned = price.replace(/\D/g, '');
    numericPrice = parseInt(cleaned, 10);
  }
  
  if (isNaN(numericPrice)) return price;

  return `Start From Rp ${new Intl.NumberFormat('id-ID').format(numericPrice)}`;
}
