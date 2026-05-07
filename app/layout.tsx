import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stripe Fee Breakdown Calculator',
  description: 'Calculate exact Stripe fees per transaction type. Real-time calculator for SaaS founders and e-commerce developers.',
  keywords: 'stripe fees, payment calculator, stripe pricing, transaction fees, saas tools',
  openGraph: {
    title: 'Stripe Fee Breakdown Calculator',
    description: 'Calculate exact Stripe fees per transaction type.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="https://umami.microtool.dev/script.js" data-website-id="c7a2777c-e262-4ab4-9238-d8b8bfeb8d82"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
