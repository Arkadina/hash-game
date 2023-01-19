import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "dataSlice!",
    initialState: [],
    reducers: {
        addData: (state, action) => {
            console.log("addData reducer");

            return [...state, action.payload];
        },
    },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
