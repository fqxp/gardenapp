import { useCallback, useEffect, useMemo, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface Props {
  src: string
  onMouseOver: (e: React.MouseEvent) => void
  onMouseOut: (e: React.MouseEvent) => void
  onClick: (e: React.MouseEvent) => void
  hoveredFeatureId: string | null
}

export default function SvgDiagram({ src, onMouseOver, onMouseOut, onClick, hoveredFeatureId }: Props) {
  const [error, setError] = useState<boolean>(false);
  const [svgData, setSvgData] = useState<string | null>(null);
  const scaleUp = true;
  const zoomFactor = 8;
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [svgWrapper, setSvgWrapper] = useState<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(src)
      if (response.status !== 200) setError(true);
      const data = await response.text();
      setSvgData(data);
    };
    fetchData();
  }, [src])

  useEffect(() => {
    if (!svgData) return;
    if (!svgWrapper) return;

    const parser = new DOMParser();
    const svgDocument: XMLDocument = parser.parseFromString(svgData, "image/svg+xml");
    const svgElement = svgDocument.children[0] as SVGSVGElement;

    svgWrapper.childNodes.forEach((childNode) => svgWrapper.removeChild(childNode));
    svgWrapper.appendChild(svgElement);
    handleImageOnLoad(svgElement);
  }, [svgData, svgWrapper])

  const imageScale = useMemo(() => {
    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageNaturalWidth === 0 ||
      imageNaturalHeight === 0
    )
      return 0;
    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight,
    );
    return scaleUp ? scale : Math.max(scale, 1);
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageNaturalWidth,
    imageNaturalHeight,
  ]);

  const handleResize = useCallback(() => {
    var width, height;
    if (container !== null) {
      const rect = container.getBoundingClientRect();
      [width, height] = [rect.width, rect.height];
    } else {
      [width, height] = [0, 0]
    }
    setContainerWidth(width);
    setContainerHeight(height);
  }, [container]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleImageOnLoad = (svg: SVGSVGElement) => {
    const [width, height] = [
      parseInt(svg.getAttribute("width") || "0", 10),
      parseInt(svg.getAttribute("height") || "0", 10)
    ]
    setImageNaturalWidth(width);
    setImageNaturalHeight(height);
  };

  if (error) return <div>Fehler: {error}</div>;

  return (
    <div
      ref={(el: HTMLDivElement | null) => setContainer(el)}
      className="w-[100%] h-[100%] relative"
      key={`${containerWidth}x${containerHeight}`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {imageScale === 0
        ? <div ref={(el: HTMLDivElement | null) => setSvgWrapper(el)} />
        : (imageScale && (
          <TransformWrapper
            initialScale={imageScale}
            minScale={imageScale}
            maxScale={imageScale * zoomFactor}
            limitToBounds={false}
            centerOnInit
          >
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%", position: "absolute" }}
            >
              <div
                ref={(el: HTMLDivElement | null) => setSvgWrapper(el)}
              />
            </TransformComponent>
          </TransformWrapper>
        ))}
    </div >
  )
}

        // wrapperStyle={{ maxWidth: "100%", maxHeight: "calc(100vh - 50px)" }}
