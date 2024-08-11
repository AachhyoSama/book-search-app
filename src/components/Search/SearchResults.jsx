import React from "react";
import BookCard from "../Book/BookCard";

export default function SearchResults({ books, onAddToWishlist }) {
    return (
        <ul>
            {/* Optional for books as books could be empty */}
            {books?.map((book) => (
                <BookCard
                    book={book}
                    key={book.id}
                    onAddToWishlist={onAddToWishlist}
                />
            ))}
        </ul>
    );
}
