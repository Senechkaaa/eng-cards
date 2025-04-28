import { SelectOptions } from '@shared/ui/Select/Select';
export enum CardSortFieldOptions {
    LEARN = 'learn',
    KNOW = 'know',
    LEARNED = 'learned',
    ALL = 'all',
}
export const cardStatusOptions: SelectOptions<CardSortFieldOptions>[] = [
    { content: 'Все', value: CardSortFieldOptions.ALL },
    { content: 'Учить', value: CardSortFieldOptions.LEARN },
    { content: 'Знаю', value: CardSortFieldOptions.KNOW },
    { content: 'Выучено', value: CardSortFieldOptions.LEARNED },
];
