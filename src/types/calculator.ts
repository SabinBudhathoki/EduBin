export type CalculatorMode = 'arithmetic' | 'conversion' | 'bitwise';

export type ArithmeticOperation = '+' | '-' | '×' | '÷';
export type BitwiseOperation = 'AND' | 'OR' | 'XOR' | 'NOT' | '<<' | '>>';

export interface CalculatorState {
  mode: CalculatorMode;
  display: string;
  previousValue: string;
  operation: ArithmeticOperation | BitwiseOperation | null;
  waitingForNewValue: boolean;
}

export interface ConversionResult {
  binary: string;
  decimal: string;
  octal: string;
  hexadecimal: string;
}