import { classNames, Mods } from '@shared/lib/classNames/classNames';
import cls from './Row.module.scss';
import { HTMLAttributes, memo, ReactNode } from 'react';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
    center: cls.justifyCenter,
    around: cls.justifyAround,
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

interface RowProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    width?: boolean;
}

export const Row = memo((props: RowProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'start',
        direction = 'row',
        width = false,
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
    ];

    const mods: Mods = {
        [cls.width]: width,
    };

    return (
        <div {...otherProps} className={classNames(cls.Row, mods, classes)}>
            {children}
        </div>
    );
});
