import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { image } from '../utils/siteInfo'

export interface CoverState {
  coverImageUrl: string,
  titleOnCover: string,
}

const initialState: CoverState = {
  coverImageUrl: image,
  titleOnCover: '',
}

export const coverSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setCoverImageUrl: (state, action: PayloadAction<string>) => {
      state.coverImageUrl = action.payload
    },
    setTitleOnCover: (state, action: PayloadAction<string>) => {
      state.titleOnCover = action.payload
    },
    setCover: (state, action: PayloadAction<CoverState>) => {
      state.coverImageUrl = action.payload.coverImageUrl;
      state.titleOnCover = action.payload.titleOnCover;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCoverImageUrl, setTitleOnCover, setCover } = coverSlice.actions

export default coverSlice.reducer