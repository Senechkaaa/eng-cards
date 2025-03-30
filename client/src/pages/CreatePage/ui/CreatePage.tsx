import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CreatePage.module.scss';
import { memo } from 'react';
import { CreateCard } from '@features/CreateCard';

export interface CreatePageProps {
    className?: string;
}

const CreatePage = memo(({ className }: CreatePageProps) => {

    return (
        <div className={classNames(cls.CreatePage, {}, [className])}>
            <CreateCard />
        </div>
    );
});

export default CreatePage;
