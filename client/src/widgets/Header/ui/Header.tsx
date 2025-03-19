import { Button } from '@shared/ui/Button';
import cl from './Header.module.scss';
import { Routes } from '@shared/config/routeConfig/routeConfig';
import { Link } from 'react-router-dom';
import { LangSwitcher } from '@widgets/LangSwitcher/ui/LangSwitcher';
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const { t } = useTranslation();

    return (
        <header className={cl.header}>
            <div className={cl.container}>
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
                    <Button className={cl.btn} variant='filled' padding='mP'>
                        {t('Войти')}
                    </Button>
                </Link>
            </div>
        </header>
    );
};
