<script>
    import {handleDeselect, handleSelect, handleSelectRange, lastClicked, selected} from "./selected-items";
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
</script>

<tr on:mousedown={handleClick} class={isSelected ? 'bg-swiss-coffee-300 dark:bg-woodsmoke-600' : ''}>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{index + 1}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.amount}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.name}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token_id}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.fa2_address}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.mime_type}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.platform}</td>
</tr>
