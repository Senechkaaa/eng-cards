import { useEffect, useState } from 'react'
import { SignInForm } from '../../../features/AuthByUsername/ui/SignInForm/SignInForm'
import { SignUpForm } from '../../../features/AuthByUsername/ui/SignUpForm/SignUpForm'
import cl from './Form.module.scss'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'

import TokenService from '../model/services/TokenService'
import { checkAuth } from '../model/services/AuthService'

export const Form = () => {
    const [visible, setVisible] = useState<boolean>(true)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = TokenService.getAccessToken()
        if (token) {
            dispatch(checkAuth())
        }
    }, [dispatch])

    return (
        <div className={cl.container_text}>
            {visible ? (
                <SignInForm visible={visible} setVisible={setVisible} />
            ) : (
                <SignUpForm visible={visible} setVisible={setVisible} />
            )}
        </div>
    )
}
