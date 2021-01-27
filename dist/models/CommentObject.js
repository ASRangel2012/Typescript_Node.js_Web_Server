"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentArray = exports.Comment = void 0;
class Comment {
    constructor(commentId, comment, userId, postId, commentDate) {
        this.commentId = commentId;
        this.comment = comment;
        this.userId = userId;
        this.postId = postId;
        this.commentDate = commentDate;
        this.commentId = commentId;
        this.comment = comment;
        this.userId = userId;
        this.postId = postId;
        this.commentDate = new Date();
    } //end constructor
} //end Comment class
exports.Comment = Comment;
const commentArray = [];
exports.commentArray = commentArray;
//# sourceMappingURL=CommentObject.js.map