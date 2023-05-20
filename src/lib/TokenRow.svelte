<script>
    export let row;
    export let index;
</script>

<tr>
    <td class="px-2 py-1 border-b">{index + 1}</td>
    <td class="px-2 py-1 border-b">{row.amount}</td>
    <td class="px-2 py-1 border-b">{row.token.name}</td>
    <td class="px-2 py-1 border-b">{row.token_id}</td>
    <td class="px-2 py-1 border-b">{row.token.mime_type}</td>
    <td class="px-2 py-1 border-b">{row.token.platform}</td>
    <td class="px-2 py-1 border-b">{row.fa2_address}</td>
</tr>
