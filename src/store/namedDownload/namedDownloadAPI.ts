import { createAsyncThunk } from "@reduxjs/toolkit";
import { NamedDownloadModel } from "./namedDownloadStore";

export const submitNamedDownload = createAsyncThunk(
    "download/submitNamedDownload",
    async (downloadModel: NamedDownloadModel, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:8000/files/named-download", {
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
