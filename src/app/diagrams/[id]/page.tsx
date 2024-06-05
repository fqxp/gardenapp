'use client';

import SvgDiagram from "@/components/SvgDiagram";
import { fetchDiagram } from "@/db/queries/fetchDiagram";
import type { Diagram } from "@prisma/client";
import { Play } from "next/font/google";
import { useEffect, useState } from "react";

export default function Diagrams({ params: { id } }: { params: { id: string } }) {
  const [diagram, setDiagram] = useState<Partial<Diagram> | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const diagram = await fetchDiagram(parseInt(id, 10));
      setDiagram(diagram);
    }

    fetch();
  }, [id])

  if (!diagram) {
    return <div>Loading ...</div>;
  }

  const handleClick = (e: React.MouseEvent) => {
    const el = e.target as Element;
    if (el.hasAttribute('id')) {

    }
    console.log(`click ${e.target}`)
  }

  const handleMouseOver = (e: React.MouseEvent) => {
    const el = e.target as Element;
    if (el.namespaceURI === 'http://www.w3.org/2000/svg') {
      setHoveredId(el.getAttribute('inkscape:label') || el.id);
    }
  }
  const handleMouseOut = (e: React.MouseEvent) => {
    setHoveredId(null);
  }

  return (
    <div
      className="flex flex-col h-[100vh]"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <header className="flex-initial">{diagram.title} {hoveredId}</header>
      <SvgDiagram
        src={`/api/diagrams/${diagram.id}`}
        className="overflow-hidden flex-auto"
      />
      <footer className="flex-initial">gardenapp</footer>
    </div>
  )
}
