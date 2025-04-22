import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardsPageActions.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Button } from '@shared/ui/Button';
import PlusIcon from '@shared/assets/icons/plus.svg';
import BrainIcon from '@shared/assets/icons/brain.svg';
import { AppLink } from '@shared/ui/AppLink/AppLink';
import { Routes } from '@shared/const/router';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@shared/assets/icons/arrow.svg';
import { CardInfiniteList } from '@features/CardInfiniteList/ui/CardInfiniteList';
import { Input } from '@shared/ui/Input';
import { useSelector } from 'react-redux';
import { getCardsPageActionsState } from '@pages/CardsPage/model/selectors/getCardsPageActionsState';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cardsPageActionsActions } from '@pages/CardsPage/model/slice/cardsPageActionsSlice';

interface CardsPageActionsProps {
    className?: string;
}

export const CardsPageActions = memo(({ className }: CardsPageActionsProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isVisible, search } = useSelector(getCardsPageActionsState);
    const dispatch = useAppDispatch();

    const onChangeSearch = useCallback(
        (value: string) => {
            dispatch(cardsPageActionsActions.setSearch(value));
        },
        [dispatch],
    );

    const handleStart = () => {
        navigate(Routes.LEARN);
        dispatch(cardsPageActionsActions.setIsVisible(false));
        dispatch(cardsPageActionsActions.setSearch(''));
    };

    const handleVisible = useCallback(() => {
        dispatch(cardsPageActionsActions.setIsVisible(!isVisible));
    }, [dispatch, isVisible]);

    return (
        <>
            <div className={classNames(cls.CardsPageActions, {}, [className])}>
                <Button
                    onClick={handleStart}
                    shadow
                    padding='sm_p'
                    className={cls.btn}
                    variant='filled'
                >
                    {t('Начать')}
                </Button>
                <div className={cls.btn_actions}>
                    <Button
                        onClick={handleVisible}
                        className={cls.btn}
                        variant='basic'
                        padding='sm_p'
                    >
                        <ArrowIcon
                            className={classNames(cls.arrowIcon, { [cls.rotated]: isVisible }, [])}
                        />
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
            </div>
            {isVisible && (
                <div className={cls.cardsContainer}>
                    <Input
                        onChange={onChangeSearch}
                        value={search}
                        placeholder={'Поиск'}
                        className={cls.input}
                        isValidate={false}
                        variant='basic'
                    />
                    <CardInfiniteList className={cls.cardsInfiniteList} />
                </div>
            )}
        </>
    );
});
