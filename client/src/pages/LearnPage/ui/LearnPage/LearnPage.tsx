import { classNames } from '@shared/lib/classNames/classNames';
import cls from './LearnPage.module.scss';
import { memo } from 'react';
import { Card } from '../Card/Card';

export interface LearnPageProps {
    className?: string;
}

const LearnPage = memo(({ className }: LearnPageProps) => {
    return <div className={classNames(cls.LearnPage, {}, [className])}>
        <Card/>
    </div>;
});

export default LearnPage