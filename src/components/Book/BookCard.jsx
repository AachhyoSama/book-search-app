import React from "react";

export default function BookCard({ book, onAddToWishlist }) {
    // destructuring
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
        <div className="bookCard" onClick={() => onAddToWishlist(book)}>
            <img src={imageLinks?.thumbnail} alt={title} />
            {/* <p>&#10084;</p> */}
            <h3>{title}</h3>
            <p>
                <strong>Authors:</strong> {authors}
            </p>
            <p>
                <strong>Category:</strong> {categories}
            </p>
            <p>
                <strong>Publisher:</strong> {publisher}
            </p>
            <p>
                <strong>Published Date:</strong> {publishedDate}
            </p>
            <p>
                <strong>Description:</strong>{" "}
                {description?.substring(0, 200) + "..."}
            </p>
        </div>
    );
}
