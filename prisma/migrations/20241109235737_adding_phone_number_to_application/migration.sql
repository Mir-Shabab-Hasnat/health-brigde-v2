/*
  Warnings:

  - Added the required column `phoneNumber` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "healthNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "symptoms" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Application_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("createdAt", "dateOfBirth", "healthNumber", "id", "issue", "medications", "name", "patientId", "severity", "status", "symptoms", "updatedAt") SELECT "createdAt", "dateOfBirth", "healthNumber", "id", "issue", "medications", "name", "patientId", "severity", "status", "symptoms", "updatedAt" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
