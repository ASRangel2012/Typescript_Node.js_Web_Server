"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostObject_1 = require("../models/PostObject");
const postsRouter = express_1.default.Router();
exports.postsRouter = postsRouter;
//DELETE ROUTES
//POST ROUTES
postsRouter.post("/posts", (req, res, next) => {
});
//ALL PATCH REQUEST
postsRouter.patch("/posts/:postId", (req, res, next) => {
});
//ALL GET REQUEST
postsRouter.get("/posts/:postId", (req, res, next) => {
});
postsRouter.get("/posts", (req, res, next) => {
    //get all posts
    res.send(PostObject_1.postArray);
});
//# sourceMappingURL=Posts.js.map