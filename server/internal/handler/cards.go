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
	if err != nil {
		newErrorResponce(c, http.StatusBadRequest, "Invalid user id")
	}
	fmt.Println(userId)

	deckId, err := h.services.GetDeckIdByUserId(userId)
	fmt.Println(deckId)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
	}

	id, err := h.services.CreateCard(input, deckId)

	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})
}
