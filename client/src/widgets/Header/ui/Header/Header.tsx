import { memo } from 'react';
import { HeaderMain } from '../HeaderMain/HeaderMain';
import { HeaderCards } from '../HeaderCards/HeaderCards';
import { HeaderCreate } from '../HeaderCreate/HeaderCreate';
import { HeaderLibrary } from '../HeaderLibrary/HeaderLibrary';
import cls from './Header.module.scss'
export type HeaderType = 'main' | 'cards' | 'create' | 'library';

interface HeaderProps {
    headerType: HeaderType;
}

export const Header = memo(({headerType}: HeaderProps) => {

    return (
        <header className={cls.header}>
            {headerType === 'main' && <HeaderMain />}
            {headerType === 'cards' && <HeaderCards />}
            {headerType === 'create' && <HeaderCreate />}
            {headerType === 'library' && <HeaderLibrary />}
        </header>
    );
})
