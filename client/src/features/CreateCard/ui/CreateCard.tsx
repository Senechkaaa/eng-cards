import { classNames, Mods } from '@shared/lib/classNames/classNames';
import cls from './CreateCard.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useForm } from 'react-hook-form';
import { ValidationCreateCardSchemaType } from '../model/types/ValidationCreateCardSchemaType';
import { validationCreateCardSchema } from '../model/consts/validationCreateCardSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from '@shared/ui/Text';
import CheckMark from '@shared/assets/icons/check-mark.svg';

interface CreateCardProps {
    className?: string;
}

export const CreateCard = memo(({ className }: CreateCardProps) => {
    const { t } = useTranslation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver<ValidationCreateCardSchemaType>(validationCreateCardSchema),
    });

    const mods: Mods = {
        [cls.isSuccess]: isSuccess,
        [cls.isRemoved]: isClosing,
    };

    const handleSuccess = useCallback(
        (data: ValidationCreateCardSchemaType) => {
            console.log(data);
            reset();
            setIsSuccess(true);
            setTimeout(() => {
                setIsClosing(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsClosing(false);
                }, 400);
            }, 2000);
        },
        [reset],
    );

    return (
        <form
            onSubmit={handleSubmit((data) => handleSuccess(data))}
            className={classNames(cls.CreateCard, {}, [className])}
        >
            <Input<ValidationCreateCardSchemaType>
                autoComplete='off'
                classNameWrapper={cls.input}
                variant='basic'
                register={register}
                errors={errors}
                errorName='engWord'
                placeholder='Английский'
            />
            <Input<ValidationCreateCardSchemaType>
                autoComplete='off'
                classNameWrapper={cls.input}
                variant='basic'
                register={register}
                errors={errors}
                errorName='ruWord'
                placeholder={t('Русский')}
            />
            <Input<ValidationCreateCardSchemaType>
                autoComplete='off'
                classNameWrapper={cls.input}
                variant='basic'
                register={register}
                errors={errors}
                errorName='example'
                placeholder={t('Пример использования')}
            />
            {isSuccess && (
                <div className={classNames(cls.success, mods, [])}>
                    <CheckMark />
                    <Text className={cls.title} title={t('Карточка была добавлена')} size='s' />
                </div>
            )}
            <Button type='submit'>{t('Сохранить')}</Button>
        </form>
    );
});
