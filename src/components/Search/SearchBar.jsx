import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setInputValue,
    setSuggestions,
    clearSuggestions,
    setLastSearchTerm,
} from "../../features/searchSlice";
import _ from "lodash";
import { fetchBooks } from "../../features/bookSlice";

export default function SearchBar() {
    const { inputValue, suggestions } = useSelector((state) => state.search);
    const { books } = useSelector((state) => state.books);
    const dispatch = useDispatch();

    // Debounce the search input
    const debounceSubmit = useCallback(
        _.debounce((value) => {
            if (value.trim()) {
                dispatch(fetchBooks(value));
            }
        }, 1000),
        [dispatch]
    );

    useEffect(() => {
        debounceSubmit(inputValue);
    }, [inputValue, debounceSubmit]);

    useEffect(() => {
        if (inputValue.trim()) {
            const filteredBooks = books
                .filter((book) =>
                    book.volumeInfo.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                )
                .map((book) => book.volumeInfo.title);
            dispatch(setSuggestions(filteredBooks));
        } else {
            dispatch(clearSuggestions());
        }
    }, [inputValue, books, dispatch]);

    const handleSelectSuggestion = (suggestion) => {
        dispatch(setInputValue(suggestion));
        dispatch(fetchBooks(suggestion));
        dispatch(setLastSearchTerm(suggestion)); // last search term
        dispatch(clearSuggestions());
    };

    return (
        <div className="mb-6">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search for books..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inputValue}
                    onChange={(e) => dispatch(setInputValue(e.target.value))}
                />
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                        dispatch(fetchBooks(inputValue));
                        dispatch(setLastSearchTerm(inputValue));
                        dispatch(clearSuggestions());
                    }}
                >
                    Search
                </button>
            </div>

            {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 z-10 shadow-lg max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
