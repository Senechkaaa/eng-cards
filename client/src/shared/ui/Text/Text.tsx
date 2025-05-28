import { FC } from 'react';
import cl from './Text.module.scss';
import { classNames, Mods } from '@shared/lib/classNames/classNames';

type TitleSize = 's' | 'm' | 'l';
type TextSize = 'sT' | 'mT' | 'lT';
type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeadTag: Record<TitleSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export type TextTheme = 'error' | 'gray' | 'blue' | 'yellow' | 'green' | 'light_gray';
export type TextAlign = 'left' | 'right' | 'center';

interface TextProps {
    text?: string;
    title?: string;
    size?: TitleSize;
    className?: string;
    align?: TextAlign;
    theme?: TextTheme;
    textSize?: TextSize;
}

export const Text: FC<TextProps> = (props) => {
    const {
        text,
        size = 'm',
        title,
        className,
        align = 'left',
        theme = 'error',
        textSize = 'sT',
    } = props;
    const HeaderTag = mapSizeToHeadTag[size];

    const mods: Mods = {
        [cl[theme]]: true,
        [cl[align]]: true,
        [cl[text ? textSize : size]]: true,
    };

    return (
        <>
            {title && (
                <HeaderTag className={classNames(cl.title, mods, [className])}>{title}</HeaderTag>
            )}
            {text && <p className={classNames(cl.title, mods, [className])}>{text}</p>}
        </>
    );
};
