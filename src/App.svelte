<script lang="ts">
    import {store, sync, unsync} from "./store";
    import TokenList from "./lib/TokenList.svelte";
    import getOwnedTokens from "./api/get-owned-tokens";
</script>

<main>
    {#if $store}
        <button on:click={unsync}>Unsync</button> {$store.address}
        {#await getOwnedTokens($store.address)}
            <p>Loading…</p>
            {:then tokens}
            <TokenList tokens={tokens}/>
            {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {:else}
        <button on:click={sync}>Sync</button>
    {/if}
</main>
