import { configureStore } from '@reduxjs/toolkit'
import signInModalReducer from '@/common/redux/signInModalSlice'
import userReducer from '@/common/redux/userSlice'
import bannerReducer from '@/common/redux/bannerSlice'
import promisesReducer from '@/common/redux/promisesSlice'

export const store = configureStore({
    reducer: {
        signInModal: signInModalReducer,
        user: userReducer,
        banner: bannerReducer,
        promises: promisesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch