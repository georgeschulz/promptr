import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBusinesses, createBusiness, deleteBusiness, updateBusinessApi } from "../api/businesses";

const businessesSlice = createSlice({
    name: "businesses",
    initialState: {
        businesses: [],
        newBusinessName: "",
        newBusinessDescription: "",
        searchTerm: "",
        selectedBusinessId: null,
        audiences: []
    },
    reducers: {
        setBusinesses: (state, action) => {
            state.businesses = action.payload;
        },
        setNewBusinessName: (state, action) => {
            state.newBusinessName = action.payload;
        },
        setNewBusinessDescription: (state, action) => {
            state.newBusinessDescription = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedBusinessId: (state, action) => {
            state.selectedBusinessId = action.payload;
        },
        setAudiences: (state, action) => {
            state.audiences = action.payload;
        },
        addAudience: (state, action) => {
            state.audiences.push(action.payload);
        },
        updateAudienceMember: (state, action) => {
            const { index, newValue } = action.payload;
            state.audiences = state.audiences.map((audience, i) => {
                if (i === index) {
                    return newValue;
                }
                return audience;
            })
        },
        removeAudienceMember: (state, action) => {
            const { index } = action.payload;
            state.audiences.splice(index, 1);
        }
    },
});

export const getBusinesses = createAsyncThunk(
    "businesses/getBusinesses",
    async (payload, thunkAPI) => {
        try {
            const response = await fetchBusinesses()
            const businesses = response.data.data;
            const businessesMapped = businesses.map(business => {
                return {
                    ...business,
                    name: business.name || "Untitled Business",
                    description: business.description || "No description",
                }
            });
            thunkAPI.dispatch(setBusinesses(businessesMapped));
            thunkAPI.dispatch(setAudiences(businessesMapped.map(business => business.audiences).flat().map(audience => audience.name)))
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const newBusiness = createAsyncThunk(
    "businesses/createBusiness",
    async (payload, thunkAPI) => {
        try {
            const response = await createBusiness();
            const business = response.data.data;
            thunkAPI.dispatch(setBusinesses([...thunkAPI.getState().businesses.businesses, { ...business, name: business.name || "Untitled Business", description: business.description || "No description"}]));
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const removeBusiness = createAsyncThunk(
    "businesses/deleteBusiness",
    async (payload, thunkAPI) => {
        try {
            const response = await deleteBusiness(payload.businessId);
            const businesses = thunkAPI.getState().businesses.businesses.filter(business => business.business_id !== payload.businessId);
            thunkAPI.dispatch(setBusinesses(businesses));
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateBusiness = createAsyncThunk(
    "businesses/updateBusiness",
    async (payload, thunkAPI) => {
        try {
            const response = await updateBusinessApi(payload.businessId, payload.updates);
            thunkAPI.dispatch(getBusinesses())
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const { setBusinesses, setNewBusinessName, setNewBusinessDescription, setSearchTerm, setSelectedBusinessId, setAudiences, addAudience, updateAudienceMember, removeAudienceMember } = businessesSlice.actions;
export const selectBusinesses = (state) => state.businesses.businesses;
export const selectNewBusinessName = (state) => state.businesses.newBusinessName;
export const selectNewBusinessDescription = (state) => state.businesses.newBusinessDescription;
export const selectSearchTerm = (state) => state.businesses.searchTerm;
export const selectSelectedBusinessId = (state) => state.businesses.selectedBusinessId;
export const selectSelectedBusiness = (state) => state.businesses.businesses ? state.businesses.businesses.find(business => business.business_id === state.businesses.selectedBusinessId) : null;
export const selectAudiences = (state) => state.businesses.audiences;
export default businessesSlice.reducer;