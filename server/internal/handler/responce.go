package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type errorResponce struct {
	Message string `json:"message"`
}

func newErrorResponce(c *gin.Context, statusCode int, message string) {
	logrus.Errorf(message)
	c.JSON(statusCode, errorResponce{
		Message: message,
	})
}

type statusResponce struct {
	Status string `json:"status"`
}
