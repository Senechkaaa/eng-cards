import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardList.module.scss';
import { memo } from 'react';
import { ICard } from '@shared/types/ICard';
import { Text } from '@shared/ui/Text';
import { useDeleteCardApiMutation } from '@features/removeCard';
import { CardListItem } from '../CardListItem/CardListItem';

interface CardListProps {
    className?: string;
    cards: ICard[];
    isError: boolean;
    isLoading: boolean;
}

export const CardList = memo((props: CardListProps) => {
    const { className, cards, isError, isLoading } = props;
    const [deleteCard] = useDeleteCardApiMutation();

    if (isError) {
        return (
            <div className={classNames(cls.CardList, {}, [className])}>
                <Text title='Произошла ошибка' size='l' align='center' />
            </div>
        );
    }

    if (isLoading) {
        // временная заглушка, нужно сделать скелетон
        return (
            <div className={classNames(cls.CardList, {}, [className])}>
                <Text title='Loading...' size='l' align='center' />
            </div>
        );
    }

    const onDeleteCard = (cardId: string) => {
        deleteCard({ card_id: cardId });
    };

    if (!cards) {
        return (
            <>
                <Text theme='blue' size='l' title='Такой карточки не существует' />
            </>
        );
    }

    return (
        <div className={classNames(cls.CardList, {}, [className])}>
            {cards.map((card) => (
                <CardListItem onDeleteCard={onDeleteCard} key={card.id} card={card} />
            ))}
        </div>
    );
});
