import { createSlice } from "@reduxjs/toolkit";
import { submitDownload } from "./downloadApi";
import { State } from "../state";

export type DownloadModel = {
    url: string;
    path: string;
}

export type DownloadState = {
    download?: DownloadModel;
    state: State;
    error?: string;
    cache?: DownloadModel;
}

const initialState: DownloadState = {
    download: undefined,
    state: State.idle,
    error: undefined,
    cache: undefined,
}

export const downloadSlice = createSlice({
    name: "download",
    initialState,

    reducers: {
        resetDownloadState: (state) => {
            state.download = undefined;
            state.state = State.idle;
            state.error = undefined;
            state.cache = undefined;
        },
        setDownloadCache: (state, action) => {
            state.cache = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(submitDownload.pending, (state) => {
                state.state = State.loading;
                state.error = undefined;
            })
            .addCase(submitDownload.fulfilled, (state, action) => {
                state.state = State.success;
                state.download = action.meta.arg;
            })
            .addCase(submitDownload.rejected, (state, action) => {
                state.state = State.failed;
                state.error = (action.payload as string) || action.error.message;
            })
    },

    selectors: {
        selectDownloadState: (state: DownloadState) => state.state,
        selectCurrentDownload: (state: DownloadState) => state.download,
        selectDownloadError: (state: DownloadState) => state.error,
        selectDownloadCache: (state: DownloadState) => state.cache,
    }
});

export const { resetDownloadState, setDownloadCache } = downloadSlice.actions;

export const { selectDownloadState, selectCurrentDownload, selectDownloadError, selectDownloadCache } = downloadSlice.selectors;
