import { CardsPage } from '@pages/CardsPage';
import { HomePage } from '@pages/HomePage';
import { AuthPage } from '@pages/AuthPage';
import { ComponentType } from 'react';
import { ProfilePage } from '@pages/ProfilePage';
import { LibraryPage } from '@pages/LibraryPage';
import { Routes } from '@shared/const/router';

export interface IRoutes {
    path: string;
    element: ComponentType;
}

export const publicRoutes: IRoutes[] = [
    {
        path: Routes.HOME,
        element: HomePage,
    },
    {
        path: Routes.AUTH,
        element: AuthPage,
    },
];

export const privateRoutes: IRoutes[] = [
    {
        path: Routes.CARDS,
        element: CardsPage,
    },
    {
        path: Routes.PROFILE,
        element: ProfilePage,
    },
    {
        path: Routes.LIBRARY,
        element: LibraryPage,
    },
];
