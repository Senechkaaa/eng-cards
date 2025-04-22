package repository

import (
	"fmt"
	cards "github.com/Senechkaaa/engcards"
	"github.com/jmoiron/sqlx"
)

type CardsPostgres struct {
	db *sqlx.DB
}

func NewCardsPostgres(db *sqlx.DB) *CardsPostgres {
	return &CardsPostgres{db: db}
}

func (r *CardsPostgres) CreateDeck(userId string) (string, error) {
	query := fmt.Sprintf("INSERT INTO %s (user_id) VALUES ($1) RETURNING ID", "decks")
	var deckId string

	row := r.db.QueryRow(query, userId)
	if err := row.Scan(&deckId); err != nil {
		return "", err
	}

	return deckId, nil
}

func (r *CardsPostgres) CreateCard(card cards.Card, deckId string) (string, error) {
	createCardQuery := fmt.Sprintf("INSERT INTO %s (eng_word, ru_word, example, deck_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING ID", cardsTable)

	status := "learn"
	var id string

	row := r.db.QueryRow(createCardQuery, card.EngWord, card.RuWord, card.Example, deckId, status)

	if err := row.Scan(&id); err != nil {
		return "", err
	}

	return id, nil
}

func (r *CardsPostgres) GetDeckIdByUserId(userId string) (string, error) {
	query := fmt.Sprintf("SELECT id FROM %s WHERE user_id = $1", "decks")

	var deckId string

	row := r.db.QueryRow(query, userId)
	if err := row.Scan(&deckId); err != nil {
		return "", err
	}

	return deckId, nil
}

func (r *CardsPostgres) GetCardsByDeckId(deckId, userId, query string) ([]cards.Card, error) {
    var cards []cards.Card
    sqlQuery := fmt.Sprintf(`
        SELECT cards.id, cards.deck_id, cards.eng_word, cards.ru_word, cards.example, cards.status, cards.correct_guess_count FROM %s AS cards INNER JOIN decks ON cards.deck_id = decks.id WHERE decks.id = $1 AND decks.user_id = $2 AND ($3 = '' OR cards.ru_word ILIKE $3 OR cards.eng_word ILIKE $3 OR cards.example ILIKE $3)`, cardsTable)

    err := r.db.Select(&cards, sqlQuery, deckId, userId, "%"+query+"%")
    return cards, err
}

func (r *CardsPostgres) GetCardById(userId, cardId string) (cards.Card, error) {
	var card cards.Card
	query := fmt.Sprintf("SELECT cards.id, cards.deck_id, cards.eng_word, cards.ru_word, cards.example, cards.status, cards.correct_guess_count FROM %s INNER JOIN decks ON cards.deck_id = decks.id INNER JOIN users ON decks.user_id = users.id WHERE users.id = $1 AND cards.id = $2", cardsTable)

	err := r.db.Get(&card, query, userId, cardId)
	return card, err
}

func (r *CardsPostgres) UpdateStatusAndCountCard(input cards.UpdateCardStatusInput, userId, deckId string) error {
	query := fmt.Sprintf("UPDATE %s SET status = $1, correct_guess_count = $2 WHERE id = $3 AND deck_id = $4 AND deck_id IN (SELECT id FROM decks WHERE user_id = $5)", cardsTable)

	_, err := r.db.Exec(query, input.Status, input.CorrectCount, input.CardID, deckId, userId)
	return err
}

func (r *CardsPostgres) DeleteCard(cardId, deckId, userId string) error {
	query := fmt.Sprintf("DELETE FROM %s WHERE id = $1 AND deck_id = $2 AND deck_id IN (SELECT id FROM decks WHERE user_id = $3)", cardsTable)
	_, err := r.db.Exec(query, cardId, deckId, userId)
	return err
}
