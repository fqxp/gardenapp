import { fetchMap } from "@/lib/fetchMap";
import Image from "next/image";

export default async function Home() {
  const map = await fetchMap();

  return (
    <main className="flex flex-row">
      <h1>{map?.title}</h1>
      {map &&
        <div dangerouslySetInnerHTML={{ __html: map.map.toString() }} />
      }
    </main>
  );
}
        // <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidyMid slice">
