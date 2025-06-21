// Binary arithmetic operations
export const addBinary = (a: string, b: string): string => {
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  return (decA + decB).toString(2);
};

export const subtractBinary = (a: string, b: string): string => {
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  const result = decA - decB;
  return result < 0 ? '-' + Math.abs(result).toString(2) : result.toString(2);
};

export const multiplyBinary = (a: string, b: string): string => {
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  return (decA * decB).toString(2);
};

export const divideBinary = (a: string, b: string): string => {
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  if (decB === 0) throw new Error('Division by zero');
  return Math.floor(decA / decB).toString(2);
};

// Bitwise operations
export const bitwiseAnd = (a: string, b: string): string => {
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  return (decA & decB).toString(2);
};

export const bitwiseOr = (a: string, b: string): string => {
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  return (decA | decB).toString(2);
};

export const bitwiseXor = (a: string, b: string): string => {
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  return (decA ^ decB).toString(2);
};

export const bitwiseNot = (a: string): string => {
  const decA = parseInt(a, 2);
  // Using 32-bit NOT operation
  return ((~decA) >>> 0).toString(2);
};

export const leftShift = (a: string, positions: number): string => {
  const decA = parseInt(a, 2);
  return (decA << positions).toString(2);
};

export const rightShift = (a: string, positions: number): string => {
  const decA = parseInt(a, 2);
  return (decA >> positions).toString(2);
};

// Number system conversions
export const convertFromDecimal = (decimal: number) => {
  return {
    binary: decimal.toString(2),
    decimal: decimal.toString(),
    octal: decimal.toString(8),
    hexadecimal: decimal.toString(16).toUpperCase()
  };
};

export const convertToDecimal = (value: string, base: number): number => {
  return parseInt(value, base);
};

export const validateBinary = (value: string): boolean => {
  return /^[01]+$/.test(value);
};

export const validateOctal = (value: string): boolean => {
  return /^[0-7]+$/.test(value);
};

export const validateHex = (value: string): boolean => {
  return /^[0-9A-Fa-f]+$/.test(value);
};