import { classNames, Mods } from '@shared/lib/classNames/classNames';
import cls from './Divider.module.scss';
import { memo, ReactNode } from 'react';

type DividerBorder = 'thin' | 'medium' | 'bold';

interface DividerProps {
    className?: string;
    children?: ReactNode;
    one?: boolean;
    border?: DividerBorder;
}

export const Divider = memo((props: DividerProps) => {
    const { className, children, one, border = 'medium' } = props;
    const mods: Mods = {
        [cls[border]]: border,
    };

    return (
        <div className={classNames(cls.divider, {}, [className])}>
            {!one && (
                <>
                    <span className={classNames(cls.divider_line, mods, [])} />
                    <span className={cls.divider_title}>{children}</span>
                </>
            )}
            <span className={classNames(cls.divider_line, mods, [])} />
        </div>
    );
});
