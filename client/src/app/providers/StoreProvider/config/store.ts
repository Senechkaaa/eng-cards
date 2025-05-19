import { loginReducer } from '@features/AuthByUsername';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { authenticationApi, rtkApi } from '@shared/api/rtkApi';
import { userReducer } from '@entities/User';
import { cardReducer } from '@entities/Card/model/slice/cardSlice';
import { cardsPageActionsReducer } from '@pages/CardsPage/model/slice/cardsPageActionsSlice';

const rootReducer: ReducersMapObject<StateSchema> = {
    [rtkApi.reducerPath]: rtkApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    login: loginReducer,
    user: userReducer,
    card: cardReducer,
    cardsPageActions: cardsPageActionsReducer,
};

export const setupStore = (initialState?: StateSchema) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(rtkApi.middleware).concat(authenticationApi.middleware),
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
