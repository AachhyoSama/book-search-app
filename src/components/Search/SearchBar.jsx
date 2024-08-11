import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "../../features/searchSlice";
import _ from "lodash";
import { fetchBooks } from "../../features/bookSlice";

export default function SearchBar() {
    const inputValue = useSelector((state) => state.search.inputValue);
    const dispatch = useDispatch();

    // Debounce the search input
    const debounceSubmit = useCallback(
        _.debounce((value) => {
            dispatch(fetchBooks(value));
        }, 1000),
        [dispatch]
    );

    useEffect(() => {
        debounceSubmit(inputValue);
    }, [inputValue, debounceSubmit]);

    return (
        <div>
            <input
                value={inputValue}
                onChange={(e) => dispatch(setInputValue(e.target.value))}
            />
            <button
                onClick={() => {
                    dispatch(fetchBooks(inputValue));
                }}
            >
                Search
            </button>
        </div>
    );
}
