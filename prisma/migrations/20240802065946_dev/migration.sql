-- CreateTable
CREATE TABLE "RoleFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleId" TEXT NOT NULL,
    "featureId" INTEGER NOT NULL,
    "createAccess" BOOLEAN NOT NULL,
    "editAccess" BOOLEAN NOT NULL,
    "viewAccess" BOOLEAN NOT NULL,
    "deleteAccess" BOOLEAN NOT NULL,
    CONSTRAINT "RoleFeature_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RoleFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleFeature_roleId_featureId_key" ON "RoleFeature"("roleId", "featureId");
