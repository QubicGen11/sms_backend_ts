-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_accessManagementGroups" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupName" TEXT,
    "featureId" INTEGER,
    CONSTRAINT "accessManagementGroups_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_accessManagementGroups" ("featureId", "groupName", "id") SELECT "featureId", "groupName", "id" FROM "accessManagementGroups";
DROP TABLE "accessManagementGroups";
ALTER TABLE "new_accessManagementGroups" RENAME TO "accessManagementGroups";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
