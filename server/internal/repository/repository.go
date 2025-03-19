package repository

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user cards.User) (cards.User, error)
	FindUserById(userId string) (cards.User, error)
	FindUserByEmail(user cards.User) (cards.User, error)
	GetAllUsers() ([]cards.User, error)
}

type Repository struct {
	Authorization
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
	}
}
