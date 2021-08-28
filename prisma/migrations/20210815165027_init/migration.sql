-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "success" INTEGER NOT NULL DEFAULT 0,
    "fails" INTEGER NOT NULL DEFAULT 0,
    "calls" INTEGER NOT NULL DEFAULT 0,
    "interface" TEXT NOT NULL,
    "implementation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provider.implementation_unique" ON "Provider"("implementation");
