import express from 'express';
import { PostCategory, postCategoryArray } from '../models/PostCategoryObject';
import { User } from '../models/userObj';
import { JWTAuthorization } from '../utils/jwtAuth';


const postCatRouter = express.Router();

// DELETE ROUTES
postCatRouter.delete("Posts/:postId/Categories:categoryId", (req, res, next) => {
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if (currUser instanceof User) {
    //once verified get the category that needs to be deleted 
    let onDeleteCategory = postCategoryArray.filter(currCategory => currCategory.categoryId === +req.params.categoryId);
    if (onDeleteCategory.length > 0) {
      if (onDeleteCategory[0].categoryId === req.body.categoryId) {
        postCategoryArray.splice(postCategoryArray.findIndex(category => category.categoryId === + req.params.categoryId), 1);
        res.status(204).send({ message: 'Deleted' });
      } else {
        res.status(404).send({ message: `Category: ${req.params.categoryId} does not exist!` });
      }
    } else {
      res.status(401).send({ message: 'There are no categories to show!' });
    }
  } else {
    res.status(401).send({ message: 'NOT AUTHORIZED. YOU ARE NOT WORTHY ENOUGH TO DELETE THIS CATEGORY.' });
  }
});

// PostCategory POST ROUTE
postCatRouter.post("/Posts/:postId/Categories/:categoryId", (req, res, next) => {
  // Check that Token 
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if (currUser instanceof User) {
    //check that REQ for the right stuffff if(title or content not present )
    if (!req.body.postId || !req.body.categoryId) {
      res.status(406).send({ message: "Need a postID and a categoryId, mate. Try again!" });
    }
    if(postCategoryArray.filter((postCat) => postCat.categoryId == (<PostCategory>postCat).categoryId).length === 0) {
      var onPostCat = new PostCategory(req.body.postId, req.body.categoryId);
      postCategoryArray[postCategoryArray.length] = onPostCat;//push to array
      res.status(200).send(onPostCat);
    } else {
      res.status(409).send({ message: "Duplicate categoryId" });
    }
  } else {
    res.status(401).send({ message: "No way, Jose. You are not authorized! Try again with a correct bearer token! " })
  }
});

// ALL GET REQUEST
postCatRouter.get("/Posts/:postId", (req, res, next) => {
  // locate Cat
  let category = postCategoryArray.filter(currCategory => currCategory.categoryId === +req.params.categoryId);
  if (category.length > 0) {
    res.status(200).send(category[0]);
  } else {
    res.status(404).send({ message: `Category: ${req.params.categoryId} not found` });
  }
});

postCatRouter.get("/", (req, res, next) => {
  res.status(200).send(postCategoryArray);
});

export { postCatRouter };