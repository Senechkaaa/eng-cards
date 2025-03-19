import { classNames } from '@shared/lib/classNames/classNames';
import { Button } from '@shared/ui/Button';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button onClick={toggle} className={classNames('LangSwitcher', {}, [className])}>
            {t('Язык')}
        </Button>
    );
};
