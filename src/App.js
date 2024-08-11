import { useState } from "react";
import "./App.css";
import SearchBar from "./components/Search/SearchBar";
import SearchResults from "./components/Search/SearchResults";
import Wishlist from "./components/Wishlist/Wishlist";

function App() {
    const [books, setBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const handleSearch = async (bookName) => {
        if (bookName.trim()) {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${bookName}&startIndex=0&maxResults=20`
            );

            const data = await response.json();
            setBooks(data.items);

            console.log(data.items);
        }
    };

    const handleAddToWishlist = (book) => {
        const bookResult = wishlist.find((item) => {
            return item.id === book.id;
        });

        if (bookResult === undefined) {
            setWishlist([book, ...wishlist]);
        }
    };

    const handleDeleteFromWishlist = (id) => {
        setWishlist(wishlist.filter((book) => book.id !== id));
    };

    return (
        <div className="App">
            <div>
                <SearchBar onSubmit={handleSearch} />
                <SearchResults
                    books={books}
                    onAddToWishlist={handleAddToWishlist}
                />
            </div>

            <div>
                <Wishlist
                    wishlist={wishlist}
                    onDeleteFromWishlist={handleDeleteFromWishlist}
                />
            </div>
        </div>
    );
}

export default App;
