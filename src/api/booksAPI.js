export const fetchBooksAPI = async (bookName) => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${bookName}&startIndex=0&maxResults=20`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data.items;
};
