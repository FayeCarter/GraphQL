import React, { Component } from 'react';
import { graphql } from "react-apollo";
import * as compose from 'lodash.flowright';
import  { getAuthorQuery, addBookMutation, getBooksQuery } from "../queries/queries"

class AddBook extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorID: "",
    }
  }
  
  displayAuthors(){
    var data = this.props.getAuthorQuery;
    if ( data.loading ) {
      return (<option disabled>Loading Authors</option>)
    } else {
      return data.authors.map( author => {
        return(
          <option key={ author.id } value={ author.id }>{ author.name }</option>
        )
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorID: this.state.authorID
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.resetForm(e);
  }

  resetForm(e) {
    e.target.reset()
    this.setState = {
      name: "",
      genre: "",
      authorID: "",
    }
  }

  render() {
    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>BookName:</label>
          <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorID: e.target.value })} >
            <option>Select Author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)( AddBook );
