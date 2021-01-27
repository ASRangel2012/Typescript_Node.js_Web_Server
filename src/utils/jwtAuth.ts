import express from 'express';
import { IncomingHttpHeaders } from "http";
import { User, userArray } from '../models/userObj';
import jwt from 'jsonwebtoken';

export class JWTAuthorization {
      // generated using grc/ppp
    static SecretSalt = 'BCF130148D19B6A7D6FBDC53BA472D98722DD27E16B46A22E3AAF4EE50E9ADAD'
    static ValidateToken(headers: IncomingHttpHeaders): User | string {
        // check headers and verify token
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
            try {
                let user = jwt.verify(headers.authorization.split(' ')[1],JWTAuthorization.SecretSalt) as any;
                if (user.UserData) {
                    let currUser = User.toUser(user.UserData);
                    if (currUser instanceof User) { //get user 
                        if (userArray.find(user => user.userId === (<User>currUser).userId))
                            return currUser;
                        else
                            throw `Invalid User ${(<User>currUser).userId}`;
                    }
                    else
                        throw 'Incorrect User Data in token'
                }
                else
                    throw 'Incorrect User Data in token'
            }
            catch (exception) {
                return exception.toString();
            }
        }
        else
            throw 'Invalid Authorization!';
    } //end VALIDATETOKEN()

    static CreateToken(user:User){
        console.log(user);
        const exp = 15000;
        let token = jwt.sign({UserData:user},JWTAuthorization.SecretSalt,{expiresIn: exp ,subject:user.userId});
        console.log(token);
        return token;
    }

}// end JWT Authorization class