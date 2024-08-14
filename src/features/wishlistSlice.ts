import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../interfaces/bookTypes";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [] as Book[],
    reducers: {
        addToWishlist: (state, action: PayloadAction<Book>) => {
            const existingBook = state.find(
                (book) => book.id === action.payload.id
            );
            if (!existingBook) {
                state.push(action.payload);
            }
        },
        deleteFromWishlist: (state, action: PayloadAction<string>) => {
            const index = state.findIndex((book) => book.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { addToWishlist, deleteFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
