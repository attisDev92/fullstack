import { gql } from "@apollo/client";
import { BOOKS_DETAILS } from "./fragments";

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks (genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOKS_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOKS_DETAILS}
`;