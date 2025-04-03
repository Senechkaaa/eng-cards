import { UserSchema } from '@entities/User/model/types/user';
import { LoginSchema } from '@features/AuthByUsername/model/types/LoginSchema';
import { rtkApi } from '@shared/api/rtkApi';
import { AxiosInstance } from 'axios';

export interface StateSchema {
    login: LoginSchema;
    user: UserSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
