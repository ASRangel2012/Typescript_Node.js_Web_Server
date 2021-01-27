import express from 'express';
import {Comment, commentArray } from '../models/CommentObject';
import { postArray } from '../models/PostObject';

import { User } from '../models/userObj';
import { JWTAuthorization } from '../utils/jwtAuth';


const commentRouter = express.Router();

// DELETE ROUTES
commentRouter.delete("/Posts/:postId/Comments/:commentId", (req,res,next) =>{
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if(currUser instanceof User){
    //once verified get the comment that needs to be deleted 
    let onDeleteComment = commentArray.filter(currcomment => currcomment.commentId===+req.params.commentId);
    if(onDeleteComment.length>0){ 
      if(onDeleteComment[0].commentId === req.body.commentId){
        commentArray.splice(commentArray.findIndex(comment => comment.commentId ===+ req.params.commentId), 1);
        res.status(204).send({message: 'Deleted'});
      }else{
        res.status(404).send({message:`Comment: ${req.params.commentId} does not exist!`});
      }
    }else{
      res.status(401).send({message: 'There are no comments to show!'});
    }
  }else{
    res.status(401).send({message: 'NOT AUTHORIZED. YOU ARE NOT WORTHY ENOUGH TO DELETE THIS COMMENT.'});
  }
});

// comment ROUTES
commentRouter.post("/Posts/:postId", (req, res, next) => {
  // Check that Token 
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if(currUser instanceof User){
    if(!req.body.postId){
      res.status(406).send({message:"Check yourself,fool. Comments need a POSTID."});
    }else{
        const onComment = new Comment(req.body.commentId, req.body.comment, req.body.userId,req.body.postId,req.body.commentDate);
        commentArray[commentArray.length]=onComment;//push to array
        res.status(200).send(onComment); 
    }
  }else{
    res.status(401).send({message:"No way, Jose. You are not authorized! Try again with a correct bearer token! "})
  }
});

// ALL PATCH REQUEST
commentRouter.patch("/Posts/:postId/Comments/:commentId", (req, res, next) => {
  let currUser = JWTAuthorization.ValidateToken(req.headers); // Check for Authorized User 
  if(currUser instanceof User){
    let currentComment = commentArray.filter(currcomment => currcomment.commentId===+req.params.commentId);
    if(currentComment.length>0){
      if(currentComment[0].commentId===req.body.commentId){
        if(req.body.comment){
          currentComment[0].comment = req.body.comment;
        }
        res.status(200).send(currentComment[0]);
      }else{
        // Wrong User Trying To Do Funky Stuff 
        res.status(401).send({message: `Unauthorized Access, Request Denied for USER: ${currUser.userId}. Please note only the original comment creator can make desired changes.`});
      }
    }else{
      // Post Not Found
      res.status(404).send({message:`Comment: ${req.params.commentId} cannot be located, pleaset try using a different commentId.`})
    }
  }else{
    // Not Authorized 
    res.status(401).send({message:"Get yourself a TOKEN. NOT AUTHORIZED FOOL "})
  }
})

// ALL GET REQUEST
commentRouter.get("/Posts/:postId", (req, res, next) => {
  // locate Comment related to post
  let commentRelatedPost = postArray.filter(currPost => currPost.postId===+req.params.postId);
  if(commentRelatedPost.length>0){
    res.status(200).send(commentArray.filter(comment => comment.commentId === +req.params.commentId));
  }else{
    res.status(404).send({message:`${req.params.commentId} not found`});
  }
  
});

commentRouter.get("/Posts/:postId/Comments/:commentId", (req,res,next) => {
  let comment = commentArray.filter(currcomment => currcomment.commentId===+req.params.commentId);
  if(comment.length>0){
    res.status(200).send(comment[0]);
  }else{
    res.status(404).send({message:`comment: ${req.params.commentId} not found`});
  }
});

commentRouter.get("/", (req, res, next) => {
  // get all categories --> No need to authenticate 
  res.status(200).send(commentArray);
});

export { commentRouter };