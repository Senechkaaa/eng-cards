import { classNames } from '@shared/lib/classNames/classNames';
import cls from './HeaderMain.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { LangSwitcher } from '@widgets/LangSwitcher/ui/LangSwitcher';
import { Link } from 'react-router-dom';
import { Button } from '@shared/ui/Button';
import { Routes } from '@shared/const/router';

interface HeaderMainProps {
    className?: string;
}

export const HeaderMain = memo(({ className }: HeaderMainProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.HeaderMain, {}, [className])}>
            <div className={cls.container}>
                <LangSwitcher />
                <div>logo</div>
                <ul>
                    <li>
                        <h2>{t('Часто задаваемые вопросы')}</h2>
                    </li>
                    <li>
                        <h2>{t('О нас')}</h2>
                    </li>
                </ul>
            </div>
            <div>
                <Link to={Routes.AUTH}>
                    <Button className={cls.btn} variant='filled' padding='m_p'>
                        {t('Войти')}
                    </Button>
                </Link>
            </div>
        </div>
    );
});
