/*
  Warnings:

  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postsId_fkey";

-- DropTable
DROP TABLE "Posts";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "header" TEXT,
    "text" TEXT,
    "videoUrl" TEXT,
    "ImageUrl" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "author" TEXT NOT NULL DEFAULT E'admin',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "reportCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
