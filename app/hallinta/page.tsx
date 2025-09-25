import type { Metadata } from 'next';
import HallintaClient from '@/components/HallintaClient';

export const metadata: Metadata = {
  title: 'Hallinta',
};

export default function HallintaPage() {
  return <HallintaClient />;
}
