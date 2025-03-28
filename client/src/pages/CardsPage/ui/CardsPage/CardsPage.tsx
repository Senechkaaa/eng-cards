import { StatBlock } from '@entities/StatBlock/ui/StatBlock';
import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardsPage.module.scss';
import { CardsPageLevelProgress } from '../CardsPageLevelProgress/CardsPageLevelProgress';
import { Button } from '@shared/ui/Button';
import { CardsPageActions } from '../CardActions/CardsPageActions';

const CardsPage = () => {
    return (
        <div className={classNames(cls.CardsPage, {}, [])}>
            <StatBlock />
            <CardsPageLevelProgress />
            <Button shadow padding='sm_p' className={cls.btn} variant='filled'>
                Начать
            </Button>
            <CardsPageActions />
        </div>
    );
};

export default CardsPage;
