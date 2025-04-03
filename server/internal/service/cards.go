package service

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/Senechkaaa/engcards/internal/repository"
)

type CardsService struct {
	repo repository.Cards
}

func NewCardsService(repo repository.Cards) *CardsService {
	return &CardsService{repo: repo}
}

func (s *CardsService) CreateCard(card cards.Card, deckId string) (string, error) {
	return s.repo.CreateCard(card, deckId)
}

func (s *CardsService) CreateDeck(userId string) (string, error) {
	return s.repo.CreateDeck(userId)
}

func (s *CardsService) GetDeckIdByUserId(userId string) (string, error) {
	return s.repo.GetDeckIdByUserId(userId)
}

func (s *CardsService) GetCardByDeckId(deckId string) ([]cards.Card, error) {
	return s.repo.GetCardByDeckId(deckId)
}
