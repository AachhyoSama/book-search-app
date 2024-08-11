import React from "react";
import { useSelector } from "react-redux";

export default function Wishlist({ onDeleteFromWishlist }) {
    const wishlist = useSelector((state) => state.wishlist);

    return (
        <div>
            <h3>My reading wishlist({wishlist.length})</h3>
            <ul>
                {wishlist.length === 0
                    ? "Add some books on your wishlist.."
                    : wishlist?.map((book) => (
                          <div key={book.id}>
                              <p>
                                  {book.volumeInfo.title}
                                  <button
                                      onClick={() =>
                                          onDeleteFromWishlist(book.id)
                                      }
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
