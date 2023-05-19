<script lang="ts">
    import {store, sync, unsync} from "./store";
</script>

<main>
    {#if $store}
        <button on:click={unsync}>Unsync</button>
    {:else}
        <button on:click={sync}>Sync</button>
    {/if}
    {$store?.address ?? 'n/a'}
    {#if $store}
        <table>
            <tr>
                <th>Qty</th>
                <th>Title</th>
                <th>Token ID</th>
                <th>Mime Type</th>
                <th>Platform</th>
            </tr>
            {#each $store.holdings as row}
                <tr>
                    <td>{row.amount}</td>
                    <td>{row.token.name}</td>
                    <td>{row.token_id}</td>
                    <td>{row.token.mime_type}</td>
                    <td>{row.token.platform}</td>
                </tr>
            {/each}
        </table>
    {/if}
</main>

<style>
</style>
