/**
 * Utility function to parse a transaction string using TLV (Tag-Length-Value) rules.
 * 
 * Each tag represents a specific transaction field (e.g., network, amount, merchant),
 * and the string is parsed accordingly to extract structured data.
 * 
 * This function is used by the API route handler to convert raw input strings 
 * into a well-formed transaction object.
 */

import generateUUID from "../../utils/generateUuid";

export function parseTransaction(rawTransactionNumber: string) {
  if (!rawTransactionNumber || typeof rawTransactionNumber !== 'string') 
  {
    throw new Error('Invalid or missing transaction string.');
  }

  let index = 0;
  let paymentNetwork = '';
  let amount = '';
  let merchant = '';
  const transactionNumber = rawTransactionNumber.trim();


  while (index < transactionNumber.length) {
    const tag = transactionNumber[index++];
    const length = parseInt(transactionNumber.substring(index, index + 2), 10);
    if (isNaN(length)) throw new Error('Invalid transaction data.');
    index += 2;
  
    const value = transactionNumber.substring(index, index + length);
    index += length;
  
    switch (tag) {
      case '1':
        paymentNetwork = value;
        break;
      case '2':
        if(isNaN(parseFloat(value))) throw new Error('Invalid data for amount');
        amount = value;
        break;
      case '3':
        merchant = value.length > 10 ? value.slice(0, 10) : value;
        break;
      default:
        break;
    }
  }

  if (!paymentNetwork || !amount || !merchant) {
    throw new Error('Missing required transaction data.');
  }

  const amountInCents = parseFloat(amount).toFixed(2).replace('.', '');
  const descriptor =
    paymentNetwork === 'VISA'
      ? amountInCents.padStart(8, '0')
      : `${paymentNetwork.slice(0, 2).toUpperCase()}FFFF`;

  return {
    version: '0.1',
    transaction_id: generateUUID(),
    amount: amountInCents.replace(/^0+/, ''),
    paymentNetwork,
    transaction_descriptor: descriptor,
    merchant,
    raw_message: rawTransactionNumber,
  };
}
