import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@shared/ui/Text';
import { classNames } from '@shared/lib/classNames/classNames';
import cls from './BottomNavigatorItem.module.scss';
import { AppLink } from '@shared/ui/AppLink/AppLink';
import { MenuItemType } from '@shared/types/menuItemType';
import { RoutesBottomNavigatorPath } from '../../model/types/bottomNavigator';

interface BottomNavigatorItemProps {
    className?: string;
    item: MenuItemType<RoutesBottomNavigatorPath>;
    isSelected: boolean;
}

export const BottomNavigatorItem = memo((props: BottomNavigatorItemProps) => {
    const { className, item, isSelected } = props;
    const { t } = useTranslation();
    const { Icon, SelectedIcon, path, title } = item;

    return (
        <AppLink to={path} className={classNames(cls.item, {}, [className])}>
            {SelectedIcon && isSelected ? <SelectedIcon /> : <Icon />}
            <Text size='s' title={t(title)} theme='gray' />
        </AppLink>
    );
});
