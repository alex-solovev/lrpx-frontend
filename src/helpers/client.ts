import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { Query, Mutation } from 'generated/graphqlTypes';

export type GraphQLResult = {
  data: Mutation & Query;
};

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.GRAPHQL_URL,
    credentials: 'include',
  }),
});
