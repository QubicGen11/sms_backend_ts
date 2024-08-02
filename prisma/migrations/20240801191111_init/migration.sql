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
    "organisationName" TEXT,
    "branchName" TEXT,
    "resetCode" TEXT,
    "loginOtp" TEXT,
    "otpExpiresAt" DATETIME,
    "studentID" INTEGER,
    "accessGroup" INTEGER,
    CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_accessGroup_fkey" FOREIGN KEY ("accessGroup") REFERENCES "accessManagementGroups" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_organisationName_fkey" FOREIGN KEY ("organisationName") REFERENCES "Organisation" ("organisationName") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("branchId", "branchName", "email", "id", "loginOtp", "name", "organisationName", "otpExpiresAt", "password", "phoneNumber", "resetCode", "role", "studentID") SELECT "branchId", "branchName", "email", "id", "loginOtp", "name", "organisationName", "otpExpiresAt", "password", "phoneNumber", "resetCode", "role", "studentID" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
