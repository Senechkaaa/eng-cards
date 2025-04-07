import { authenticationApi } from '@shared/api/rtkApi';
import { LearnPageResponce } from '../types/learnPageType';
import { cardActions } from '../slice/cardSlice';

const learnPageApi = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        getCards: build.query<LearnPageResponce, void>({
            query: () => ({
                url: '/api/cards/get',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(cardActions.setCards(data.cards))
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useGetCardsQuery } = learnPageApi;
