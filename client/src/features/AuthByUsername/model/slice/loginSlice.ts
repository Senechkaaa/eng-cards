import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
    error: '',
    isAuth: false,
    email: '',
    password: '',
    username: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    },
});

export const { reducer: loginReducer } = loginSlice;
export const { actions: loginActions } = loginSlice;
