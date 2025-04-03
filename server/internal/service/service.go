package service

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/Senechkaaa/engcards/internal/repository"
	"github.com/Senechkaaa/engcards/pkg/auth"
	"github.com/Senechkaaa/engcards/pkg/hash"
)

type Authorization interface {
	CreateUser(user cards.User) (string, error)
	GenerateTokens(username, email string, userId string) (string, string, error)
	Parse(accessToken string) (*auth.UserClaims, error)
	GetUserById(userId string) (cards.User, error)
	GetUserByEmail(user cards.User) (cards.User, error)
}

type TokenManager interface {
	GenerateTokens(username, email string, userId string) (string, string, error)
	Parse(accessToken string) (*auth.UserClaims, error)
}

type Cards interface {
	CreateDeck(userId string) (string, error)
	CreateCard(card cards.Card, deckId string) (string, error)
	GetDeckIdByUserId(userId string) (string, error)
	GetCardByDeckId(deckId string) ([]cards.Card, error)
}

type Service struct {
	Authorization
	Cards
}

type Deps struct {
	Repos        *repository.Repository
	TokenManager TokenManager
	Hash         *hash.SHA1Hasher
}

func NewService(deps Deps) *Service {
	return &Service{
		Authorization: NewAuthService(deps.Repos, deps.Hash, deps.TokenManager),
		Cards:         NewCardsService(deps.Repos),
	}
}
