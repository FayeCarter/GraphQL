const graphql = require("graphql");
const _ = require("lodash");

const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLSchema 
} = graphql;

var books = [
  { name: "Book 1", genre: "The good type", id: "1" },
  { name: "Book 2", genre: "The average type", id: "2" },
  { name: "Book 3", genre: "The bad type", id: "3" }
]

var authors = [
  { name: "Barbra", age: "The good type", id: "1" },
  { name: "Jim", age: "The average type", id: "2" },
  { name: "Bruce", age: "The bad type", id: "3" }
]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
