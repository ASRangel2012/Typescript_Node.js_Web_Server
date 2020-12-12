"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSalt = exports.categoryArray = exports.Category = void 0;
class Category {
    constructor(categoryId, name, description) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
    } //end constructor
} //end Category class
exports.Category = Category;
const categoryArray = [];
exports.categoryArray = categoryArray;
let GlobalSalt = '';
exports.GlobalSalt = GlobalSalt;
//# sourceMappingURL=CategoryObject.js.map