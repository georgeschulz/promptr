import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFolders, deleteFolder, fetchFolderById, createFolder, updatePromptFolder, updateFolderNameApi } from "../api/folders";

const foldersSlice = createSlice({
    name: "folders",
    initialState: {
        folders: [],
        newFolderName: "",
        isNewFolderModalOpen: false,
        updatedFolderName: "",
        isFolderNameEditable: false,
    },
    reducers: {
        setFolders: (state, action) => {
            state.folders = action.payload;
        },
        setIsNewFolderModalOpen: (state, action) => {
            state.isNewFolderModalOpen = action.payload;
        },
        setNewFolderName: (state, action) => {
            state.newFolderName = action.payload;
        },
        setUpdatedFolderName: (state, action) => {
            state.updatedFolderName = action.payload;
        },
        toggleIsFolderNameEditable: (state) => {
            state.isFolderNameEditable = !state.isFolderNameEditable;
        }
    },
});

export const getFolders = createAsyncThunk(
    "folders/getFolders",
    async (payload, thunkAPI) => {
        try {
            const response = await fetchFolders()
            const folders = response.data.data;
            thunkAPI.dispatch(setFolders(folders));
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const newFolder = createAsyncThunk(
    "folders/createFolder",
    async (payload, thunkAPI) => {
        try {
            const response = await createFolder(payload.name);
            const folder = response.data.data;
            thunkAPI.dispatch(setFolders([...thunkAPI.getState().folders.folders, folder]));
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const deleteFolderThunk = createAsyncThunk(
    "folders/deleteFolder",
    async (payload, thunkAPI) => {
        try {
            const response = await deleteFolder(payload.id);
            const folders = thunkAPI.getState().folders.folders.filter(folder => folder._id !== payload.id);
            thunkAPI.dispatch(setFolders(folders));
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updatePromptFolderThunk = createAsyncThunk(
    "folders/updatePromptFolder",
    async (payload, thunkAPI) => {
        try {
            const response = await updatePromptFolder(payload.id, payload.folderId);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateFolderNameThunk = createAsyncThunk(
    "folders/updateFolderName",
    async (payload, thunkAPI) => {
        try {
            const response = await updateFolderNameApi(payload.id, payload.folderName);
            thunkAPI.dispatch(getFolders());
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const { setFolders, setIsNewFolderModalOpen, setNewFolderName, setUpdatedFolderName, toggleIsFolderNameEditable } = foldersSlice.actions;
export const selectFolders = (state) => state.folders.folders;
export const selectIsNewFolderModalOpen = (state) => state.folders.isNewFolderModalOpen;
export const selectNewFolderName = (state) => state.folders.newFolderName;
export const selectUpdatedFolderName = (state) => state.folders.updatedFolderName;
export const selectIsFolderNameEditable = (state) => state.folders.isFolderNameEditable;
export default foldersSlice.reducer;