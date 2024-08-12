import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/bookSlice";
import wishlistReducer from "../features/wishlistSlice";
import searchReducer from "../features/searchSlice";
import { combineReducers } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // To save on the localStorage on the web

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["wishlist"], // persist the wishlist slice
};

// Combine reducers
const rootReducer = combineReducers({
    wishlist: wishlistReducer,
    books: booksReducer,
    search: searchReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
});

export const persistor = persistStore(store);
