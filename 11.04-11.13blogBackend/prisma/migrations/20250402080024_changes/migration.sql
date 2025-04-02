/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorName" TEXT NOT NULL DEFAULT 'John Doe',
    "postId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("content", "id", "postId") SELECT "content", "id", "postId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorName" TEXT NOT NULL DEFAULT 'John Doe',
    "avatarURL" TEXT NOT NULL DEFAULT 'https://randomuser.me/api/portraits/lego/1.jpg',
    "categoryId" INTEGER,
    CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("categoryId", "content", "id", "published", "title") SELECT "categoryId", "content", "id", "published", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
