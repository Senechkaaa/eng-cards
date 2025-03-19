import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cl from './Button.module.scss';
import { classNames, Mods } from '@shared/lib/classNames/classNames';

type ButtonVariant = 'none' | 'outlined' | 'filled';
type ButtonSize = 'sm' | 'm' | 'l';
type ButtonPadding = 'smP' | 'mP' | 'lP';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    classname?: string;
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    square?: boolean;
    padding?: ButtonPadding;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        variant = 'outlined',
        size = 'sm',
        disabled,
        square,
        className,
        padding = 'sm',
        onClick,
    } = props;

    const mods: Mods = {
        [cl.square]: square,
        [cl.disabled]: disabled,
    };

    return (
        <button
            onClick={onClick}
            type='button'
            className={classNames(cl.Button, mods, [className, cl[variant], cl[size], cl[padding]])}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
