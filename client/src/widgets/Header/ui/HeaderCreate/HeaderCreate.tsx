import { classNames } from '@shared/lib/classNames/classNames';
import cls from './HeaderCreate.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ArrowIcon from '@shared/assets/icons/arrow.svg';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@shared/const/router';
import { LangSwitcher } from '@widgets/LangSwitcher/ui/LangSwitcher';

interface HeaderCreateProps {
    className?: string;
}

export const HeaderCreate = memo(({ className }: HeaderCreateProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={classNames(cls.HeaderCreate, {}, [className])}>
            <Button className={cls.arrow_btn} variant='none' onClick={() => navigate(Routes.CARDS)}>
                <ArrowIcon className={cls.arrowIcon}/>
            </Button>
            <LangSwitcher className={cls.lang_switcher} />
        </div>
    );
});
