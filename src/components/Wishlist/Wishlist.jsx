import React from "react";
import { useSelector } from "react-redux";

export default function Wishlist({ onDeleteFromWishlist }) {
    const wishlist = useSelector((state) => state.wishlist);

    return (
        <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
                My reading wishlist({wishlist.length})
            </h3>
            <ul className="space-y-4">
                {wishlist.length === 0
                    ? "Add some books on your wishlist.."
                    : wishlist?.map((book) => (
                          <div
                              key={book.id}
                              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                          >
                              <p className="text-gray-700">
                                  {book.volumeInfo.title}
                              </p>
                              <button
                                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                                  onClick={() => onDeleteFromWishlist(book.id)}
                              >
                                  X
                              </button>
                          </div>
                      ))}
            </ul>
        </div>
    );
}
