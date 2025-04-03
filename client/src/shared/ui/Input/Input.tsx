import { classNames, Mods } from '../../lib/classNames/classNames';
import { InputHTMLAttributes, useState } from 'react';
import cl from './Input.module.scss';
import { Text } from '../Text';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Path } from 'react-hook-form';
type InputSize = 'sm' | 'm' | 'l';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;
type InputVariant = 'basic' | 'ghost';

export interface InputProps<T extends FieldValues> extends HTMLInputProps {
    className?: string;
    classNameWrapper?: string;
    label?: string;
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
        classNameWrapper,
        placeholder,
        size = 'l',
        label,
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

    const onBlur = () => {
        setFocus(false);
    };

    const onFocus = () => {
        setFocus(true);
    };

    const content = register && errorName && (
        <>
            {errors && errors[errorName]?.message && (
                <Text theme='error' size='m' title={String(errors[errorName]?.message)} bold />
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
            {label && <Text label={label} bold />}
        </>
    );

    if (variant === 'basic') {
        return (
            <div className={classNames(cl.input_wrapper, {}, [classNameWrapper])}>{content}</div>
        );
    }

    return content;
};
