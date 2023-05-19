import {gql} from "graphql-request";
import gqlClient from "./gql-client";

const query = gql`
    query GetTokens($address: String!) {
        holdings(where: {
            holder_address: {_eq: $address},
            amount: {_gt: 0}
        },
            order_by: {last_received_at: desc}
        ) {
            token {
                name
                artifact_uri
                display_uri
                thumbnail_uri
                artist_address
                artist_profile {
                    alias
                }
                mime_type
                platform
                editions
                description
            }
            token_id
            fa2_address
            amount
            last_received_at
        }
    }
`

export interface IHoldings {
    token: {
        name: string
        artifact_uri: string
        display_uri: string
        thumbnail_uri: string
        artist_address: string
        artist_profile: {
            alias: string
        }
        mime_type: string
        platform: string
        editions: number
        description: string
    }
    token_id: number
    fa2_address: string
    amount: number
    last_received_at: string
}

interface IHoldingsResponse {
    holdings: IHoldings
}

export default async function getTokens(address: string): Promise<IHoldingsResponse> {
    return gqlClient.request(query, {address});
}
