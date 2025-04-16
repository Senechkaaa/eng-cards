import { authenticationApi } from '@shared/api/rtkApi';
import { FetchDataCardsResponce } from '../../types/learnPageType';
import { cardActions } from '../../slice/cardSlice';

const fetchDataCards = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        getCards: build.query<FetchDataCardsResponce, void>({
            query: () => ({
                url: '/api/cards/get',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('fetch fetchDataCards');
                    dispatch(cardActions.setCards(data.cards));
                    dispatch(cardActions.setCardIndex(0));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useGetCardsQuery } = fetchDataCards;
