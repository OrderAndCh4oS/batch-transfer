<script>
    import TokenRow from "./TokenRow.svelte";
    import {filtered, items} from "./filtered-items";
    import Search from "./Search.svelte";
    export let tokens;
    items.set(tokens.holdings);
</script>

<div>
    <Search/>
    <table>
        <tr>
            <th>No.</th>
            <th>Qty</th>
            <th>Title</th>
            <th>Token ID</th>
            <th>Mime Type</th>
            <th>Platform</th>
            <th>Contract</th>
        </tr>
        {#each $filtered as row, i}
            <TokenRow row={row} index={i}/>
        {/each}
    </table>
</div>
