import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {layoutTopicContent} from "@/app/lib/const";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Typescript Exploration Site",
  description: "Typescript Exploration Site",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
    >
    <nav className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="container mx-auto">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              href="/typescript/generics"
              aria-label="TypeScript"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
            >
              TypeScript
              <svg className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Dropdown Menu */}
            <ul className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {Object.keys(layoutTopicContent).map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/typescript/${slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors last:rounded-b-lg"
                  >
                    {layoutTopicContent[slug]?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/typescript/playground" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Playground
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    {children}
    </body>
    </html>
  );
}