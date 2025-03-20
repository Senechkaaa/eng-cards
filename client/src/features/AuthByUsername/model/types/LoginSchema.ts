export interface LoginSchema {
    isAuth: boolean;
    username: string;
    password: string;
    email: string;
    error?: string;
}
