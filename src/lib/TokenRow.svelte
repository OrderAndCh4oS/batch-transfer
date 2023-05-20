<script>
    export let row;
    export let index;
</script>

<tr>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{index + 1}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.amount}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.name}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token_id}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.mime_type}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.token.platform}</td>
    <td class="px-2 py-1 border-b border-swiss-coffee-900">{row.fa2_address}</td>
</tr>
