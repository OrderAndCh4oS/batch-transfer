<script lang="ts">
import getOwnedTokens from "../api/get-owned-tokens";
import {user} from "../user";
import TokenList from "./TokenList.svelte";
</script>

<div>
    {#await getOwnedTokens($user.address)}
        <p>Loading…</p>
    {:then tokens}
        <TokenList tokens={tokens}/>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>
