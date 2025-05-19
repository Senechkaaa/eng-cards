import { Routes } from "@shared/const/router";
import { FC, SVGProps } from "react";

export type RoutesUserInfoAndFriendsPath = Routes.SUPPORT | Routes.FAQ | Routes.PREMIUM

export interface userInfoAndFriendsItemType {
    title: string;
    path?: RoutesUserInfoAndFriendsPath;
    Icon: FC<SVGProps<SVGSVGElement>>;
}
