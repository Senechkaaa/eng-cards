import { AuthResponce } from '@shared/types/AuthResponce';
import { authenticationApi } from '@shared/api/rtkApi';
import { TOKEN_LOCALSTORAGE_KEY } from '@shared/const/localStorage';
import { userActions } from '@entities/User';
import { IUser } from '@shared/types/IUser';
import { loginActions } from '../slice/loginSlice';
import { AuthCredentials } from '../types/ValidationAuthSchema';
import { handleAuthSuccess } from './handleAuthSuccess';

const authApi = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResponce, AuthCredentials>({
            query: (arg) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: {
                    email: arg.email,
                    password: arg.password,
                },
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    handleAuthSuccess(dispatch, data);
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        registration: build.mutation<AuthResponce, AuthCredentials>({
            query: (arg) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: {
                    email: arg.email,
                    username: arg.username,
                    password: arg.password,
                },
            }),

            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    handleAuthSuccess(dispatch, data);
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        logout: build.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
                    dispatch(loginActions.setAuth(false));
                    dispatch(userActions.setAuthData({} as IUser));
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        checkAuth: build.query<AuthResponce, void>({
            query: () => ({
                url: '/auth/refresh',
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                handleAuthSuccess(dispatch, data);
            },
        }),
    }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation, useCheckAuthQuery } =
    authApi;
