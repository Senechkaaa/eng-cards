package service

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/Senechkaaa/engcards/internal/repository"
	"github.com/Senechkaaa/engcards/pkg/auth"
	"github.com/Senechkaaa/engcards/pkg/hash"
)

type Authorization interface {
	CreateUser(user cards.User) (cards.User, error)
	GenerateTokens(user cards.User) (string, string, error)
	Parse(accessToken string) (*auth.UserClaims, error)
	GetUserById(userId string) (cards.User, error)
	GetUserByEmail(user cards.User) (cards.User, error)
	GetAllUsers() ([]cards.User, error)
}

type TokenManager interface {
	GenerateTokens(user cards.User) (string, string, error)
	Parse(accessToken string) (*auth.UserClaims, error)
}

type Service struct {
	Authorization
}

type Deps struct {
	Repos        *repository.Repository
	TokenManager TokenManager
	Hash         *hash.SHA1Hasher
}

func NewService(deps Deps) *Service {
	return &Service{Authorization: NewAuthService(deps.Repos, deps.Hash, deps.TokenManager)}
}
