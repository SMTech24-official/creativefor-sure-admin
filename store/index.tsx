import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import { baseApi } from './api/baseApi';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type IRootState = ReturnType<typeof rootReducer>;
export default store;
