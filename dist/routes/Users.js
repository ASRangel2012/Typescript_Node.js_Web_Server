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
        //locate user
        let currentUser = userObj_1.userArray.filter(user => user.userId === req.params.userId);
        if (currentUser.length > 0) {
            if (currentUser[0].userId === currUser.userId) {
                if (req.body.firstName) {
                    currentUser[0].firstName = req.body.firstName;
                }
                if (req.body.lastName) {
                    currentUser[0].lastName = req.body.lastName;
                }
                if (req.body.emailAddress) {
                    if (userObj_1.User.ValidateEmail(req.body.emailAddress)) {
                        currentUser[0].emailAddress = req.body.emailAddress;
                    }
                    else {
                        res.status(418).send({ message: `${req.body.emailAddress} does not follow the correct format,now you're teapot. ` });
                    }
                }
                res.status(200).send(currentUser[0]);
            }
            else {
                res.status(401).send({ message: `Unauthorized Access, Request Denied for USER: ${currUser.userId}. Please note only the original user can make desired changes.` });
            }
        }
        else {
            // User Not Found
            res.status(404).send({ message: `User: ${req.params.userId} cannot be located, pleaset try using a different userId.` });
        }
    }
    else {
        // Not Authorized 
        res.status(401).send({ message: "Get yourself a TOKEN. NOT AUTHORIZED FOOL " });
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
            res.status(404).send({ message: "User not located!" });
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
    else {
        res.status(401).send({ message: "Invalid password or userName" });
    }
});
//Still returning the password, but it is hashed at least.
usersRouter.get("/", (req, res, next) => {
    // verify token
    let currUser = jwtAuth_1.JWTAuthorization.ValidateToken(req.headers);
    if (currUser instanceof userObj_1.User) {
        if (userObj_1.userArray.length < 0) {
            res.status(401).send({ message: 'No Users in the array to show. Please add a new user...' });
        }
        else {
            let removePass = userObj_1.userArray.map(userObj_1.User.toUser);
            res.status(200).send(removePass);
        }
    }
    else {
        res.status(401).send({ message: "You are not authorized, please try again." });
    }
});
//# sourceMappingURL=Users.js.map