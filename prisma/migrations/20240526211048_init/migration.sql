-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "map" BYTEA NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);
