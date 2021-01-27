interface I_category {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
}

export class Category implements I_category{

  constructor(public categoryId: number,
     public categoryName: string, 
     public categoryDescription: string
     ){
      this.categoryId = categoryId;
      this.categoryName = categoryName;
      this.categoryDescription = categoryDescription;
    } // end constructor
 
}


const categoryArray: Category[] = [];
export { categoryArray};