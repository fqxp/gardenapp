import db from "@/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const diagram = await db.diagram.findUnique({
    where: {
      id: parseInt(params.id, 10)
    },
    select: {
      svgData: true
    }
  })

  if (diagram === null) {
    return new Response('', {
      status: 404,
    })
  }

  const svgData = diagram.svgData.toString();

  return new Response(svgData, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Length': `${svgData.length}`,
    },
  })
}
