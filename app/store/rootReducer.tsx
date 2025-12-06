import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from '@/store/slices/exampleSlice';

export const rootReducer = combineReducers({
	example: exampleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
