/*
  Warnings:

  - You are about to drop the `roleFeature` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "roleFeature";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roleName" TEXT,
    "featureId" INTEGER NOT NULL
);
INSERT INTO "new_Role" ("featureId", "id", "roleName") SELECT "featureId", "id", "roleName" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE TABLE "new_features" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "featureName" TEXT NOT NULL,
    "createAccess" BOOLEAN NOT NULL DEFAULT false,
    "editAccess" BOOLEAN NOT NULL DEFAULT false,
    "viewAccess" BOOLEAN NOT NULL DEFAULT true,
    "deleteAccess" BOOLEAN NOT NULL DEFAULT false,
    "roleId" TEXT,
    CONSTRAINT "features_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_features" ("createAccess", "deleteAccess", "editAccess", "featureName", "id", "viewAccess") SELECT "createAccess", "deleteAccess", "editAccess", "featureName", "id", "viewAccess" FROM "features";
DROP TABLE "features";
ALTER TABLE "new_features" RENAME TO "features";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
