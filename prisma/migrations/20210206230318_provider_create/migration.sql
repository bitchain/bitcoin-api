-- CreateTable
CREATE TABLE "Provider" (
    "providerKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "success" INTEGER NOT NULL DEFAULT 0,
    "fails" INTEGER NOT NULL DEFAULT 0,
    "calls" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("providerKey")
);
