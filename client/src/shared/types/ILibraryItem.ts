export type Level = 'easy' | 'medium' | 'hard';
export interface ILabraryItem {
    id: string
    title: string;
    rating: number;
    countWords: number;
    level: Level;
    img: string;
}
