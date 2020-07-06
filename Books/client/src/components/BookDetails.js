import React, { Component } from 'react';
import { graphql } from "react-apollo";
import  { getBookQuery } from "../queries/queries"

class BookDetails extends Component {
  render() {
    const displayBookDetails = () => {
      const { book } = this.props.data;
      if ( book ) {
        return(
          <div>
            <h2>Title: { book.name }</h2>
            <p>Genre: { book.genre }</p>
            <p>Author: { book.author.name }</p>
            <p>More from { book.author.name }: </p>
            <ul className="other-books">
              {
                book.author.books.map( item => {
                  return (
                    <li key={ item.id }>{ item.name }</li>
                  )
                })
              }
            </ul>
          </div>
        )
      } else {
        return (
          <div>Select a book for details</div>
        )
      }
    };

    return (
      <div id="book-details">
        { displayBookDetails() }
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookID
      }
    }
  }
})(BookDetails)
