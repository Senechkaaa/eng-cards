import { FC, useCallback, useState } from 'react'
import { Switch } from '../Switch/Switch'
import cl from '../SignInForm/SignInForm.module.scss'
import { Button } from '@shared/ui/Button'
import { Divider } from '../Divider/Divider'
import { Input } from '@shared/ui/Input'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { logout } from '@features/AuthByUsername'
import { registration } from '@features/AuthByUsername'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'

interface SignUpFormProps {
    setVisible: (visible: boolean) => void
    visible: boolean
}

export const SignUpForm: FC<SignUpFormProps> = ({ visible, setVisible }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const dispatch = useAppDispatch()
    const { user, isAuth } = useAppSelector((state) => state.login)
    
    const onRegistrationClick = useCallback(async () => {
        await dispatch(registration({email, username, password}))
    }, [password, email, username, dispatch])


    return (
        <form className={cl.cont}>
            <h1>
                {isAuth
                    ? `Пользователь авторизован ${user.email}`
                    : 'АВТОРИЗУЙТЕСЬ'}
            </h1>
            <img
                className={cl.img}
                src="https://assets.quizlet.com/_next/static/media/QZ_Auth_LightV2@2x.82052a10.png"
            />
            <div className={cl.right}>
                <div className={cl.container_text}>
                    <Switch visible={visible} setVisible={setVisible} />
                </div>

                <div className={cl.container_btn}>
                    <Button className={cl.btn} padding="lP">
                        Continue with Google
                    </Button>
                    <Button className={cl.btn} padding="lP">
                        Continue with Facebook
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
                        value={username}
                        onChange={setUsername}
                        className={cl.input_fields}
                        label="Username"
                        placeholder="user123"
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
                    onClick={onRegistrationClick}
                    className={cl.btn_filled}
                    variant="filled"
                    padding="lP"
                >
                    Sign up
                </Button>
                <Button onClick={() => setVisible(true)} padding="lP">
                    Already have an account?
                </Button>
                <Button onClick={() => dispatch(logout())} padding="lP">
                    logout
                </Button>
                {/* </div> */}
            </div>
        </form>
    )
}
