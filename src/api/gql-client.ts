import {GraphQLClient} from 'graphql-request';

const endpoint = 'https://api.teztok.com/v1/graphql';

const gqlClient = new GraphQLClient(endpoint);

export default gqlClient;
