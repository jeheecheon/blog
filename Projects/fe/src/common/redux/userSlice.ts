import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  name: string,
  email: string,
}

const initialState: UserState = {
  name: '',
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer