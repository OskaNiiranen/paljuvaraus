import type { Metadata } from 'next';
import VarausClient from '@/components/VarausClient';

export const metadata: Metadata = {
  title: 'Varauskalenteri',
};

export default function VarausPage() {
  return <VarausClient />;
}