import { AuthResponce } from '@shared/types/AuthResponce';
import { Credentials } from '../types/IUser';
import { rtkApi } from '@shared/api/rtkApi';
import { TOKEN_LOCALSTORAGE_KEY } from '@shared/const/localStorage';
import { userActions } from '@entities/User';
import { IUser } from '@shared/types/IUser';

const authApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResponce, Credentials>({
            query: (arg) => ({
                url: '/sign-in',
                method: 'POST',
                body: {
                    email: arg.email,
                    password: arg.password,
                },
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, data.access_token);
                    dispatch(userActions.setAuthData(data.user));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        registration: build.mutation<AuthResponce, Credentials>({
            query: (arg) => ({
                url: '/sign-up',
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
                    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, data.access_token);
                    dispatch(userActions.setAuthData(data.user));
                } catch (e) {
                    console.log(e);
                }
            },
        }),

        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
                    dispatch(userActions.setAuthData({} as IUser));

                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } = authApi;

// export const login = createAsyncThunk<void, Credentials, { rejectValue: string }>(
//     'auth/login',
//     async ({ email, password }, thunkApi) => {
//         const { dispatch } = thunkApi;
//         try {
//             const responce: AxiosResponse<AuthResponce> = await $api.post<AuthResponce>(
//                 '/sign-in',
//                 { email, password },
//             );

//             if (!responce.data) {
//                 throw new Error();
//             }

//             localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, responce.data.access_token);
//             dispatch(setAuth(true));
//             // dispatch(setUser(responce.data.user))
//         } catch (error) {
//             return thunkApi.rejectWithValue('error');
//         }
//     },
// );

// export const registration = createAsyncThunk<void, Credentials, { rejectValue: string }>(
//     'auth/registration',
//     async (credentials, thunkApi) => {
//         const { dispatch } = thunkApi;
//         try {
//             const responce: AxiosResponse<AuthResponce> = await $api.post<AuthResponce>(
//                 '/sign-up',
//                 credentials,
//             );

//             if (!responce.data) {
//                 throw new Error();
//             }

//             localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, responce.data.access_token);
//             dispatch(setAuth(true));
//             // dispatch(setUser(responce.data.user))
//         } catch (e) {
//             console.error(e);
//             return thunkApi.rejectWithValue('registration failed');
//         }
//     },
// );

// export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
//     'auth/logout',
//     async (__dirname, thunkApi) => {
//         const { dispatch } = thunkApi;
//         try {
//             const responce: AxiosResponse<AuthResponce> = await $api.post<AuthResponce>('/logout');
//             console.log(responce);
//             localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
//             dispatch(setAuth(false));
//             dispatch(setUser({} as IUser));
//         } catch (e) {
//             console.error(e);
//             return thunkApi.rejectWithValue('logout failed');
//         }
//     },
// );

// export const checkAuth = createAsyncThunk<void, void, { rejectValue: string }>(
//     'auth/refresh',
//     async (_, thunkApi) => {
//         const { dispatch } = thunkApi;
//         try {
//             const responce = await axios.get<AuthResponce>(`${API_URL}/refresh`, {
//                 withCredentials: true,
//             });
//             console.log(responce);
//             localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, responce.data.access_token);
//             dispatch(setAuth(true));
//             dispatch(setUser(responce.data.user));
//         } catch (e) {
//             console.error(e);
//             return thunkApi.rejectWithValue('check auth is failed');
//         }
//     },
// );
