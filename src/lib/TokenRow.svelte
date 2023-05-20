<script>
    export let row;
    export let index;
</script>

<tr>
    <td>{index + 1}</td>
    <td>{row.amount}</td>
    <td>{row.token.name}</td>
    <td>{row.token_id}</td>
    <td>{row.token.mime_type}</td>
    <td>{row.token.platform}</td>
    <td>{row.fa2_address}</td>
</tr>
