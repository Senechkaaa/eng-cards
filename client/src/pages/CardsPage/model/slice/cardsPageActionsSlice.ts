import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsPageActionsSchema } from '../types/cardsPageActions';

const initialState: CardsPageActionsSchema = {
    isVisible: false,
    search: "",
};

const cardsPageActionsSlice = createSlice({
    name: 'cardsPageActions',
    initialState,
    reducers: {
        setIsVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }
    },

});

export const { actions: cardsPageActionsActions } = cardsPageActionsSlice;
export const { reducer: cardsPageActionsReducer } = cardsPageActionsSlice;
