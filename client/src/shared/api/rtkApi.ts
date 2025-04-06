import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { API_URL } from '@shared/const/api_url';
import { TOKEN_LOCALSTORAGE_KEY } from '@shared/const/localStorage';
import { AuthResponce } from '@shared/types/AuthResponce';

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || '';
        console.log(token);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

export const rtkApi = createApi({
    reducerPath: 'rtkApi',
    baseQuery: baseQuery,
    endpoints: (_build) => ({}),
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        if (refreshResult.data) {
            const { access_token } = refreshResult.data as AuthResponce;
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, access_token);
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log('Не авторизован!');
        }
    }
    return result;
};
export const authenticationApi = createApi({
    reducerPath: 'authenticationApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (_build) => ({}),
});
