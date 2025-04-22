import { authenticationApi } from '@shared/api/rtkApi';
import { DeleteCardRequest } from '../types/removeCard';
import { SuccessCardResponce } from '@shared/types/IUser';

const deleteCardApi = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        deleteCardApi: build.mutation<SuccessCardResponce, DeleteCardRequest>({
            query: (arg) => ({
                url: '/api/cards/delete',
                method: 'DELETE',
                body: {
                    card_id: arg.card_id,
                },
            }),
            invalidatesTags: (result) => ['Cards'],
        }),
    }),
});

export const { useDeleteCardApiMutation } = deleteCardApi;
