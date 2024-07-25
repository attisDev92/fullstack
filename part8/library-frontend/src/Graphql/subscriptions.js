import { gql } from "@apollo/client"
import { BOOKS_DETAILS } from "./fragments"

export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      ...bookDetails
    }
  }
  ${BOOKS_DETAILS}
`

