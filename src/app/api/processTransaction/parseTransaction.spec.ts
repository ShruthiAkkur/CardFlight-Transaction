import { parseTransaction } from './parseTransaction';

describe('parseTransaction', () => {
  it('parses a valid transaction', () => {
    const data = parseTransaction('103JCB502QS316COSTSAVERGROCERY20564.80');
    expect(data.paymentNetwork).toBe('JCB');
    expect(data.amount).toBe('6480');
    expect(data.merchant).toBe('COSTSAVERG');
    expect(data.transaction_descriptor).toBe('JCFFFF');
    expect(data.raw_message).toBe('103JCB502QS316COSTSAVERGROCERY20564.80');
  });

  it('throws error for missing transaction', () => {
    expect(() => parseTransaction('')).toThrow(/invalid or missing/i);
  });

  it('throws error for malformed transaction', () => {
    expect(() => parseTransaction('1A')).toThrow(/invalid/i);
  });

  it('throws error if required fields are missing', () => {
    expect(() => parseTransaction('120VISA')).toThrow(/missing required/i);
  });
});
