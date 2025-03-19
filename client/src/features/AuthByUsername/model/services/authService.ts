import axios, { AxiosResponse } from 'axios';
import { IUser } from '@shared/types/IUser';
import { AuthResponce } from '@shared/types/AuthResponce';
import { $api } from '@shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Credentials } from '../types/IUser';
import { setAuth, setUser } from '../slice/loginSlice';
import { API_URL } from '@shared/const/api_url';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from '@shared/const/localStorage';

export const login = createAsyncThunk<void, Credentials, { rejectValue: string }>(
    'auth/login',
    async ({ email, password }, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            const responce: AxiosResponse<AuthResponce> = await $api.post<AuthResponce>(
                '/sign-in',
                { email, password },
            );

            if (!responce.data) {
                throw new Error();
            }

            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, responce.data.access_token);
            dispatch(setAuth(true));
            // dispatch(setUser(responce.data.user))
        } catch (error) {
            return thunkApi.rejectWithValue('error');
        }
    },
);

export const registration = createAsyncThunk<void, Credentials, { rejectValue: string }>(
    'auth/registration',
    async (credentials, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            const responce: AxiosResponse<AuthResponce> = await $api.post<AuthResponce>(
                '/sign-up',
                credentials,
            );

            if (!responce.data) {
                throw new Error();
            }

            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, responce.data.access_token);
            dispatch(setAuth(true));
            // dispatch(setUser(responce.data.user))
        } catch (e) {
            console.error(e);
            return thunkApi.rejectWithValue('registration failed');
        }
    },
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (__dirname, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            const responce: AxiosResponse<AuthResponce> = await $api.post<AuthResponce>('/logout');
            console.log(responce);
            localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
            dispatch(setAuth(false));
            dispatch(setUser({} as IUser));
        } catch (e) {
            console.error(e);
            return thunkApi.rejectWithValue('logout failed');
        }
    },
);

export const checkAuth = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/refresh',
    async (_, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            const responce = await axios.get<AuthResponce>(`${API_URL}/refresh`, {
                withCredentials: true,
            });
            console.log(responce);
            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, responce.data.access_token);
            dispatch(setAuth(true));
            dispatch(setUser(responce.data.user));
        } catch (e) {
            console.error(e);
            return thunkApi.rejectWithValue('check auth is failed');
        }
    },
);
