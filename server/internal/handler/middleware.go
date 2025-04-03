package handler

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

const (
	AuthorizationHeader = "Authorization"
	userCtx             = "userId"
)

func (h *Handler) userIdentity(c *gin.Context) {
	header := c.GetHeader(AuthorizationHeader)
	if header == "" {
		newErrorResponce(c, http.StatusUnauthorized, "empty auth header")
		return
	}
	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		newErrorResponce(c, http.StatusUnauthorized, "invalid auth header")
		return
	}

	claims, err := h.services.Parse(headerParts[1])
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Set(userCtx, claims.Id)
}

func getUserId(c *gin.Context) (string, error) {
	id, ok := c.Get(userCtx)
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
