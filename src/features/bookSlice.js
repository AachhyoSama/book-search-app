import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBooksAPI } from "../api/booksAPI";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (bookName, { rejectWithValue }) => {
        if (!bookName) {
            // Returning a custom error if the bookName is empty
            return rejectWithValue("Search term cannot be empty.");
        }
        return await fetchBooksAPI(bookName);
    }
);

export const bookSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
