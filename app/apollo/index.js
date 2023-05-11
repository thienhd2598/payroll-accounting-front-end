import {
    ApolloClient,
    HttpLink,
    from,
    split,
    InMemoryCache,
    fromPromise,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { RetryLink } from "@apollo/client/link/retry";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { asyncAuthLink, accountHeaders } from "./AccountsLink";

import { onError } from "@apollo/client/link/error";
import ws from "ws";

const retryLink = new RetryLink();

const httpLink = new HttpLink({
    uri: process.env.URL_API,
    credentials: 'same-origin',
});
console.log('process.env.URL_API', process.env.URL_API)

const subscriptionClient = new SubscriptionClient(
    process.env.URL_WSS,
    {
        reconnect: true,
        lazy: true,
        connectionParams: accountHeaders,
    }
);

const wsLink = new WebSocketLink(subscriptionClient);

const link = from([
    asyncAuthLink,
    retryLink,
    split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink,
    ),
]);

const cache = new InMemoryCache();


const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    console.log('graphQLErrors, networkError', graphQLErrors, networkError)
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            console.log(
                `[GraphQL error]: Message: ${err.message}`,
                err
            );
            // if (err.message == 'Authentication hook unauthorized this request') {
            //     return fromPromise(
            //         new Promise(async (resolve) => {
            //             let cout = 0;
            //             let _interval = setInterval(async () => {
            //                 // if (!!auth.currentUser) {
            //                 //     clearInterval(_interval)
            //                 //     try {
            //                 //         let token = await auth.currentUser.getIdToken(true)
            //                 //         resolve(token)
            //                 //     } catch (error) {
            //                 //         resolve(null)
            //                 //     }
            //                 // }

            //                 cout++;
            //                 if (cout >= 5) {
            //                     clearInterval(_interval)
            //                     resolve(null)
            //                 }
            //             }, 1000);

            //         })
            //             .then(token => {
            //                 console.log('res.data.refreshToken.jwt', token)
            //                 if (!!token) {
            //                     localStorage.setItem('jwt', token)
            //                     return token
            //                 }
            //                 window.localStorage.removeItem('jwt')
            //                 return null;
            //             })
            //             .catch(e => {
            //                 window.localStorage.removeItem('jwt')
            //                 return null
            //             })
            //     )
            //         .filter(value => {
            //             console.log('value', value)
            //             return !!value
            //         })
            //         .flatMap(() => {
            //             console.log('forward')
            //             // retry the request, returning the new observable
            //             return forward(operation);
            //         })
            // }
        };
    }
});


const client = new ApolloClient({
    link: errorLink.concat(link),
    cache,
    // defaulstOptions: { mutate: { errorPolicy: "all" } },        
});

export const clientSubcriptions = new ApolloClient({
    link: errorLink.concat(from([
        asyncAuthLink,
        wsLink
    ])),
    cache,
});

export function createApolloClient() {
    return new ApolloClient({
        link: errorLink.concat(link),
        cache,
    });
}

export default client;
