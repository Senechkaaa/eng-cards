import { classNames } from '@shared/lib/classNames/classNames';
import cls from './CardListItem.module.scss';
import { memo } from 'react';
import { ICard } from '@shared/types/ICard';
import { Text } from '@shared/ui/Text';
import { Button } from '@shared/ui/Button';
import { ReactComponent as TrachCanIcon } from '@shared/assets/icons/trash-can.svg';
import { Row } from '@shared/ui/Row';

interface CardListItemProps {
    className?: string;
    card: ICard;
    onDeleteCard: (cardId: string) => void;
}

export const CardListItem = memo(({ className, card, onDeleteCard }: CardListItemProps) => {
    return (
        <Row
            align='center'
            justify='between'
            className={classNames(cls.cardItem, {}, [className])}
            key={card.id}
        >
            <div>
                <Text className={cls.eng_word} theme='gray' title={card.eng_word} size='s' />
                <Text theme='gray' title={card.ru_word} size='s' />
                <Text theme='light_gray' title={card.example} size='m' />
            </div>

            <Button onClick={() => onDeleteCard(card.id)} variant='none'>
                <TrachCanIcon className={cls.icon} />
            </Button>
        </Row>
    );
});
