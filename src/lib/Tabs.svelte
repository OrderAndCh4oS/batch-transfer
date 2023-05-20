<script>
import SelectTokens from "./SelectTokens.svelte";
import TransferTokens from "./TransferTokens.svelte";

let currentTab = 'select'

const handleTabChange = (tab) => () => {
    currentTab = tab;
}

</script>

<div>
    <div class="mb-4 flex gap-1">
        <button
                on:click={handleTabChange('select')}
                class={`border border-b-0 rounded-t p-2 ${currentTab === 'select' ? ' border-swiss-coffee-200' : 'border-swiss-coffee-900'}`}
        >Select</button>
        <button
                on:click={handleTabChange('transfer')}
                class={`border border-b-0 rounded-t p-2 ${currentTab === 'transfer' ? ' border-swiss-coffee-200' : 'border-swiss-coffee-900'}`}
        >Transfer</button>
    </div>
    {#if currentTab === 'select'}
        <SelectTokens/>
    {:else if currentTab === 'transfer'}
        <TransferTokens/>
    {/if}

</div>
