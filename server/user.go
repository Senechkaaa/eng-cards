package cards

import "time"

type User struct {
	ID       string    `json:"id" db:"id"`
	Username string    `json:"username"`
	Password string    `json:"password" binding:"required"`
	Email    string    `json:"email" binding:"required"`
	Time     time.Time `json:"time"`
	UserType string    `json:"user_type" `
}

type Registration struct {
	ID       string    `json:"id" db:"id"`
	Username string    `json:"username"`
	Email    string    `json:"email" binding:"required"`
	Time     time.Time `json:"time"`
	UserType string    `json:"user_type" `
}
