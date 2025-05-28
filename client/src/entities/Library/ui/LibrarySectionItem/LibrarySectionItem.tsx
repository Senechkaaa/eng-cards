import { classNames } from '@shared/lib/classNames/classNames';
import cls from './LibrarySectionItem.module.scss';
import { memo } from 'react';
import { ILabraryItem, Level } from '@shared/types/ILibraryItem';
import { Text } from '@shared/ui/Text';
import { ReactComponent as StarIcon } from '@shared/assets/icons/star.svg';
import { ReactComponent as CardIcon } from '@shared/assets/icons/card.svg';
import { Row } from '@shared/ui/Row';

interface LibrarySectionItemProps {
    className?: string;
    item: ILabraryItem;
}

const levelClasses: Record<Level, string> = {
    easy: cls.easyLevel,
    medium: cls.mediumLevel,
    hard: cls.hardLevel,
};

export const LibrarySectionItem = memo((props: LibrarySectionItemProps) => {
    const { className, item } = props;
    // 150 200

    return (
        <Row
            direction='column'
            align='center'
            className={classNames(cls.LibrarySectionItem, {}, [className])}
        >
            <div className={cls.img_conainer}>
                <img className={cls.img} src={item.img} />
            </div>
            <Row className={cls.info_container} direction='column' align='center' justify='center'>
                <Text textSize='mT' className={cls.title} theme='gray' text={String(item.title)} />
                <Row className={cls.info_course}>
                    <Row className={cls.rating} align='center'>
                        <Text textSize='sT' text={String(item.rating)} />
                        <StarIcon className={cls.icon} />
                    </Row>
                    <Row align='center'>
                        <Text textSize='sT' text={String(item.countWords)} />
                        <CardIcon className={cls.icon} />
                    </Row>
                </Row>
            </Row>
            <div className={classNames(cls.level, {}, [levelClasses[item.level]])}>
                {item.level}
            </div>
        </Row>
    );
});
