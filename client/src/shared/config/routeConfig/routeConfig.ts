import { CardsPage } from '@pages/CardsPage';
import { HomePage } from '@pages/HomePage';
import { AuthPage } from '@pages/AuthPage';
import { ComponentType } from 'react';

export interface IRoutes {
    path: string;
    element: ComponentType;
}

export enum Routes {
    HOME = '/',
    AUTH = '/auth',
    CARDS = '/cards0',
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

export const privateRoutes = [
    {
        path: Routes.CARDS,
        element: CardsPage,
    },
];
