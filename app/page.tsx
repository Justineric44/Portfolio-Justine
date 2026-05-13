import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Portofolio from "@/components/portofolio";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <Portofolio />
    </main>
  );
}