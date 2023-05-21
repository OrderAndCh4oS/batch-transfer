<script lang="ts">
    import {sync, unsync, user} from "./user";
    import Tabs from "./lib/Tabs.svelte";
    import Footer from "./lib/Footer.svelte";
</script>

<main class="p-8">
    {#if $user}
        <div class="mb-8">
            <button on:click={unsync}>Unsync</button> {$user.address}
        </div>
        <Tabs/>
    {:else}
        <button on:click={sync}>Sync</button>
    {/if}
</main>
<Footer/>
