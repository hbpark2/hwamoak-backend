/*
  Warnings:

  - Added the required column `title` to the `Plants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plants" ADD COLUMN     "title" TEXT NOT NULL;
