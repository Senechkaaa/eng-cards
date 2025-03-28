import { BottomNavigator } from '@widgets/BottomNavigator';
import { Header } from '@widgets/Header';
import { HeaderCards } from '@widgets/HeaderToolbar';
import { ReactNode } from 'react';

export interface VisibleLayoutProps {
    [path: string]: {
        header: null | ReactNode;
        bottomNavigator: null | ReactNode
    };
}


export const visibleLayout: VisibleLayoutProps = {
    '/': {
        header: <Header />,
        bottomNavigator: null,
    },
    '/auth': {
        header: null,
        bottomNavigator: null,
    },
    '/cards': {
        header: <HeaderCards />,
        bottomNavigator: <BottomNavigator />,
    },
    '/profile': {
        header: null,
        bottomNavigator: <BottomNavigator />,
    },
    '/library': {
        header: <HeaderCards />,
        bottomNavigator: <BottomNavigator />,
    },
    '/cards/create': {
        header: null,
        bottomNavigator: null,
    },
};
