/*
  Warnings:

  - Made the column `organisationId` on table `Branch` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "organisationId" TEXT NOT NULL,
    "organisationName" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "founderName" TEXT,
    "mainBranch" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Branch_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Branch" ("city", "createdAt", "founderName", "id", "mainBranch", "mobileNumber", "name", "organisationId", "organisationName", "pincode", "state", "updatedAt") SELECT "city", "createdAt", "founderName", "id", "mainBranch", "mobileNumber", "name", "organisationId", "organisationName", "pincode", "state", "updatedAt" FROM "Branch";
DROP TABLE "Branch";
ALTER TABLE "new_Branch" RENAME TO "Branch";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
