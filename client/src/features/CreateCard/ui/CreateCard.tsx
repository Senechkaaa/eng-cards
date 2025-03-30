import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CreateCard.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useSelector } from 'react-redux';
import { getCreateCardExample } from '../model/selectors/getCreateCardState';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { createCardActions } from '../model/slice/createCardsSlice';
import { useForm } from 'react-hook-form';
import { ValidationCreateCardSchemaType } from '../model/types/ValidationCreateCardSchemaType';
import {
    validationCreateCardSchema,
} from '../model/consts/validationCreateCardSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateCardProps {
    className?: string;
}

export const CreateCard = memo(({ className }: CreateCardProps) => {
    const { t } = useTranslation();
    const example = useSelector(getCreateCardExample);
    const dispatch = useAppDispatch();

    const onChangeExample = useCallback(
        (value: string) => {
            dispatch(createCardActions.setExample(value));
        },
        [dispatch],
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver<ValidationCreateCardSchemaType>(validationCreateCardSchema),
    });

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(data);
            })}
            className={classNames(cls.CreateCard, {}, [className])}
        >
            <Input<ValidationCreateCardSchemaType>
                variant='basic'
                register={register}
                errors={errors}
                errorName='engWord'
                placeholder='Английский'
            />
            <Input<ValidationCreateCardSchemaType>
                variant='basic'
                register={register}
                errors={errors}
                errorName='ruWord'
                placeholder={t('Русский')}
            />
            <Input
            variant='basic'
                onChange={onChangeExample}
                value={example}
                placeholder={t('Пример использования')}
            />
            <Button>{t('Сохранить')}</Button>
        </form>
    );
});
