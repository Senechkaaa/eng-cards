import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateCardSchema } from '../types/CreateCardSchema';

const initialState: CreateCardSchema = {
    example: ''
};

export const createCardSlice = createSlice({
    name: 'create card',
    initialState,
    reducers: {
        setExample: (state, action: PayloadAction<string>) => {
            state.example = action.payload
        },
    },
});

export const { reducer: createCardReducer } = createCardSlice;
export const { actions: createCardActions } = createCardSlice;
