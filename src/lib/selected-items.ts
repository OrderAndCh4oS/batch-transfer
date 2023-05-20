import {writable} from 'svelte/store';
import type {IOwnedToken} from "../api/get-owned-tokens";

interface ISelectedToken extends IOwnedToken {
    qty: number,
    address: string
}

const matchToken = (a: IOwnedToken, b: IOwnedToken) => a.fa2_address === b.fa2_address && a.token_id === b.token_id

export const lastClicked = writable<IOwnedToken | null>(null);
export const selected = writable<ISelectedToken[]>([]);

export const handleSelect = (token: IOwnedToken) => {
    selected.update(selected => [...selected, {...token, qty: 1, address: ''}])
}

export const handleSelectQty = (token: IOwnedToken, qty: number) => {
    handleDeselect(token)
    const arr: ISelectedToken[] = new Array(qty).fill({...token, qty: 1, address: ''})
    selected.update(selected => [...selected, ...arr])
}
export const handleDeselect = (token: IOwnedToken) => {
    selected.update(selected => selected.filter(s => !(matchToken(s, token))))
}
export const handleSelectRange = (filteredTokens: IOwnedToken[], from: IOwnedToken, to: IOwnedToken) => {
    let fromIndex = filteredTokens.findIndex(ft => matchToken(ft, from))
    let toIndex = filteredTokens.findIndex(ft => matchToken(ft, to))
    if (toIndex < fromIndex) [fromIndex, toIndex] = [toIndex, fromIndex]
    const selectedTokens = filteredTokens.slice(fromIndex, toIndex + 1);
    selected.update(selected => {
        for (const token of selectedTokens) {
            if (!selected.find(s => matchToken(s, token))) {
                selected.push({...token, qty: 1, address: ''})
            }
        }
        return [...selected]
    })
}
export const handleClearSelection = () => {
    selected.set([])
}
