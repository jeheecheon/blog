import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/_redux/store";

export interface ThemeState {
    isDarkMode: boolean;
}

const initialState: ThemeState = {
    isDarkMode:
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
    },
});

export function selectIsDarkMode(state: RootState) {
    return state.theme.isDarkMode;
}

// Action creators are generated for each case reducer function
export const { setIsDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
