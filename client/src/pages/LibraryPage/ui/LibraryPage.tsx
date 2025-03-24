import { classNames } from '@shared/lib/classNames/classNames';
import cls from './LibraryPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

export interface LibraryPageProps {
    className?: string;
}

const LibraryPage = memo(({ className }: LibraryPageProps) => {
    const { t } = useTranslation();

    return <div className={classNames(cls.LibraryPage, {}, [className])}>LibraryPage</div>;
});

export default LibraryPage