import { classNames } from '@shared/lib/classNames/classNames';
import cls from './LearnPage.module.scss';
import { memo } from 'react';
import { CardsContainer } from '../CardsContainer/CardsContainer';

export interface LearnPageProps {
    className?: string;
}

const LearnPage = memo(({ className }: LearnPageProps) => {
    return (
        <div className={classNames(cls.LearnPage, {}, [className])}>
            <CardsContainer />
        </div>
    );
});

export default LearnPage;
