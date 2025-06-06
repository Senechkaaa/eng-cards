export interface ValidationAuthSchemaType {
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface AuthCredentials {
    username?: string;
    email: string;
    password: string;
}
