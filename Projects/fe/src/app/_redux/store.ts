import { configureStore } from "@reduxjs/toolkit";
import signInModalReducer from "@/_redux/signInModalSlice";
import userReducer from "@/_redux/userSlice";
import coverReducer from "@/_redux/coverSlice";
import categoryReducer from "@/_redux/categorySlice";
import themeReducer from "@/_redux/themeSlice";
import musicReducer from "@/_redux/musicSlice";

export const store = configureStore({
    reducer: {
        signInModal: signInModalReducer,
        user: userReducer,
        cover: coverReducer,
        category: categoryReducer,
        theme: themeReducer,
        music: musicReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
