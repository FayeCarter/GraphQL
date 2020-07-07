import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    articleBySource(id: ID!, source: String!): Article
  }

  type Article {
    id: ID!
    title: String
    author: String
    rel: String
    time: String
    source String
  }
`;