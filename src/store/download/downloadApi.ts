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

            const responseBody = await response.json().catch(() => null);

            if (!response.ok) {
                const errorText = responseBody?.message || responseBody || "Network response was not ok";
                return rejectWithValue({
                    message: typeof errorText === "string" ? errorText : JSON.stringify(errorText),
                    status: response.status,
                });
            }

            return {
                data: responseBody,
                status: response.status,
            };
        } catch (error) {
            return rejectWithValue({
                message: (error as Error).message,
                status: undefined,
            });
        }
    }
);
