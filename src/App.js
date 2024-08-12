import React from "react";
import "./App.css";
import SearchBar from "./components/Search/SearchBar";
import SearchResults from "./components/Search/SearchResults";
import Wishlist from "./components/Wishlist/Wishlist";
import { useDispatch } from "react-redux";
import { addToWishlist, deleteFromWishlist } from "./features/wishlistSlice";
import { fetchBooks } from "./features/bookSlice";

function App() {
    const dispatch = useDispatch();

    const handleSearch = async (bookName) => {
        dispatch(fetchBooks(bookName));
    };

    const handleAddToWishlist = (book) => {
        dispatch(addToWishlist(book));
    };

    const handleDeleteFromWishlist = (id) => {
        dispatch(deleteFromWishlist(id));
    };

    return (
        <div className="App flex items-center p-6">
            <div className="flex w-full">
                <div className="flex-1">
                    <SearchBar onSubmit={handleSearch} />
                    <SearchResults onAddToWishlist={handleAddToWishlist} />
                </div>
                <div className="ml-6 w-72">
                    <Wishlist onDeleteFromWishlist={handleDeleteFromWishlist} />
                </div>
            </div>
        </div>
    );
}

export default App;
