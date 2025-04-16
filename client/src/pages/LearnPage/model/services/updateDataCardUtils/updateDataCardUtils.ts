import { Card } from '../../types/learnPageType';

export const handlerMoveRight = (card: Card) => ({
    card_id: card.id,
    correct_count: card.correct_count + 1,
    status: card.correct_count >= 2 ? 'know' : card.status,
});

export const handlerMoveLeft = (card: Card) => ({
    card_id: card.id,
    correct_count: card.correct_count - 1,
    status: card.correct_count <= 2 ? 'learn' : card.status,
});
