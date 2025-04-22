import { getCardState } from '@entities/Card/model/selectors/getCardState';
import { CardList } from '@entities/Card/ui/CardList/CardList';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useGetCardsQuery } from '../model/services/fetchDataCards/fetchDataCards';
import { getCardsPageActionsState } from '@pages/CardsPage/model/selectors/getCardsPageActionsState';

interface CardInfiniteListProps {
    className?: string;
}

export const CardInfiniteList = memo(({ className }: CardInfiniteListProps) => {
    const { cards } = useSelector(getCardState);
    const { search } = useSelector(getCardsPageActionsState);
    
    console.log(search)
    const { isError, isLoading } = useGetCardsQuery({ search: search || "" });
    // useDebounce;
    return <CardList isLoading={isLoading} isError={isError} cards={cards} className={className} />;
});
