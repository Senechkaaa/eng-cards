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

func (r *CardsPostgres) GetCardByDeckId(deckId string) ([]cards.Card, error) {
	var cards []cards.Card
	query := fmt.Sprintf("SELECT cards.id, cards.deck_id, cards.eng_word, cards.ru_word, cards.example, cards.status  FROM %s INNER JOIN decks ON cards.deck_id = decks.id WHERE decks.id = $1", cardsTable)
	err := r.db.Select(&cards, query, deckId)
	return cards, err
}

//{
//"message": "missing destination name deck_id in *[]cards.Card"
//}
