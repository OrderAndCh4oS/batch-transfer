<script>
    import {deselectTokenByIndex, selected} from "./selected-items";
    import batchTransfer from "./batch-transfer";
    import {user} from "../user";
    import {writable} from "svelte/store";

    let addresses = writable([])

    const handleSend = async () => {
        await batchTransfer($user, $selected)
        selected.set([])
        addresses.set(null)
    };

    let address = ''
    const handleSetAddress = () => {
        selected.update(selected => selected.map(s => ({...s, address})))
    }

    let files, input;

    $: if (files) {
        for (const file of files) {
            file.text().then(text => {
                const lines = text
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line);
                addresses.set(lines)
            })
        }
    }

    function shuffle(arr) {
        let randomizedArray = [];
        let array = [...arr];
        while(array.length !== 0) {
            let rIndex = Math.floor(array.length * Math.random());
            randomizedArray.push(array[rIndex]);
            array.splice(rIndex, 1);
        }
        return randomizedArray;
    }

    const handleSetAddresses = (addresses) => () => {
        selected.update(selected => selected.map((s, i) => ({...s, address: i < addresses.length ? addresses[i] : ''})))
    }

    const handleRandomiseAddresses = (addresses) => () => {
        const shuffledAddresses = shuffle(addresses);
        selected.update(selected => selected.map((s, i) => ({...s, address: i < shuffledAddresses.length ? shuffledAddresses[i] : ''})))
    }

    const handleClearAddresses = () => {
        input.value = ''
        addresses.set(null)
        selected.update(selected => selected.map((s, i) => ({...s, qty: 1, address: ''})))
    }
</script>

<div>
    {#if $selected.length}
        <div>
            <div class="flex gap-2 items-center w-full mb-4">
                <input
                    bind:value={address} type="text" id="addressInput"
                    placeholder="Enter Address"
                    class="w-1/2 bg-swiss-coffee-50 border border-woodsmoke-300 text-woodsmoke rounded-lg focus:ring-swiss-coffee-500 focus:border-swiss-coffee-500 block p-2.5 dark:bg-woodsmoke-700 dark:border-woodsmoke-600 dark:placeholder-woodsmoke-400 dark:text-swiss-coffee dark:focus:ring-swiss-coffee-500 dark:focus:border-swiss-coffee-500 focus:outline-none"
                >
                <button on:click={handleSetAddress} class="px-2 py-2.5 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Set&nbsp;Address</button>
                <div class="ml-auto">
                    <input
                            class="relative block w-full min-w-0 flex-auto rounded border border-solid border-woodsmoke-300 dark:border-swiss-coffee-900 hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 bg-clip-padding px-3 py-2.5 text-base text-woodsmoke file:-mx-3 file:-my-2.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-transparent file:px-3 file:py-2.5 file:text-woodsmoke file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-transparent focus:border-swiss-coffee focus:text-swiss-coffee-700 focus:shadow-te-swiss-coffee focus:outline-none dark:text-swiss-coffee-200 dark:file:text-swiss-coffee dark:focus:border-swiss-coffee"
                            id="file_input"
                            type="file"
                            bind:files
                            bind:this={input}
                    />
                </div>
                <button title="Set addresses in the order provided in the list" on:click={handleSetAddresses($addresses)} class="px-2 py-2.5 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Set</button>
                <button title="Randomise the addresses provided before setting them" on:click={handleRandomiseAddresses($addresses)} class="px-2 py-2.5 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Random</button>
                <button title="Reset everything" on:click={handleClearAddresses} class="px-2 py-2.5 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Reset</button>
            </div>
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
            <button on:click={handleSend} class="px-2 py-2.5 border rounded border-woodsmoke hover:dark:border-swiss-coffee-200 hover:border-woodsmoke-100 dark:border-swiss-coffee-900">Send Tokens</button>
        </div>
    {:else}
        <p>No tokens selected, select some tokens to transfer</p>
    {/if}
</div>
