
import Apropos from "@/components/a-propos";
import dynamic from 'next/dynamic'

const APropos = dynamic(() => import('@/components/a-propos'), { ssr: false })

export default function AproposPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <Apropos />
    </main>
  );
}