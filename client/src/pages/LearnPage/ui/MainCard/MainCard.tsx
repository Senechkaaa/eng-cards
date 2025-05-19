import { classNames } from '@shared/lib/classNames/classNames';
import style from '../../styles/styles.module.scss';
import cls from './MainCard.module.scss';
import { memo, useCallback, } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DragItem } from '@shared/ui/DragItem';
import { useUpdateDataMutation } from '../../model/services/updateDataCard/updateDataCard';
import {
    handlerMoveLeft,
    handlerMoveRight,
} from '@pages/LearnPage/model/services/updateDataCardUtils/updateDataCardUtils';
import { cardActions } from '@entities/Card/model/slice/cardSlice';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@shared/ui/Text';
import { Divider } from '@shared/ui/Divider/Divider';
import { useDeleteCardApiMutation } from '@features/removeCard';
import { getCardState } from '@entities/Card/model/selectors/getCardState';
import { useSelector } from 'react-redux';
import { ICard } from '@shared/types/ICard';

interface MainCardProps {
    className?: string;
    card: ICard;
}

export const MainCard = memo((props: MainCardProps) => {
    const { className, card } = props;
    const [updateCard] = useUpdateDataMutation();
    const [deleteCard] = useDeleteCardApiMutation();
    const dispatch = useAppDispatch();
    const { isInverted } = useSelector(getCardState);

    const handleDragEnd = useCallback(
        ({ delta }: DragEndEvent) => {
            console.log(delta.y);
            if (delta.x > 250) {
                updateCard(handlerMoveRight(card));
                dispatch(cardActions.moveCard());
            } else if (delta.x < -250) {
                updateCard(handlerMoveLeft(card));
                dispatch(cardActions.moveCard());
            } else if (delta.y < -290) {
                deleteCard({ card_id: card.id });
                dispatch(cardActions.moveCard());
            } else {
                console.log('Карточка осталась на месте');
            }
        },
        [updateCard, card, dispatch, deleteCard],
    );

    const flipCard = useCallback(() => {
        dispatch(cardActions.setIsInverted(true));
    }, [dispatch]);

    return (
        <div
            className={classNames(
                cls.card_flipper,
                { [cls.isInverted]: isInverted, [cls.isClosed]: !isInverted },
                [className],
            )}
        >
            <div
                onClick={flipCard}
                className={classNames(style.Card, {}, [cls.front])}
                key={card.id}
            >
                <Text className={style.ru_word} theme='gray' title={card.ru_word} size='l' />
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <DragItem className={classNames(style.Card, {}, [cls.back])} key={card.eng_word}>
                    <div className={cls.backContent}>
                        <Text theme='light_gray' title={card.ru_word} size='m' />
                        <Text
                            className={style.eng_word}
                            theme='gray'
                            title={card.eng_word}
                            size='l'
                        />
                        <Divider border='thin' one className={cls.divider} />
                        <Text
                            align='center'
                            className={cls.example}
                            theme='gray'
                            title={card.example}
                            size='s'
                        />
                    </div>
                </DragItem>
            </DndContext>
        </div>
    );
});
