import React from "react";

export default function Wishlist({ wishlist, onDeleteFromWishlist }) {
    return (
        <div>
            <h3>My reading wishlist({wishlist.length})</h3>
            <ul>
                {wishlist?.map((book) => (
                    <div key={book.id}>
                        <p>
                            {book.volumeInfo.title}
                            <button
                                onClick={() => onDeleteFromWishlist(book.id)}
                            >
                                Delete
                            </button>
                        </p>
                    </div>
                ))}
            </ul>
        </div>
    );
}
