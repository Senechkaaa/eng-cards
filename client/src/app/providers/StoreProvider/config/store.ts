import { loginReducer } from '@features/AuthByUsername';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { rtkApi } from '@shared/api/rtkApi';
import { userReducer } from '@entities/User';
import { createCardReducer } from '@features/CreateCard/model/slice/createCardsSlice';

const rootReducer: ReducersMapObject<StateSchema> = {
    [rtkApi.reducerPath]: rtkApi.reducer,
    login: loginReducer,
    user: userReducer,
    createCard: createCardReducer
}

export const setupStore = (initialState?: StateSchema) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
    });
};

const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
