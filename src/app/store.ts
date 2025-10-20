import { configureStore } from "@reduxjs/toolkit";
import { centreApi } from "../api/centreApi";
import centreReducer from "../features/centreLocator/centreSlice";

export const store = configureStore({
    reducer: {
        centre: centreReducer,
        [centreApi.reducerPath]: centreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(centreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
