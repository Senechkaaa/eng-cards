import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, CardSchema } from '../types/learnPageType';

const initialState: CardSchema = {
    cards: [],
    cardIndex: 0,
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<Card[]>) => {
            state.cards = action.payload;
        },
        setCardIndex: (state, action: PayloadAction<number>) => {
            state.cardIndex = action.payload;
        },
        moveRight: (state) => {
            state.cardIndex = state.cardIndex += 1;
        },
        moveLeft: (state) => {
            state.cardIndex = state.cardIndex += 1;
        },
    },
});

export const { actions: cardActions } = cardSlice;
export const { reducer: cardReducer } = cardSlice;
