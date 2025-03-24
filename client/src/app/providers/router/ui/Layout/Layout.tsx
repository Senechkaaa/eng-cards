import { BottomNavigator } from '@widgets/BottomNavigator';
import { Outlet } from 'react-router-dom';
import cls from './Layout.module.scss';
import { HeaderToolbar } from '@widgets/HeaderToolbar';

export const Layout = () => {
    return (
        <div className={cls.layout}>
            <HeaderToolbar />
            <Outlet />
            <BottomNavigator />
        </div>
    );
};
