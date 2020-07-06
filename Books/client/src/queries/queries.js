import {gql} from "apollo-boost";

const getAuthorQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation( $name: String!, $genre: String!, $authorID: ID! ){
    addBook(name: $name, genre: $genre, authorID: $authorID ){
      name
      id
    }
  }

`

export { getAuthorQuery, getBooksQuery, addBookMutation };