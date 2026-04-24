import { FolderModel } from "./folderStore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFolders = createAsyncThunk(
    'folder/fetchFolders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8000/files');
            if (!response.ok) {
                console.error('Failed to fetch folders:', response.statusText);
                throw new Error('Network response was not ok');
            }
            const data: FolderModel[] = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);