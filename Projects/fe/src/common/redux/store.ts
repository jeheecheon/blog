import { configureStore } from '@reduxjs/toolkit'
import signInModalReducer from '@/common/redux/signInModalSlice'
import userReducer from '@/common/redux/userSlice'
import bannerReducer from '@/common/redux/bannerSlice'

export const store = configureStore({
    reducer: {
        signInModal: signInModalReducer,
        user: userReducer,
        banner: bannerReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch