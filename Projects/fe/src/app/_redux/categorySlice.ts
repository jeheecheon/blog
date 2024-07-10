import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import CategoryInfo from "@/_types/Category";

export interface categoryState {
    leafCategories: CategoryInfo[];
}

const initialState: categoryState = {
    leafCategories: [] as CategoryInfo[],
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setLeafCategories: (state, action: PayloadAction<CategoryInfo[]>) => {
            state.leafCategories = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLeafCategories } = categorySlice.actions;

export const selectLeafCategories = (state: { category: categoryState }) =>
    state.category.leafCategories;

export default categorySlice.reducer;
