import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SignInModalState {
  visible: boolean
}

const initialState: SignInModalState = {
  visible: false,
}

export const signInModalSlice = createSlice({
  name: 'signInModal',
  initialState,
  reducers: {
    makeVisible: (state) => {
      state.visible = true
    },
    makeInvisible: (state) => {
      state.visible = false
    },
    setVisible: (state, action: PayloadAction<SignInModalState>) => {
      state.visible = action.payload.visible
    },
  },
})

// Action creators are generated for each case reducer function
export const { makeVisible, makeInvisible, setVisible } = signInModalSlice.actions

export default signInModalSlice.reducer