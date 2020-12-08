"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserObject_1 = require("../models/UserObject");
let userRouter = express_1.default.Router();
userRouter.get("/Users", (req, res, next) => {
});
userRouter.post("/Users", (req, res, next) => {
    let newUser = new UserObject_1.User(req.body.userID, req.body.userFName, req.body.lName, req.body.userEmail, req.body.userPassword);
    let json = JSON.stringify(newUser); //create JSON obj
    console.log('New User {' + json + '}');
});
//# sourceMappingURL=Users-route.js.map