import { classNames } from '@shared/lib/classNames/classNames'
import cls from './CreatePage.module.scss'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

export interface CreatePageProps {
    className?: string
}


const CreatePage = memo(({className}:  CreatePageProps) => {
    const { t } = useTranslation();

    return <div className={classNames(cls.CreatePage, {}, [className])}>CreatePage</div>;
})

export default CreatePage