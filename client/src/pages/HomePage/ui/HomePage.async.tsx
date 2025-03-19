import { lazy } from 'react';

export const HomePageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import('./HomePage')), 1500);
        }),
);
