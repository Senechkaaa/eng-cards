import { CardSortFieldOptions } from "../consts/cardStatusOptions"

export interface CardsPageActionsSchema {
    isVisible: boolean
    search: string
    sort: CardSortFieldOptions
}