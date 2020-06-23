import { LightningElement, track, api, wire } from 'lwc';

import { setClient, getClient } from '@lwce/apollo-client';

import { 
    useQuery, 
    // useMutation
} from '@lwce/apollo-client';

import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from 'apollo-boost';

const httpLink = new HttpLink({
    uri: 'https://swapi.graph.cool/'
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

const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/',
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});

console.log("BEFORE getClient", getClient())
console.log("BEFORE useQuery", useQuery)
setClient(client);
console.log("AFTER getClient", getClient())
console.log("AFTER useQuery", useQuery)

import gql from 'graphql-tag';

const QUERY = gql`
    {
        allFilms {
            title
        }
    }
`

const greetings = [
    'Hello',
    'Bonjour',
    '你好',
    'Hola',
    'Привет',
    'こんにちは',
    'Guten Tag',
    'ጤና ይስጥልኝ',
    'Ciao',
    'नमस्ते',
    '안녕하세요'
];

const SPEED_CLASS_MAP = {
    slow: 'fade-slow',
    fast: 'fade-fast',
    medium: 'fade-medium'
};

const DEFAULT_SPEED = 'medium';

export default class Greeting extends LightningElement {

    @wire(useQuery, {
        query: QUERY,
        lazy: false,
        variables: '$variables',
    }) results;

    get firstResult() {
        console.log(this.results);
        return this.results.loading ? "" : this.results.data.allFilms[0].title;
    }

    @track animationSpeed = DEFAULT_SPEED;
    @track index = 0;
    @track isAnimating = true;

    _message;
    @api
    set speed(value) {
        if (SPEED_CLASS_MAP.hasOwnProperty(value)) {
            this.animationSpeed = value;
        } else {
            this.animationSpeed = DEFAULT_SPEED;
        }
        this.isAnimating = true;
    }

    @api
    get message() {
        return this._message || '';
    }
    set message(message) {
        this._message = message;
    }

    // Return the internal speed property
    get speed() {
        return this.animationSpeed;
    }

    // Get the current greeting
    get greeting() {
        return greetings[this.index];
    }

    // Map slow, medium, fast to CSS Animations
    get animationClass() {
        if (this.isAnimating) {
            return SPEED_CLASS_MAP[this.speed];
        }
        return 'hide';
    }

    //Handle the animation ending, update to next hello
    handleAnimationEnd() {
        this.isAnimating = false;
        this.index = (this.index + 1) % greetings.length;

        setTimeout(() => this.updateGreeting(), 500);
    }

    // Update to the next greeting and start animating
    updateGreeting() {
        this.isAnimating = true;
    }
}