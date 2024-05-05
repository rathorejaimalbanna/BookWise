// Import necessary functions from Redux Toolkit.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products } from "../Components/data";


// Define the initial state for the books slice of the store.
const INITIAL_STATE = {
    books: []
};

// Define an async thunk to fetch books data from an API.
export const bookAsync = createAsyncThunk("fetchBooksAsync", async (state, action) => {
    // Fetch books data from a specified API endpoint.
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    // Convert the response to JSON format.
    const data = await res.json();
    // Return the fetched data.
    return data;
}); 

// Create a slice for managing books data in the Redux store.
export const bookSlice = createSlice({
    // Name of the slice
    name: "booksData",
    // Initial state
    initialState: INITIAL_STATE,
    // Extra reducers for handling additional actions
    extraReducers: (builder) => builder.addCase(bookAsync.fulfilled, (state, action) => {
        // Update the state with fetched books data when the async action is fulfilled.
        state.books = products;
    })
});

// Export the reducer function for the books slice.
export const bookReducer = bookSlice.reducer;
// Selector function to access books data from the store state.
export const bookSelectors = (state) => state.bookReducer;
