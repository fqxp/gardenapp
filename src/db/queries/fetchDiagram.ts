'use server';

import db from "@/db";
import { Prisma } from "@prisma/client";

export type DiagramWithFeatures = Prisma.PromiseReturnType<typeof fetchDiagram>;

export async function fetchDiagram(id: number) {
  const diagram = await db.diagram.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      features: true
    },
  });

  return diagram;
}
