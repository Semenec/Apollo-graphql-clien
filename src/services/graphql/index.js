import { ApolloClient, HttpLink, ApolloLink } from "apollo-client-preset";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

const API_URI = "http://localhost:8080/graphql";

export const GRAPHQL = "GRAPHQL";
export const REQUEST_EFFECT = "_REQUEST";
export const SUCCESS_EFFECT = "_SUCCESS";
export const FAIL_EFFECT = "_FAIL";
export const RESET_ERROR = "RESET_ERROR";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
});

const link = ApolloLink.from([errorLink, new HttpLink({ uri: API_URI })]);

export const client = new ApolloClient({ link, cache: new InMemoryCache() });
