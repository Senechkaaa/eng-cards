import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardsPageActions.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button } from '@shared/ui/Button';
import PlusIcon from '@shared/assets/icons/plus.svg';
import BrainIcon from '@shared/assets/icons/brain.svg';
import { AppLink } from '@shared/ui/AppLink/AppLink';
import { Routes } from '@shared/const/router';

interface CardsPageActionsProps {
    className?: string;
}

export const CardsPageActions = memo(({ className }: CardsPageActionsProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.CardsPageActions, {}, [className])}>
            <Button className={cls.btn} variant='basic' padding='sm_p'>
                {t('Карточки')}
            </Button>
            <div className={cls.container_btn}>
                <AppLink to={Routes.CREATE}>
                    <Button shadow className={cls.btn_circle} variant='circle'>
                        <PlusIcon />
                    </Button>
                </AppLink>
                <Button shadow className={cls.btn_circle} variant='circle'>
                    <BrainIcon />
                </Button>
            </div>
        </div>
    );
});
