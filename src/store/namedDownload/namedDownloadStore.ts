import { createSlice } from "@reduxjs/toolkit";
import { State } from "../state";
import { submitNamedDownload } from "./namedDownloadAPI";


export type NamedDownloadModel = {
    url: string;
    path: string;
    name: string;
}

export type NamedDownloadState = {
    download?: NamedDownloadModel;
    state: State;
    error?: string;
}

const initialState: NamedDownloadState = {
    download: undefined,
    state: State.idle,
    error: undefined,
}

export const namedDownloadSlice = createSlice({
    name: "namedDownload",
    initialState,

    reducers: {
        resetNamedDownloadState: (state) => {
            state.download = undefined;
            state.state = State.idle;
            state.error = undefined;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(submitNamedDownload.pending, (state) => {
                state.state = State.loading;
                state.error = undefined;
            })
            .addCase(submitNamedDownload.fulfilled, (state, action) => {
                state.state = State.success;
                state.download = action.meta.arg;
            })
            .addCase(submitNamedDownload.rejected, (state, action) => {
                state.state = State.failed;
                state.error = (action.payload as string) || action.error.message;
            })
    },

    selectors: {
        selectNamedDownloadState: (state: NamedDownloadState) => state.state,
        selectCurrentNamedDownload: (state: NamedDownloadState) => state.download,
        selectNamedDownloadError: (state: NamedDownloadState) => state.error,
    }
});

export const { resetNamedDownloadState } = namedDownloadSlice.actions;

export const { selectNamedDownloadState, selectCurrentNamedDownload, selectNamedDownloadError } = namedDownloadSlice.selectors;
