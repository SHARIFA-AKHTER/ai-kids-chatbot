-- CreateTable
CREATE TABLE "UserProgress" (
    "id" TEXT NOT NULL,
    "childName" TEXT NOT NULL DEFAULT 'Little Friend',
    "currentLevel" TEXT NOT NULL DEFAULT 'L1',
    "currentMode" TEXT NOT NULL DEFAULT 'Conversation',
    "historyJson" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);
