"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const filter_constants_1 = require("../../app/utils/filter-constants");
const app = (0, express_1.default)();
const port = process.env.NODE_ENV === "production" ? 3003 : 3002;
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let posts;
    let tags = req.query.tags;
    try {
        if (tags) {
            tags = tags.split(",");
            posts = yield prisma.post.findMany({
                where: { tags: { hasEvery: [...tags] } },
                orderBy: { createdAt: "desc" },
                take: 10,
            });
        }
        else
            posts = yield prisma.post.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
            });
    }
    catch (e) {
        console.log(e, "\n error on get /post");
    }
    res.send({ posts });
}));
const createPost = (d) => {
    return client_1.Prisma.validator()(Object.assign({}, d));
};
const sortTags = (tags) => {
    let firstArray = [];
    let secondArray = [];
    let thirdArray = [];
    tags.forEach((tag) => {
        if (filter_constants_1.agents.includes(tag))
            firstArray.push(tag);
        if (filter_constants_1.maps.includes(tag))
            secondArray.push(tag);
        else
            thirdArray.push(tag);
    });
    firstArray = firstArray.sort((a, b) => a.localeCompare(b));
    secondArray = secondArray.sort((a, b) => a.localeCompare(b));
    thirdArray = thirdArray.sort((a, b) => a.localeCompare(b));
    return [...firstArray, ...secondArray, ...thirdArray];
};
app.post("/post/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.headers["password"];
    let post;
    const data = createPost(req.body);
    data.tags = sortTags(data.tags);
    if (password != "202cb962ac59075b964b07152d234b70") {
        return res.send({ error: "Not authorized" });
    }
    try {
        post = yield prisma.post.create({ data });
    }
    catch (e) {
        res.send("Error");
    }
    res.send(post);
}));
app.post("/post/report", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const postId = req.body.postId;
    const isUndo = req.body.isUndo;
    if (!postId || typeof isUndo == "undefined")
        return;
    const val = isUndo ? -1 : 1;
    let post;
    try {
        post = yield prisma.post.update({
            where: { id: postId },
            data: { reportCount: { increment: val } },
        });
    }
    catch (e) {
        console.log(e, "\n Report error", "\n post id" + postId);
    }
    return res.send({ reportCount: post === null || post === void 0 ? void 0 : post.reportCount });
}));
app.post("/post/vote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shouldUndoDownvoteFirst, shouldUndoUpvoteFirst, upvote, downvote, postId, } = req.body;
    let post;
    try {
        if (upvote) {
            if (shouldUndoUpvoteFirst)
                post = yield prisma.post.update({
                    where: { id: postId },
                    data: { upvotes: { decrement: 1 } },
                });
            else if (shouldUndoDownvoteFirst)
                post = yield prisma.post.update({
                    where: { id: postId },
                    data: { upvotes: { increment: 1 }, downvotes: { increment: -1 } },
                });
            else
                post = yield prisma.post.update({
                    where: { id: postId },
                    data: { upvotes: { increment: 1 } },
                });
        }
        if (downvote) {
            if (shouldUndoDownvoteFirst)
                post = yield prisma.post.update({
                    where: { id: postId },
                    data: { downvotes: { decrement: 1 } },
                });
            else if (shouldUndoUpvoteFirst)
                post = yield prisma.post.update({
                    where: { id: postId },
                    data: { upvotes: { increment: -1 }, downvotes: { increment: 1 } },
                });
            else
                post = yield prisma.post.update({
                    where: { id: postId },
                    data: { downvotes: { increment: 1 } },
                });
        }
    }
    catch (e) {
        console.log("Can not update post", postId);
    }
    return res.send(post);
}));
// app.post('post/update/:id')
app.listen(port, () => {
    console.log(`💎 App listening on port ${port} NODE_ENV: ${process.env.NODE_ENV}`);
});
