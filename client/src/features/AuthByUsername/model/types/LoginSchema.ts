import { IUser } from '@shared/types/IUser'

export interface LoginSchema {
    isAuth: boolean
    user?: IUser
    error?: string
    isLoading: boolean
}
