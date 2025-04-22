export interface UserData {
    email: string;
    id: string;
    username: string;
    time: string;
    user_type: string;
}

export interface IUser {
    data: UserData,
}

export interface SuccessCardResponce {
    status: string;
}
