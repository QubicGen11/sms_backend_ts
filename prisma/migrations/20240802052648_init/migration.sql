-- CreateTable
CREATE TABLE "roleFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,
    CONSTRAINT "roleFeature_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "roleFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleName" TEXT,
    "featureId" INTEGER NOT NULL
);
INSERT INTO "new_Role" ("featureId", "id", "roleName") SELECT "featureId", "id", "roleName" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
