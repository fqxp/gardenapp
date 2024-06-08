ALTER TABLE "elements" DROP CONSTRAINT "elements_diagramId_fkey";

ALTER TABLE "elements" RENAME TO "features";

ALTER INDEX "elements_pkey" RENAME TO "features_pkey";

ALTER INDEX "elements_svgId_key" RENAME TO "features_svgId_key";

ALTER TABLE "features" ADD CONSTRAINT "features_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "diagrams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
