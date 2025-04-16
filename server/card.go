package cards

type Card struct {
	ID           string `json:"id" db:"id"`
	DeckId       string `json:"deck_id" db:"deck_id"`
	EngWord      string `json:"eng_word" db:"eng_word" binding:"required"`
	RuWord       string `json:"ru_word" db:"ru_word" binding:"required"`
	Example      string `json:"example" db:"example"`
	Status       string `json:"status" db:"status"`
	CorrectCount int    `json:"correct_count" db:"correct_guess_count"`
}

type UpdateCardStatusInput struct {
	Status       string `json:"status" binding:"required"`
	CardID       string `json:"card_id" binding:"required"`
	CorrectCount int    `json:"correct_count" binding:"required"`
}
