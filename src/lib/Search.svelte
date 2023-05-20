<script>
    import {term} from "./filtered-items";

    let val = '';

    $: term.set(val);
</script>

<label for="searchInput">Search</label>
<input bind:value={val} type="text" id="searchInput">
