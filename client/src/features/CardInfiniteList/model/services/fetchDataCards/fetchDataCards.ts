import { authenticationApi } from '@shared/api/rtkApi';
import { cardActions } from '@entities/Card/model/slice/cardSlice';
import { FetchDataCardsRequest, FetchDataCardsResponce } from '../../types/cardInfiniteList';
import { CardSortFieldOptions } from '@pages/CardsPage/model/consts/cardStatusOptions';

const fetchDataCards = authenticationApi.injectEndpoints({
    endpoints: (build) => ({
        getCards: build.query<FetchDataCardsResponce, FetchDataCardsRequest>({
            query: ({ search, status }) => ({
                url: '/api/cards/get',
                params: {
                    q: search,
                    queryStatus: status || CardSortFieldOptions.ALL,
                },
            }),
            providesTags: ['Cards'],
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
