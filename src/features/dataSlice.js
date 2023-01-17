import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {
        addData: (state, action) => {
            console.log("addData reducer");

            state.push(action.payload);
        },
    },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;