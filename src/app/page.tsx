'use client';

import { fetchDiagrams } from "@/db/queries/fetchDiagrams";
import type { Diagram } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [diagrams, setDiagrams] = useState<Partial<Diagram>[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setDiagrams(await fetchDiagrams());
    }
    console.log('euseffect');
    fetch();
  }, [])

  return (
    <main>
      <h1>Diagrams</h1>
      <ul>
        {diagrams.map((diagram) => (
          <li key={diagram.id}>
            <a href={`/diagrams/${diagram.id}`}>{diagram.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
// <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidyMid slice">
// {map &&
//   <div dangerouslySetInnerHTML={{ __html: map.map.toString() }} />
      // }
