import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/_redux/store";

export interface SignInModalState {
    isSignInModalOpen: boolean;
}

const initialState: SignInModalState = {
    isSignInModalOpen: false,
};

export const signInModalSlice = createSlice({
    name: "signInModal",
    initialState,
    reducers: {
        setIsSignOnModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isSignInModalOpen = action.payload;
        },
    },
});

export function selectIsSignInModalOpen(state: RootState) {
    return state.signInModal.isSignInModalOpen;
}

// Action creators are generated for each case reducer function
export const { setIsSignOnModalOpen } = signInModalSlice.actions;

export default signInModalSlice.reducer;
