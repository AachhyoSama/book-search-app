import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            const book = action.payload;
            const bookExists = state.find((item) => item.id === book.id);
            if (!bookExists) {
                state.push(book);
            }
        },
        deleteFromWishlist: (state, action) => {
            const id = action.payload;
            return state.filter((book) => book.id !== id);
        },
    },
});

export const { addToWishlist, deleteFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
