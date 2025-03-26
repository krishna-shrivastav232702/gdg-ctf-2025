"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<{ name?: string }>({});
  const updateUser = (name: string) => {
    setUser({ name });
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="GDSC NMIT's CodeSprint 3.0 Capture The Flag"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>CodeSprint3.0</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />

        <UserContext.Provider value={{ user, updateUser }}>
          {children}
        </UserContext.Provider>
      </body>
    </html>
  );
}
