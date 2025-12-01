'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import '@/lib/i18n';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Gestoría Copilot</title>
        <meta name="description" content="AI-powered assistant for Spanish bureaucracy" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
