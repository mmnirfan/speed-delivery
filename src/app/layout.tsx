// src/app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/store/Providers';

export const metadata: Metadata = {
  title: 'Speed Delivery - Fast Online Shopping in UAE',
  description: 'Shop online with Speed Delivery – Latest products, best offers, secure checkout.',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/icon-192x192.png' },
    { rel: 'apple-touch-icon', url: '/icons/icon-512x512.png' },
  ],
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Shop online with Speed Delivery – Latest products, best offers, secure checkout." />
        <meta name="keywords" content="online shopping, fast delivery, UAE, electronics, fashion, home essentials" />
        <meta name="author" content="Speed Delivery" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="your-google-site-verification-code" />
        <meta property="og:title" content="Speed Delivery - Fast Online Shopping in UAE" />
        <meta property="og:description" content="Shop online with Speed Delivery – Latest products, best offers, secure checkout." />
        <meta property="og:image" content="/icons/icon-512x512.png" />
        <meta property="og:url" content="https://speeddelivery.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Speed Delivery" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Speed Delivery - Fast Online Shopping in UAE" />
        <meta name="twitter:description" content="Shop online with Speed Delivery – Latest products, best offers, secure checkout." />
        <meta name="twitter:image" content="/icons/icon-512x512.png" />
        <meta name="twitter:site" content="@SpeedDelivery" />
        <meta name="twitter:creator" content="@SpeedDelivery" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/icon-192x192.png" color="#2563eb" />
        <link rel="shortcut icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-title" content="Speed Delivery" />
        <meta name="application-name" content="Speed Delivery" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" />

        </head>
      <body className="bg-white text-gray-800 font-sans">
        <Providers>
          <Header />
          <main className="min-h-screen pt-20 pb-10 px-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
