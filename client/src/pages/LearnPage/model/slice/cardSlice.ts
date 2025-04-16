import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, CardSchema } from '../types/learnPageType';

const initialState: CardSchema = {
    cards: [],
    cardIndex: 0,
    invertedCard: false,
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
            // state.cards[state.cardIndex].correct_count += 1;
        },
        moveLeft: (state) => {
            // state.cards[state.cardIndex].correct_count -= 1;
            state.cardIndex = state.cardIndex += 1;
        },
        setCardInverted: (state, action: PayloadAction<boolean>) => {
            state.invertedCard = action.payload
        },

    },
});

export const { actions: cardActions } = cardSlice;
export const { reducer: cardReducer } = cardSlice;
