"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const userObj_1 = require("../models/userObj");
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
//DELETE ROUTES
//POST ROUTES
usersRouter.post("/Users", (req, res, next) => {
    //create a new user
    console.log(req.body);
    let newUser = userObj_1.User.toUser(req.body);
    if (newUser instanceof userObj_1.User) {
        if (userObj_1.userArray.filter(user => user.userId == newUser.userId).length === 0) {
            if (userObj_1.User.ValidateEmail(newUser.emailAddress)) {
                newUser.ValidatePassword(req.body.password);
                userObj_1.userArray[userObj_1.userArray.length] = newUser;
                res.status(201);
                res.send(newUser);
            }
            else
                res.status(406).send(({ message: 'Invalid email address.' }));
        }
        else
            res.status(409).send(({ message: 'Duplicate UserId' }));
    }
    else
        res.status(406).send(({ message: 'Incorrect user data received' }));
});
//ALL PATCH REQUEST
usersRouter.patch("/Users/:userId", (req, res, next) => {
    //patch a user and send correct status codes.. accepts param userID
    if (userObj_1.userArray.some((user) => user.userId === req.params.userId)) {
        //create var to hold current user
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
        res.send(currentUser);
    }
    else {
        res.status(404).send({ message: "User not located or does not exist..." });
    }
});
//ALL GET REQUEST
usersRouter.get("/Users/:userId", (req, res, next) => {
    //locate specific user and do not return any password information
    if (userObj_1.userArray.some((user) => user.userId === req.params.userId)) {
        res.send(userObj_1.userArray.find((user) => user.userId === req.params.userId));
    }
    else {
        res.status(401).send({ message: "User not located or does not exist!" });
    }
});
usersRouter.get("/Users", (req, res, next) => {
    //get all users
    res.send(userObj_1.userArray);
});
//# sourceMappingURL=Users.js.map