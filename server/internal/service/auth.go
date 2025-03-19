package service

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/Senechkaaa/engcards/internal/repository"
	"github.com/Senechkaaa/engcards/pkg/auth"
	"github.com/Senechkaaa/engcards/pkg/hash"
)

type AuthService struct {
	repo         repository.Authorization
	hash         *hash.SHA1Hasher
	tokenManager TokenManager
}

func NewAuthService(repo repository.Authorization, hash *hash.SHA1Hasher, tokenManager TokenManager) *AuthService {
	return &AuthService{repo: repo, hash: hash, tokenManager: tokenManager}
}

func (s *AuthService) CreateUser(user cards.User) (cards.User, error) {
	hashedPassword, err := s.hash.HashPassword(user.PasswordHash)
	if err != nil {
		return cards.User{}, err
	}
	user.PasswordHash = hashedPassword
	return s.repo.CreateUser(user)
}

func (s *AuthService) GenerateTokens(user cards.User) (string, string, error) {
	return s.tokenManager.GenerateTokens(user)
}

func (s *AuthService) Parse(accessToken string) (*auth.UserClaims, error) {
	return s.tokenManager.Parse(accessToken)
}

func (s *AuthService) GetUserById(userId string) (cards.User, error) {
	return s.repo.FindUserById(userId)
}

func (s *AuthService) GetUserByEmail(user cards.User) (cards.User, error) {
	hashedPassword, err := s.hash.HashPassword(user.PasswordHash)
	if err != nil {
		return cards.User{}, err
	}
	user.PasswordHash = hashedPassword
	return s.repo.FindUserByEmail(user)
	//if err != nil {
	//	return cards.User{}, err
	//}
	//return userExpected, nil
}

func (s *AuthService) GetAllUsers() ([]cards.User, error) {
	return s.repo.GetAllUsers()
}
