"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSalt = exports.userArray = exports.User = void 0;
const email_validator_1 = __importDefault(require("email-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    constructor(userId, firstName, lastName, emailAddress, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    } //end constructor
    static toUser(userObj) {
        return userObj.hasOwnProperty("userId") &&
            userObj.hasOwnProperty("firstName") &&
            userObj.hasOwnProperty("lastName") &&
            userObj.hasOwnProperty("emailAddress")
            ? new User(userObj.userId, userObj.firstName, userObj.lastName, userObj.emailAddress, "")
            : false;
    }
    // remove password from results 
    toJson() {
        let repeatUser = User.toUser(this);
        delete repeatUser.password;
        return repeatUser;
    }
    // validate emal using validator 
    static ValidateEmail(emailAddress) {
        return email_validator_1.default.validate(emailAddress);
    }
    // use bcrypt to validate pass
    ValidatePassword(password) {
        return bcrypt_1.default.compare(password, this.password);
    }
    setPassword(password) {
        bcrypt_1.default.hash(password, 10, (_err, hash) => {
            this.password = hash;
        });
    }
} //end USER class
exports.User = User;
const userArray = [];
exports.userArray = userArray;
let GlobalSalt = '';
exports.GlobalSalt = GlobalSalt;
//# sourceMappingURL=userObj.js.map