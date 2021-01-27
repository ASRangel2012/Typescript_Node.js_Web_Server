
interface I_post {
   postId: number;
   createdDate: Date;
   title: string;
   content: string;
   userId: string;
   headerImage: string;
   lastUpdated: Date;
}

export class Post implements I_post {
  constructor(
    public postId: number,
    public createdDate: Date,
    public title: string,
    public content: string,
    public userId: string,
    public headerImage: string,
    public lastUpdated: Date
  ) 
  { 
    this.createdDate = new Date();
    this.lastUpdated = new Date();
  } //end constructor

  static toPost(postObj: any): Post | boolean {
    return postObj.hasOwnProperty("postId") &&
      postObj.hasOwnProperty("createdDate") &&
      postObj.hasOwnProperty("title") &&
      postObj.hasOwnProperty("content") &&
      postObj.hasOwnProperty("userId") &&
      postObj.hasOwnProperty("headerImage") &&
      postObj.hasOwnProperty("lastUpdated")
      ? new Post(
        postObj.postId,
        postObj.createdDate,
        postObj.title,
        postObj.content,
        postObj.userId,
        postObj.headerImage,
        postObj.lastUpdated
      )
      : false;
  }
 

} //end Post class

const postArray: Post[] = [];
export { postArray};