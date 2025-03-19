import { IUser } from "../types/IUser";

export interface AuthResponce {
    access_token: string,
    refresh_token: string,
    user: IUser
}