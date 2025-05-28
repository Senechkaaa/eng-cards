import { classNames } from '@shared/lib/classNames/classNames';
import cls from './LibrarySection.module.scss';
import { memo, useMemo } from 'react';
import { Text } from '@shared/ui/Text';
import { ILabraryItem } from '@shared/types/ILibraryItem';
import { LibrarySectionItem } from '../LibrarySectionItem/LibrarySectionItem';
import { Row } from '@shared/ui/Row';

interface LibrarySectionProps {
    className?: string;
    title?: string;
    items?: ILabraryItem[];
}

const items: ILabraryItem[] = [
    {
        countWords: 15,
        id: '121212',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'easy',
        rating: 4.9,
        title: 'Уровень A1',
    },
    {
        countWords: 123,
        id: '12432',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'hard',
        rating: 4.8,
        title: 'Для подготовки IELTS Для подготовки IELTS Для подготовки IELTS',
    },
    {
        countWords: 61,
        id: '09234',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'medium',
        rating: 4.6,
        title: 'Слова для уровня A2',
    },
    {
        countWords: 35,
        id: '2309823',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'medium',
        rating: 5.0,
        title: 'Слова для перехода с A2 к B1',
    },
    {
        countWords: 15,
        id: '234234324',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'easy',
        rating: 4.9,
        title: 'Уровень A1',
    },
    {
        countWords: 123,
        id: '346463436',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'hard',
        rating: 4.8,
        title: 'Курс подойдет для начинающих.',
    },
    {
        countWords: 123,
        id: '346463436',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'hard',
        rating: 4.8,
        title: 'Курс для абсолютных про в английском',
    },
    {
        countWords: 123,
        id: '346463436',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'hard',
        rating: 4.8,
        title: 'Для подготовки IELTS',
    },
    {
        countWords: 123,
        id: '346463436',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjLlalCSZzL4HzBAD7KwTkBTEBrN7JdNhPA&s',
        level: 'hard',
        rating: 4.8,
        title: 'Для подготовки IELTS',
    },
];

export const LibrarySection = memo((props: LibrarySectionProps) => {
    const { className, title } = props;

    const renderLabraryItems = useMemo(() => {
        return items?.map((item) => <LibrarySectionItem key={item.id} item={item} />);
    }, []);

    return (
        <Row direction='column' className={classNames(cls.LibrarySection, {}, [className])}>
            <Text className={cls.title} size='m' theme='gray' title={title} />
            {items ? (
                <div className={cls.section}>{renderLabraryItems}</div>
            ) : (
                <div>Loading заглушка</div>
            )}
        </Row>
    );
});
