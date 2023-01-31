import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTemplates, createTemplate, deleteTemplate, updateTemplateApi, fetchTemplateById } from "../api/templates";

const templateSlice = createSlice({
    name: "template",
    initialState: {
        templates: [],
        newTemplateName: "",
        newTemplateFormula: "",
        selectedTemplateId: null,
        searchTerm: "",
        cursorPosition: 0,
        isTemplateUpdateSuccess: false,
    },
    reducers: {
        setTemplates: (state, action) => {
            state.templates = action.payload;
        },
        setNewTemplateName: (state, action) => {
            state.newTemplateName = action.payload;
        },
        setNewTemplateFormula: (state, action) => {
            state.newTemplateFormula = action.payload;
        },
        setSelectedTemplateId: (state, action) => {
            state.selectedTemplateId = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        appendToFormula: (state, action) => {
            state.newTemplateFormula += action.payload;
        },
        setCursorPosition: (state, action) => {
            state.cursorPosition = action.payload;
        },
        insertStringIntoFormulaAtIndex: (state, action) => {
            const { string, index } = action.payload;
            const formula = state.newTemplateFormula;
            const formulaBefore = formula.slice(0, index);
            const formulaAfter = formula.slice(index);
            state.newTemplateFormula = formulaBefore + string + formulaAfter;
        },
        setIsTemplateUpdateSuccess: (state, action) => {
            state.isTemplateUpdateSuccess = action.payload;
        }
    }
});

export const getTemplates = createAsyncThunk(
    "template/getTemplates",
    async (data, thunkAPI) => {
        const response = await fetchTemplates();
        const templates = response.data.data;
        const templatesMapped = templates.map(template => {
            return {
                ...template,
                name: template.name || "Untitled Template",
                formula: template.template || "No formula"
            }
        });
        thunkAPI.dispatch(setTemplates(templatesMapped));
        return response.data;
    }
);

export const createTemplateThunk = createAsyncThunk(
    "template/createTemplate",
    async (data, thunkAPI) => {
        const response = await createTemplate();
        const template = response.data.data;
        const templateMapped = {
            ...template,
            name: template.name || "Untitled Template",
            formula: template.formula || "No formula"
        };
        thunkAPI.dispatch(getTemplates());
        return response.data;
    }
);

export const deleteTemplateThunk = createAsyncThunk(
    "template/deleteTemplate",
    async (data, thunkAPI) => {
        const response = await deleteTemplate(data.businessId);
        thunkAPI.dispatch(getTemplates());
        return response.data;
    }
);

export const updateTemplate = createAsyncThunk(
    "template/updateTemplate",
    async (data, thunkAPI) => {
        const response = await updateTemplateApi(data.id, data.updates);
        thunkAPI.dispatch(getTemplates());
        thunkAPI.dispatch(setIsTemplateUpdateSuccess(true));
        return response.data;
    }
);

export const { setTemplates, setNewTemplateName, setNewTemplateFormula, setSelectedTemplateId, setSearchTerm, appendToFormula, setCursorPosition, insertStringIntoFormulaAtIndex, setIsTemplateUpdateSuccess } = templateSlice.actions;
export const selectTemplates = state => state.templates.templates;
export const selectNewTemplateName = state => state.templates.newTemplateName;
export const selectNewTemplateFormula = state => state.templates.newTemplateFormula;
export const selectSelectedTemplateId = state => state.templates.selectedTemplateId;
export const selectSearchTerm = state => state.templates.searchTerm;
export const selectCursorPosition = state => state.templates.cursorPosition;
export const selectIsTemplateUpdateSuccess = state => state.templates.isTemplateUpdateSuccess;
export default templateSlice.reducer;