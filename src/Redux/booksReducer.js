import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    books:[]
};

export const bookAsync = createAsyncThunk("fetchBooksAsync",async(state,action)=>{
    const res = await fetch("https://d1krvzwx5oquy1.cloudfront.net/books.json");
    const data = await res.json();
    return data
})

export const bookSlice = createSlice({
    name:"booksData",
    initialState:INITIAL_STATE,
    extraReducers:(builder)=> builder.addCase(bookAsync.fulfilled,(state,action)=>{
        state.books = action.payload
    })
});

export const bookReducer = bookSlice.reducer;
export const bookSelectors = (state) => state.bookReducer