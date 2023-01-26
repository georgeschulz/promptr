import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import navSlice from './navSlice';
import foldersSlice from './foldersSlice';
import businessesSlice from './businessesSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        nav: navSlice,
        folders: foldersSlice,
        businesses: businessesSlice,
    }
});