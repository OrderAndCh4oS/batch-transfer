<script>
    import {term} from "./filtered-items";

    let val = '';

    $: term.set(val);
</script>

<div class="flex gap-2 items-center w-1/2">
    <label for="searchInput">Search</label>
    <input
        bind:value={val} type="text" id="searchInput"
        class="bg-swiss-coffee-50 border border-woodsmoke-300 text-woodsmoke rounded-lg focus:ring-swiss-coffee-500 focus:border-swiss-coffee-500 block w-full p-2.5 dark:bg-woodsmoke-700 dark:border-woodsmoke-600 dark:placeholder-woodsmoke-400 dark:text-swiss-coffee dark:focus:ring-swiss-coffee-500 dark:focus:border-swiss-coffee-500 focus:outline-none"
    >
</div>

