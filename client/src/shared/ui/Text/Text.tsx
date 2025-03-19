import { FC } from 'react';
import cl from './Text.module.scss';
import { classNames } from '@shared/lib/classNames/classNames';
type TextSize = 'sm' | 'm' | 'l';
type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeadTag: Record<TextSize, HeaderTagType> = {
    sm: 'h3',
    m: 'h2',
    l: 'h1',
};

interface TextProps {
    text?: string;
    label?: string;
    title?: string;
    size?: TextSize;
    classname?: string;
    bold?: boolean;
}

export const Text: FC<TextProps> = (props) => {
    const { text, size = 'm', label, title, bold, classname } = props;
    const HeaderTag = mapSizeToHeadTag[size];

    return (
        <>
            {title && (
                <HeaderTag className={classNames(cl.title, { [cl.bold]: bold }, [classname])}>
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={classNames(cl.title, { [cl.bold]: bold }, [classname])}>{text}</p>
            )}
            {label && (
                <span className={classNames(cl.title, { [cl.bold]: bold }, [classname])}>
                    {label}
                </span>
            )}
        </>
    );
};
