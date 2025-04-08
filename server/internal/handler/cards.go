package handler

import (
	"fmt"
	cards "github.com/Senechkaaa/engcards"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) createCard(c *gin.Context) {
	var input cards.Card
	if err := c.BindJSON(&input); err != nil {
		newErrorResponce(c, http.StatusBadRequest, "Invalid input data")
		return
	}

	userId, err := getUserId(c)
	fmt.Println("userId:", userId)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "Invalid user id")
		return
	}

	deckId, err := h.services.Cards.GetDeckIdByUserId(userId)
	fmt.Println("deckId:", deckId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	id, err := h.services.Cards.CreateCard(input, deckId)

	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})
}

func (h *Handler) getCard(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "Invalid user id")
		return
	}

	deckId, err := h.services.GetDeckIdByUserId(userId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	cards, err := h.services.GetCardsByDeckId(deckId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"cards": cards,
	})
}

type UpdateCardStatusInput struct {
	Status string `json:"status" binding:"required"`
	CardID string `json:"card_id" binding:"required"`
}

func (h *Handler) updateStatusCard(c *gin.Context) {
	var input UpdateCardStatusInput
	if err := c.BindJSON(&input); err != nil {
		newErrorResponce(c, http.StatusBadRequest, "Invalid input data")
		return
	}

	userId, err := getUserId(c)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "Invalid user id")
		return
	}

	deckId, err := h.services.GetDeckIdByUserId(userId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	if err := h.services.Cards.UpdateStatusCard(input.Status, userId, deckId, input.CardID); err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(http.StatusOK, statusResponce{
		Status: "ok",
	})
}
