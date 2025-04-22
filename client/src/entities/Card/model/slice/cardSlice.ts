import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardSchema } from '../../types/learnPageType';
import { ICard } from '@shared/types/ICard';

const initialState: CardSchema = {
    cards: [],
    cardIndex: 0,
    isInverted: false,
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<ICard[]>) => {
            state.cards = action.payload;
        },
        setCardIndex: (state, action: PayloadAction<number>) => {
            state.cardIndex = action.payload;
        },
        moveCard: (state) => {
            state.cardIndex = state.cardIndex += 1;
            state.isInverted = false;
        },
        setIsInverted: (state, action: PayloadAction<boolean>) => {
            state.isInverted = action.payload;
        },
    },
});

export const { actions: cardActions } = cardSlice;
export const { reducer: cardReducer } = cardSlice;
