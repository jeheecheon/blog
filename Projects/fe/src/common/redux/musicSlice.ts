import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MusicState {
    forceMusicPlay: boolean;
    isPlaying: boolean;
    musicList: string[];
    musicTitle: string;
    duration: number;
    currentTime: number;
    currentIndex: number;
}

const initialState: MusicState = {
    forceMusicPlay: localStorage.forceMusicPlay === 'true' ? localStorage.forceMusicPlay : false,
    isPlaying: false,
    musicList: [],
    musicTitle: '',
    duration: 0,
    currentTime: 0,
    currentIndex: 0
}

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setForceMusicPlay: (state, action: PayloadAction<boolean>) => {
            state.forceMusicPlay = action.payload;
            localStorage.forceMusicPlay = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setMusicList: (state, action: PayloadAction<string[]>) => {
            state.musicList = action.payload;
        },
        setMusicTitle: (state, action: PayloadAction<string>) => {
            state.musicTitle = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setForceMusicPlay,
    setIsPlaying,
    setMusicList,
    setMusicTitle,
    setDuration,
    setCurrentTime,
    setCurrentIndex
} = musicSlice.actions

export default musicSlice.reducer