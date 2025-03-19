import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { login, registration } from '../services/authService';
import { IUser } from '@shared/types/IUser';

const initialState: LoginSchema = {
    isLoading: false,
    error: '',
    isAuth: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },

        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // registration
            .addCase(registration.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: loginReducer } = loginSlice;
export const { setUser, setAuth } = loginSlice.actions;
