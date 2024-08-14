export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail?: string;
        };
        categories?: string[];
        publisher?: string;
        publishedDate?: string;
        description?: string;
    };
}