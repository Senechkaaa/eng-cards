import { classNames, Mods } from '../../lib/classNames/classNames';
import { ChangeEvent, FocusEventHandler, InputHTMLAttributes, useState } from 'react';
import cl from './Input.module.scss';
import { Text } from '../Text';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Path } from 'react-hook-form';
type InputSize = 'sm' | 'm' | 'l';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;
type InputVariant = 'basic' | 'ghost';
export interface InputProps<T extends FieldValues> extends HTMLInputProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    size?: InputSize;
    errorName?: Path<T>;
    register?: UseFormRegister<T>;
    errors?: FieldErrors<T>;
    variant?: InputVariant;
}

export const Input = <T extends FieldValues>(props: InputProps<T>) => {
    const [isFocused, setFocus] = useState(false);
    const {
        className,
        value,
        placeholder,
        size = 'l',
        label,
        onChange,
        errorName,
        register,
        errors,
        variant = 'ghost',
        ...otherProps
    } = props;

    const mods: Mods = {
        [cl.focused]: isFocused,
        [cl[variant]]: true,
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

    return (
        <>
            {label && <Text size='s' label={label} bold />}
            {register && errors && errorName ? (
                <>
                    {errors[errorName]?.message && (
                        <Text
                            theme='error'
                            size='m'
                            title={String(errors[errorName]?.message)}
                            bold
                        />
                    )}
                    <input
                        onFocus={onFocus}
                        placeholder={placeholder}
                        className={classNames(cl.input, mods, [className, cl[size]])}
                        {...otherProps}
                        {...register(errorName, {
                            onBlur: onBlur,
                        })}
                    />
                </>
            ) : (
                <>
                    <input
                        onBlur={onBlur}
                        onFocus={onFocus}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChangeHandler}
                        className={classNames(cl.input, mods, [className, cl[size]])}
                        {...otherProps}
                    />
                    {label && <Text label={label} bold />}
                </>
            )}
        </>
    );
};
