import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cl from './Button.module.scss';
import { classNames, Mods } from '@shared/lib/classNames/classNames';

type ButtonVariant = 'none' | 'outlined' | 'filled' | 'circle' | 'basic';
type ButtonSize = 'm' | 'l' | 'xl';
type ButtonPadding = 'sm_p' | 'm_p' | 'l_p';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    square?: boolean;
    padding?: ButtonPadding;
    shadow?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        type = 'button',
        children,
        variant = 'outlined',
        size = 'm',
        disabled,
        square,
        className,
        padding = 'sm_p',
        onClick,
        shadow,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cl.square]: square,
        [cl.disabled]: disabled,
        [cl[variant]]: true,
        [cl[size]]: size,
        [cl[padding]]: padding,
        [cl.shadow]: shadow,
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(cl.Button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
