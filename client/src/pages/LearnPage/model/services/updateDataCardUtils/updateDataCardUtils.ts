import { ICard, Status } from '@shared/types/ICard';

export const handlerMoveRight = (card: ICard) => {
    const status: Status =
        card.correct_count >= 4 ? 'learned' : card.correct_count >= 2 ? 'know' : 'learn';

    return {
        card_id: card.id,
        correct_count: card.correct_count + 1,
        status,
    };
};

export const handlerMoveLeft = (card: ICard) => {
    const status: Status =
        card.correct_count <= 2 ? 'learn' : card.correct_count <= 4 ? 'know' : 'learned';

    return {
        card_id: card.id,
        correct_count: card.correct_count - 1,
        status,
    };
};
