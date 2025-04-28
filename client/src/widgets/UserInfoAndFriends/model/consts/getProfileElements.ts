import { RoutesUserInfoAndFriendsPath } from '../types/userInfoAndFriends';
import FaqIcon from '@shared/assets/icons/faq.svg';
import SupportIcon from '@shared/assets/icons/support.svg';
import PremiumIcon from '@shared/assets/icons/premium.svg';
import { Routes } from '@shared/const/router';
import { MenuItemType } from '@shared/types/menuItemType';

export const getProfileElements = (): MenuItemType<RoutesUserInfoAndFriendsPath>[] => {
    
    return [
        {
            Icon: SupportIcon,
            title: 'Поддержка',
            path: Routes.SUPPORT,
        },
        {
            Icon: FaqIcon,
            title: 'Часто задаваемые вопросы',
            path: Routes.FAQ,
        },
        {
            Icon: PremiumIcon,
            title: 'Премиум',
            path: Routes.PREMIUM,
        },
    ];
};
