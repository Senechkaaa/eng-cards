import { classNames } from '@shared/lib/classNames/classNames';
import cls from './SlidingDrawer.module.scss';
import { memo, ReactNode } from 'react';
import { Portal } from '../Portal/Portal';

interface SlidingDrawerProps {
    className?: string;
    children: ReactNode;
}

export const SlidingDrawer = memo((props: SlidingDrawerProps) => {
    const { className, children } = props;
    return (
        <Portal>
            <div className={classNames(cls.SlidingMenu, {}, [className])}>
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
});
