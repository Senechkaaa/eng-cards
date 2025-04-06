package handler

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	AuthorizationHeader = "Authorization"
	userCtx             = "userId"
)

func (h *Handler) userIdentity(c *gin.Context) {
	header := c.GetHeader(AuthorizationHeader)
	fmt.Println("header", header)
	if header == "" {
        newErrorResponce(c, http.StatusUnauthorized, "empty auth header")
        return
	}

	headerParts := strings.Split(header, " ")
	fmt.Println("headerParts", headerParts)
	if len(headerParts) != 2 || headerParts[0] != "Bearer" {
		newErrorResponce(c, http.StatusUnauthorized, "invalid auth header")
		return
	}

	claims, err := h.services.Parse(headerParts[1])
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, err.Error())
		return
	}
	fmt.Println("claims:", claims)

	c.Set(userCtx, claims.Id)
}

func getUserId(c *gin.Context) (string, error) {
	id, ok := c.Get(userCtx)
		fmt.Println("id:", id)
	if !ok {
		newErrorResponce(c, http.StatusInternalServerError, "user is not found")
		return "", errors.New("user is not found")
	}

	idStr, ok := id.(string)
	if !ok {
		newErrorResponce(c, http.StatusInternalServerError, "user is not found")
		return "", errors.New("user is not found")
	}

	return idStr, nil
}
