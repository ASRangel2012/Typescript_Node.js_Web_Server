export class Post {
  static topost(body: any) {
      throw new Error('Method not implemented.');
  }
  static postId: number;
  emailAddress(emailAddress: any) {
      throw new Error('Method not implemented.');
  }
  ValidatePassword(password: any) {
      throw new Error('Method not implemented.');
  }
  constructor(
    public postId: number,
    public createdDate: Date,
    public title: string,
    public content: string,
    public userId: string,
    public headerImage: string,
    public lastUpdated: Date
  ) {} //end constructor
} //end Post class

const postArray: Post[] = [];
let GlobalSalt = '';
export { postArray, GlobalSalt };