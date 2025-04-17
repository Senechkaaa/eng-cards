import { classNames } from '@shared/lib/classNames/classNames';
import style from '../../styles/styles.module.scss';
import cls from './MainCard.module.scss';
import { memo, useCallback, useState } from 'react';
import { Card as ICard } from '../../model/types/learnPageType';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DragItem } from '@shared/ui/DragItem';
import { useUpdateDataMutation } from '../../model/services/updateDataCard/updateDataCard';
import {
    handlerMoveLeft,
    handlerMoveRight,
} from '@pages/LearnPage/model/services/updateDataCardUtils/updateDataCardUtils';
import { cardActions } from '@pages/LearnPage/model/slice/cardSlice';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { Text } from '@shared/ui/Text';
import { Divider } from '@shared/ui/Divider/Divider';

interface MainCardProps {
    className?: string;
    card: ICard;
}

export const MainCard = memo((props: MainCardProps) => {
    const { className, card } = props;
    const [isInverted, setIsInverted] = useState(false);
    const [updateCard] = useUpdateDataMutation();
    const dispatch = useAppDispatch();

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { delta } = event;
            if (delta.x > 250) {
                const updatedCard = handlerMoveRight(card);
                updateCard(updatedCard);
                dispatch(cardActions.moveRight());
                setIsInverted(false);
            } else if (delta.x < -250) {
                const updatedCard = handlerMoveLeft(card);
                updateCard(updatedCard);
                dispatch(cardActions.moveLeft());
                setIsInverted(false);
            } else {
                console.log('Карточка осталась на месте');
            }
        },
        [updateCard, card, dispatch],
    );

    const flipCard = () => {
        setIsInverted(true);
    };

    

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
                        <Divider border='thin' one className={cls.divider}/>
                        <Text align='center' className={cls.example} theme='gray' title={card.example} size='s' />
                    </div>
                </DragItem>
            </DndContext>
        </div>
    );
});
