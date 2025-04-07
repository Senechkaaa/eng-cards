import cls from './Card.module.scss';
import { memo, useCallback, useEffect } from 'react';
import { useGetCardsQuery } from '@pages/LearnPage/model/services/learnPageServices';
import { DndContext } from '@dnd-kit/core';
import { DraggableCard } from '../DraggbleCard/DraggbleCard';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@shared/lib/hooks/useAppSelector';
import { getCardState } from '@pages/LearnPage/model/selectors/getCardState';
import { cardActions } from '@pages/LearnPage/model/slice/cardSlice';

interface CardProps {
    className?: string;
}

export const Card = memo(({ className }: CardProps) => {
    const { data: cards, refetch } = useGetCardsQuery();
    const dispatch = useAppDispatch();
    const { visibleCards } = useAppSelector(getCardState);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDragEnd = (event) => {
        const { delta } = event;
        if (delta.x > 250) {
            dispatch(cardActions.moveRight());
        } else if (delta.x < -250) {
            dispatch(cardActions.moveLeft());
        } else {
            console.log('Карточка осталась на месте');
        }
    };

    const renderCards = useCallback(() => {
        // return visibleCards.map((card) => {
        //     return <DraggableCard key={card.id} card={card} />;
        // });
        const card = visibleCards[0]
        return <DraggableCard key={card.id} card={card} />;
    }, [visibleCards]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className={cls.Cards}>
                {visibleCards.length > 0 ? renderCards() : <p>Карточки закончились</p>}
            </div>
        </DndContext>
    );
});
