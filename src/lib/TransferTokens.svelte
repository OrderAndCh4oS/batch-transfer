<script>
import {selected} from "./selected-items";
</script>

<div>
    {#if !$selected.length}
        <p>No tokens selected, select some tokens to transfer</p>
    {:else}
        <p>TODO</p>
    {/if}
</div>
