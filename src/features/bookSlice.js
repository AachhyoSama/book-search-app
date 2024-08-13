import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBooksAPI } from "../api/booksAPI";

// Existing thunk for fetching full book data
export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (bookName, { rejectWithValue }) => {
        if (!bookName) {
            return rejectWithValue("Search term cannot be empty.");
        }
        return await fetchBooksAPI(bookName);
    }
);

// New thunk for fetching book titles for suggestions
export const fetchBookTitles = createAsyncThunk(
    "books/fetchBookTitles",
    async (bookName, { rejectWithValue }) => {
        if (!bookName) {
            return rejectWithValue("Search term cannot be empty.");
        }
        const response = await fetchBooksAPI(bookName);
        // Extract titles from the response
        return response.map((book) => book.volumeInfo.title);
    }
);

export const bookSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        status: "idle",
        error: null,
        titles: [], // New state for storing book titles
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
            })
            .addCase(fetchBookTitles.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBookTitles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.titles = action.payload;
            })
            .addCase(fetchBookTitles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
