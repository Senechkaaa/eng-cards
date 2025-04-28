import { StatBlock } from '@entities/StatBlock';
import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardsPage.module.scss';
import { CardsPageLevelProgress } from '../CardsPageLevelProgress/CardsPageLevelProgress';
import { CardsPageActions } from '../CardActions/CardsPageActions';
import { Row } from '@shared/ui/Row';

const CardsPage = () => {
    return (
        <Row align='center' direction='column' className={classNames(cls.CardsPage, {}, [])}>
            <StatBlock />
            <CardsPageLevelProgress />
            <CardsPageActions />
        </Row>
    );
};

export default CardsPage;
