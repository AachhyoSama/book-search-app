import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/bookSlice';
import wishlistReducer from '../features/wishlistSlice';
import searchReducer from '../features/searchSlice';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['wishlist'], // persist the wishlist slice
};

const rootReducer = combineReducers({
    wishlist: wishlistReducer,
    books: booksReducer,
    search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
