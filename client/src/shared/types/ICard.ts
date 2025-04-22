export type Status = 'learn' | 'know' | 'learned';

export interface ICard {
    id: string;
    deck_id: string;
    eng_word: string;
    ru_word: string;
    example: string;
    status: Status;
    correct_count: number;
}
