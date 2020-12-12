import express from 'express';
import { Post, postArray } from "../models/PostObject";

const postsRouter = express.Router();

//DELETE ROUTES

//POST ROUTES
postsRouter.post("/posts", (req, res, next) => {
})

//ALL PATCH REQUEST
postsRouter.patch("/posts/:postId", (req, res, next) => {
})

//ALL GET REQUEST
postsRouter.get("/posts/:postId", (req, res, next) => {
});

postsRouter.get("/posts", (req, res, next) => {
  //get all posts
  res.send(postArray);
});

export { postsRouter };