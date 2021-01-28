import EmailValidator, { validate } from "email-validator";
import bcyrpt from "bcrypt";

interface I_user {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password?: string;
}

export class User implements I_user {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public emailAddress: string,
    public password: string
  ) { } //end constructor

  static toUser(userObj: any): User | boolean {
    return userObj.hasOwnProperty("userId") &&
      userObj.hasOwnProperty("firstName") &&
      userObj.hasOwnProperty("lastName") &&
      userObj.hasOwnProperty("emailAddress")
      ? new User(
        userObj.userId,
        userObj.firstName,
        userObj.lastName,
        userObj.emailAddress,
        ""
      )
      : false;
  }
  
  // remove password from results 
   toJson() {
    let repeatUser = <any>User.toUser(this);
    delete repeatUser.password;
    return repeatUser;
  }
  
  // validate emal using validator 
  static ValidateEmail(emailAddress: string): boolean {
    return EmailValidator.validate(emailAddress);
  }

  // use bcrypt to validate pass
  ValidatePassword(password: string) {
    return bcyrpt.compare(password, this.password);
  }

  setPassword(password: string){
    bcyrpt.hash(password,10, (_err,hash)=>{
      this.password = hash;
    });
  }

} //end USER class

const userArray: User[] = [];
let GlobalSalt = '';
export { userArray, GlobalSalt };
