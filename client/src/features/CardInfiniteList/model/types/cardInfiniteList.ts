import { CardSortFieldOptions } from '@pages/CardsPage/model/consts/cardStatusOptions';
import { ICard } from '@shared/types/ICard';

export interface FetchDataCardsResponce {
    cards: ICard[];
}

export interface FetchDataCardsRequest {
    search: string;
    status?: CardSortFieldOptions
}
