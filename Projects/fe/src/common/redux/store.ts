import { configureStore } from '@reduxjs/toolkit'
import signInModalReducer from '@/common/redux/signInModalSlice'
import userReducer from '@/common/redux/userSlice'
import bannerReducer from '@/common/redux/bannerSlice'
import categoryReducer from '@/common/redux/categorySlice'

export const store = configureStore({
    reducer: {
        signInModal: signInModalReducer,
        user: userReducer,
        banner: bannerReducer,
        category: categoryReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch