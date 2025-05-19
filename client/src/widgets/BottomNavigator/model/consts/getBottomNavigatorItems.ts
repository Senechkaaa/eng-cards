import { Routes } from '@shared/const/router';
import { RoutesBottomNavigatorPath } from '../types/bottomNavigator';
import { ReactComponent as Education } from '@shared/assets/icons/education.svg';
import { ReactComponent as EducationFilled } from '@shared/assets/icons/education-filled.svg';
import { ReactComponent as Library } from '@shared/assets/icons/library.svg';
import { ReactComponent as LibraryFilled } from '@shared/assets/icons/library-filled.svg';
import { ReactComponent as Profile } from '@shared/assets/icons/profile.svg';
import { ReactComponent as ProfileFilled } from '@shared/assets/icons/profile-filled.svg';
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
