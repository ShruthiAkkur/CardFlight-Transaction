This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview
This project creates a simple web server and web page to display transaction details based on TLV (Tag-Length-Value) parsing rules.

## Backend Logic (API)
The server listens for POST requests at
http://localhost:3000/api/processTransaction.

The payload should include a transaction string (e.g. 120VISA20820.00307WALMART).

## The server:
1. Parses the string using TLV rules.
2. Returns transaction details as JSON.
3. Sends an error response if the input format is invalid.

## Frontend Logic
1. WebPage created with an input to accept transaction number.
2. On submitting the transaction number a request is made the server and the server responds with an output or error.
3. The result is displayed on the same webpage.

Although Next.js is a great framework with lot of built in support the main reason for me to select this framework for my project was --  supports both the backend and front end side of the project. 

## Getting Started

Install dependencies:
npm install

Run the development server:
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

