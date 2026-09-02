import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manthan Gohil — AI & Full Stack Developer | Intelligent Systems That Scale',
  description:
    'Manthan Gohil is a Computer Science undergraduate at BML Munjal University and an AI & Full Stack Developer building agentic workflows, RAG systems, and production-ready applications with Next.js, TypeScript, Python, and PostgreSQL.',
  keywords: [
    'Manthan Gohil',
    'AI Engineer',
    'Full Stack Developer',
    'Generative AI',
    'LangGraph',
    'RAG',
    'Next.js',
    'TypeScript',
    'FastAPI',
    'PostgreSQL',
    'BML Munjal University',
  ],
  authors: [{ name: 'Manthan Gohil' }],
  creator: 'Manthan Gohil',
  publisher: 'Manthan Gohil',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://github.com/Manthan-Gohil',
    title: 'Manthan Gohil — AI & Full Stack Developer',
    description:
      'Building intelligent systems at the intersection of AI, robust software engineering, and great user experiences.',
    siteName: 'Manthan Gohil Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manthan Gohil — AI & Full Stack Developer',
    description:
      'Building intelligent systems at the intersection of AI, robust software engineering, and great user experiences.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0c0c0c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Switzer-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}