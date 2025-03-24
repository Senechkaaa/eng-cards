import { Routes } from '@shared/const/router';
import { BottomNavigatorItemType } from '../types/bottomNavigator';
import Education from '@shared/assets/icons/education.svg';
import EducationFilled from '@shared/assets/icons/education-filled.svg';
import Library from '@shared/assets/icons/library.svg';
import LibraryFilled from '@shared/assets/icons/library-filled.svg';
import Profile from '@shared/assets/icons/profile.svg';
import ProfileFilled from '@shared/assets/icons/profile-filled.svg';

export const getBottomNavigatorItems = (): BottomNavigatorItemType[] => {
    const bottomNavigatorList: BottomNavigatorItemType[] = [
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
