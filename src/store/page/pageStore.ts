import { createSlice } from "@reduxjs/toolkit";

export enum Page {
    downloads,
    downloadName,
    delete
}

export type PageState = {
    currentPage: Page;
}

const initialState: PageState = {
    currentPage: Page.downloads,
}

export const pageSlice = createSlice({
    name: "page",
    initialState,

    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },

    selectors: {
        selectCurrentPage: (state: PageState) => state.currentPage,
    }
});

export const { setPage } = pageSlice.actions;

export const { selectCurrentPage } = pageSlice.selectors;
