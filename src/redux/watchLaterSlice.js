import { createSlice } from '@reduxjs/toolkit';

export const watchLaterSlice = createSlice({
    name: 'watchlater',
    initialState: {
        watchlaters: [],
    },
    reducers: {
        setWatchLater: (state, action) => {
            state.watchlaters = action.payload
        },
        addWatchLater: (state, action) => {
            const { _id, title, image, genres, status } = action.payload;
            state.watchlaters.push({
                _id,
                title,
                image,
                genres,
                status
            });
        },
        deleteWatchLater: (state, action) => {
            const id = action.payload;
            state.watchlaters = state.watchlaters.filter(
                (watchlater) => watchlater.id !== id
            );
        },
    },
})

export const { setWatchLater, addWatchLater, deleteWatchLater  } = watchLaterSlice.actions;

export default watchLaterSlice.reducer;