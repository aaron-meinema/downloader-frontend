import { createSlice } from "@reduxjs/toolkit";
import { State } from "../state";
import { submitDelete } from "./deleteApi";

export type DeleteState = {
    state: State;
    error?: string;
}

export type DeleteModel = {
    file_path: string;
}

const initialState: DeleteState = {
    state: State.idle,
    error: undefined,
}

export const deleteSlice = createSlice({
    name: "delete",
    initialState,

    reducers: {
        resetDeleteState: (state) => {
            state.state = State.idle;
            state.error = undefined;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(submitDelete.pending, (state) => {
                state.state = State.loading;
                state.error = undefined;
            })
            .addCase(submitDelete.fulfilled, (state) => {
                state.state = State.success;
                state.error = undefined;
            })
            .addCase(submitDelete.rejected, (state, action) => {
                state.state = State.failed;
                state.error = (action.payload as string) || action.error.message;
            })
    },

    selectors: {
        selectDeleteState: (state: DeleteState) => state.state,
        selectDeleteError: (state: DeleteState) => state.error,
    }
});

export const { resetDeleteState } = deleteSlice.actions;

export const { selectDeleteState, selectDeleteError } = deleteSlice.selectors;
