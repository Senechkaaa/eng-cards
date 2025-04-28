import { classNames } from '@shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';
import { memo } from 'react';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
    isClosed?: boolean;
    isBlur?: boolean;
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick, isClosed, isBlur } = props

    return (
        <div
            onClick={onClick}
            className={classNames(cls.Overlay, { [cls.closed]: isClosed, [cls.isBlur]: isBlur}, [
                className,
            ])}
        />
    );
});
