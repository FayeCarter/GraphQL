import React, { Component } from 'react';
import { graphql } from "react-apollo";
import  { getAuthorQuery, addBookMutation } from "../queries/queries"

class AddBook extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorID: "",
    }
  }
  
  displayAuthors(){
    var data = this.props.data;
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
    console.log(this.state)
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
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql( getAuthorQuery )( AddBook );
