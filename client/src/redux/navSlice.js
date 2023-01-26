import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: "nav",
    initialState: {
        currentPage: 0,
        settingsMenuOpen: false,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        toggleSettingsMenuOpen: (state) => {
            state.settingsMenuOpen = !state.settingsMenuOpen;
        }
    },
});

export const { setCurrentPage, toggleSettingsMenuOpen } = navSlice.actions;
export const selectCurrentPage = (state) => state.nav.currentPage;
export const selectSettingsMenuOpen = (state) => state.nav.settingsMenuOpen;
export default navSlice.reducer;

