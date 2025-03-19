package cards

type User struct {
	ID int `json:"-"db:"id" `
	Username string `json: "username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
