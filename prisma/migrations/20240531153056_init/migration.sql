-- CreateTable
CREATE TABLE "diagrams" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "svgData" BYTEA NOT NULL,

    CONSTRAINT "diagrams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elements" (
    "id" SERIAL NOT NULL,
    "svgId" TEXT NOT NULL,
    "diagramId" INTEGER NOT NULL,
    "name" TEXT,
    "notes" TEXT,

    CONSTRAINT "elements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "elements" ADD CONSTRAINT "elements_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "diagrams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
