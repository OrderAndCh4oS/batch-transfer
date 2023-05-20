import { writable, derived } from 'svelte/store';
import type {IOwnedToken} from "../api/get-owned-tokens";

const matchToken = (a: IOwnedToken, b: IOwnedToken) => a.fa2_address === b.fa2_address && a.token_id === b.token_id

export const lastClicked = writable(null);
export const selected = writable([]);
export const handleSelect = (token: IOwnedToken) => {
    selected.update(selected => [...selected, token])
}
export const handleDeselect = (token: IOwnedToken) =>  {
    selected.update(selected => selected.filter(s => !(matchToken(s, token))))
}
export const handleSelectRange = (filteredTokens: IOwnedToken[], from: IOwnedToken, to: IOwnedToken) => {
    let fromIndex = filteredTokens.findIndex(ft => matchToken(ft, from))
    let toIndex = filteredTokens.findIndex(ft => matchToken(ft, to))
    if(toIndex < fromIndex) [fromIndex, toIndex] = [toIndex, fromIndex]
    const selectedTokens = filteredTokens.slice(fromIndex, toIndex + 1);
    selected.update(selected => {
        for (const token of selectedTokens) {
            if(!selected.find(s => matchToken(s, token))) {
                selected.push(token)
            }
        }
        return [...selected]
    })
}

export const handleClearSelection = () => {selected.set([])}
