export class Comment {
  constructor(
    public commentId: number,
    public comment: string,
    public userId: string,
    public postId: string,
    public commentDate: Date
  ) {} //end constructor
} //end Comment class
