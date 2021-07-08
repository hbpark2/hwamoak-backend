/*
  Warnings:

  - Added the required column `likeCount` to the `Plants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plants" ADD COLUMN     "likeCount" INTEGER NOT NULL;
