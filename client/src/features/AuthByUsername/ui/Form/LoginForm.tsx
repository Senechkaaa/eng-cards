import { useCallback, useState } from 'react';
import cl from './LoginForm.module.scss';
import { Button } from '@shared/ui/Button';
import { useLoginMutation, useRegistrationMutation } from '../../model/services/authService';
import { classNames } from '@shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { validationAuthSchema } from '@shared/const/schemes/validationAuthSchema';
import { ValidationAuthSchemaType } from '@shared/types/ValidationAuthSchemaType';
import { Input } from '@shared/ui/Input';

export const LoginForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [login] = useLoginMutation();
    const [registration] = useRegistrationMutation();
    const { t } = useTranslation('auth');

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

    const content = (
        <>
            <div>
                <Button
                    size='xl'
                    variant='none'
                    className={classNames('', { [cl.visible]: !isLoginForm }, [])}
                    onClick={() => setIsLoginForm(false)}
                >
                    {t('Зарегестрироваться')}
                </Button>

                <Button
                    size='xl'
                    className={classNames('', { [cl.visible]: isLoginForm }, [])}
                    variant='none'
                    onClick={() => setIsLoginForm(true)}
                >
                    {t('Вход')}
                </Button>
            </div>
            <Button>{t('Войти через Google')}</Button>
            <Button>{t('Войти через Facebook')}</Button>
            <div className={cl.divider}>
                <span className={cl.divider_title}>{t('или адрес эл. почты')}</span>
            </div>
        </>
    );

    const contentWithEmailAndPasswordInputs = (
        <>
            <Input
                label={t('Эл. почта')}
                placeholder='user@gmail.com'
                errorName='email'
                register={register}
                errors={errors}
            />
            <Input
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
                })}
                className={cl.cont}
            >
                <div className={cl.img_container}>
                    <img
                        className={cl.img}
                        src='https://assets.quizlet.com/_next/static/media/QZ_Auth_LightV2@2x.82052a10.png'
                    />
                </div>
                <div className={cl.right}>
                    {content}
                    <div>
                        {!isLoginForm ? (
                            <>
                                <Input
                                    label={t('Имя пользователя')}
                                    placeholder='user123'
                                    errorName='username'
                                    register={register}
                                    errors={errors}
                                />
                                {contentWithEmailAndPasswordInputs}
                                <Input
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
                            <input type='submit' />
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
