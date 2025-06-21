import React, { useState } from 'react';
import { CalculatorState, CalculatorMode, ArithmeticOperation, BitwiseOperation } from '../types/calculator';
import {
  addBinary,
  subtractBinary,
  multiplyBinary,
  divideBinary,
  bitwiseAnd,
  bitwiseOr,
  bitwiseXor,
  bitwiseNot,
  leftShift,
  rightShift,
  convertFromDecimal,
  convertToDecimal,
  validateBinary,
  validateOctal,
  validateHex
} from '../utils/calculator';

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    mode: 'arithmetic',
    display: '0',
    previousValue: '',
    operation: null,
    waitingForNewValue: false
  });

  const [conversionInput, setConversionInput] = useState('');
  const [conversionBase, setConversionBase] = useState<'binary' | 'decimal' | 'octal' | 'hex'>('decimal');
  const [conversionResult, setConversionResult] = useState<any>(null);

  const handleModeChange = (mode: CalculatorMode) => {
    setState(prev => ({
      ...prev,
      mode,
      display: '0',
      previousValue: '',
      operation: null,
      waitingForNewValue: false
    }));
  };

  const handleBinaryInput = (digit: '0' | '1') => {
    setState(prev => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: digit,
          waitingForNewValue: false
        };
      }
      return {
        ...prev,
        display: prev.display === '0' ? digit : prev.display + digit
      };
    });
  };

  const handleClear = () => {
    setState(prev => ({
      ...prev,
      display: '0',
      previousValue: '',
      operation: null,
      waitingForNewValue: false
    }));
  };

  const handleOperation = (op: ArithmeticOperation | BitwiseOperation) => {
    setState(prev => ({
      ...prev,
      previousValue: prev.display,
      operation: op,
      waitingForNewValue: true
    }));
  };

  const handleEquals = () => {
    if (!state.operation || !state.previousValue) return;

    try {
      let result: string;
      const a = state.previousValue;
      const b = state.display;

      switch (state.operation) {
        case '+':
          result = addBinary(a, b);
          break;
        case '-':
          result = subtractBinary(a, b);
          break;
        case '×':
          result = multiplyBinary(a, b);
          break;
        case '÷':
          result = divideBinary(a, b);
          break;
        case 'AND':
          result = bitwiseAnd(a, b);
          break;
        case 'OR':
          result = bitwiseOr(a, b);
          break;
        case 'XOR':
          result = bitwiseXor(a, b);
          break;
        case 'NOT':
          result = bitwiseNot(a);
          break;
        case '<<':
          result = leftShift(a, parseInt(b, 2));
          break;
        case '>>':
          result = rightShift(a, parseInt(b, 2));
          break;
        default:
          return;
      }

      setState(prev => ({
        ...prev,
        display: result,
        previousValue: '',
        operation: null,
        waitingForNewValue: true
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        display: 'Error',
        previousValue: '',
        operation: null,
        waitingForNewValue: true
      }));
    }
  };

  const handleConversion = () => {
    if (!conversionInput) return;

    try {
      let decimal: number;
      
      switch (conversionBase) {
        case 'binary':
          if (!validateBinary(conversionInput)) throw new Error('Invalid binary');
          decimal = convertToDecimal(conversionInput, 2);
          break;
        case 'decimal':
          decimal = parseInt(conversionInput, 10);
          if (isNaN(decimal)) throw new Error('Invalid decimal');
          break;
        case 'octal':
          if (!validateOctal(conversionInput)) throw new Error('Invalid octal');
          decimal = convertToDecimal(conversionInput, 8);
          break;
        case 'hex':
          if (!validateHex(conversionInput)) throw new Error('Invalid hexadecimal');
          decimal = convertToDecimal(conversionInput, 16);
          break;
        default:
          throw new Error('Invalid base');
      }

      setConversionResult(convertFromDecimal(decimal));
    } catch (error) {
      setConversionResult({ error: 'Invalid input' });
    }
  };

  const renderArithmeticCalculator = () => (
    <div className="space-y-4">
      {/* Display */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="text-right">
          {state.previousValue && state.operation && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {state.previousValue} {state.operation}
            </div>
          )}
          <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
            {state.display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={handleClear}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Clear
        </button>
        <button
          onClick={() => handleOperation('÷')}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperation('×')}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          ×
        </button>
        
        <button
          onClick={() => handleBinaryInput('1')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          1
        </button>
        <button
          onClick={() => handleBinaryInput('0')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          0
        </button>
        <button
          onClick={() => handleOperation('-')}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          −
        </button>
        <button
          onClick={() => handleOperation('+')}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          +
        </button>
        
        <button
          onClick={handleEquals}
          className="col-span-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          =
        </button>
      </div>
    </div>
  );

  const renderConversionCalculator = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Input Value
        </label>
        <input
          type="text"
          value={conversionInput}
          onChange={(e) => setConversionInput(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter value to convert"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['binary', 'decimal', 'octal', 'hex'] as const).map((base) => (
          <button
            key={base}
            onClick={() => setConversionBase(base)}
            className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
              conversionBase === base
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {base.charAt(0).toUpperCase() + base.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={handleConversion}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        Convert
      </button>

      {conversionResult && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          {conversionResult.error ? (
            <div className="text-red-600 dark:text-red-400 font-medium">
              {conversionResult.error}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Binary:</span>
                  <div className="font-mono text-lg text-gray-900 dark:text-white">{conversionResult.binary}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Decimal:</span>
                  <div className="font-mono text-lg text-gray-900 dark:text-white">{conversionResult.decimal}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Octal:</span>
                  <div className="font-mono text-lg text-gray-900 dark:text-white">{conversionResult.octal}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Hexadecimal:</span>
                  <div className="font-mono text-lg text-gray-900 dark:text-white">{conversionResult.hexadecimal}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderBitwiseCalculator = () => (
    <div className="space-y-4">
      {/* Display */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="text-right">
          {state.previousValue && state.operation && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {state.previousValue} {state.operation}
            </div>
          )}
          <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
            {state.display}
          </div>
        </div>
      </div>

      {/* Binary Input */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleBinaryInput('1')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-xl"
        >
          1
        </button>
        <button
          onClick={() => handleBinaryInput('0')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-xl"
        >
          0
        </button>
      </div>

      {/* Bitwise Operations */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleOperation('AND')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          AND
        </button>
        <button
          onClick={() => handleOperation('OR')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          OR
        </button>
        <button
          onClick={() => handleOperation('XOR')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          XOR
        </button>
        <button
          onClick={() => handleOperation('NOT')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          NOT
        </button>
        <button
          onClick={() => handleOperation('<<')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {'<<'}
        </button>
        <button
          onClick={() => handleOperation('>>')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {'>>'}
        </button>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Clear
        </button>
        <button
          onClick={handleEquals}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          =
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Mode Tabs */}
      <div className="flex flex-wrap mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { key: 'arithmetic', label: 'Binary Arithmetic' },
          { key: 'conversion', label: 'Conversions' },
          { key: 'bitwise', label: 'Bitwise Operations' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleModeChange(key as CalculatorMode)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
              state.mode === key
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Calculator Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        {state.mode === 'arithmetic' && renderArithmeticCalculator()}
        {state.mode === 'conversion' && renderConversionCalculator()}
        {state.mode === 'bitwise' && renderBitwiseCalculator()}
      </div>
    </div>
  );
};

export default Calculator;