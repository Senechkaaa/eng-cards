import { classNames } from '@shared/lib/classNames/classNames';
import cls from './LibraryPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { LibrarySection } from '@entities/Library';
import { Row } from '@shared/ui/Row';

export interface LibraryPageProps {
    className?: string;
}

const LibraryPage = memo(({ className }: LibraryPageProps) => {
    const { t } = useTranslation();

    return <Row justify='center' className={classNames(cls.LibraryPage, {}, [className])}>
        <div className={cls.LibraryWrapper}>
             <LibrarySection title='Курсы'/> 
             <LibrarySection title='Наборы карточек'/> 
        </div>
    </Row>;
});

export default LibraryPage