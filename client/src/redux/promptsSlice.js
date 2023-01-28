import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPrompts, fetchPromptById, deletePrompt, updatePromptApi, createPrompt } from "../api/prompts";

const promptSlice = createSlice({
    name: 'prompts',
    initialState: {
        prompts: [],
        prompt: "",
        context: "",
        audience: "",
        additionalDetails: "",
        quality: false,
        length: "",
        currentTemplateId: "",
        currentBusinessDescription: "",
        currentOfferDescription: "",
        currentOfferId: "",
        currentOfferPainPoints: "",
        currentOfferBenefits: "",
        currentOfferFeatures: "",
        currentBusiness: "",
        currentBusinessId: "",
        audienceOptions: []
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
        },
        setCurrentTemplateId: (state, action) => {
            state.currentTemplateId = action.payload;
        },
        setCurrentOfferDescription: (state, action) => {
            state.currentOfferDescription = action.payload;
        },
        setCurrentOfferId: (state, action) => {
            state.currentOfferId = action.payload;
        },
        setCurrentOfferPainPoints: (state, action) => {
            state.currentOfferPainPoints = action.payload;
        },
        setCurrentOfferBenefits: (state, action) => {
            state.currentOfferBenefits = action.payload;
        },
        setCurrentOfferFeatures: (state, action) => {
            state.currentOfferFeatures = action.payload;
        },
        setCurrentBusiness: (state, action) => {
            state.currentBusiness = action.payload;
        },
        setCurrentBusinessId: (state, action) => {
            state.currentBusinessId = action.payload;
        },
        setBusinessDescription: (state, action) => {
            state.currentBusinessDescription = action.payload;
        },
        setAudienceOptions: (state, action) => {
            state.audienceOptions = action.payload.map(audience => { 
                return { title: audience.name }
             });
        }
    }
});

export const { setContext, setAudience, setAdditionalDetails, setQuality, setLength, setPrompt, setPrompts, clearPrompt, setCurrentBusiness, setCurrentBusinessId, setCurrentOfferBenefits, setCurrentOfferDescription, setCurrentOfferFeatures, setCurrentOfferId, setCurrentOfferPainPoints, setCurrentTemplateId, setBusinessDescription, setAudienceOptions } = promptSlice.actions;
export const selectContext = (state) => state.prompts.context;
export const selectAudience = (state) => state.prompts.audience;
export const selectAdditionalDetails = (state) => state.prompts.additionalDetails;
export const selectQuality = (state) => state.prompts.quality;
export const selectLength = (state) => state.prompts.length;
export const selectPrompt = (state) => state.prompts.prompt;
export const selectPrompts = (state) => state.prompts.prompts;
export const selectCurrentTemplateId = (state) => state.prompts.currentTemplateId;
export const selectOfferDescription = (state) => state.prompts.currentOfferDescription;
export const selectCurrentOfferId = (state) => state.prompts.currentOfferId;
export const selectOfferPainPoints = (state) => state.prompts.currentOfferPainPoints;
export const selectOfferBenefits = (state) => state.prompts.currentOfferBenefits;
export const selectOfferFeatures = (state) => state.prompts.currentOfferFeatures;
export const selectCurrentBusiness = (state) => state.prompts.currentBusiness;
export const selectCurrentBusinessId = (state) => state.prompts.currentBusinessId;
export const selectBusinessDescription = (state) => state.prompts.currentBusinessDescription;
export const selectAudienceOptions = (state) => state.prompts.audienceOptions;

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
        const context = selectContext(thunkAPI.getState());
        const audience = selectAudience(thunkAPI.getState());
        const additionalDetails = selectAdditionalDetails(thunkAPI.getState());
        const quality = selectQuality(thunkAPI.getState());
        const length = selectLength(thunkAPI.getState());
        const templateId = selectCurrentTemplateId(thunkAPI.getState());
        const offerId = selectCurrentOfferId(thunkAPI.getState());
        const businessId = selectCurrentBusinessId(thunkAPI.getState());
        const response = await updatePromptApi(data.id, {
            context: context,
            additionalDetails: additionalDetails,
            quality: quality,
            length: length,
            prompt: data.text,
            businessId,
            offerId,
            templateId,
            audience
        });
        return response.data;
    }
);

export default promptSlice.reducer;