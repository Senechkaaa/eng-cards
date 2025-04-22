import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardList.module.scss';
import { memo } from 'react';
import { ICard } from '@shared/types/ICard';
import { Text } from '@shared/ui/Text';
import { useDeleteCardApiMutation } from '@features/removeCard';
import { Button } from '@shared/ui/Button';
import { AppLink } from '@shared/ui/AppLink';
import { Routes } from '@shared/const/router';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

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
                <Text theme='blue' size='l' title='Карточки закончились' />
                <AppLink to={Routes.CREATE}>
                    <Button className={cls.btn} size='l' variant='outlined'>
                        {t('Пора добавить новые слова')}
                    </Button>
                </AppLink>
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
