"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCatRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostCategoryObject_1 = require("../models/PostCategoryObject");
const userObj_1 = require("../models/userObj");
const jwtAuth_1 = require("../utils/jwtAuth");
const postCatRouter = express_1.default.Router();
exports.postCatRouter = postCatRouter;
// DELETE ROUTES
postCatRouter.delete("Posts/:postId/PostCategory/:categoryId", (req, res, next) => {
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        //once verified get the category that needs to be deleted 
        let onDeleteCategory = PostCategoryObject_1.postCategoryArray.filter(currCategory => currCategory.categoryId === +req.params.categoryId);
        if (onDeleteCategory.length > 0) {
            if (onDeleteCategory[0].categoryId === req.body.categoryId) {
                PostCategoryObject_1.postCategoryArray.splice(PostCategoryObject_1.postCategoryArray.findIndex(category => category.categoryId === +req.params.categoryId), 1);
                res.status(204).send({ message: 'Deleted' });
            }
            else {
                res.status(404).send({ message: `Category: ${req.params.categoryId} does not exist!` });
            }
        }
        else {
            res.status(401).send({ message: 'There are no categories to show!' });
        }
    }
    else {
        res.status(401).send({ message: 'NOT AUTHORIZED. YOU ARE NOT WORTHY ENOUGH TO DELETE THIS CATEGORY.' });
    }
});
// PostCategory POST ROUTE
postCatRouter.post("/Posts/:postId/:categoryId", (req, res, next) => {
    // Check that Token 
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        //check that REQ for the right stuffff if(title or content not present )
        if (!req.body.postId || !req.body.categoryId) {
            res.status(406).send({ message: "Need a postID and a categoryId, mate. Try again!" });
        }
        if (PostCategoryObject_1.postCategoryArray.filter((postCat) => postCat.categoryId == postCat.categoryId).length === 0) {
            var onPostCat = new PostCategoryObject_1.PostCategory(req.body.postId, req.body.categoryId);
            PostCategoryObject_1.postCategoryArray[PostCategoryObject_1.postCategoryArray.length] = onPostCat; //push to array
            res.status(200).send(onPostCat);
        }
        else {
            res.status(409).send({ message: "Duplicate categoryId" });
        }
    }
    else {
        res.status(401).send({ message: "No way, Jose. You are not authorized! Try again with a correct bearer token! " });
    }
});
// ALL GET REQUEST
postCatRouter.get("/Posts/:postId", (req, res, next) => {
    // locate Cat
    let category = PostCategoryObject_1.postCategoryArray.filter(currCategory => currCategory.categoryId === +req.params.categoryId);
    if (category.length > 0) {
        res.status(200).send(category[0]);
    }
    else {
        res.status(404).send({ message: `Category: ${req.params.categoryId} not found` });
    }
});
postCatRouter.get("", (req, res, next) => {
    res.status(200).send(PostCategoryObject_1.postCategoryArray);
});
//# sourceMappingURL=PostCategories.js.map