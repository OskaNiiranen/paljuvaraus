import type { Metadata } from 'next';
import HallintaDashboardClient from '@/components/HallintaDashboardClient';

export const metadata: Metadata = {
  title: 'Hallintapaneeli',
};

export default function HallintaDashboardPage() {
  return <HallintaDashboardClient />;
}
