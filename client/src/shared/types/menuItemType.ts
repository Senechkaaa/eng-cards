export interface MenuItemType<T> {
    title: string;
    path?: T;
    Icon: string;
    SelectedIcon?: string;
    fn?: () => void;
}
