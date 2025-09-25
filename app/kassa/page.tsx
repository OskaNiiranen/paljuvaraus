import type { Metadata } from 'next';
import KassaClient from '@/components/KassaClient';

export const metadata: Metadata = {
  title: 'Kassa',
};

export default function KassaPage() {
  return <KassaClient />;
}
