"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthorization = void 0;
const userObj_1 = require("../models/userObj");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTAuthorization {
    static ValidateToken(headers) {
        // check headers and verify token
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
            try {
                let user = jsonwebtoken_1.default.verify(headers.authorization.split(' ')[1], JWTAuthorization.SecretSalt);
                if (user.UserData) {
                    let currUser = userObj_1.User.toUser(user.UserData);
                    if (currUser instanceof userObj_1.User) { //get user 
                        if (userObj_1.userArray.find(user => user.userId === currUser.userId))
                            return currUser;
                        else
                            throw `Invalid User ${currUser.userId}`;
                    }
                    else
                        throw 'Incorrect User Data in token';
                }
                else
                    throw 'Incorrect User Data in token';
            }
            catch (exception) {
                return exception.toString();
            }
        }
        else
            throw 'Invalid Authorization!';
    } //end VALIDATETOKEN()
    static CreateToken(user) {
        console.log(user);
        let token = jsonwebtoken_1.default.sign({ UserData: user }, JWTAuthorization.SecretSalt, { expiresIn: 15000, subject: user.userId });
        console.log(token);
        return token;
    }
} // end JWT Authorization class
exports.JWTAuthorization = JWTAuthorization;
// generated using grc/ppp
JWTAuthorization.SecretSalt = 'BCF130148D19B6A7D6FBDC53BA472D98722DD27E16B46A22E3AAF4EE50E9ADAD';
//# sourceMappingURL=jwtAuth.js.map