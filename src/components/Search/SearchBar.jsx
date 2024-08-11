import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";

export default function SearchBar({ onSubmit }) {
    const [inputValue, setInputValue] = useState("");

    // using lodash to debounce the search value
    // setting 1 second on onSubmit function
    const debounceSubmit = useCallback(_.debounce(onSubmit, 1000), [onSubmit]);

    useEffect(() => {
        debounceSubmit(inputValue);
    }, [inputValue, debounceSubmit]);

    return (
        <div>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button
                onClick={() => {
                    onSubmit(inputValue);
                }}
            >
                Search
            </button>
        </div>
    );
}
