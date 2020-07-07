export const resolvers = {
  Query: {
    articleBySource: (_, { id, source }, context) => {
      console.log("context", context)
    }
  }
}