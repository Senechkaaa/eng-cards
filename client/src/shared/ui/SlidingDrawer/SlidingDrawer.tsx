import { classNames, Mods } from '@shared/lib/classNames/classNames';
import cls from './SlidingDrawer.module.scss';
import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface SlidingDrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const SlidingDrawer = memo((props: SlidingDrawerProps) => {
    const { className, children, isOpen, onClose } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            onClose();
            setIsClosing(false);
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const mods: Mods = {
        [cls.closed]: isClosing,
        [cls.opened]: isOpen,
    };

    if (!isMounted) {
        return null;
    }

    const contentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    console.log('isOpen:', isOpen, 'isClosing:', isClosing, 'mods:', mods);

    return (
        <Portal>
            <div className={classNames(cls.SlidingMenu, mods, [className])}>
                <Overlay isClosed={!isOpen} onClick={close} />
                <div onClick={contentClick} className={classNames(cls.content)}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
