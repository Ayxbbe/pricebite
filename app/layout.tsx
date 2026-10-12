import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PriceBite — Compare before you buy',
  description: 'Compare groceries, food delivery, electronics and appliances across stores.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
