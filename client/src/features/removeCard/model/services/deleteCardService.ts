import { authenticationApi } from '@shared/api/rtkApi';

const deleteCardApi = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        deleteCardApi: build.mutation<>({
            query: (arg) => ({
                url: '/api/cards/create',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useDeleteCardApiMutation } = deleteCardApi;
