-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "nextDosageDate" TIMESTAMP(3),
    "lotNumber" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "petId" INTEGER,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vaccine" ADD CONSTRAINT "Vaccine_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
