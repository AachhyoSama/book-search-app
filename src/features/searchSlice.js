import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        inputValue: "",
        suggestions: [], // This is for autocomplete feature
        lastSearchTerm: "", // To show on the search results page
    },
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },

        // Methods to show autocomplete
        setSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },

        // Cleat the autocomplete
        clearSuggestions: (state) => {
            state.suggestions = [];
            state.inputValue = "";
        },

        setLastSearchTerm: (state, action) => {
            state.lastSearchTerm = action.payload;
        },
    },
});

export const {
    setInputValue,
    setSuggestions,
    clearSuggestions,
    setLastSearchTerm,
} = searchSlice.actions;

export default searchSlice.reducer;
