/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */

/**
 * NOTE: THIS IS FOR DIDACTIC PURPOSES ONLY
 * READ THE OFFICIAL DOCUMENTATION TO FULLY UNDERSTANDING ALL THIS CONCEPTS
 */

import { createElement, buildCustomElementConstructor } from "lwc";

import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from 'apollo-boost';
import { setClient } from '@lwce/apollo-client';

const httpLink = new HttpLink({
    //uri: 'https://intern-bff.herokuapp.com/'
    uri:'https://intern-bff.herokuapp.com/'
});


const authLink = new ApolloLink((operation, forward) => {
    // Call the next link in the middleware chain.
    return forward(operation);
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

setClient(new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
}));

// Components to export
import Greeting from "my/greeting";

// Register the components as custom elements
// This function can be removed if the components are not going to be used as custom elements
if(true && typeof customElements !== 'undefined') {
    customElements.define('my-greeting', buildCustomElementConstructor(Greeting));
}

// Register a function to create the components dynamically
// This function can be removed if the components are not going to be created that way
if(true) {
    const delegate = window.createLwcComponent;
    window.createLwcComponent = function createLwcComponent(name) {
        if(name==="my-greeting") {
            return createElement("my-greeting", { is: Greeting });
        }
        return delegate ? delegate(name) : null;
    }
}