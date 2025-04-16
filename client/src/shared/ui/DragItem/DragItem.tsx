import { classNames } from '@shared/lib/classNames/classNames';
import cls from './DragItem.module.scss';
import { memo, ReactNode } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';

interface DragItemProps {
    className?: string;
    children: ReactNode;
    id?: string;
}

export const DragItem = memo((props: DragItemProps) => {
    const { className, children, id = 'draggable' } = props;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style = transform
        ? {
              transform: `translate3d(${-transform.x}px, ${transform.y}px, 0) rotate(${
                  transform.x * 0.05
              }deg) rotateY(180deg)`,
              visibility: 'visible',
          }
        : undefined;

    return (
        <DndContext>
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className={classNames(cls.DragItem, {}, [className])}
            >
                {children}
            </div>
        </DndContext>
    );
});
