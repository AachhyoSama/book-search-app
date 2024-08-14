import React from "react";
import { useSelector } from "react-redux";
import BookCard from "../Book/BookCard";
import { Book } from "../../interfaces/bookTypes";

interface SearchResultsProps {
    onAddToWishlist: (book: Book) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onAddToWishlist }) => {
    const { books, status } = useSelector((state: any) => state.books);
    const lastSearchTerm = useSelector((state: any) => state.search.lastSearchTerm);

    return status === "loading" ? (
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
                {books?.map((book: Book) => (
                    <BookCard
                        book={book}
                        key={book.id}
                        onAddToWishlist={onAddToWishlist}
                    />
                ))}
            </ul>
        </>
    );
};

export default SearchResults;
