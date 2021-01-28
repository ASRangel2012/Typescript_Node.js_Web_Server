import { exception } from "console";
import express from "express";
import { User, userArray } from "../models/userObj";

import { JWTAuthorization } from "../utils/jwtAuth";

const usersRouter = express.Router();

// DELETE ROUTES --> first find user, if not found then can not delete user 
usersRouter.delete("/:userId", (req, res, next) => {
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if (currUser instanceof User) {

    //locate user to delete 
    if (userArray.some((user) => user.userId === req.params.userId)) {
      // const userIDX = req.params.userId;
      const userIndex = userArray.findIndex(user => user.userId === req.params.userId);
      userArray.splice(userIndex, 1);
      res.status(204);
      res.send({ message: "User has been successfully deleted" });
    } else {
      res.status(404).send({ message: "User not located or does not exist!" });
    }
  } else {
    res.status(401).send({ message: "Not Authorized!" });
  }
});


// POST ROUTES
usersRouter.post("/", (req, res, next) => {
  // create user Object using toUser method
  let currUser = User.toUser(req.body);
  if (currUser instanceof User) {
    // check if userId has already been created
    if (
      userArray.filter((user) => user.userId == (<User>currUser).userId)
        .length === 0
    ) {
      // validate email address upon creation
      if (User.ValidateEmail(currUser.emailAddress)) {
        // if valid email, setPassword and add new user to userArray

        currUser.setPassword(req.body.password);
        userArray[userArray.length] = currUser;
        res.status(201).send(currUser.toJson());
      } else
        res.status(406).send({ message: "Invalid email address.", string: currUser.emailAddress });
    } else
      res.status(409).send({ message: "Duplicate userID" });
  } else
    res.status(406).send({ message: "Incorrect user data received" });
});

//  ALL PATCH REQUEST
usersRouter.patch("/:userId", (req, res, next) => {
  // do AUTHJWT prior to doing a patch request
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if (currUser instanceof User) {
    //locate user
    let currentUser = userArray.filter(user => user.userId === req.params.userId);
    if (currentUser.length > 0) {
      if (currentUser[0].userId === currUser.userId) {
        if (req.body.firstName) {
          currentUser[0].firstName = req.body.firstName;
        }
        if (req.body.lastName) {
          currentUser[0].lastName = req.body.lastName;
        }
        if (req.body.emailAddress) {
          currentUser[0].emailAddress = req.body.emailAddress;
        }
        res.status(200).send(currentUser[0]);
      } else {
        res.status(401).send({ message: `Unauthorized Access, Request Denied for USER: ${currUser.userId}. Please note only the original user can make desired changes.` });
      }
    } else {
      // Post Not Found
      res.status(404).send({ message: `User: ${req.params.userId} cannot be located, pleaset try using a different userId.` });
    }
  } else {
    // Not Authorized 
    res.status(401).send({ message: "Get yourself a TOKEN. NOT AUTHORIZED FOOL " });
  }
}); // END PATCH REQUEST

//  ALL GET REQUEST
usersRouter.get("/:userId", (req, res, next) => {
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if (currUser instanceof User) {
    if (userArray.some((user) => user.userId === req.params.userId)) {
      res.status(200).send(currUser);
    } else {
      res.status(404).send({ message: "User not located or does not exist!" });
    }
  } else {
    res.status(401).send({ message: "Not Authorized!" });
  }
});

usersRouter.get("/:userId/:password", (req, res, next) => {
  let currUser = userArray.filter((user) => user.userId ===req.params.userId);
  if (currUser.length > 0) {
    currUser[0].ValidatePassword(req.params.password).then((checkPassword) => {
      if (checkPassword) {
        let getToken = JWTAuthorization.CreateToken(currUser[0]);
        res.status(200).send({ token: getToken });
      } else {
        res.status(401).send({ message: "Invalid password or userName" });
      }
    })
      .catch((exception) => {
        console.log(exception);
      });
  }else{
    res.status(401).send({ message: "Invalid password or userName" });
  }
});

//Still returning the password, but it is hashed at least.
usersRouter.get("/", (req, res, next) => {
  // verify token
  let currUser = JWTAuthorization.ValidateToken(req.headers);
  if (currUser instanceof User) {
    res.status(200).send(userArray);
  } else {
    res.status(401).send({ message: "No users to show or you are not authorized" });
  }
});

export { usersRouter };
