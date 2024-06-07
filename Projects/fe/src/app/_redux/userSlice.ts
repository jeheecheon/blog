import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/_redux/store";

export interface UserState {
    name: string;
    email: string;
    avatar?: string;
}

const initialState: UserState = {
    name: "",
    email: "",
    avatar: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            if (
                action.payload.avatar !== undefined &&
                action.payload.avatar !== null
            )
                state.avatar = action.payload.avatar;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export function selectUser(state: RootState) {
    return state.user;
}

export default userSlice.reducer;
