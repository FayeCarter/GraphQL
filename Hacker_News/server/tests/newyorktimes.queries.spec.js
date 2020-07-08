import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import { NewYorkTimesAPI } from "../datasources/newyorktimes";
import { resolvers } from '../resolvers';
import { typeDefs } from '../typedefs';
import { getArticlePreReducerStub } from '../fixtures/newyorltimes';

const GET_ALL_ARTICLES_BY_SOURCE = gql`
  query getArticlesBySource($source: String!) {
    allArticlesBySource(source: $source) {
      id
      title
      author
      url
      time
      source
    }
  }
`;

const constructTestServer = () => {
  const newYorkTimesAPI = new NewYorkTimesAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      newyorktimes: newYorkTimesAPI
    })
  });

  return { server, newYorkTimesAPI };
}

describe('[Queries.NewYorkTimesAPI]', () => {
  it('fetches an array of articles from the NewYorkTimes API', async () => {
    const { server, newYorkTimesAPI } = constructTestServer();

    newYorkTimesAPI.get = jest.fn(() => ({
      results: [getArticlePreReducerStub],
    }));

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_ALL_ARTICLES_BY_SOURCE,
      variables: { ids: [21168364], source: 'newyorktimes' },
    });

    expect(response).toMatchSnapshot();
  });
});