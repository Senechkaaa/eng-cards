import { getCardState } from '@entities/Card/model/selectors/getCardState';
import { CardList } from '@entities/Card/ui/CardList/CardList';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetCardsQuery } from '../model/services/fetchDataCards/fetchDataCards';
import { getCardsPageActionsState } from '@pages/CardsPage/model/selectors/getCardsPageActionsState';
import { useDebounce } from '@shared/lib/hooks/useDebounce/useDebounce';

interface CardInfiniteListProps {
    className?: string;
}

export const CardInfiniteList = memo(({ className }: CardInfiniteListProps) => {
    const { cards } = useSelector(getCardState);
    const { search, sort } = useSelector(getCardsPageActionsState);
    const debouncedSearchTerm = useDebounce(search, 300);
    const { isError, isLoading, refetch } = useGetCardsQuery({
        search: debouncedSearchTerm,
        status: sort,
    });

    useEffect(() => {
        refetch();
    }, [sort, refetch, debouncedSearchTerm]);
    return <CardList isLoading={isLoading} isError={isError} cards={cards} className={className} />;
});
