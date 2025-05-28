import { classNames } from '@shared/lib/classNames/classNames';
import cls from './HeaderLibrary.module.scss';
import { memo, useState } from 'react';
import { Button } from '@shared/ui/Button';
import { ReactComponent as SearchIcon } from '@shared/assets/icons/search.svg';
import { ReactComponent as MenuIcon } from '@shared/assets/icons/menu.svg';
import { LangSwitcher } from '@widgets/LangSwitcher/ui/LangSwitcher';
import { Row } from '@shared/ui/Row';
import { Select } from '@shared/ui/Select/Select';
import { SelectOptions } from '@shared/ui/Select/Select';

export enum CardSortFieldOptions {
    LEARN = 'learn',
    KNOW = 'know',
    LEARNED = 'learned',
    ALL = 'all',
}
export const cardStatusOptions: SelectOptions<CardSortFieldOptions>[] = [
    { content: 'Все', value: CardSortFieldOptions.ALL },
    { content: 'Учить', value: CardSortFieldOptions.LEARN },
    { content: 'Знаю', value: CardSortFieldOptions.KNOW },
    { content: 'Выучено', value: CardSortFieldOptions.LEARNED },
];

interface HeaderLibraryProps {
    className?: string;
}

export const HeaderLibrary = memo(({ className }: HeaderLibraryProps) => {
    const [sort, setSort] = useState(CardSortFieldOptions.KNOW);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Row
            align='center'
            width
            justify='between'
            className={classNames(cls.HeaderLibrary, {}, [className])}
        >
            <Button variant='none'>
                <SearchIcon />
            </Button>
            <LangSwitcher />

            <Select<CardSortFieldOptions>
                className={cls.select}
                value={sort}
                options={cardStatusOptions}
                trigger={
                    <Button variant='none'>
                        <MenuIcon />
                    </Button>
                }
                onChange={(sort: CardSortFieldOptions) => setSort(sort)}
            />
        </Row>
    );
});
