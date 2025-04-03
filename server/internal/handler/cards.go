package handler

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func (h *Handler) createCard(c *gin.Context) {
	var input cards.Card
	if err := c.BindJSON(&input); err != nil {
		log.Printf("BindJSON error: %v", err)
		newErrorResponce(c, http.StatusBadRequest, "Invalid input data")
		return
	}

	userId, err := getUserId(c)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "Invalid user id")
		return
	}

	deckId, err := h.services.Cards.GetDeckIdByUserId(userId)
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

	cards, err := h.services.GetCardByDeckId(deckId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"cards": cards,
	})
}
