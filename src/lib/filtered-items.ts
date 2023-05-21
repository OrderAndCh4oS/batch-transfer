import { writable, derived } from 'svelte/store';

export const term = writable('');
export const items = writable([]);
export const filtered = derived(
    [term, items],
    ([$term, $items]) => $items.filter(item => {
        const search = $term.toLowerCase();
        return (
            item.token.name.toLowerCase().includes(search) ||
            item.token.platform?.toLowerCase().includes(search) ||
            item.fa2_address?.toLowerCase().includes(search) ||
            item.token.artist_address?.toLowerCase().includes(search) ||
            item.token.artist_profile?.alias?.toLowerCase().includes(search) ||
            item.token_id.includes(search)
        );
    })
);
