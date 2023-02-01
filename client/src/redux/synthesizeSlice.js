import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const synthesizeSlice = createSlice({
    name: "synthesize",
    initialState: {
        prompt: "",
        notes: "",
        promptType: "",
    },
    reducers: {
        setPrompt: (state, action) => {
            state.prompt = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setPromptType: (state, action) => {
            state.promptType = action.payload;
        }
    }
});

export const { setPrompt, setNotes, setPromptType } = synthesizeSlice.actions;
export const selectPrompt = state => state.synthesize.prompt;
export const selectNotes = state => state.synthesize.notes;
export const selectPromptType = state => state.synthesize.promptType;
export default synthesizeSlice.reducer;