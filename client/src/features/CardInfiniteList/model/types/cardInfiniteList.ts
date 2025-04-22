import { ICard } from '@shared/types/ICard';

export interface FetchDataCardsResponce {
    cards: ICard[];
}

export interface FetchDataCardsRequest {
    search: string;
}
