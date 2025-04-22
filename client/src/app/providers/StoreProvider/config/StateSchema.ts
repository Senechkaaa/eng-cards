import { UserSchema } from '@entities/User/model/types/user';
import { LoginSchema } from '@features/AuthByUsername/model/types/LoginSchema';
import { CardSchema } from '@entities/Card/types/learnPageType';
import { authenticationApi, rtkApi } from '@shared/api/rtkApi';
import { AxiosInstance } from 'axios';
import { CardsPageActionsSchema } from '@pages/CardsPage/model/types/cardsPageActions';

export interface StateSchema {
    login: LoginSchema;
    user: UserSchema;
    card: CardSchema;
    cardsPageActions: CardsPageActionsSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    [authenticationApi.reducerPath]: ReturnType<typeof authenticationApi.reducer>;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
