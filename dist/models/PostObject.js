"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postArray = exports.Post = void 0;
class Post {
    constructor(postId, createdDate, title, content, userId, headerImage, lastUpdated) {
        this.postId = postId;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
        this.createdDate = new Date();
        this.lastUpdated = new Date();
    } //end constructor
    static toPost(postObj) {
        return postObj.hasOwnProperty("postId") &&
            postObj.hasOwnProperty("createdDate") &&
            postObj.hasOwnProperty("title") &&
            postObj.hasOwnProperty("content") &&
            postObj.hasOwnProperty("userId") &&
            postObj.hasOwnProperty("headerImage") &&
            postObj.hasOwnProperty("lastUpdated")
            ? new Post(postObj.postId, postObj.createdDate, postObj.title, postObj.content, postObj.userId, postObj.headerImage, postObj.lastUpdated)
            : false;
    }
} //end Post class
exports.Post = Post;
const postArray = [];
exports.postArray = postArray;
//# sourceMappingURL=PostObject.js.map