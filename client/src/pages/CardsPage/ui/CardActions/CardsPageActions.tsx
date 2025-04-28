import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardsPageActions.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button } from '@shared/ui/Button';
import PlusIcon from '@shared/assets/icons/plus.svg';
import BrainIcon from '@shared/assets/icons/brain.svg';
import { AppLink } from '@shared/ui/AppLink/AppLink';
import { Routes } from '@shared/const/router';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@shared/assets/icons/arrow.svg';
import { CardInfiniteList } from '@features/CardInfiniteList';
import { Input } from '@shared/ui/Input';
import { useSelector } from 'react-redux';
import { getCardsPageActionsState } from '../../model/selectors/getCardsPageActionsState';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cardsPageActionsActions } from '../../model/slice/cardsPageActionsSlice';
import { Select } from '@shared/ui/Select/Select';
import {
    CardSortFieldOptions,
    cardStatusOptions,
} from '../../model/consts/cardStatusOptions';
import { Row } from '@shared/ui/Row';

interface CardsPageActionsProps {
    className?: string;
}

export const CardsPageActions = memo(({ className }: CardsPageActionsProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isVisible, search, sort } = useSelector(getCardsPageActionsState);
    const dispatch = useAppDispatch();

    const onChangeSearch = useCallback(
        (value: string) => {
            dispatch(cardsPageActionsActions.setSearch(value));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: CardSortFieldOptions) => {
            dispatch(cardsPageActionsActions.setSort(newSort));
        },
        [dispatch],
    );

    const handleStart = useCallback(() => {
        navigate(Routes.LEARN);
        dispatch(cardsPageActionsActions.setIsVisible(false));
        dispatch(cardsPageActionsActions.setSearch(''));
    }, [dispatch, navigate]);

    const handleVisible = useCallback(() => {
        dispatch(cardsPageActionsActions.setIsVisible(!isVisible));
    }, [dispatch, isVisible]);

    return (
        <>
            <Row
                direction='column'
                align='center'
                className={classNames(cls.CardsPageActions, {}, [className])}
            >
                <Button
                    onClick={handleStart}
                    shadow
                    padding='sm_p'
                    className={cls.btn}
                    variant='filled'
                >
                    {t('Начать')}
                </Button>
                <Row justify='between' align='center' className={cls.btn_actions}>
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
                </Row>
            </Row>
            {isVisible && (
                <Row direction='column' align='center' className={cls.cardsContainer}>
                    <Row justify='between' align='center' className={cls.sort_container}>
                        <Input
                            classNameWrapper={cls.input_cont}
                            onChange={onChangeSearch}
                            value={search}
                            placeholder={'Поиск'}
                            className={cls.input}
                            isValidate={false}
                            variant='basic'
                        />
                        <Select<CardSortFieldOptions>
                            className={cls.select}
                            value={sort}
                            options={cardStatusOptions}
                            defaultValue='Состояние карточки'
                            onChange={onChangeSort}
                        />
                    </Row>

                    <CardInfiniteList className={cls.cardsInfiniteList} />
                </Row>
            )}
        </>
    );
});
