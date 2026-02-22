import { getAllData } from "@/lib/api";
import { NewspaperShell } from "@/components/layout/NewspaperShell";

// Next.js 16: no explicit cache config needed here — getAllData() uses "use cache"
export default async function HomePage() {
  const data = await getAllData();
  return <NewspaperShell data={data} />;
}
