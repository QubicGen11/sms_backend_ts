/*
  Warnings:

  - You are about to drop the `updatedStudent` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Organisation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `organisationId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisationId` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisationId` to the `academicDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisationId` to the `management` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisationId` to the `nonTeachingStaff` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "updatedStudent";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Organisation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organisationName" TEXT NOT NULL,
    "registerPersonName" TEXT,
    "founderFirstName" TEXT,
    "founderLastName" TEXT,
    "mobileNumber" TEXT,
    "typeOfSchool" TEXT,
    "syllubusType" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "email" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "mandal" TEXT,
    "founderEmail" TEXT,
    "founderPassword" TEXT
);
INSERT INTO "new_Organisation" ("addressLine1", "addressLine2", "city", "email", "founderEmail", "founderFirstName", "founderLastName", "founderPassword", "id", "mandal", "mobileNumber", "organisationName", "pincode", "registerPersonName", "state", "syllubusType", "typeOfSchool") SELECT "addressLine1", "addressLine2", "city", "email", "founderEmail", "founderFirstName", "founderLastName", "founderPassword", "id", "mandal", "mobileNumber", "organisationName", "pincode", "registerPersonName", "state", "syllubusType", "typeOfSchool" FROM "Organisation";
DROP TABLE "Organisation";
ALTER TABLE "new_Organisation" RENAME TO "Organisation";
CREATE UNIQUE INDEX "Organisation_organisationName_key" ON "Organisation"("organisationName");
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentImg" TEXT,
    "loginId" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,
    "dob" DATETIME,
    "gender" TEXT,
    "bloodGroup" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "fatherOccupation" TEXT,
    "motherOccupation" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactNumber" INTEGER,
    "email" TEXT,
    "mobileNumber" INTEGER,
    "religion" TEXT,
    "nationality" TEXT,
    "address" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "organisationId" TEXT NOT NULL,
    CONSTRAINT "Student_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("address", "bloodGroup", "dob", "email", "emergencyContactName", "emergencyContactNumber", "fatherName", "fatherOccupation", "firstName", "gender", "id", "lastName", "loginId", "mobileNumber", "motherName", "motherOccupation", "nationality", "password", "religion", "studentImg", "userName") SELECT "address", "bloodGroup", "dob", "email", "emergencyContactName", "emergencyContactNumber", "fatherName", "fatherOccupation", "firstName", "gender", "id", "lastName", "loginId", "mobileNumber", "motherName", "motherOccupation", "nationality", "password", "religion", "studentImg", "userName" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE TABLE "new_Teachers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loginId" INTEGER,
    "branchName" TEXT,
    "teacherImg" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "dob" DATETIME,
    "dateOfJoining" DATETIME,
    "gender" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "experience" TEXT,
    "previousPosition" TEXT,
    "previousWorkPlace" TEXT,
    "yearOfGraduation" DATETIME,
    "tenthMarksMemo" TEXT,
    "intermediateMarksMemo" TEXT,
    "graduationCertificate" TEXT,
    "experienceCertificate" TEXT,
    "aadharNumber" TEXT,
    "bankPassbook" TEXT,
    "email" TEXT,
    "mobileNumber" INTEGER,
    "religion" TEXT,
    "nationality" TEXT,
    "bloodGroup" TEXT,
    "address" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "organisationId" TEXT NOT NULL,
    CONSTRAINT "Teachers_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Teachers" ("aadharNumber", "address", "bankPassbook", "bloodGroup", "branchName", "dateOfJoining", "dob", "email", "experience", "experienceCertificate", "fatherName", "firstName", "gender", "graduationCertificate", "id", "intermediateMarksMemo", "lastName", "loginId", "mobileNumber", "motherName", "nationality", "password", "previousPosition", "previousWorkPlace", "religion", "teacherImg", "tenthMarksMemo", "userName", "yearOfGraduation") SELECT "aadharNumber", "address", "bankPassbook", "bloodGroup", "branchName", "dateOfJoining", "dob", "email", "experience", "experienceCertificate", "fatherName", "firstName", "gender", "graduationCertificate", "id", "intermediateMarksMemo", "lastName", "loginId", "mobileNumber", "motherName", "nationality", "password", "previousPosition", "previousWorkPlace", "religion", "teacherImg", "tenthMarksMemo", "userName", "yearOfGraduation" FROM "Teachers";
DROP TABLE "Teachers";
ALTER TABLE "new_Teachers" RENAME TO "Teachers";
CREATE TABLE "new_academicDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "class" TEXT,
    "modeOfTransportation" TEXT,
    "IdentificationMarks" TEXT,
    "studyConductCertificate" TEXT,
    "transferCertificate" TEXT,
    "dateOfJoining" DATETIME,
    "student" INTEGER NOT NULL,
    "organisationId" TEXT NOT NULL,
    CONSTRAINT "academicDetails_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "academicDetails_student_fkey" FOREIGN KEY ("student") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_academicDetails" ("IdentificationMarks", "class", "dateOfJoining", "id", "modeOfTransportation", "student", "studyConductCertificate", "transferCertificate") SELECT "IdentificationMarks", "class", "dateOfJoining", "id", "modeOfTransportation", "student", "studyConductCertificate", "transferCertificate" FROM "academicDetails";
DROP TABLE "academicDetails";
ALTER TABLE "new_academicDetails" RENAME TO "academicDetails";
CREATE TABLE "new_management" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT,
    "loginId" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,
    "dob" DATETIME,
    "dateOfJoining" DATETIME,
    "gender" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "email" TEXT,
    "experience" TEXT,
    "previousPosition" TEXT,
    "previousWorkPlace" TEXT,
    "yearOfGraduation" DATETIME,
    "tenthMarksMemo" TEXT,
    "intermediateMarksMemo" TEXT,
    "graduationCertificate" TEXT,
    "experienceCertificate" TEXT,
    "aadharNumber" TEXT,
    "bankPassbook" TEXT,
    "mobileNumber" INTEGER,
    "religion" TEXT,
    "nationality" TEXT,
    "address" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "organisationId" TEXT NOT NULL,
    CONSTRAINT "management_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_management" ("aadharNumber", "address", "bankPassbook", "dateOfJoining", "dob", "email", "experience", "experienceCertificate", "fatherName", "firstName", "gender", "graduationCertificate", "id", "img", "intermediateMarksMemo", "lastName", "loginId", "mobileNumber", "motherName", "nationality", "password", "previousPosition", "previousWorkPlace", "religion", "tenthMarksMemo", "userName", "yearOfGraduation") SELECT "aadharNumber", "address", "bankPassbook", "dateOfJoining", "dob", "email", "experience", "experienceCertificate", "fatherName", "firstName", "gender", "graduationCertificate", "id", "img", "intermediateMarksMemo", "lastName", "loginId", "mobileNumber", "motherName", "nationality", "password", "previousPosition", "previousWorkPlace", "religion", "tenthMarksMemo", "userName", "yearOfGraduation" FROM "management";
DROP TABLE "management";
ALTER TABLE "new_management" RENAME TO "management";
CREATE TABLE "new_nonTeachingStaff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loginId" INTEGER,
    "img" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "dob" DATETIME,
    "dateOfJoining" DATETIME,
    "gender" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "email" TEXT,
    "experience" TEXT,
    "previousPosition" TEXT,
    "previousWorkPlace" TEXT,
    "tenthMarksMemo" TEXT,
    "intermediateMarksMemo" TEXT,
    "graduationCertificate" TEXT,
    "experienceCertificate" TEXT,
    "aadharNumber" TEXT,
    "bankPassbook" TEXT,
    "mobileNumber" INTEGER,
    "religion" TEXT,
    "nationality" TEXT,
    "address" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "organisationId" TEXT NOT NULL,
    CONSTRAINT "nonTeachingStaff_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_nonTeachingStaff" ("aadharNumber", "address", "bankPassbook", "dateOfJoining", "dob", "email", "experience", "experienceCertificate", "fatherName", "firstName", "gender", "graduationCertificate", "id", "img", "intermediateMarksMemo", "lastName", "loginId", "mobileNumber", "motherName", "nationality", "password", "previousPosition", "previousWorkPlace", "religion", "tenthMarksMemo", "userName") SELECT "aadharNumber", "address", "bankPassbook", "dateOfJoining", "dob", "email", "experience", "experienceCertificate", "fatherName", "firstName", "gender", "graduationCertificate", "id", "img", "intermediateMarksMemo", "lastName", "loginId", "mobileNumber", "motherName", "nationality", "password", "previousPosition", "previousWorkPlace", "religion", "tenthMarksMemo", "userName" FROM "nonTeachingStaff";
DROP TABLE "nonTeachingStaff";
ALTER TABLE "new_nonTeachingStaff" RENAME TO "nonTeachingStaff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
