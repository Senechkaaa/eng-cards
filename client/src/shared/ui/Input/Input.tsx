import { classNames, Mods } from '../../lib/classNames/classNames';
import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react';
import cl from './Input.module.scss';
import { Text } from '../Text';
import { TypeErrorName } from '../../const/schemes/validationAuthSchema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ValidationAuthSchemaType } from '../../types/ValidationAuthSchemaType';

type InputSize = 'sm' | 'm' | 'l';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;

export interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    size?: InputSize;
    errorName?: keyof TypeErrorName;
    register?: UseFormRegister<ValidationAuthSchemaType>;
    errors?: FieldErrors<ValidationAuthSchemaType>;
}

export const Input: FC<InputProps> = (props) => {
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
        ...otherProps
    } = props;

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

    if (register && errors && errorName) {
        return (
            <>
                {label && <Text size='s' label={label} bold />}
                {errors[errorName]?.message && <Text theme='error' size='m' title={errors[errorName]?.message} bold/>}
                <input
                    placeholder={placeholder}
                    className={classNames(cl.input, mods, [className, cl[size]])}
                    {...otherProps}
                    {...register(errorName)}
                />
            </>
        );
    }

    if (value && onChange) {
        return (
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
        );
    }
};
