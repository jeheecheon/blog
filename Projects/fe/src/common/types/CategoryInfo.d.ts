export default interface CategoryInfo {
  Id: string;
  ParentCategoryId: string;
  IsBottomLevel: boolean;
  ParentCategory?: CategoryInfo;
  CategoryChildren?: CategoryInfo[];
}