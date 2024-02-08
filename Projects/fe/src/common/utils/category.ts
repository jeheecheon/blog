import CategoryInfo from "../types/CategoryInfo";

export function sortCategories(categories: CategoryInfo[]): CategoryInfo[] {
    const categoryMap: { [key: string]: CategoryInfo[] } = {};
    const rootCategories: CategoryInfo[] = [];

    // 카테고리를 parent_category_id를 기준으로 맵에 저장
    categories.forEach(category => {
        if (!categoryMap[category.ParentCategoryId]) {
            categoryMap[category.ParentCategoryId] = [];
        }
        categoryMap[category.ParentCategoryId].push(category);
    });

    // 부모 카테고리가 있는 카테고리에 자식 카테고리 할당
    categories.forEach(category => {
        if (categoryMap[category.Id]) {
            category.CategoryChildren = categoryMap[category.Id];
        }
        // 최상위 카테고리인 경우 rootCategories 배열에 추가
        if (!category.ParentCategoryId) {
            rootCategories.push(category);
        }
    });

    return rootCategories;
}