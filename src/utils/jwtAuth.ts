import express from 'express';
import { IncomingHttpHeaders } from "http";
import { User, userArray } from '../models/userObj';
import jwt from 'jsonwebtoken';

export class JWTAuthorization {
    static SecretSalt = 'BCF130148D19B6A7D6FBDC53BA472D98722DD27E16B46A22E3AAF4EE50E9ADAD'
    //generated using grc/ppp
    static ValidateToken(headers: IncomingHttpHeaders): User | string {
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
            try {
                let user = jwt.verify(headers.authorization.split(' ')[1],JWTAuthorization.SecretSalt) as any;
                if (user.UserData) {
                    let currUser = User.toUser(user.UserData)
                    if (currUser instanceof User) {
                        if (userArray.find(user => user.userId === (<User>currUser).userId))
                            return currUser;
                        else
                            throw `Invalid User ${(<User>currUser).userId}`;
                    }
                    else
                        throw 'Incorrect User Data in TOKEN'
                }
                else
                    throw 'Incorrect User Data in Token'
            }
            catch (exception) {
                return exception.toString();
            }
        }
        else
            throw 'Invalid Authorization Header';
    }

    static CreateToken(
        user:User){
        console.log(user);
        let token = jwt.sign({UserData:user},JWTAuthorization.SecretSalt,{expiresIn: 900,subject:user.userId});
        console.log(token);
        return token;
    }
}//end JWT Authorization class