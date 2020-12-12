export class Category {
  constructor(
    public categoryId: number,
    public name: string,
    public description: string
  ) {} //end constructor
} //end Category class

const categoryArray: Category[] = [];
let GlobalSalt = '';
export { categoryArray, GlobalSalt };