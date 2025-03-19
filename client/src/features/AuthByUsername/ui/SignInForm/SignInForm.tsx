import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import cl from './SignInForm.module.scss'
import { Divider } from '../Divider/Divider'
import { FC, useCallback, useState } from 'react'
import { Switch } from '../Switch/Switch'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import {
    login,
    logout,
} from '@features/AuthByUsername/model/services/authService'

import { useAppSelector } from '@shared/lib/hooks/useAppSelector'

interface SignInFormProps {
    setVisible: (visible: boolean) => void
    visible: boolean
}

export const SignInForm: FC<SignInFormProps> = ({ visible, setVisible }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const { user, isAuth } = useAppSelector((state) => state.login)

    const onLoginClick = useCallback(async () => {
        await dispatch(login({ email, password }))
    }, [password, email, dispatch])

    return (
        <form className={cl.cont}>
            <img
                className={cl.img}
                src="https://assets.quizlet.com/_next/static/media/QZ_Auth_LightV2@2x.82052a10.png"
            />
            <h1>
                {isAuth
                    ? `Пользователь авторизован ${user?.email}`
                    : 'АВТОРИЗУЙТЕСЬ'}
            </h1>
            <div className={cl.right}>
                <div className={cl.container_text}>
                    <Switch visible={visible} setVisible={setVisible} />
                </div>

                <div className={cl.container_btn}>
                    <Button className={cl.btn} padding="lP">
                        Login with Google
                    </Button>
                    <Button className={cl.btn} padding="lP">
                        Login with Facebook
                    </Button>
                </div>
                <Divider>or email address</Divider>
                <div className={cl.container_input}>
                    <Input
                        value={email}
                        onChange={setEmail}
                        className={cl.input_fields}
                        label="Email"
                        placeholder="user@gmail.com"
                    />
                    <Input
                        value={password}
                        onChange={setPassword}
                        className={cl.input_fields}
                        label="Password"
                        placeholder="12345"
                    />
                </div>
                {/* <div className={cl.container_signIn_btn}> */}
                <Button
                    onClick={onLoginClick}
                    className={cl.btn_filled}
                    variant="filled"
                    padding="lP"
                >
                    Sign in
                </Button>
                <Button onClick={() => dispatch(logout())} padding="lP">
                    logout
                </Button>
                {/* </div> */}
            </div>
        </form>
    )
}
