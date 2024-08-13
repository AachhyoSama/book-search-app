import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setInputValue,
    setSuggestions,
    clearSuggestions,
    setLastSearchTerm,
} from "../../features/searchSlice";
import _ from "lodash";
import { fetchBooks, fetchBookTitles } from "../../features/bookSlice";

export default function SearchBar() {
    const { inputValue, suggestions } = useSelector((state) => state.search);
    const { titles } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [showSearchResults, setShowSearchResults] = useState(false); // Track if search results should be shown
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);
    const suggestionRefs = useRef([]);

    // Debounce the suggestion fetching
    const debounceUpdateSuggestions = useCallback(
        _.debounce((value) => {
            if (value.trim()) {
                dispatch(fetchBookTitles(value)); // Fetch only titles for suggestions
            } else {
                dispatch(clearSuggestions());
            }
        }, 1000),
        [dispatch]
    );

    useEffect(() => {
        debounceUpdateSuggestions(inputValue);
    }, [inputValue, debounceUpdateSuggestions]);

    useEffect(() => {
        if (inputValue.trim()) {
            dispatch(setSuggestions(titles)); // Set titles as suggestions
        } else {
            dispatch(clearSuggestions());
        }
    }, [inputValue, titles, dispatch]);

    useEffect(() => {
        if (inputValue.trim() && showSearchResults) {
            dispatch(fetchBooks(inputValue)); // Fetch full book data when search is triggered
            dispatch(setLastSearchTerm(inputValue));
            setShowSearchResults(false); // Reset show search results flag
        }
    }, [inputValue, showSearchResults, dispatch]);

    const handleSelectSuggestion = (suggestion) => {
        dispatch(setInputValue(suggestion));
        dispatch(fetchBooks(suggestion)); // Fetch full book data on suggestion selection
        dispatch(setLastSearchTerm(suggestion));
        dispatch(clearSuggestions());
        setActiveSuggestionIndex(-1);
        setShowSearchResults(true); // Show search results
    };

    const handleSearch = () => {
        if (inputValue.trim()) {
            dispatch(fetchBooks(inputValue)); // Fetch full book data on search
            dispatch(setLastSearchTerm(inputValue));
            dispatch(clearSuggestions());
            setShowSearchResults(true); // Show search results
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveSuggestionIndex((prevIndex) => {
                const nextIndex =
                    prevIndex < suggestions.length - 1
                        ? prevIndex + 1
                        : prevIndex;
                if (suggestionRefs.current[nextIndex]) {
                    suggestionRefs.current[nextIndex].scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                    });
                }
                return nextIndex;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveSuggestionIndex((prevIndex) => {
                const nextIndex = prevIndex > 0 ? prevIndex - 1 : 0;
                if (suggestionRefs.current[nextIndex]) {
                    suggestionRefs.current[nextIndex].scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                    });
                }
                return nextIndex;
            });
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (
                activeSuggestionIndex >= 0 &&
                activeSuggestionIndex < suggestions.length
            ) {
                handleSelectSuggestion(suggestions[activeSuggestionIndex]);
            } else {
                handleSearch(); // Fetch books if no suggestion is selected
            }
        } else if (e.key === "Escape") {
            dispatch(clearSuggestions());
            setActiveSuggestionIndex(-1);
            inputRef.current.blur();
        }
    };

    const handleClickOutside = (e) => {
        if (
            suggestionsRef.current &&
            !suggestionsRef.current.contains(e.target) &&
            !inputRef.current.contains(e.target)
        ) {
            dispatch(clearSuggestions());
            setActiveSuggestionIndex(-1);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative mb-6">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search for books..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inputValue}
                    onChange={(e) => dispatch(setInputValue(e.target.value))}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleSearch} // Handle search button click
                >
                    Search
                </button>
            </div>

            {suggestions.length > 0 && !showSearchResults && (
                <ul
                    className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 z-10 shadow-lg max-h-48 overflow-y-auto"
                    ref={suggestionsRef}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            ref={(el) => (suggestionRefs.current[index] = el)}
                            className={`p-2 cursor-pointer hover:bg-gray-200 ${
                                index === activeSuggestionIndex
                                    ? "bg-gray-200"
                                    : ""
                            }`}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            onMouseEnter={() => setActiveSuggestionIndex(index)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
