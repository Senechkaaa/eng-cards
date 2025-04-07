export interface Card {
    id: string;
    deck_id: string;
    eng_word: string;
    ru_word: string;
    example: string;
    status: 'learn' | 'know' | 'learned';
}

export interface LearnPageResponce {
    cards: Card[];
}

export interface CardSchema {
    visibleCards: Card[];
    cards: Card[];
    remainingCards: Card[]
}