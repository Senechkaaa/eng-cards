import { lazy } from 'react';

export const AuthPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import('./AuthPage')), 1500);
        }),
);
