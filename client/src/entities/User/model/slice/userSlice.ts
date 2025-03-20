import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';
import { IUser } from '@shared/types/IUser';

const initialState: UserSchema = {
    authData: {} as IUser,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
