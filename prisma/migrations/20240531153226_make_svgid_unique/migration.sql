/*
  Warnings:

  - A unique constraint covering the columns `[svgId]` on the table `elements` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "elements_svgId_key" ON "elements"("svgId");
