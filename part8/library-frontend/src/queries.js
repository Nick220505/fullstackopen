import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
    }
  }
`

export const ALL_BOOKS_AND_GENRES = gql`
  query getAllBooksAndGenres {
    allBooks {
      ...BookDetails
    }
    allGenres
  }
  ${BOOK_DETAILS}
`

export const FILTER_GENRE = gql`
  query findBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_BIRTH_YEAR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
