"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const userObj_1 = require("../models/userObj");
const jwtAuth_1 = require("../utils/jwtAuth");
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
// DELETE ROUTES --> first find user, if not found then can not delete user 
usersRouter.delete("/:userId", (req, res, next) => {
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        //locate user to delete 
        if (userObj_1.userArray.some((user) => user.userId === req.params.userId)) {
            // const userIDX = req.params.userId;
            const userIndex = userObj_1.userArray.findIndex(user => user.userId === req.params.userId);
            userObj_1.userArray.splice(userIndex, 1);
            res.status(204);
            res.send({ message: "User has been successfully deleted" });
        }
        else {
            res.status(404).send({ message: "User not located or does not exist!" });
        }
    }
    else {
        res.status(401).send({ message: "Not Authorized!" });
    }
});
// POST ROUTES
usersRouter.post("/", (req, res, next) => {
    // create user Object using toUser method
    let currUser = userObj_1.User.toUser(req.body);
    if (currUser instanceof userObj_1.User) {
        // check if userId has already been created
        if (userObj_1.userArray.filter((user) => user.userId == currUser.userId)
            .length === 0) {
            // validate email address upon creation
            if (userObj_1.User.ValidateEmail(currUser.emailAddress)) {
                // if valid email, setPassword and add new user to userArray
                currUser.setPassword(req.body.password);
                userObj_1.userArray[userObj_1.userArray.length] = currUser;
                res.status(201).send(currUser.toJson());
            }
            else
                res.status(406).send({ message: "Invalid email address.", string: currUser.emailAddress });
        }
        else
            res.status(409).send({ message: "Duplicate userID" });
    }
    else
        res.status(406).send({ message: "Incorrect user data received" });
});
//  ALL PATCH REQUEST
usersRouter.patch("/:userId", (req, res, next) => {
    // do AUTHJWT prior to doing a patch request
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        // patch a user and send correct status codes.. accepts param userID
        if (userObj_1.userArray.some((user) => user.userId === req.params.userId)) {
            // create var to hold current user
            let currentUser = userObj_1.userArray.find((user) => user.userId === req.params.userId);
            if (req.body.firstName)
                currentUser.firstName = req.body.firstName;
            console.log("Successfully changed first name!");
            if (req.body.lastName)
                currentUser.lastName = req.body.lastName;
            console.log("Successfully changed last name!");
            if (req.body.emailAddress)
                currentUser.emailAddress = req.body.emailAddress;
            console.log("Successfully changed email address!");
            if (req.body.password)
                currentUser.password = req.body.userPassword;
            console.log("Successfully changed password!");
        }
        else {
            res.status(404).send({ message: "User not located or does not exist..." });
        }
    }
}); // END PATCH REQUEST
//  ALL GET REQUEST
usersRouter.get("/:userId", (req, res, next) => {
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        if (userObj_1.userArray.some((user) => user.userId === req.params.userId)) {
            res.status(200).send(currUser);
        }
        else {
            res.status(404).send({ message: "User not located or does not exist!" });
        }
    }
    else {
        res.status(401).send({ message: "Not Authorized!" });
    }
});
usersRouter.get("/:userId/:password", (req, res, next) => {
    let currUser = userObj_1.userArray.filter((user) => user.userId === req.params.userId);
    if (currUser.length > 0) {
        currUser[0].ValidatePassword(req.params.password).then((checkPassword) => {
            if (checkPassword) {
                let getToken = jwtAuth_1.JWTAuthorization.CreateToken(currUser[0]);
                res.status(200).send({ token: getToken });
            }
            else {
                res.status(401).send({ message: "Invalid password or userName" });
            }
        })
            .catch((exception) => {
            console.log(exception);
        });
    }
});
//Still returning the password, but it is hashed at least.
usersRouter.get("/", (req, res, next) => {
    // verify token
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        res.status(200).send(userObj_1.userArray);
    }
    else {
        res.status(401).send({ message: "No users to show or you are not authorized" });
    }
});
//# sourceMappingURL=Users.js.map