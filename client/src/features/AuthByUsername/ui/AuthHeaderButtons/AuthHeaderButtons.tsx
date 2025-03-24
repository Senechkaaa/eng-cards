import cl from './AuthHeaderButtons.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@shared/lib/classNames/classNames';
import { Button } from '@shared/ui/Button';

interface AuthHeaderButtonsProps {
    className?: string;
    setIsLoginForm: (value: boolean) => void;
    isLoginForm: boolean
}

export const AuthHeaderButtons = memo((props: AuthHeaderButtonsProps) => {
    const { t } = useTranslation();
    const { setIsLoginForm, isLoginForm, className } = props;
    
    return (
        <>
            <div className={cl.AuthHeaderButtons}>
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
});
