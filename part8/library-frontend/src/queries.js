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

export const ALL_BOOKS_AND_GENRES = gql`
  query getAllBooksAndGenres {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
    allGenres
  }
`

export const FILTER_GENRE = gql`
  query findBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
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
