package repository

import (
	"database/sql"
	"errors"
	"fmt"
	cards "github.com/Senechkaaa/engcards"
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
	"time"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (r *AuthPostgres) CreateUser(user cards.User) (cards.User, error) {
	user.Time = time.Now()
	query := fmt.Sprintf("INSERT INTO %s (username, email, created_at, password, user_type) values($1, $2, $3, $4, $5) RETURNING id", usersTable)
	row := r.db.QueryRow(query, user.Username, user.Email, user.Time, user.Password, user.UserType)

	if err := row.Scan(&user.ID); err != nil {
		return cards.User{}, err
	}

	return user, nil
}

func (r *AuthPostgres) GetUser(username, email, password string) (cards.User, error) {
	var user cards.User
	query := fmt.Sprintf("SELECT id from %s WHERE username = $1 AND email = $2 AND password = $3", usersTable)
	err := r.db.Get(&user, query, username, email, password)
	return user, err
}

func (r *AuthPostgres) FindUserById(userId string) (cards.User, error) {
	var existingUser cards.User

	query := fmt.Sprintf("SELECT id, username, password, email, created_at, user_type FROM users WHERE id = '%s'", userId)
	row := r.db.QueryRow(query)

	if err := row.Scan(&existingUser.ID, &existingUser.Username, &existingUser.Password, &existingUser.Email, &existingUser.Time, &existingUser.UserType); err != nil {
		if err == sql.ErrNoRows {
			return cards.User{}, errors.New("sql no rows")
		}
		return cards.User{}, err
	}

	if existingUser.ID == "" {
		logrus.Fatalf("This user does not exist")
	}
	return existingUser, nil
}

func (r *AuthPostgres) FindUserByEmail(user cards.User) (cards.User, error) {
	var existingUser cards.User

	query := fmt.Sprintf("SELECT id, username, password, email, created_at, user_type FROM users WHERE email = $1")
	row := r.db.QueryRow(query, user.Email)

	if err := row.Scan(&existingUser.ID, &existingUser.Username, &existingUser.Password, &existingUser.Email, &existingUser.Time, &existingUser.UserType); err != nil {
		if err == sql.ErrNoRows {
			return cards.User{}, errors.New("sql no rows")
		}
		return cards.User{}, err
	}
	if user.Password != existingUser.Password {
		return cards.User{}, errors.New("password hash does not match")
	}
	return existingUser, nil
}
