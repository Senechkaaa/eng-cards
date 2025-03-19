import { classNames, Mods } from '@shared/lib/classNames/classNames';
import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react';
import cl from './Input.module.scss';
import { Text } from '../Text';

type InputSize = 'sm' | 'm' | 'l';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    size?: InputSize;
}

export const Input: FC<InputProps> = (props) => {
    const [isFocused, setFocus] = useState(false);
    const { className, value, placeholder, size = 'l', label, onChange } = props;

    const mods: Mods = {
        [cl.focused]: isFocused,
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const onFocus = () => {
        setFocus(true);
    };

    const input = (
        <input
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            placeholder={placeholder}
            onChange={onChangeHandler}
            className={classNames(cl.input, mods, [className, cl[size]])}
        />
    );

    if (label) {
        return (
            <>
                <Text label={label} bold />
                {input}
            </>
        );
    }

    return input;
};
