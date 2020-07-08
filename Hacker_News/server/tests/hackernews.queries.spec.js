import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import { HackerNewsAPI } from "../datasources/hackernews";
import { resolvers } from '../resolvers';
import { typeDefs } from '../typedefs';
import { getArticlePreReducerStub } from '../fixtures/hackernews';

const GET_ARTICLE_BY_ID_AND_SOURCE = gql`
  query getArticleByIdAndSource($id: ID!, $source: String!) {
    articleBySource(id: $id!, source: $source) {
      id
      title
      author
      url
      time
      source
    }
  }
`;

const GET_ARTICLES_BY_SOURCE = gql`
  query getArticlesBySource($id: ID!, $source: String!) {
    articleBySource(ids: $ids!, source: $source) {
      id
      title
      author
      url
      time
      source
    }
  }
`;

const GET_ALL_ARTICLES = gql`
  query getAllArticles {
    allArticles() {
      id
      title
      author
      url
      time
      source
    }
  }
`;

