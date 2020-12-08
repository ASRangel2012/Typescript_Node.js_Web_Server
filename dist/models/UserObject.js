"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, firstName, lastName, emailAddress, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    } //end constructor for User obj
    //no need for repititve this.userId = userId
    //because of use of access modifer in constructor params
    ValidatePassword(password) {
        if (this.password === password)
            return true;
        return false;
    }
} //end class User
exports.User = User;
//# sourceMappingURL=UserObject.js.map