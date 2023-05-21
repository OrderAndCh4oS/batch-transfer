<script>
    import {
        handleDeselect,
        handleSelect,
        handleSelectQty,
        handleSelectRange,
        lastClicked,
        selected
    } from "./selected-items";
    import {filtered} from "./filtered-items";

    export let row;
    export let index;

    $: isSelected = $selected.find(s => s.fa2_address === row.fa2_address && s.token_id === row.token_id);

    const handleClick = (e) => {
        if ($lastClicked && e.shiftKey) {
            document.getSelection().removeAllRanges();
            handleSelectRange($filtered, $lastClicked, row);
        } else {
            isSelected ? handleDeselect(row) : handleSelect(row);
        }
        lastClicked.set(row);
    }

    let qty = 1;
    const handleAddMany = () => {
        handleSelectQty(row, Math.min(qty, row.amount));
    };

    const trimAddress = (address) => address.slice(0, 5) + '…' + address.slice(-5)
</script>

<tr on:mousedown={handleClick} class={`hover:bg-swiss-coffee-500 hover:dark:bg-woodsmoke-400 active:bg-swiss-coffee-300 active:dark:bg-woodsmoke-600 ${isSelected ? 'bg-swiss-coffee-300 dark:bg-woodsmoke-600' : ''}`}>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{index + 1}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.amount}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.name}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token_id}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.artist_profile?.alias ?? trimAddress(row.token.artist_address)}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{trimAddress(row.fa2_address)}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.mime_type}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.platform}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">
        {#if row.amount > 1}
            <div class="flex gap-1 w-[150px]">
                <input
                        on:mousedown={(e) => e.stopPropagation()}
                        bind:value={qty}
                        type="number"
                        class="text-xs bg-swiss-coffee-50 border border-woodsmoke-300 text-woodsmoke rounded-lg focus:ring-swiss-coffee-500 focus:border-swiss-coffee-500 block w-full px-2 py-1 dark:bg-woodsmoke-700 dark:border-woodsmoke-600 dark:placeholder-woodsmoke-400 dark:text-swiss-coffee dark:focus:ring-swiss-coffee-500 dark:focus:border-swiss-coffee-500 focus:outline-none"
                />
                <button on:click={handleAddMany} on:mousedown={(e) => e.stopPropagation()} class="px-2 py-1 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Add</button>
            </div>
        {/if}
    </td>
</tr>
