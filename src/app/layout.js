import { Plus_Jakarta_Sans } from 'next/font/google';
import ClientLayout from './ClientLayout';
import '@/index.css';
import '@/App.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

export const metadata = {
  title: 'Sayulita Vacation Rentals — No Booking Fees | Best Prices Guaranteed',
  description: 'Browse 650+ vacation rentals in Sayulita, Mexico. Houses, villas, beachfront properties — book direct with the owner, no Airbnb fees. Local experts since 2000.',
  keywords: 'Sayulita, vacation rentals, Mexico, book direct, no fees, houses, villas, beachfront',
  openGraph: {
    title: 'SayulitaTravel — Vacation Rentals in Sayulita, Mexico',
    description: 'Book direct with owners. 650+ verified properties. No booking fees.',
    type: 'website',
    locale: 'en_US',
    siteName: 'SayulitaTravel',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
