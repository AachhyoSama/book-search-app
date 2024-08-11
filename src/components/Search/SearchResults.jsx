import React from "react";
import BookCard from "../Book/BookCard";
import { useSelector } from "react-redux";

export default function SearchResults({ onAddToWishlist }) {
    const books = useSelector((state) => state.books.books);

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
