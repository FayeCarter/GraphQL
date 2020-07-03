const graphql = require("graphql");
const _ = require("lodash");

const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLInt,
  GraphQLSchema 
} = graphql;

var books = [
  { name: "Book 1", genre: "The good type", id: "1", authorID: "1" },
  { name: "Book 2", genre: "The average type", id: "2", authorID: "2"  },
  { name: "Book 3", genre: "The bad type", id: "3", authorID: "3"  },
  { name: "Book 4", genre: "The wonderful type", id: "1", authorID: "2" },
  { name: "Book 5", genre: "The bad type", id: "2", authorID: "3"  },
  { name: "Book 6", genre: "The goof type", id: "3", authorID: "3"  }
]

var authors = [
  { name: "Barbra", age: 50, id: "1" },
  { name: "Jim", age: 60, id: "2" },
  { name: "Bruce", age: 70, id: "3" }
]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, { id: parent.authorID });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args){
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args){
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
