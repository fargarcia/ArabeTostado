import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import initialState from "./initialState";
import rootReducer from "./rootReducer";

export default () =>
    configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });
