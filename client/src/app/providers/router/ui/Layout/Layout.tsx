import { BottomNavigator } from '@widgets/BottomNavigator';
import { Outlet, useLocation } from 'react-router-dom';
import cls from './Layout.module.scss';
import { HeaderToolbar } from '@widgets/HeaderToolbar';
import { visibleLayout } from '../../const/visibleLayout';

export const Layout = () => {

    const {pathname} = useLocation()
    const layout = visibleLayout[pathname]

    return (
        <div className={cls.layout}>
            {layout.header}
            <Outlet />
            {layout.bottomNavigator}
        </div>
    );
};
