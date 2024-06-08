'use client';

import { useEffect, useState } from "react";

import DetailView from "@/components/DetailView";
import SvgDiagram from "@/components/SvgDiagram";
import { fetchDiagram } from "@/db/queries/fetchDiagram";
import type { DiagramWithFeatures } from "@/db/queries/fetchDiagram";
import { Feature } from "@prisma/client";

export default function Diagrams({ params: { id } }: { params: { id: string } }) {
  const [diagram, setDiagram] = useState<DiagramWithFeatures | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<Feature | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const diagram = await fetchDiagram(parseInt(id, 10));
      setDiagram(diagram);
      console.log(JSON.stringify(diagram))
    }

    fetch();
  }, [id])

  useEffect(() => {
    document.getElementById(hoveredFeature?.svgId)
  }, [hoveredFeature])

  const findFeatureByElement = (el: Element) => {
    if (el.namespaceURI !== 'http://www.w3.org/2000/svg') return null;

    return diagram.features.find(
      (diagramEl) => diagramEl.svgId === el.id
    ) || null;
  }

  const handleClick = (e: React.MouseEvent) => {
    const feature = findFeatureByElement(e.target as Element);
    setSelectedFeature(feature?.svgId === selectedFeature?.svgId
      ? null
      : feature);
  }

  const handleMouseOver = (e: React.MouseEvent) => {
    const el = e.target as Element;
    const feature = findFeatureByElement(el);
    if (feature) {
      setHoveredFeature(feature);
    } else {
      setHoveredFeature(null)
    }
  }

  const handleMouseOut = (e: React.MouseEvent) => {
    setHoveredFeature(null);
  }

  if (!diagram) return <div>Loading ...</div>;

  return (
    <div
      className="flex flex-col h-[100vh]"
    >
      <header className="flex-initial">
        {diagram.title} {hoveredFeature?.name}
      </header>
      <SvgDiagram
        src={`/api/diagrams/${diagram.id}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      />
      <DetailView
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
      <footer className="flex-initial">gardenapp</footer>
    </div >
  )
}
