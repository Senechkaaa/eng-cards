import {loginReducer} from '@features/AuthByUsername'
import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'

const rootReducer = combineReducers({
    login: loginReducer,
});

export const setupStore = (initialState?: StateSchema) => {
    return configureStore<StateSchema>({
        reducer: rootReducer as ReducersMapObject<StateSchema>,
        preloadedState: initialState,
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
