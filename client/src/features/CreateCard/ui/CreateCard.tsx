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
import CheckMarkIcon from '@shared/assets/icons/check-mark.svg';
import CrossIcon from '@shared/assets/icons/cross.svg';
import { useAddCardMutation } from '../model/services/createCardService';
import { getFormFields } from '../model/consts/formFields';

interface CreateCardProps {
    className?: string;
}

export const CreateCard = memo(({ className }: CreateCardProps) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const [addCard, { isError, isSuccess }] = useAddCardMutation();
    const formFields = getFormFields();

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

    const onSendCard = useCallback(
        (engWord: string, ruWord: string, example?: string) => {
            addCard({ engWord, ruWord, example });
        },
        [addCard],
    );

    const handleSuccess = useCallback(
        (data: ValidationCreateCardSchemaType) => {
            onSendCard(data.engWord, data.ruWord, data.example);
            reset();
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsClosing(true);
                setTimeout(() => {
                    setIsVisible(false);
                    setIsClosing(false);
                }, 400);
            }, 2000);

            return () => clearTimeout(timer);
        },
        [reset, onSendCard],
    );

    return (
        <form
            onSubmit={handleSubmit((data) => handleSuccess(data))}
            className={classNames(cls.CreateCard, {}, [className])}
        >
            {formFields.map((el) => (
                <Input<ValidationCreateCardSchemaType>
                    key={el.errorName}
                    autoComplete='off'
                    classNameWrapper={cls.input}
                    variant='basic'
                    register={register}
                    errors={errors}
                    errorName={el.errorName}
                    placeholder={t(el.placeholder)}
                />
            ))}
            {isSuccess && isVisible && (
                <div className={classNames(cls.block_status, mods, [])}>
                    <CheckMarkIcon />
                    <Text className={cls.title} title={t('Карточка была добавлена')} size='s' />
                </div>
            )}
            {isError && isVisible && (
                <div className={classNames(cls.block_status, mods, [])}>
                    <CrossIcon />
                    <Text
                        className={cls.title}
                        title={t('Карточка не была добавлена. Повторите попытку')}
                        size='s'
                    />
                </div>
            )}
            <Button type='submit'>{t('Сохранить')}</Button>
        </form>
    );
});
