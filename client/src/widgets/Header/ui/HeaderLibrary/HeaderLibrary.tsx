import { classNames } from '@shared/lib/classNames/classNames'
import cls from './HeaderLibrary.module.scss'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

interface HeaderLibraryProps {
    className?: string
}


export const HeaderLibrary = memo(({className}:  HeaderLibraryProps) => {
    const { t } = useTranslation();

    return <div className={classNames(cls.HeaderLibrary, {}, [className])}>{t("Header Library. Процесс в разработке...")}</div>;
})