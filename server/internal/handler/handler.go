package handler

import (
	"github.com/Senechkaaa/engcards/internal/service"
	"github.com/Senechkaaa/engcards/pkg/auth"
	"github.com/Senechkaaa/engcards/pkg/middleware"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes(tokenManager *auth.Manager) *gin.Engine {

	router := gin.Default()
	router.Use(middleware.CorsMiddleware)

	auth := router.Group("/auth")
	{
		auth.POST("sign-up", h.signUp)
		auth.POST("logout", h.logout)
		auth.GET("refresh", h.refresh)
		auth.POST("sign-in", h.signIn)
	}

	api := router.Group("/api", h.userIdentity)
	{
		cards := api.Group("cards")
		{
			cards.POST("/create", h.createCard)
			cards.GET("/get", h.getCards)
			cards.PUT("/change", h.updateStatusAndCountCard)
			cards.DELETE("/delete", h.deleteCard)
		}
		courses := api.Group("courses")
		{
			courses.POST("/")
		}
	}
	return router
}
