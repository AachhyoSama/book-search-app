import React from "react";
import BookCard from "../Book/BookCard";
import { useSelector } from "react-redux";

export default function SearchResults({ onAddToWishlist }) {
    const { books, status } = useSelector((state) => state.books);
    const lastSearchTerm = useSelector((state) => state.search.lastSearchTerm); // Taking the last search term

    return status === "loading" ? (
        // Spinner for loading state
        <div className="flex justify-center items-center h-screen">
            <svg
                className="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                ></path>
            </svg>
        </div>
    ) : (
        <>
            {lastSearchTerm && (
                <h2 className="text-xl font-semibold mb-4">
                    Search Results for "{lastSearchTerm}"
                </h2>
            )}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Optional for books as books could be empty */}
                {books?.map((book) => (
                    <BookCard
                        book={book}
                        key={book.id}
                        onAddToWishlist={onAddToWishlist}
                    />
                ))}
            </ul>
        </>
    );
}
