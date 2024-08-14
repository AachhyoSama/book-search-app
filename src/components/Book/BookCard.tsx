import React from "react";
import { Book } from "../../interfaces/bookTypes";

interface BookCardProps {
    book: Book;
    onAddToWishlist: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToWishlist }) => {
    const {
        title,
        authors,
        imageLinks,
        categories,
        publisher,
        publishedDate,
        description,
    } = book.volumeInfo;

    return (
        <div
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onAddToWishlist(book)}
        >
            <img
                src={imageLinks?.thumbnail}
                alt={title}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-700 mb-1">
                <strong>Authors:</strong> {authors?.join(", ")}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                <strong>Category:</strong> {categories?.join(", ")}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                <strong>Publisher:</strong> {publisher}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                <strong>Published Date:</strong> {publishedDate}
            </p>
            <p className="text-sm text-gray-600">
                <strong>Description:</strong>{" "}
                {description?.substring(0, 100) + "..."}
            </p>
        </div>
    );
};

export default BookCard;
