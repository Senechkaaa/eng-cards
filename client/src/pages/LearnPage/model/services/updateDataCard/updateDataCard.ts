import { authenticationApi } from '@shared/api/rtkApi';
import { UpdateDataCardRequest, UpdateDataCardResponce } from '../../types/learnPageType';

const updateDataCard = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        updateData: build.mutation<UpdateDataCardResponce, UpdateDataCardRequest>({
            query: (arg) => ({
                url: '/api/cards/change',
                method: 'PUT',
                body: {
                    status: arg.status,
                    card_id: arg.card_id,
                    correct_count: arg.correct_count,
                },
            }),
        }),
    }),
});

export const { useUpdateDataMutation } = updateDataCard;
