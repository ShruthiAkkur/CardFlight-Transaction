import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";


const roboto = Roboto({ subsets: ["latin"], weight: "400" });


export const metadata: Metadata = {
  title: "CardFlight Transaction App",
  description: "Parse a transaction string and display the data in human readable format on the webpage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
    <body className={`${roboto.className}`}>
        <div className="bg-gradient-to-b from-blue-50 via-slate-100 to-white min-h-screen flex flex-col items-center justify-center"> 
        {children}
    </div>
  </body>

    </html>
  );
  
}
