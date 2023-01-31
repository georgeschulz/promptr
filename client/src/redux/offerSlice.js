import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOffers, createOffer, deleteOffer, updateOfferApi, fetchOfferById } from "../api/offers";

const offerSlice = createSlice({
    name: "offer",
    initialState: {
        offers: [],
        newOfferName: "",
        newOfferDescription: "",
        newOfferPainpoints: "",
        newOfferBenefits: "",
        newOfferFeatures: "",
        selectedOfferId: null,
        searchTerm: "",
        isUpdateSuccess: false,
    },
    reducers: {
        setOffers: (state, action) => {
            state.offers = action.payload;
        },
        setNewOfferName: (state, action) => {
            state.newOfferName = action.payload;
        },
        setNewOfferDescription: (state, action) => {
            state.newOfferDescription = action.payload;
        },
        setNewOfferPainpoints: (state, action) => {
            state.newOfferPainpoints = action.payload;
        },
        setNewOfferBenefits: (state, action) => {
            state.newOfferBenefits = action.payload;
        },
        setNewOfferFeatures: (state, action) => {
            state.newOfferFeatures = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedOfferId: (state, action) => {
            state.selectedOfferId = action.payload;
        },
        setIsUpdateSuccess: (state, action) => {
            state.isUpdateSuccess = action.payload;
        }
    },
});

export const getOffers = createAsyncThunk(
    "offer/getOffers",
    async (data, thunkAPI) => {
        const response = await fetchOffers();
        const offers = response.data.data;
        const offersMapped = offers.map(offer => {
            return {
                ...offer,
                name: offer.name || "Untitled Offer",
                description: offer.description || "No description",
                pain_points: offer.pain_points || "No pain points",
                benefits: offer.benefits || "No benefits",
                features: offer.features || "No features"
            }
        });
        thunkAPI.dispatch(setOffers(offersMapped));
        return response.data;
    }
);

export const createNewOffer = createAsyncThunk(
    "offer/createNewOffer",
    async (data, thunkAPI) => {
        const response = await createOffer(data);
        thunkAPI.dispatch(getOffers());
        return response.data;
    }
);

export const deleteSelectedOffer = createAsyncThunk(
    "offer/deleteSelectedOffer",
    async (data, thunkAPI) => {
        const response = await deleteOffer(data.businessId);
        thunkAPI.dispatch(getOffers());
        return response.data;
    }
);

export const updateOffer = createAsyncThunk(
    "offer/updateOffer",
    async (data, thunkAPI) => {
        const response = await updateOfferApi(data.businessId, data.updates);
        console.log(data.updates)
        thunkAPI.dispatch(getOffers());
        thunkAPI.dispatch(setIsUpdateSuccess(true));
        return response.data;
    }
);

export const { setOffers, setNewOfferName, setNewOfferDescription, setNewOfferPainpoints, setNewOfferBenefits, setNewOfferFeatures, setSearchTerm, setSelectedOfferId, setIsUpdateSuccess } = offerSlice.actions;
export const selectOffers = state => state.offers.offers;
export const selectNewOfferName = state => state.offers.newOfferName;
export const selectNewOfferDescription = state => state.offers.newOfferDescription;
export const selectNewOfferPainpoints = state => state.offers.newOfferPainpoints;
export const selectNewOfferBenefits = state => state.offers.newOfferBenefits;
export const selectNewOfferFeatures = state => state.offers.newOfferFeatures;
export const selectSearchTerm = state => state.offers.searchTerm;
export const selectSelectedOfferId = state => state.offers.selectedOfferId;
export const selectIsUpdateSuccess = state => state.offers.isUpdateSuccess;
export default offerSlice.reducer;