package auth

import (
	"errors"
	"fmt"
	cards "github.com/Senechkaaa/engcards"
	"github.com/golang-jwt/jwt"
	"time"
)

type Manager struct {
	signingKey string
}

type UserClaims struct {
	Id            string `json:"uid"`
	Email         string `json:"email"`
	Username      string `json:"username"`
	Password_Hash string `json:"password"`
	jwt.StandardClaims
}

//type TokenManager interface {
//	GenerateTokens(user cards.User) (string, string, error)
//	Parse(accessToken string) (*UserClaims, error)
//}

func NewManager(signingKey string) (*Manager, error) {
	if signingKey == "" {
		return nil, errors.New("empty signing key")
	}

	return &Manager{signingKey: signingKey}, nil
}

func (m *Manager) GenerateTokens(user cards.User) (string, string, error) {

	claims := &UserClaims{
		Id:            user.ID,
		Email:         user.Email,
		Username:      user.Username,
		Password_Hash: user.PasswordHash,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Second * time.Duration(15)).Unix(),
		},
	}

	refreshClaims := &UserClaims{
		Id: user.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(168)).Unix(),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(m.signingKey))

	if err != nil {
		return "", "", fmt.Errorf("failed to create access token: %w", err)
	}

	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(m.signingKey))

	if err != nil {
		return "", "", fmt.Errorf("failed to create refresh token: %w", err)
	}

	return token, refreshToken, err
}

func (m *Manager) Parse(accessToken string) (*UserClaims, error) {
	token, err := jwt.ParseWithClaims(accessToken, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(m.signingKey), nil
	})
	if err != nil {
		return nil, errors.New("failed to parse token")
	}

	claims, ok := token.Claims.(*UserClaims)
	if !ok || !token.Valid {
		return nil, errors.New("token claims are not of type")
	}

	if claims.ExpiresAt < time.Now().Unix() {
		return nil, fmt.Errorf("token has expired")
	}
	return claims, nil
}
