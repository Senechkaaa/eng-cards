import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsPageActionsSchema } from '../types/cardsPageActions';
import { CardSortFieldOptions } from '../consts/cardStatusOptions';

const initialState: CardsPageActionsSchema = {
    isVisible: false,
    search: "",
    sort: CardSortFieldOptions.ALL
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
        },
        setSort: (state, action: PayloadAction<CardSortFieldOptions>) => {
            state.sort = action.payload
        }
    },

});

export const { actions: cardsPageActionsActions } = cardsPageActionsSlice;
export const { reducer: cardsPageActionsReducer } = cardsPageActionsSlice;
