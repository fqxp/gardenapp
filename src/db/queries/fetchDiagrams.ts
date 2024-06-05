'use server';

import db from "@/db";

export async function fetchDiagrams() {
  const diagrams = await db.diagram.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: [
      { title: 'asc' }
    ]
  });

  return diagrams;
}

