import { useCallback, useState } from 'react';
import cl from './LoginForm.module.scss';
import { Button } from '@shared/ui/Button';
import { useLoginMutation, useRegistrationMutation } from '../../model/services/authService';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { validationAuthSchema } from '../../model/consts/validationAuthSchema';
import { ValidationAuthSchemaType } from '../../model/types/ValidationAuthSchema';
import { Input } from '@shared/ui/Input';
import { AuthHeaderButtons } from '../AuthHeaderButtons/AuthHeaderButtons';
import { Text } from '@shared/ui/Text';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@shared/const/router';

export const LoginForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [login] = useLoginMutation();
    const [registration] = useRegistrationMutation();
    const { t } = useTranslation('auth');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver<ValidationAuthSchemaType>(validationAuthSchema),
    });

    const onLogin = useCallback(
        (email: string, password: string) => {
            login({ email, password });
        },
        [login],
    );

    const onRegistration = useCallback(
        (email: string, username: string, password: string) => {
            registration({ email, username, password });
        },
        [registration],
    );

    const contentWithEmailAndPasswordInputs = (
        <>
            <Input<ValidationAuthSchemaType>
                label={t('Эл. почта')}
                placeholder='user@gmail.com'
                errorName='email'
                register={register}
                errors={errors}
            />
            <Input<ValidationAuthSchemaType>
                label={t('Пароль')}
                placeholder='12345'
                errorName='password'
                register={register}
                errors={errors}
            />
        </>
    );

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
                    if (isLoginForm) {
                        onLogin(data.email, data.password);
                    } else {
                        onRegistration(data.email, data.username, data.password);
                    }
                    navigate(Routes.CARDS);
                })}
                className={cl.cont}
            >
                <div className={cl.img_container}>
                    <img
                        className={cl.img}
                        src='https://assets.quizlet.com/_next/static/media/QZ_Auth_LightV2@2x.82052a10.png'
                    />
                    <Text />
                </div>
                <div className={cl.right}>
                    <AuthHeaderButtons setIsLoginForm={setIsLoginForm} isLoginForm={isLoginForm} />
                    <div>
                        {!isLoginForm ? (
                            <>
                                <Input<ValidationAuthSchemaType>
                                    label={t('Имя пользователя')}
                                    placeholder='user123'
                                    errorName='username'
                                    register={register}
                                    errors={errors}
                                />
                                {contentWithEmailAndPasswordInputs}
                                <Input<ValidationAuthSchemaType>
                                    label={t('Повторите пароль')}
                                    placeholder='12345'
                                    errorName='confirmPassword'
                                    register={register}
                                    errors={errors}
                                />
                            </>
                        ) : (
                            contentWithEmailAndPasswordInputs
                        )}
                    </div>

                    {isLoginForm ? (
                        <>
                            <Button type='submit' variant='filled'>
                                {t('Войти')}
                            </Button>
                            <Button onClick={() => setIsLoginForm(false)}>
                                {t('Впервые в MemoCards? Создать учетную запись')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button type='submit' variant='filled'>
                                {t('Зарегистрироваться')}
                            </Button>
                            <Button onClick={() => setIsLoginForm(true)}>
                                {t('Уже есть учетная запись? Войти')}
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
};
