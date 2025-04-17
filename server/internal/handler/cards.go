package handler

import (
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

	cards, err := h.services.GetCardsByDeckId(deckId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"cards": cards,
	})
}

func (h *Handler) updateStatusAndCountCard(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "Invalid user id")
		return
	}

	var input cards.UpdateCardStatusInput
	if err := c.BindJSON(&input); err != nil {
		newErrorResponce(c, http.StatusBadRequest, "Invalid input data")
		return
	}

	deckId, err := h.services.GetDeckIdByUserId(userId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	if err := h.services.Cards.UpdateStatusAndCountCard(input, userId, deckId); err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(http.StatusOK, statusResponce{
		Status: "ok",
	})
}

func (h *Handler) deleteCard(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "Invalid user id")
		return
	}

	var cardId string
	if err := c.BindJSON(&input); err != nil {
		newErrorResponce(c, http.StatusBadRequest, "Invalid input cardId")
		return
	}

	deckId, err := h.services.GetDeckIdByUserId(userId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	if err := h.services.Cards.DeleteCard(cardId, deckId, userId); err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(http.StatusOK, statusResponce{
		Status: "ok",
	})
}
