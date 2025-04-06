import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import NewYorkIcon from '@shared/assets/icons/new-york.svg';
import cls from './CardsPageLevelProgress.module.scss';
import { classNames } from '@shared/lib/classNames/classNames';

interface CardsPageLevelProgressProps {
    className?: string;
}

export const CardsPageLevelProgress = memo(({ className }: CardsPageLevelProgressProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.CardsPageLevelProgress, {}, [])}>
            <NewYorkIcon />
        </div>
    );
});
