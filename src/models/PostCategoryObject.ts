interface I_PostCategory {
  categoryId: number;
  postId: number;
}

export class PostCategory implements I_PostCategory {
  constructor(public categoryId: number, public postId: number) {
    this.categoryId = categoryId;
    this.postId = postId;
  } //end constructor

} //end PostCategory class

const postCategoryArray: PostCategory[]  = [];
export { postCategoryArray }