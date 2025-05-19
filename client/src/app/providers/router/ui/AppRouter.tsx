import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../config/routeConfig';
import { Suspense } from 'react';
import { Layout } from './Layout/Layout';
import { useAppSelector } from '@shared/lib/hooks/useAppSelector/useAppSelector';
import { getLoginState } from '@features/AuthByUsername/model/selectors/getLoginState/getLoginState';

export const AppRouter = () => {
    const { isAuth } = useAppSelector(getLoginState);

    return isAuth ? (
        <Suspense fallback={'Loading...'}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {privateRoutes.map((route) => (
                        <Route element={<route.element />} path={route.path} key={route.path} />
                    ))}
                </Route>
            </Routes>
        </Suspense>
    ) : (
        <Suspense fallback={'Loading...'}>
            <Routes>
                {publicRoutes.map((route) => (
                    <Route element={<route.element />} path={route.path} key={route.path} />
                ))}
            </Routes>
        </Suspense>
    );
};
