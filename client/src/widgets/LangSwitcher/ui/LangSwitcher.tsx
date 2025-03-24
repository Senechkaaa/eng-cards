import { classNames } from '@shared/lib/classNames/classNames';
import { Button } from '@shared/ui/Button';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            padding='sm_p'
            onClick={toggle}
            className={classNames('LangSwitcher', {}, [className])}
        >
            {t('Язык')}
        </Button>
    );
});
