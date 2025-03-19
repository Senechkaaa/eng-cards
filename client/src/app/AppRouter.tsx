import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../shared/config/routeConfig/routeConfig';
import { Suspense } from 'react';

const AppRouter = () => {
    const isAuth = false;
    return isAuth ? (
        <Suspense fallback={"Loading..."}>
            <Routes>
                {privateRoutes.map((route) => (
                    <Route element={<route.element />} path={route.path} key={route.path} />
                ))}
            </Routes>
        </Suspense>
    ) : (
        <Suspense fallback={"Loading..."}>
            <Routes>
                {publicRoutes.map((route) => (
                    <Route element={<route.element />} path={route.path} key={route.path} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
