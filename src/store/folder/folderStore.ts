import { createSlice } from "@reduxjs/toolkit";
import { fetchFolders } from "./folderApi";
import { State } from "../state";

export type FolderModel = {
    folder: string;
    files: string[];
}
export type FolderState = {
    folders: FolderModel[];
    state: State
}

const initialState: FolderState = {
    folders: [],
    state: State.idle,
}

export const folderSlice = createSlice({
    name: "folder",
    initialState,

    reducers: {
        folderRequestStart: (state) => {
            state.state = State.loading;
        },
        folderRequestSuccess: (state, action) => {
            state.state = State.success;
            state.folders = action.payload;
        },
        folderRequestFailed: (state) => {
            state.state = State.failed;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchFolders.pending, (state) => {
                state.state = State.loading;
            })
            .addCase(fetchFolders.fulfilled, (state, action) => {
                state.state = State.success;
                state.folders = action.payload as FolderModel[];
            })
            .addCase(fetchFolders.rejected, (state) => {
                state.state = State.failed;
            })
    },

    selectors: {
        selectFolders: (state: FolderState) => state.folders,
        selectFolderState: (state: FolderState) => state.state,
    }

});

export const { folderRequestStart, folderRequestSuccess, folderRequestFailed } = folderSlice.actions;

export const { selectFolders, selectFolderState } = folderSlice.selectors;
