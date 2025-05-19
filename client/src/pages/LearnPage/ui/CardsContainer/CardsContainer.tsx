import style from '../../styles/styles.module.scss';
import cls from './CardsContainer.module.scss';
import { memo, useEffect } from 'react';
import { useAppSelector } from '@shared/lib/hooks/useAppSelector/useAppSelector';
import { getCardState } from '@entities/Card';
import { useGetCardsQuery } from '@features/CardInfiniteList';
import { Text } from '@shared/ui/Text';
import { classNames } from '@shared/lib/classNames/classNames';
import { AppLink } from '@shared/ui/AppLink';
import { Routes } from '@shared/const/router';
import { MainCard } from '../MainCard/MainCard';
import { Button } from '@shared/ui/Button';
import { Row } from '@shared/ui/Row';
import { useTranslation } from 'react-i18next';

export const CardsContainer = memo(() => {
    const { refetch, isError, isLoading } = useGetCardsQuery({ search: '' });
    const { cardIndex, cards } = useAppSelector(getCardState);
    const card = cards?.[cardIndex];
    const nextCard = cards?.[cardIndex + 1];
    const { t } = useTranslation();
    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isError) {
        return <Text size='l' title='Произошла ошибка' theme='error' />;
    }

    if (isLoading) {
        // временная заглушка, сделать skeleton loader
        return <Text size='l' title='loading...' theme='blue' />;
    }

    return cards?.[cardIndex] ? (
        <div className={classNames(cls.cards, {}, [])}>
            {cards.length - cardIndex >= 3 && (
                <div className={classNames(style.Card, {}, [cls.leftCard])} />
            )}
            {cards.length - cardIndex >= 2 && (
                <div className={classNames(style.Card, {}, [cls.rightCard])} />
            )}

            {cards?.[cardIndex + 1] && (
                <div className={classNames(style.Card, {}, [cls.next])} key={nextCard.id}>
                    <Text
                        className={style.ru_word}
                        theme='gray'
                        title={nextCard.ru_word}
                        size='l'
                    />
                </div>
            )}
            <MainCard card={card} />
        </div>
    ) : (
        <Row direction='column' align='center' className={cls.contNewWords}>
            <Text theme='blue' size='l' title='Карточки закончились' />
            <AppLink to={Routes.CREATE}>
                <Button className={cls.btn} size='l' variant='outlined'>
                    {t('Пора добавить новые слова')}
                </Button>
            </AppLink>
        </Row>
    );
});
