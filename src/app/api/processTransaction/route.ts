/**
 * API route handler for processing transaction strings.
 * 
 * Accepts POST requests containing a transaction string in the request body.
 * Uses the `parseTransaction` utility to parse the string using TLV(Tag Length Value) rules.
 * Returns a JSON response with parsed data or an error message if parsing fails.
 * 
 * This file serves as the backend endpoint for the transaction processing form.
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleTransaction } from './handleTransaction';

export async function POST(req: NextRequest){
  const body = await req.json();
  const {result,status} = await handleTransaction(body);
  return NextResponse.json(result,{status}); 
}




