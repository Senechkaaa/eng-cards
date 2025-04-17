export type Status = 'learn' | 'know' | 'learned';
export interface Card {
    id: string;
    deck_id: string;
    eng_word: string;
    ru_word: string;
    example: string;
    status: Status;
    correct_count: number;
}

export interface FetchDataCardsResponce {
    cards: Card[];
}

export interface UpdateDataCardResponce {
    status: string
}

export interface UpdateDataCardRequest {
    status: Status;
    card_id: string
    correct_count: number
}


export interface CardSchema {
    cards: Card[];
    cardIndex: number,
}