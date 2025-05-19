import { classNames } from '@shared/lib/classNames/classNames';
import cls from './HeaderMain.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button } from '@shared/ui/Button';
import { AppLink } from '@shared/ui/AppLink';
import { Routes } from '@shared/const/router';

interface HeaderMainProps {
    className?: string;
}

export const HeaderMain = memo(({ className }: HeaderMainProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.HeaderMain, {}, [className])}>
            <h3 className={cls.title}>
                {t('Основная страница не сделана. В разработке, перейдите к регистрации')}
            </h3>
            <Button variant='outlined'>
                <AppLink to={Routes.AUTH} className={cls.btn} >
                    {t('Войти')}
                </AppLink>
            </Button>
        </div>
    );
});
