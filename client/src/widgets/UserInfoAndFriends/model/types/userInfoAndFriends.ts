import { Routes } from "@shared/const/router";

export type RoutesUserInfoAndFriendsPath = Routes.SUPPORT | Routes.FAQ | Routes.PREMIUM

export interface userInfoAndFriendsItemType {
    title: string;
    path?: RoutesUserInfoAndFriendsPath;
    Icon: string;
}
