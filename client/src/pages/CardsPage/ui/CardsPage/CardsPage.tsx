import { StatBlock } from '@entities/StatBlock/ui/StatBlock';
import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardsPage.module.scss';
import { CardsPageLevelProgress } from '../CardsPageLevelProgress/CardsPageLevelProgress';
import { CardsPageActions } from '../CardActions/CardsPageActions';
const CardsPage = () => {
    return (
        <div className={classNames(cls.CardsPage, {}, [])}>
            <StatBlock />
            <CardsPageLevelProgress />
            <CardsPageActions />
        </div>
    );
};

export default CardsPage;
