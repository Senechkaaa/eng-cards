import { Routes } from '@shared/const/router';
import { RoutesBottomNavigatorPath } from '../types/bottomNavigator';
import Education from '@shared/assets/icons/education.svg';
import EducationFilled from '@shared/assets/icons/education-filled.svg';
import Library from '@shared/assets/icons/library.svg';
import LibraryFilled from '@shared/assets/icons/library-filled.svg';
import Profile from '@shared/assets/icons/profile.svg';
import ProfileFilled from '@shared/assets/icons/profile-filled.svg';
import { MenuItemType } from '@shared/types/menuItemType';

export const getBottomNavigatorItems = (): MenuItemType<RoutesBottomNavigatorPath>[] => {
    const bottomNavigatorList: MenuItemType<RoutesBottomNavigatorPath>[] = [
        {
            title: 'Education',
            Icon: Education,
            SelectedIcon: EducationFilled,
            path: Routes.CARDS,
        },
        {
            title: 'Library',
            Icon: Library,
            SelectedIcon: LibraryFilled,
            path: Routes.LIBRARY,
        },
        {
            title: 'Profile',
            Icon: Profile,
            SelectedIcon: ProfileFilled,
            path: Routes.PROFILE,
        },
    ];

    return bottomNavigatorList;
};
