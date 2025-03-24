import { Routes } from '@shared/const/router';

export type RoutesPath = Routes.CARDS | Routes.LIBRARY | Routes.PROFILE;

export interface BottomNavigatorItemType {
    title: string;
    path: RoutesPath;
    Icon: string;
    SelectedIcon: string
}
