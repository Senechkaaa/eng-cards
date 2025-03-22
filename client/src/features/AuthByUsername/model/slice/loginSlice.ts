import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
    error: '',
    isAuth: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        }
    },
});

export const { reducer: loginReducer } = loginSlice;
export const { actions: loginActions } = loginSlice;
