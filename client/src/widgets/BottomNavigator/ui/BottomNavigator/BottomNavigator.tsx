import cls from './BottomNavigator.module.scss';
import { memo, useMemo } from 'react';
import { classNames } from '@shared/lib/classNames/classNames';
import { BottomNavigatorItem } from '../BottomNavigatorItem/BottomNavigatorItem';
import { getBottomNavigatorItems } from '../../model/consts/getBottomNavigatorItems';
import { useLocation } from 'react-router-dom';

interface BottomNavigatorProps {
    className?: string;
}

export const BottomNavigator = memo(({ className }: BottomNavigatorProps) => {
    const { pathname } = useLocation();
    const bottomNavigatorList = getBottomNavigatorItems()

    const itemsList = useMemo(() => {
        return bottomNavigatorList.map((item) => (
            <BottomNavigatorItem
                key={item.path}
                item={item}
                isSelected={pathname === item.path}
            />
        ));
    }, [bottomNavigatorList, pathname]);

    return <div className={classNames(cls.BottomNavigator, {}, [className])}>{itemsList}</div>;
});
