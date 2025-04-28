import { classNames } from '@shared/lib/classNames/classNames';
import cls from './ProfileListItem.module.scss';
import { memo } from 'react';
import { RoutesUserInfoAndFriendsPath } from '../../model/types/userInfoAndFriends';
import { MenuItemType } from '@shared/types/menuItemType';
import { Row } from '@shared/ui/Row';
import { AppLink } from '@shared/ui/AppLink';
import { Text } from '@shared/ui/Text';

interface ProfileListItemProps {
    className?: string;
    item: MenuItemType<RoutesUserInfoAndFriendsPath>;
}

export const ProfileListItem = memo((props: ProfileListItemProps) => {
    const { className, item } = props;
    const Icon = item.Icon;

    return (
        <div className={classNames(cls.ProfileListItem, {}, [className])}>
            {item.path && (
                <AppLink className={cls.link} to={item.path}>
                    <Row align='center' className={cls.profileItem}>
                        <Icon />
                        <Text className={cls.title} size='m' theme='gray' title={item.title} />
                    </Row>
                </AppLink>
            )}
        </div>
    );
});
