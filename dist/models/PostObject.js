"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSalt = exports.postArray = exports.Post = void 0;
class Post {
    constructor(postId, createdDate, title, content, userId, headerImage, lastUpdated) {
        this.postId = postId;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
    } //end constructor
    static topost(body) {
        throw new Error('Method not implemented.');
    }
    emailAddress(emailAddress) {
        throw new Error('Method not implemented.');
    }
    ValidatePassword(password) {
        throw new Error('Method not implemented.');
    }
} //end Post class
exports.Post = Post;
const postArray = [];
exports.postArray = postArray;
let GlobalSalt = '';
exports.GlobalSalt = GlobalSalt;
//# sourceMappingURL=PostObject.js.map