package cards

type Card struct {
	ID      string `json:"id" db:"card_id"`
	DeckId  string `json:"deck_id" db:"id"`
	EngWord string `json:"engWord" db:"eng_word"`
	RuWord  string `json:"ruWord" db:"ru_word"`
	Example string `json:"cardExmaple" db:"card_example"`
	Status  string `json:"status" db:"status"`
}
