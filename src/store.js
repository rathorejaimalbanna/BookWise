import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./Redux/filterReducer";
import { userReducer } from "./Redux/userReducer";
import { bookReducer } from "./Redux/booksReducer";

export const store = configureStore({
    reducer:{
        filterReducer,
        userReducer,
        bookReducer
    }
});