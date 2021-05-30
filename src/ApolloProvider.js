import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import { ApolloProvider, split, InMemoryCache } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

let httpLink = createHttpLink({
    uri: "https://gowes-community-server.herokuapp.com/"
})

const authLink = setContext(() => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: token ?
                `Bearer ${token}` : ''
        }
    }
})

httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
    uri: "wss://gowes-community-server.herokuapp.com/graphql",
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    },
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)