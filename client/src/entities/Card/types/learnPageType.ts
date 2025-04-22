import { ICard, Status } from '@shared/types/ICard';

export interface UpdateDataCardRequest {
    status: Status;
    card_id: string
    correct_count: number
}


export interface CardSchema {
    cards: ICard[];
    cardIndex: number;
    isInverted: boolean;
}