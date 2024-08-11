import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/bookSlice";
import wishlistReducer from "../features/wishlistSlice";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        wishlist: wishlistReducer,
        search: searchReducer,
    },
});
