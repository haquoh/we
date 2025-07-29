import { notFound } from 'next/navigation';
import MemoryDetail from '@/components/memory/MemoryDetail';
import memoriesData from '@/data/memories.json';
import { Memory } from '@/lib/types/memory';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MemoryPage({ params }: PageProps) {
  const { id } = await params;
  const memory = memoriesData.find((m) => m.id === id) as Memory | undefined;

  if (!memory) {
    notFound();
  }

  return <MemoryDetail memory={memory} />;
}

export async function generateStaticParams() {
  return memoriesData.map((memory) => ({
    id: memory.id,
  }));
}