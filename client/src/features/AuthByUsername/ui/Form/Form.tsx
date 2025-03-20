import { useCallback, useState } from 'react';
import cl from './Form.module.scss';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { loginActions } from '../../model/slice/loginSlice';
import { useSelector } from 'react-redux';
import {
    useLoginMutation,
    useLogoutMutation,
    useRegistrationMutation,
} from '../../model/services/authService';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { classNames } from '@shared/lib/classNames/classNames';

export const Form = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [login] = useLoginMutation();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const { email, password, username } = useSelector(getLoginState);
    const [registration] = useRegistrationMutation();

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onLogin = useCallback(async () => {
        try {
            login({
                email: email,
                password: password,
            });
        } catch (e) {
            console.log(e);
        }
    }, [email, password, login]);

    const onRegistration = useCallback(async () => {
        try {
            registration({
                email: email,
                username: username,
                password: password,
            });
        } catch (e) {
            console.log(e);
        }
    }, [email, password, username, registration]);

    const onLogout = useCallback(async () => {
        try {
            logout({});
        } catch (e) {
            console.log(e);
        }
    }, [logout]);

    const content = (
        <>
            <div>
                <Button
                    variant='none'
                    className={cl.visible}
                    onClick={() => setIsLoginForm(false)}
                >
                    Sign Up
                </Button>

                <Button
                    className={classNames(cl.btn, { [cl.visible]: isLoginForm }, [])}
                    variant='none'
                    onClick={() => setIsLoginForm(true)}
                >
                    Sign In
                </Button>
            </div>
            <Button className={cl.btn}>Continue with Google</Button>
            <Button className={cl.btn}>Continue with Facebook</Button>
            <div className={cl.divider}>
                <span className={cl.divider_title}>or email address</span>
            </div>
        </>
    );

    const contentWithEmailAndPasswordInputs = (
        <>
            <Input
                value={email}
                onChange={onChangeEmail}
                className={cl.input_fields}
                label='Email'
                placeholder='user@gmail.com'
            />
            <Input
                value={password}
                onChange={onChangePassword}
                className={cl.input_fields}
                label='Password'
                placeholder='12345'
            />
        </>
    );

    return (
        <>
            <form className={cl.cont}>
                <img
                    className={cl.img}
                    src='https://assets.quizlet.com/_next/static/media/QZ_Auth_LightV2@2x.82052a10.png'
                />
                <div className={cl.right}>
                    {content}

                    <div className={cl.container_input}>
                        {!isLoginForm && (
                            <Input
                                value={username}
                                onChange={onChangeUsername}
                                className={cl.input_fields}
                                label='Username'
                                placeholder='user123'
                            />
                        )}
                        {contentWithEmailAndPasswordInputs}
                    </div>

                    {isLoginForm ? (
                        <Button onClick={onLogin} className={cl.btn_filled} variant='filled'>
                            Sign in
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={onRegistration}
                                className={cl.btn_filled}
                                variant='filled'
                            >
                                Sign up
                            </Button>
                            <Button onClick={() => setIsLoginForm(true)}>
                                Already have an account?
                            </Button>
                        </>
                    )}
                    <Button onClick={onLogout}>logout</Button>
                </div>
            </form>
        </>
    );
};
