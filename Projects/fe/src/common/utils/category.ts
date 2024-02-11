import { Dispatch } from "@reduxjs/toolkit";
import CategoryInfo from "@/common/types/Category";
import { HandleError, PropagateResponse } from "@/common/utils/responses";
import { setLeafCategories } from "@/common/redux/categorySlice";

export function flattenOutCategories(category: CategoryInfo | undefined): string {
  if (category === undefined || category === null)
    return '';
  else if (category.ParentCategory === undefined || category.ParentCategory === null)
    return category.Id;
  else
    return flattenOutCategories(category.ParentCategory) + ' > ' + category.Id;
}

export async function fetchLeafCategoriesAsync(dispatch: Dispatch): Promise<void> {
  fetch("/api/blog/categories/leaf",
    {
      credentials: "same-origin"
    })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        HandleError(res);
    })
    .then(res => {
      if (Array.isArray(res) && res !== undefined && res !== null)
        dispatch(setLeafCategories(res))
    })
    .catch(PropagateResponse)
}