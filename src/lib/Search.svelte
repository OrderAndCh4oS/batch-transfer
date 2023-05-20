<script>
    import {term} from "./filtered-items";

    let val = '';

    $: term.set(val);
</script>

<div class="flex gap-2">
    <label for="searchInput">Search</label>
    <input bind:value={val} type="text" id="searchInput" class="w-full border rounded px-2 py-1">
</div>

