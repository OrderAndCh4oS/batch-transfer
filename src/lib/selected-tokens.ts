import {writable} from "svelte/store";
import type {IOwnedToken} from "../api/get-owned-tokens";

export const selectedTokens = writable<IOwnedToken[]>([]);
export const selectToken = (token: IOwnedToken) => selectedTokens.update(
    arr => [...arr, token]
)
export const deselectToken = (token: IOwnedToken) => selectedTokens.update(
    arr => arr.filter(t => t.token_id === token.token_id)
)
