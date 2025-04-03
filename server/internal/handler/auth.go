package handler

import (
	"fmt"
	cards "github.com/Senechkaaa/engcards"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) signUp(c *gin.Context) {
	var input cards.User
	if err := c.BindJSON(&input); err != nil {
		newErrorResponce(c, http.StatusBadRequest, err.Error())
		return
	}

	candidate, _ := h.services.GetUserByEmail(input)
	if candidate.Email != "" {
		newErrorResponce(c, http.StatusBadRequest, "this user is already registered:"+candidate.Email)
		return
	}

	user, err := h.services.CreateUser(input)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	accessToken, refreshToken, err := h.services.GenerateTokens(user)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, "Failed to generate tokens")
		return
	}

	c.SetCookie("refresh_token", refreshToken, 7200, "/", "localhost", false, true)

	fmt.Println("userId", user.ID)
	fmt.Println(user)
	deckId, err := h.services.CreateDeck(user.ID)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"user":          user,
		"deskId":        deckId,
	})
}

func (h *Handler) signIn(c *gin.Context) {
	var input cards.User
	if err := c.BindJSON(&input); err != nil {
		newErrorResponce(c, http.StatusBadRequest, "Invalid input data")
		return
	}

	user, err := h.services.GetUserByEmail(input)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, err.Error())
		return
	}
	accessToken, refreshToken, err := h.services.GenerateTokens(user)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, "Failed to generate tokens")
		return
	}

	c.SetCookie("refresh_token", refreshToken, 7200, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"access_token": accessToken, "refresh_token": refreshToken, "user": user})
}

func (h *Handler) logout(c *gin.Context) {
	c.SetCookie("refresh_token", "", -1, "/", "localhost", false, true)
}

func (h *Handler) refresh(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "missing refresh token")
		return
	}

	refreshClaims, err := h.services.Parse(refreshToken)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "invalid refresh token")
		return
	}

	expectedUser, err := h.services.GetUserById(refreshClaims.Id)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, err.Error())
		return
	}

	accessToken, newRefreshToken, err := h.services.GenerateTokens(expectedUser)
	if err != nil {
		newErrorResponce(c, http.StatusInternalServerError, "Failed to generate tokens")
		return
	}

	c.SetCookie("refresh_token", newRefreshToken, 7200, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"access_token": accessToken, "refresh_token": newRefreshToken, "user": expectedUser})

}
