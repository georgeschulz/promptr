import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPrompts, fetchPromptById, deletePrompt, updatePromptApi, createPrompt } from "../api/prompts";

const promptSlice = createSlice({
    name: 'prompts',
    initialState: {
        prompts: [],
        prompt: {},
        context: "",
        audience: "",
        additionalDetails: "",
        quality: false,
        length: ""
    },
    reducers: {
        setContext: (state, action) => {
            state.context = action.payload;
        },
        setAudience: (state, action) => {
            state.audience = action.payload;
        },
        setAdditionalDetails: (state, action) => {
            state.additionalDetails = action.payload;
        },
        setQuality: (state, action) => {
            state.quality = action.payload;
        },
        setLength: (state, action) => {
            state.length = action.payload;
        },
        setPrompt: (state, action) => {
            state.prompt = action.payload;
        },
        setPrompts: (state, action) => {
            state.prompts = action.payload;
        },
        clearPrompt: (state) => {
            state.context = "";
            state.audience = "";
            state.additionalDetails = "";
            state.quality = false;
            state.length = "";
        }
    }
});

export const { setContext, setAudience, setAdditionalDetails, setQuality, setLength, setPrompt, setPrompts, clearPrompt } = promptSlice.actions;
export const selectContext = (state) => state.prompts.context;
export const selectAudience = (state) => state.prompts.audience;
export const selectAdditionalDetails = (state) => state.prompts.additionalDetails;
export const selectQuality = (state) => state.prompts.quality;
export const selectLength = (state) => state.prompts.length;
export const selectPrompt = (state) => state.prompts.prompt;
export const selectPrompts = (state) => state.prompts.prompts;

export const fetchPromptsThunk = createAsyncThunk(
    'prompts/fetchPrompts',
    async (data, thunkAPI) => {
        const response = await fetchPrompts();
        thunkAPI.dispatch(setPrompts(response.data.data));
        return response.data;
    }
);

export const fetchPromptByIdThunk = createAsyncThunk(
    'prompts/fetchPromptById',
    async (id) => {
        const response = await fetchPromptById(id);
        return response.data;
    }
);

export const createPromptThunk = createAsyncThunk(
    'prompts/createPrompt',
    async (data, thunkAPI) => {
        const { folderId } = data;
        const response = await createPrompt(folderId);
        thunkAPI.dispatch(setPrompt(response.data.data));
        thunkAPI.dispatch(fetchPromptsThunk())
        return response.data;
    }
);

export const deletePromptThunk = createAsyncThunk(
    'prompts/deletePrompt',
    async (id, thunkAPI) => {
        const response = await deletePrompt(id);
        thunkAPI.dispatch(fetchPromptsThunk());
        return response.data;
    }
);

export const updatePromptThunk = createAsyncThunk(
    'prompts/updatePrompt',
    async (data, thunkAPI) => {
        const response = await updatePromptApi(data.id, data);
        thunkAPI.dispatch(setPrompt(response.data));
        return response.data;
    }
);

export default promptSlice.reducer;