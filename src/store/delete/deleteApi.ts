import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteModel } from "./deleteStore";

export const submitDelete = createAsyncThunk(
    "delete/submitDelete",
    async (deleteModel: DeleteModel, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:8000/files", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(deleteModel),
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
