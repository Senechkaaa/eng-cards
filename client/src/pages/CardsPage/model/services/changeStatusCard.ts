import { authenticationApi } from '@shared/api/rtkApi';

const changeStatusCard = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        addCard: build.mutation<>({
            query: (arg) => ({
                url: '/api/cards/create',
                method: 'POST',
                body: {
                    eng_word: arg.engWord,
                    ru_word: arg.ruWord,
                    example: arg.example || '',
                },
            }),
            invalidatesTags: (result) => ['Cards'],
        }),
    }),
});

export const { useAddCardMutation } = changeStatusCard;
