import { classNames } from '@shared/lib/classNames/classNames'
import cls from './CreateCard.module.scss'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Input } from '@shared/ui/Input'
import { Button } from '@shared/ui/Button'

interface CreateCardProps {
    className?: string
}


export const CreateCard = memo(({className}:  CreateCardProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.CreateCard, {}, [className])}>
            <Input placeholder={t('Английский')} />\
            <Input placeholder={t('Русский')} />
            <Input placeholder={t('Пример использования')} />
            <Button>{t("Сохранить")}</Button>
        </div>
    );
})