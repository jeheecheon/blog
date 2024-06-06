import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/_redux/store";

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
    forceMusicPlay:
        !localStorage.forceMusicPlay || localStorage.forceMusicPlay === "false"
            ? false
            : true,
    isPlaying: false,
    musicList: [],
    musicTitle: "",
    duration: 0,
    currentTime: 0,
    currentIndex: 0,
};

export const musicSlice = createSlice({
    name: "music",
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
});

export function selectForceMusicPlay(state: RootState) {
    return state.music.forceMusicPlay;
}

export function selectIsPlaying(state: RootState) {
    return state.music.isPlaying;
}

export function selectMusicList(state: RootState) {
    return state.music.musicList;
}

export function selectCurrentIndex(state: RootState) {
    return state.music.currentIndex;
}

export function selectMusicTitle(state: RootState) {
    return state.music.musicTitle;
}

export function selectCurrentTime(state: RootState) {
    return state.music.currentTime;
}

export function selectDuration(state: RootState) {
    return state.music.duration;
}

// Action creators are generated for each case reducer function
export const {
    setForceMusicPlay,
    setIsPlaying,
    setMusicList,
    setMusicTitle,
    setDuration,
    setCurrentTime,
    setCurrentIndex,
} = musicSlice.actions;

export default musicSlice.reducer;
