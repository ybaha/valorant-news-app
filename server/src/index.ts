import express from "express";
import { Post, Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3002;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/post", async (req: any, res) => {
  let posts;
  let tags = req.query.tags;

  if (tags) {
    tags = tags.split(",");
    posts = await prisma.post.findMany({
      where: { tags: { hasEvery: [...tags] } },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  } else
    posts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });

  res.send({ posts });
});

const createPost = (d: Post) => {
  return Prisma.validator<Prisma.PostCreateInput>()({
    ...d,
  });
};

const maps = ["Haven", "Fracture", "Icebox", "Ascent", "Split", "Bind"];

const sortTags = (tags: string[]) => {
  let firstArray: string[] = [];
  let secondArray: string[] = [];
  tags.forEach((tag) => {
    if (maps.includes(tag)) secondArray.push(tag);
    else firstArray.push(tag);
  });
  firstArray = firstArray.sort((a, b) => a.localeCompare(b));
  secondArray = secondArray.sort((a, b) => a.localeCompare(b));
  return [...firstArray, ...secondArray];
};

app.post("/post/create", async (req, res) => {
  let post;
  const data = createPost(req.body);
  data.tags = sortTags(data.tags);

  try {
    post = await prisma.post.create({ data });
  } catch (e) {
    res.send("Error");
  }

  res.send(post);
});

app.post("/post/report", async (req, res) => {
  console.log(req.body);
  const postId = req.body.postId;
  const isUndo = req.body.isUndo;
  if (!postId || typeof isUndo == "undefined") return;

  console.log(isUndo);

  const val = isUndo ? -1 : 1;

  const post = await prisma.post.update({
    where: { id: postId },
    data: { reportCount: { increment: val } },
  });

  return res.send({ reportCount: post.reportCount });
});

app.post("/post/vote", async (req, res) => {
  const {
    shouldUndoDownvoteFirst,
    shouldUndoUpvoteFirst,
    upvote,
    downvote,
    postId,
  } = req.body;
  let post;

  if (upvote) {
    if (shouldUndoUpvoteFirst)
      post = await prisma.post.update({
        where: { id: postId },
        data: { upvotes: { decrement: 1 } },
      });
    else if (shouldUndoDownvoteFirst)
      post = await prisma.post.update({
        where: { id: postId },
        data: { upvotes: { increment: 1 }, downvotes: { increment: -1 } },
      });
    else
      post = await prisma.post.update({
        where: { id: postId },
        data: { upvotes: { increment: 1 } },
      });
  }
  if (downvote) {
    if (shouldUndoDownvoteFirst)
      post = await prisma.post.update({
        where: { id: postId },
        data: { downvotes: { decrement: 1 } },
      });
    else if (shouldUndoUpvoteFirst)
      post = await prisma.post.update({
        where: { id: postId },
        data: { upvotes: { increment: -1 }, downvotes: { increment: 1 } },
      });
    else
      post = await prisma.post.update({
        where: { id: postId },
        data: { downvotes: { increment: 1 } },
      });
  }

  return res.send(post);
});

// app.post('post/update/:id')

app.listen(port, () => {
  console.log(`💎 App listening on port ${port}`);
});
