import { BottomNavigator } from '@widgets/BottomNavigator';
import { Header } from '@widgets/Header';
import { ReactNode } from 'react';

export interface VisibleLayoutProps {
    [path: string]: {
        header: null | ReactNode;
        bottomNavigator: null | ReactNode
    };
}


export const visibleLayout: VisibleLayoutProps = {
    '/': {
        header: <Header headerType='main' />,
        bottomNavigator: null,
    },
    '/auth': {
        header: null,
        bottomNavigator: null,
    },
    '/cards': {
        header: <Header headerType='cards' />,
        bottomNavigator: <BottomNavigator />,
    },
    '/profile': {
        header: null,
        bottomNavigator: <BottomNavigator />,
    },
    '/library': {
        header: <Header headerType='library' />,
        bottomNavigator: <BottomNavigator />,
    },
    '/cards/create': {
        header: <Header headerType='create'/>,
        bottomNavigator: null,
    },
};
