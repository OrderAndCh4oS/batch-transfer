<script lang="ts">
    import {user, sync, unsync} from "./user";
    import TokenList from "./lib/TokenList.svelte";
    import getOwnedTokens from "./api/get-owned-tokens";
</script>

<main>
    {#if $user}
        <button on:click={unsync}>Unsync</button> {$user.address}
        {#await getOwnedTokens($user.address)}
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
