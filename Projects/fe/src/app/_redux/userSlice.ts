import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/_redux/store";

export interface UserState {
    name: string;
    email: string;
    avatar?: string;
    isSignedIn: boolean;
}

const initialState: UserState = {
    name: "",
    email: "",
    avatar: "",
    isSignedIn: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            if (action.payload.avatar && action.payload.avatar !== "")
                state.avatar = action.payload.avatar;
            state.isSignedIn = action.payload.isSignedIn;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export function selectUser(state: RootState) {
    return state.user;
}

export function selectIsSignedIn(state: RootState) {
    return state.user.isSignedIn;
}

export default userSlice.reducer;
