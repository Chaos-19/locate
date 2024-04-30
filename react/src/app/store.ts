import { configureStore } from "@reduxjs/toolkit";
import mapPointSlice from "../features/map/mapPointSlice";
import uiStateSlice from "../features/ui/uiStateSlice";


export const store = configureStore({
    reducer: {
        map: mapPointSlice,
        ui: uiStateSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch