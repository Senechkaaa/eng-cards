import { FC } from 'react';
import cl from './Text.module.scss';
import { classNames, Mods } from '@shared/lib/classNames/classNames';

type TextSize = 's' | 'm' | 'l';
type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeadTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export type TextTheme = 'error' | 'gray' | 'blue' | 'yellow' | 'green';
export type TextAlign = 'left' | 'right' | 'center';

interface TextProps {
    text?: string;
    label?: string;
    title?: string;
    size?: TextSize;
    className?: string;
    bold?: boolean;
    align?: TextAlign;
    theme?: TextTheme;
}

export const Text: FC<TextProps> = (props) => {
    const {
        text,
        size = 'm',
        label,
        title,
        bold,
        className,
        align = 'left',
        theme = 'error',
    } = props;
    const HeaderTag = mapSizeToHeadTag[size];

    const mods: Mods = {
        [cl[theme]]: true,
        [cl[align]]: true,
        [cl.bold]: bold,
        [cl[size]]: true,
    };

    return (
        <>
            {title && (
                <HeaderTag className={classNames(cl.title, mods, [className])}>{title}</HeaderTag>
            )}
            {text && (
                <p className={classNames(cl.title, { [cl.bold]: bold }, [className])}>{text}</p>
            )}
            {label && (
                <span className={classNames(cl.title, { [cl.bold]: bold }, [className])}>
                    {label}
                </span>
            )}
        </>
    );
};
