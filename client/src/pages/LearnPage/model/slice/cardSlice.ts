import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, CardSchema } from '../types/learnPageType';

const initialState: CardSchema = {
    cards: [],
    visibleCards: [],
    remainingCards: [],
};

// не обязательно 5, сделать динамически. Передвать из вне.
// пересмотреть логику видимых карт, не совсем нравится
// а что если меньше 5 карт

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCards: (state, action) => {
            state.cards = action.payload;
            state.visibleCards = state.cards.slice(0, 5);
            state.remainingCards = state.cards.slice(5);
        },
        moveRight: (state) => {
            if (state.remainingCards.length > 0) {
                const nextCard = state.remainingCards[0];
                state.visibleCards = [...state.visibleCards.slice(1), nextCard];
                state.remainingCards = state.remainingCards.slice(1);
            } else {
                state.visibleCards = [...state.visibleCards.slice(1)];
            }
        },
        moveLeft: (state) => {
            state.visibleCards = [...state.visibleCards].sort(() => Math.random() - 0.5);
        },
    },
});

export const { actions: cardActions } = cardSlice;
export const { reducer: cardReducer } = cardSlice;
