<script lang="ts">
    import {store, sync, unsync} from "./store";
    import TokenList from "./lib/TokenList.svelte";
</script>

<main>
    {#if $store}
        <button on:click={unsync}>Unsync</button> {$store.address}
        <TokenList/>
    {:else}
        <button on:click={sync}>Sync</button>
    {/if}
</main>
