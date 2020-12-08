export class Post {
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
