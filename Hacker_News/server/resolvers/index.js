export const resolvers = {
  Query: {
    articleBySource: (_, { id, source }, { dataSources }) =>
      dataSources[source].getArticle(id, source),

    articlesBySource: (_, { ids, source }, { dataSources }) =>
      dataSources[source].getArticleByIds(ids),
  }
}