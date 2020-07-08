export const resolvers = {
  Query: {
    articleBySource: (_, { id, source }, { dataSources }) =>
      dataSources[source].getArticle(id, source),
  }
}