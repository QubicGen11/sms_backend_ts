/*
  Warnings:

  - You are about to drop the column `otpLogin` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "password" TEXT,
    "role" TEXT,
    "branchId" INTEGER,
    "organisationName" TEXT NOT NULL,
    "branchName" TEXT,
    "resetCode" TEXT,
    "loginOtp" TEXT,
    "otpExpiresAt" DATETIME,
    CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_organisationName_fkey" FOREIGN KEY ("organisationName") REFERENCES "Organisation" ("organisationName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("branchId", "branchName", "email", "id", "name", "organisationName", "password", "phoneNumber", "resetCode", "role") SELECT "branchId", "branchName", "email", "id", "name", "organisationName", "password", "phoneNumber", "resetCode", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
