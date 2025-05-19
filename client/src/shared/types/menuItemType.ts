import { FC, SVGProps } from "react";

export interface MenuItemType<T> {
    title: string;
    path: T;
    Icon: FC<SVGProps<SVGSVGElement>>;
    SelectedIcon?: FC<SVGProps<SVGSVGElement>>;
    fn?: () => void;
}
