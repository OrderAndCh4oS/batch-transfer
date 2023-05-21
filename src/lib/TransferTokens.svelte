<script>
    import {deselectTokenByIndex, selected} from "./selected-items";
    import batchTransfer from "./batch-transfer";
    import {user} from "../user";

    const handleSend = async () => {
        console.log($selected);
        await batchTransfer($user, $selected)
        selected.set([])
    };
</script>

<div>
    {#if $selected.length}
        <div>
            <table class="w-full mb-4">
                <thead>
                <tr class="border-b-2 border-swiss-coffee-900 text-left">
                    <th class="pb-2 px-2">No.</th>
                    <th class="pb-2 px-2">Owned</th>
                    <th class="pb-2 px-2">Title</th>
                    <th class="pb-2 px-2">Qty</th>
                    <th class="pb-2 px-2">Address</th>
                    <th class="pb-2 px-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {#each $selected as row, i}
                    <tr class="border-b-2 border-swiss-coffee-900 text-left">
                        <td class="pb-2 px-2">{i + 1}</td>
                        <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.amount}</td>
                        <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.name}</td>
                        <td class="px-2 py-1 border-b border-swiss-coffee-900">
                            <input
                                    bind:value={row.qty}
                                    type="number"
                                    class="bg-swiss-coffee-50 border border-woodsmoke-300 text-woodsmoke rounded-lg focus:ring-swiss-coffee-500 focus:border-swiss-coffee-500 block w-full px-2 py-1 dark:bg-woodsmoke-700 dark:border-woodsmoke-600 dark:placeholder-woodsmoke-400 dark:text-swiss-coffee dark:focus:ring-swiss-coffee-500 dark:focus:border-swiss-coffee-500 focus:outline-none"
                            />
                        </td>
                        <td class="px-2 py-1 border-b border-swiss-coffee-900">
                            <input
                                    bind:value={row.address}
                                    class="bg-swiss-coffee-50 border border-woodsmoke-300 text-woodsmoke rounded-lg focus:ring-swiss-coffee-500 focus:border-swiss-coffee-500 block w-full px-2 py-1 dark:bg-woodsmoke-700 dark:border-woodsmoke-600 dark:placeholder-woodsmoke-400 dark:text-swiss-coffee dark:focus:ring-swiss-coffee-500 dark:focus:border-swiss-coffee-500 focus:outline-none"
                            />
                        </td>
                        <td>
                            <button on:click={deselectTokenByIndex(i)} class="px-2 py-1 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Remove</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
            <button on:click={handleSend} class="px-2 py-1 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Send</button>
        </div>
    {:else}
        <p>No tokens selected, select some tokens to transfer</p>
    {/if}
</div>
