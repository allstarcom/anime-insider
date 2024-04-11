import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice'
import watchLaterReducer from './watchLaterSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        watchlater : watchLaterReducer
    },
});
