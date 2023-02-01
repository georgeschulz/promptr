import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import navSlice from './navSlice';
import foldersSlice from './foldersSlice';
import businessesSlice from './businessesSlice';
import offerSlice from './offerSlice';
import templatesSlice from './templatesSlice';
import promptsSlice from './promptsSlice';
import synthesizeSlice from './synthesizeSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        nav: navSlice,
        folders: foldersSlice,
        businesses: businessesSlice,
        offers: offerSlice,
        templates: templatesSlice,
        prompts: promptsSlice,
        synthesize: synthesizeSlice
    }
});