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
  mutation{
    addBook(name: "", genre: "", authorID: "" ){
      name
      id
    }
  }

`

export { getAuthorQuery, getBooksQuery, addBookMutation };