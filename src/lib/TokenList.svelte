<script>
    import TokenRow from "./TokenRow.svelte";
    import {filtered, items} from "./filtered-items";
    import Search from "./Search.svelte";
    export let tokens;
    items.set(tokens.holdings);
</script>

<div>
    <div class="mb-4">
        <Search/>
    </div>
    <table class="w-full">
        <tr class="border-b-2 text-left">
            <th class="pb-2 px-2">No.</th>
            <th class="pb-2 px-2">Qty</th>
            <th class="pb-2 px-2">Title</th>
            <th class="pb-2 px-2">Token ID</th>
            <th class="pb-2 px-2">Mime Type</th>
            <th class="pb-2 px-2">Platform</th>
            <th class="pb-2 px-2">Contract</th>
        </tr>
        {#each $filtered as row, i}
            <TokenRow row={row} index={i}/>
        {/each}
    </table>
</div>
