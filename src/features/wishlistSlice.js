import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            const existingBook = state.find(
                (book) => book.id === action.payload.id
            );
            if (!existingBook) {
                state.push(action.payload);
            }
        },
        deleteFromWishlist: (state, action) => {
            const index = state.findIndex((book) => book.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { addToWishlist, deleteFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
