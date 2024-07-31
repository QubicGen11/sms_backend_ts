-- CreateTable
CREATE TABLE "Organisation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateTable
CREATE TABLE "Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "organisationId" INTEGER,
    "organisationName" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "founderName" TEXT,
    "mainBranch" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Branch_organisationName_fkey" FOREIGN KEY ("organisationName") REFERENCES "Organisation" ("organisationName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "password" TEXT,
    "role" TEXT,
    "branchId" INTEGER,
    "organisationName" TEXT NOT NULL,
    "branchName" TEXT,
    CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_organisationName_fkey" FOREIGN KEY ("organisationName") REFERENCES "Organisation" ("organisationName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
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
    "password" TEXT
);

-- CreateTable
CREATE TABLE "academicDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "class" TEXT,
    "modeOfTransportation" TEXT,
    "IdentificationMarks" TEXT,
    "studyConductCertificate" TEXT,
    "transferCertificate" TEXT,
    "dateOfJoining" DATETIME,
    "student" INTEGER NOT NULL,
    CONSTRAINT "academicDetails_student_fkey" FOREIGN KEY ("student") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teachers" (
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
    "password" TEXT
);

-- CreateTable
CREATE TABLE "nonTeachingStaff" (
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
    "password" TEXT
);

-- CreateTable
CREATE TABLE "management" (
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
    "password" TEXT
);

-- CreateTable
CREATE TABLE "employeeInformation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT,
    "qualification" TEXT,
    "experience" TEXT,
    "dateOfGraduation" DATETIME,
    "dateOfJoining" DATETIME,
    "class" TEXT,
    "teacher" INTEGER NOT NULL,
    "nonTeachingStaff" INTEGER NOT NULL,
    "management" INTEGER NOT NULL,
    CONSTRAINT "employeeInformation_teacher_fkey" FOREIGN KEY ("teacher") REFERENCES "Teachers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "employeeInformation_nonTeachingStaff_fkey" FOREIGN KEY ("nonTeachingStaff") REFERENCES "nonTeachingStaff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "employeeInformation_management_fkey" FOREIGN KEY ("management") REFERENCES "management" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "updatedStudent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "motherTougue" TEXT NOT NULL,
    "studentAaadharNumber" INTEGER NOT NULL,
    "rationCardNumber" INTEGER NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherQualification" TEXT NOT NULL,
    "fatherAadharNumber" INTEGER NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherQualification" TEXT NOT NULL,
    "motherAadharNumber" INTEGER NOT NULL,
    "motherBankName" TEXT NOT NULL,
    "parentAddress" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "lastSchoolStudied" TEXT NOT NULL,
    "dateOfAdmission" DATETIME NOT NULL,
    "tcStatus" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_organisationName_key" ON "Organisation"("organisationName");
