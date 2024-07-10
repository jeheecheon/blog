import CategoryInfo from "@/_types/Category";

export function flattenOutCategoriesV1(
    category: CategoryInfo | undefined
): string {
    if (category === undefined || category === null) return "";
    else if (
        category.ParentCategory === undefined ||
        category.ParentCategory === null
    )
        return category.Id;
    else
        return (
            flattenOutCategoriesV1(category.ParentCategory) +
            " > " +
            category.Id
        );
}

export function flattenOutCategoriesV2(
    category: CategoryInfo | undefined
): string {
    if (category === undefined || category === null) return "";
    else if (
        category.ParentCategory === undefined ||
        category.ParentCategory === null
    )
        return category.Id;
    else
        return (
            flattenOutCategoriesV2(category.ParentCategory) + ", " + category.Id
        );
}
