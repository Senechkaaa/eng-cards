import { classNames } from '@shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';
import { memo } from 'react';

interface OverlayProps {
    className?: string;
    onClick?: () => void
    isClosed?: boolean
}

export const Overlay = memo(({ className, onClick, isClosed }: OverlayProps) => {
    return (
        <div
            onClick={onClick}
            className={classNames(cls.Overlay, { [cls.closed]: isClosed }, [className])}
        />
    );
});
