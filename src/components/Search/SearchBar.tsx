import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setInputValue, setSuggestions, clearSuggestions, setLastSearchTerm } from "../../features/searchSlice";
import { fetchBooks } from "../../features/bookSlice";
import { Book } from "../../interfaces/bookTypes";
import _ from "lodash";

interface SearchBarProps {
    onSubmit: (bookName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const { inputValue, suggestions } = useSelector((state: RootState) => state.search);
    const { books } = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch<AppDispatch>();
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const suggestionsRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

    const debounceUpdateSuggestions = useCallback(
        _.debounce((value: string) => {
            if (value.trim()) {
                dispatch(fetchBooks(value));
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
            dispatch(setSuggestions(books.map(book => book.volumeInfo.title)));
        } else {
            dispatch(clearSuggestions());
        }
    }, [inputValue, books, dispatch]);

    useEffect(() => {
        if (inputValue.trim() && showSearchResults) {
            dispatch(fetchBooks(inputValue));
            dispatch(setLastSearchTerm(inputValue));
            setShowSearchResults(false);
        }
    }, [inputValue, showSearchResults, dispatch]);

    const handleSelectSuggestion = (suggestion: string) => {
        dispatch(setInputValue(suggestion));
        dispatch(fetchBooks(suggestion));
        dispatch(setLastSearchTerm(suggestion));
        dispatch(clearSuggestions());
        setActiveSuggestionIndex(-1);
        setShowSearchResults(true);
    };

    const handleSearch = () => {
        if (inputValue.trim()) {
            onSubmit(inputValue);
            dispatch(setLastSearchTerm(inputValue));
            dispatch(clearSuggestions());
            setShowSearchResults(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                handleSearch();
            }
        } else if (e.key === "Escape") {
            dispatch(clearSuggestions());
            setActiveSuggestionIndex(-1);
            inputRef.current?.blur();
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            suggestionsRef.current &&
            !suggestionsRef.current.contains(e.target as Node) &&
            !inputRef.current?.contains(e.target as Node)
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
                    onClick={handleSearch}
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
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                index === activeSuggestionIndex ? "bg-gray-200" : ""
                            }`}
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
