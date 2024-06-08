// import { PrismaClient } from '@prisma/client';

export const register = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // const prisma = new PrismaClient();

    // const diagrams = await prisma.diagram.findMany();
    // await Promise.all(diagrams.map(async (diagram: Diagram) => {
    //   const features = await prisma.feature.findMany({
    //     where: { diagramId: diagram.id },
    //     select: { svgId: true }
    //   });
    //
    //   extractSvgIds(diagram);
    // }));

    // new Worker('updateFeatures', async () => {
    //   const diagrams = await prisma.diagram.findMany();
    //
    //   diagrams.forEach((diagram: Diagram) => {
    //     diagram.features.forEach((feature: Feature) => {
    //       console.log(`feature: ${feature}`)
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
