import { authenticationApi } from '@shared/api/rtkApi';
import { CreateCardResponce } from '../types/CreateCardResponce';
import { ValidationCreateCardSchemaType } from '../types/ValidationCreateCardSchemaType';


const createCardApi = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        addCard: build.mutation<CreateCardResponce, ValidationCreateCardSchemaType>({
            query: (arg) => ({
                url: '/api/cards/create',
                method: 'POST',
                body: {
                    eng_word: arg.engWord,
                    ru_word: arg.ruWord,
                    example: arg.example || '',
                },
            }),
        }),
    }),
});

export const { useAddCardMutation } = createCardApi;
