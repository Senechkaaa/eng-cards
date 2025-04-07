import { Card } from '@pages/LearnPage/model/types/learnPageType';
import { classNames } from '@shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './DraggableCard.module.scss';
import { useDraggable } from '@dnd-kit/core';

interface DraggableCardProps {
    className?: string;
    card: Card;
}

export const DraggableCard = memo((props: DraggableCardProps) => {
    const { card, className } = props;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id,
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${
                  transform.x * 0.1
              }deg)`,
          }
        : undefined;

    return (
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className={classNames(cls.Card, {}, [className])}
            >
                {card.ru_word}
            </div>
    );
});
