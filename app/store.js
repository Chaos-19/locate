import { configureStore } from '@reduxjs/toolkit'
import { rootSlice } from '../reducers/rooteReducer'

export const store = configureStore({
    reducer: {
        root: rootSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

