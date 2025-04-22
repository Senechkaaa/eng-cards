import { authenticationApi } from '@shared/api/rtkApi';
import { UpdateDataCardRequest } from '../../../../../entities/Card/types/learnPageType';
import { SuccessCardResponce } from '@shared/types/IUser';

const updateDataCard = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        updateData: build.mutation<SuccessCardResponce, UpdateDataCardRequest>({
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
