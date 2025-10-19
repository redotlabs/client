/**
 * "01012345678" → "010-1234-5678"
 * "021234567" → "02-1234-567"
 * "15881234" → "1588-1234"
 */
export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  if (digits.startsWith('02') && digits.length === 9)
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5, 9)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

/**
 * "10000" → "10,000"
 * "1000000.5" → "1,000,000.5"
 */
export const formatCurrency = (value: string | number | undefined): string => {
  if (!value) return '0';

  let digits = value.toString().replace(/[^\d.]/g, '');

  digits = digits.replace(/^0+/, '');

  const [intPart, decimalPart] = digits.split('.');
  const formattedInt = intPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '';
  return decimalPart != null ? `${formattedInt}.${decimalPart}` : formattedInt;
};

/**
 * 공백 제거
 */
export const formatEmpty = (value: string): string => {
  return value.replace(/\s/g, '');
};
