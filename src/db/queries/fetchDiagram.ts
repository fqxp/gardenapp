'use server';

import db from "@/db";

export async function fetchDiagram(id: number) {
  const diagram = await db.diagram.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
    },
  });

  return diagram;
}
