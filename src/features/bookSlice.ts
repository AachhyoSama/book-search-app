import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBooksAPI } from "../api/booksAPI";
import { Book } from "../interfaces/bookTypes";

interface BookState {
    books: Book[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | undefined;
    titles: string[];
}

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (bookName: string, { rejectWithValue }) => {
        if (!bookName) {
            return rejectWithValue("Search term cannot be empty.");
        }
        return await fetchBooksAPI(bookName);
    }
);

export const fetchBookTitles = createAsyncThunk(
    "books/fetchBookTitles",
    async (bookName: string, { rejectWithValue }) => {
        if (!bookName) {
            return rejectWithValue("Search term cannot be empty.");
        }
        const response = await fetchBooksAPI(bookName);
        return response.map((book: Book) => book.volumeInfo.title);
    }
);

const initialState: BookState = {
    books: [],
    status: "idle",
    error: undefined,
    titles: [],
};

const bookSlice = createSlice({
    name: "books",
    initialState,
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
