import cls from './Card.module.scss';
import { memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useAppSelector } from '@shared/lib/hooks/useAppSelector';
import { getCardState } from '../../model/selectors/getCardState';
import { useUpdateDataMutation } from '@pages/LearnPage/model/services/updateDataCard/updateDataCard';
import { useGetCardsQuery } from '@pages/LearnPage/model/services/fetchDataCards/fetchDataCards';
import {
    handlerMoveLeft,
    handlerMoveRight,
} from '@pages/LearnPage/model/services/updateDataCardUtils/updateDataCardUtils';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { cardActions } from '@pages/LearnPage/model/slice/cardSlice';
import { Text } from '@shared/ui/Text';
import { classNames } from '@shared/lib/classNames/classNames';
import { DragItem } from '@shared/ui/DragItem';

// санчала див при клике меняем состояние и => меняем верстку на другую с контекстом
export const Card = memo(() => {
    const { refetch, isError, isLoading } = useGetCardsQuery();
    const { cardIndex, cards, invertedCard } = useAppSelector(getCardState);
    const [updateCard] = useUpdateDataMutation();
    const [isInverted, setIsInverted] = useState(false);
    const card = cards?.[cardIndex];
    const nextCard = cards?.[cardIndex + 1];
    const dispatch = useAppDispatch();
    console.log(nextCard);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { delta } = event;
            if (delta.x > 250) {
                const updatedCard = handlerMoveRight(card);
                updateCard(updatedCard);
                dispatch(cardActions.moveRight());
                dispatch(cardActions.setCardInverted(false));
                setIsInverted(false);
            } else if (delta.x < -250) {
                const updatedCard = handlerMoveLeft(card);
                updateCard(updatedCard);
                dispatch(cardActions.moveLeft());
                dispatch(cardActions.setCardInverted(false));
                setIsInverted(false);
            } else {
                console.log('Карточка осталась на месте');
            }
        },
        [updateCard, card, dispatch],
    );

    const handleDragStart = useCallback(() => {
        dispatch(cardActions.setCardInverted(false));
    }, [dispatch]);

    // const flipCard = useCallback(
    //     (event) => {
    //         console.log('flip');
    //         // при клике на карточку мы отдаем нужно слово будь это английское или русское. Через состояние.
    //         //  и не нужно две карты.
    //         event.stopPropagation();
    //         dispatch(cardActions.setCardInverted(true));
    //     },
    //     [dispatch, invertedCard],
    // );

    if (isError) {
        return <Text size='l' title='Произошла ошибка' theme='error' />;
    }

    if (isLoading) {
        // временная заглушка, сделать skeleton loader
        return <Text size='l' title='loading...' theme='blue' />;
    }

    const flipCard = () => {
        setIsInverted(true);
    };

    return cards?.[cardIndex] ? (
        <div className={classNames(cls.cards, {}, [])}>
            <div className={classNames(cls.Card, {}, [cls.leftCard])} />
            <div className={classNames(cls.Card, {}, [cls.rightCard])} />

            <div className={classNames(cls.Card, {}, [cls.next])} key={nextCard.id}>
                {nextCard.ru_word}
            </div>

            <div className={classNames(cls.card_flipper, { [cls.isInverted]: isInverted }, [])}>
                <div
                    onClick={flipCard}
                    className={classNames(cls.Card, {}, [cls.front])}
                    key={card.id}
                >
                    {card.ru_word}
                </div>
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <DragItem className={classNames(cls.Card, {}, [cls.back])} key={card.eng_word}>
                        {card.eng_word}
                    </DragItem>
                </DndContext>
            </div>
        </div>
    ) : (
        <p>Карточки закончились</p>
    );
});
