import { lazy } from 'react';

export const CardsPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import('./CardsPage')), 1500);
        }),
);
