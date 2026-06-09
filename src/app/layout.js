import ClientLayout from './ClientLayout';
import '@/index.css';
import '@/App.css';

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
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
