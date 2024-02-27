import { configureStore } from '@reduxjs/toolkit'
import signInModalReducer from '@/common/redux/signInModalSlice'
import userReducer from '@/common/redux/userSlice'
import coverReducer from '@/common/redux/bannerSlice'
import categoryReducer from '@/common/redux/categorySlice'
import themeReducer from '@/common/redux/themeSlice'
import musicReducer from '@/common/redux/musicSlice'

export const store = configureStore({
    reducer: {
        signInModal: signInModalReducer,
        user: userReducer,
        banner: coverReducer,
        category: categoryReducer,
        theme: themeReducer,
        music: musicReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch