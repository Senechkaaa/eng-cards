package repository

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user cards.User) (string, error)
	GetUser(username, email, password string) (cards.User, error)
	FindUserById(userId string) (cards.User, error)
	FindUserByEmail(user cards.User) (cards.User, error)
}

type Cards interface {
	CreateDeck(userId string) (string, error)
	CreateCard(card cards.Card, deckId string) (string, error)
	GetDeckIdByUserId(userId string) (string, error)
	GetCardByDeckId(deckId string) ([]cards.Card, error)
}

type Repository struct {
	Authorization
	Cards
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		Cards:         NewCardsPostgres(db),
	}
}
