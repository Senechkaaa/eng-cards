package auth

import (
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt"
	"log"
	"time"
)

type Manager struct {
	signingKey string
}

type UserClaims struct {
	Id       string `json:"uid"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
	jwt.StandardClaims
}

func NewManager(signingKey string) (*Manager, error) {
	if signingKey == "" {
		return nil, errors.New("empty signing key")
	}

	return &Manager{signingKey: signingKey}, nil
}

func (m *Manager) GenerateTokens(username, email string, userId string) (string, string, error) {

	accessClaims := &UserClaims{
		Id:       userId,
		Email:    email,
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Minute * time.Duration(15)).Unix(),
		},
	}

	refreshClaims := &UserClaims{
		Id: userId,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(168)).Unix(),
		},
	}

	accessToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims).SignedString([]byte(m.signingKey))

	if err != nil {
		return "", "", fmt.Errorf("failed to create access token: %w", err)
	}

	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(m.signingKey))

	if err != nil {
		return "", "", fmt.Errorf("failed to create refresh token: %w", err)
	}

	return accessToken, refreshToken, err
}

func (m *Manager) Parse(token string) (*UserClaims, error) {
	tokenParse, err := jwt.ParseWithClaims(token, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(m.signingKey), nil
	})
	if err != nil {
		log.Println("Parse error:", err)
		return nil, errors.New("failed to parse token")
	}

	claims, ok := tokenParse.Claims.(*UserClaims)
	if !ok || !tokenParse.Valid {
		return nil, errors.New("token claims are not of type")
	}

	if claims.ExpiresAt < time.Now().Unix() {
		return nil, fmt.Errorf("token has expired")
	}
	return claims, nil
}
