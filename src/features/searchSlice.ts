import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    inputValue: string;
    suggestions: string[];
    lastSearchTerm: string;
}

const initialState: SearchState = {
    inputValue: "",
    suggestions: [],
    lastSearchTerm: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload;
        },
        setSuggestions: (state, action: PayloadAction<string[]>) => {
            state.suggestions = action.payload;
        },
        clearSuggestions: (state) => {
            state.suggestions = [];
            state.inputValue = "";
        },
        setLastSearchTerm: (state, action: PayloadAction<string>) => {
            state.lastSearchTerm = action.payload;
        },
    },
});

export const { setInputValue, setSuggestions, clearSuggestions, setLastSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
