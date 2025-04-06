import { IUser } from "../types/IUser";

export interface AuthResponce {
    access_token: string,
    user: IUser
}