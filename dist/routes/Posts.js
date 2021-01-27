"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostObject_1 = require("../models/PostObject");
const userObj_1 = require("../models/userObj");
const jwtAuth_1 = require("../utils/jwtAuth");
const postsRouter = express_1.default.Router();
exports.postsRouter = postsRouter;
// DELETE ROUTES
postsRouter.delete("/:postId", (req, res, next) => {
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        //once verified get the post that needs to be deleted 
        let onDeletePost = PostObject_1.postArray.filter(currentPost => currentPost.postId === +req.params.postId);
        if (onDeletePost.length > 0) {
            if (onDeletePost[0].userId === currUser.userId) {
                PostObject_1.postArray.splice(PostObject_1.postArray.findIndex(user => user.postId === +req.params.postId), 1);
                res.status(204).send({ message: 'Deleted' });
            }
            else {
                res.status(404).send({ message: `Post: ${req.params.postId} does not exist!` });
            }
        }
        else {
            res.status(401).send({ message: 'There are no posts to show!' });
        }
    }
    else {
        res.status(401).send({ message: 'NOT AUTHORIZED. YOU ARE NOT WORTHY ENOUGH TO DELETE THIS POST.' });
    }
});
// POST ROUTES
postsRouter.post("/", (req, res, next) => {
    // Check that Token 
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        //check that REQ for the right stuffff if(title or content not present )
        if (!req.body.title || !req.body.content) {
            res.status(406).send({ message: "Check yourself,fool. Post's need a TITLE and CONTENT." });
        }
        else {
            let date = req.body.createdDate;
            date = Date.now;
            let update = req.body.lastUpdated;
            update = Date.now;
            //definitely took this from your lecture. The date will not appear no matter what I do.
            var onPost = new PostObject_1.Post(PostObject_1.postArray.length == 0 ? 1 : Math.max.apply(Math, PostObject_1.postArray.map((somePost) => { return somePost.postId; })) + 1, date, req.body.title, req.body.content, currUser.userId, req.body.headerImage, update);
            //currPost.createdDate.toDateString = req.body.createdDate;
            //currPost.lastUpdated.toDateString = req.body.lastUpdated;
            // var curriPost = Post.toPost(req.body); //doesn't like this at all --> boolean 
            PostObject_1.postArray[PostObject_1.postArray.length] = onPost; //push to array
            res.status(200).send(onPost);
        }
    }
    else {
        res.status(401).send({ message: "No way, Jose. You are not authorized! Try again with a correct bearer token! " });
    }
});
//var onPost = new Post(postArray.length==0?1:Math.max.apply(Math,postArray.map((somePost)=>{return somePost.postId; }))+1,req.body.title, req.body.content,req.body.user);
// ALL PATCH REQUEST
postsRouter.patch("/:postId", (req, res, next) => {
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers); // Check for Authorized User 
    if (currUser instanceof userObj_1.User) {
        let currPost = PostObject_1.postArray.filter(currentPost => currentPost.postId === +req.params.postId);
        if (currPost.length > 0) {
            let onUpdate = false; // used to check which fields were updated and set new date once update is complete 
            if (currPost[0].userId === currUser.userId) {
                if (req.body.title) {
                    currPost[0].title = req.body.title;
                    onUpdate = true;
                }
                if (req.body.content) {
                    currPost[0].content = req.body.content;
                    onUpdate = true;
                }
                if (req.body.headerImage) {
                    currPost[0].headerImage = req.body.headerImage;
                    onUpdate = true;
                }
                if (onUpdate) {
                    currPost[0].lastUpdated = new Date();
                }
                res.status(200).send(currPost[0]);
            }
            else {
                // Wrong User Trying To Do Funky Stuff 
                res.status(401).send({ message: `Unauthorized Access, Request Denied for USER: ${currUser.userId}. Please note only the original post creator can make desired changes.` });
            }
        }
        else {
            // Post Not Found
            res.status(404).send({ message: `Post: ${req.params.postId} cannot be located, pleaset try using a differnt postId.` });
        }
    }
    else {
        // Not Authorized 
        res.status(401).send({ message: "Get yourself a TOKEN. NOT AUTHORIZED FOOL " });
    }
});
// ALL GET REQUEST
postsRouter.get("/:postId", (req, res, next) => {
    // locate post 
    let post = PostObject_1.postArray.filter(currentPost => currentPost.postId === +req.params.postId);
    if (post.length > 0) {
        res.status(200).send(post[0]);
    }
    else {
        res.status(404).send({ message: `Post: ${req.params.postId} not found` });
    }
});
postsRouter.get("/", (req, res, next) => {
    // get all posts --> No need to authenticate 
    res.status(200).send(PostObject_1.postArray);
});
//# sourceMappingURL=Posts.js.map