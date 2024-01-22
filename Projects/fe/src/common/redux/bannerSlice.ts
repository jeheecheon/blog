import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import backgroundImage from '@/common/assets/images/default/banner.jpg';

export interface BannerState {
  bannerImageUrl: string,
  bannerTitle: string,
}

const initialState: BannerState = {
  bannerImageUrl: backgroundImage,
  bannerTitle: '',
}

export const bannerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBannerImageUrl: (state, action: PayloadAction<string>) => {
      state.bannerImageUrl = action.payload
    },
    setBannerTitle: (state, action: PayloadAction<string>) => {
      state.bannerTitle = action.payload
    },
    setBanner: (state, action: PayloadAction<BannerState>) => {
      state.bannerImageUrl = action.payload.bannerImageUrl;
      state.bannerTitle = action.payload.bannerTitle;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBannerImageUrl, setBannerTitle, setBanner } = bannerSlice.actions

export default bannerSlice.reducer