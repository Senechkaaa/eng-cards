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
    variant?: InputVariant;
    isValidate?: boolean;
    value?: string | number;
    onChange?: (value: string) => void;
    errorName?: Path<T>;
    register?: UseFormRegister<T>;
    errors?: FieldErrors<T>;
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
        isValidate = true,
        onChange,
        value,
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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const validateContent = register && errorName && (
        <>
            {label && <Text theme='blue' title={label} />}
            {errors && errors[errorName]?.message && (
                <Text theme='error' size='m' title={String(errors[errorName]?.message)} />
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
    );

    const content = (
        <input
            onChange={onChangeHandler}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            className={classNames(cl.input, mods, [className, cl[size]])}
            placeholder={placeholder}
            {...otherProps}
        />
    );

    return isValidate ? (
        <>
            {variant === 'basic' ? (
                <div className={classNames(cl.input_wrapper, {}, [classNameWrapper])}>
                    {validateContent}
                </div>
            ) : (
                validateContent
            )}
        </>
    ) : (
        <>
            {variant === 'basic' ? (
                <div className={classNames(cl.input_wrapper, {}, [classNameWrapper])}>
                    {content}
                </div>
            ) : (
                content
            )}
        </>
    );
};
