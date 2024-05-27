'use server'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function fetchMap() {
  const map = await prisma.map.findFirst();

  return map;
}
