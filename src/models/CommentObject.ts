interface I_comment {
  commentId: number,
  comment: string,
  userId: string,
  postId: string,
  commentDate: Date
}

export class Comment implements I_comment {
  constructor(
    public commentId: number,
    public comment: string,
    public userId: string,
    public postId: string,
    public commentDate: Date
  ) {
    this.commentId = commentId;
    this.comment = comment;
    this.userId = userId;
    this.postId = postId;
    this.commentDate = new Date();
  } //end constructor

} //end Comment class

const commentArray: Comment[] = [];
export { commentArray }