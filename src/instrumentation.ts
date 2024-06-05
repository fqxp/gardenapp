// import { PrismaClient } from '@prisma/client';

export const register = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // const prisma = new PrismaClient();

    // const diagrams = await prisma.diagram.findMany();
    // await Promise.all(diagrams.map(async (diagram: Diagram) => {
    //   const elements = await prisma.element.findMany({
    //     where: { diagramId: diagram.id },
    //     select: { svgId: true }
    //   });
    //
    //   extractSvgIds(diagram);
    // }));

    // new Worker('updateElements', async () => {
    //   const diagrams = await prisma.diagram.findMany();
    //
    //   diagrams.forEach((diagram: Diagram) => {
    //     diagram.elements.forEach((element: Element) => {
    //       console.log(`element: ${element}`)
    //     });
    //   })
    // }, {
    //   connection,
    //   concurrency: 2,
    //   removeOnComplete: { count: 1000 },
    //   removeOnFail: { count: 5000 }
    // })

  }
}
