package middleware

import (
	"fmt"
	"github.com/Senechkaaa/engcards/pkg/auth"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func AuthMiddleware(tokenManager *auth.Manager) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "authorization header is required"})
			c.Abort()
			return
		}
		token := strings.TrimPrefix(authHeader, "Bearer ")
		fmt.Println("token:", token)
		if token == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization header format"})
			c.Abort()
			return
		}

		claims, err := tokenManager.Parse(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized", "details": err.Error()})
			c.Abort()
			return
		}

		c.Set("id", claims.Id)
		c.Next()
	}
}

//token, err := c.Cookie("refresh_token")
//if token == "" {
//	c.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
//	c.Abort()
//	return
//}
//
//fmt.Println("token:", token)
//
//claims, err := tokenManager.Parse(token)
//if err != nil {
//	c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized", "details": err.Error()})
//	c.Abort()
//	return
//}
