package middleware

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func CorsMiddleware(c *gin.Context) {
    c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
    c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    c.Header("Access-Control-Allow-Credentials", "true")

    if c.Request.Method == "OPTIONS" {
        c.AbortWithStatus(http.StatusOK)
        return
    }

    c.Next()
}
