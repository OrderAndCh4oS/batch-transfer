<script>
import getHoldings from "../api/get-holdings";
import {store} from "../store";
</script>

<main>
    {#await getHoldings($store.address) then holdings}
        <table>
            <tr>
                <th>Qty</th>
                <th>Title</th>
                <th>Token ID</th>
                <th>Mime Type</th>
                <th>Platform</th>
            </tr>
            {#each holdings.holdings as row}
                <tr>
                    <td>{row.amount}</td>
                    <td>{row.token.name}</td>
                    <td>{row.token_id}</td>
                    <td>{row.token.mime_type}</td>
                    <td>{row.token.platform}</td>
                </tr>
            {/each}
        </table>
    {/await}
</main>
