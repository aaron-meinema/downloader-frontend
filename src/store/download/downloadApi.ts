import { createAsyncThunk } from "@reduxjs/toolkit";
import { DownloadModel } from "./downloadStore";

export const submitDownload = createAsyncThunk(
    "download/submitDownload",
    async (downloadModel: DownloadModel, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:8000/files/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(downloadModel),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);
