import { Routes } from '@shared/const/router';
import { AppLink } from '@shared/ui/AppLink';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();
    return (
        <div>
            {t('Home page. Процесс в разработке')}
            <AppLink to={Routes.AUTH}>{t('Перейти к регистрации')}</AppLink>
        </div>
    );
};

export default HomePage;
