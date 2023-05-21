import type {ISelectedToken} from "./selected-items";
import {IUser, tezosToolkit} from "../user";
import {OpKind} from "@taquito/taquito";

export default async function batchTransfer(user: IUser, tokens: ISelectedToken[]) {
    try {
        const contracts = {};
        const transactions = []
        for (const token of tokens) {
            if (!(token.fa2_address in contracts))
                contracts[token.fa2_address] = await tezosToolkit.wallet.at(token.fa2_address)

            transactions.push(({
                kind: OpKind.TRANSACTION,
                ...contracts[token.fa2_address].methods
                    .transfer([
                        {
                            from_: user.address,
                            txs: [
                                {
                                    to_: token.address,
                                    token_id: token.token_id,
                                    amount: token.qty,
                                },
                            ],
                        },
                    ])
                    .toTransferParams({storageLimit: 350}),
            }))
        }

        const batch = await tezosToolkit.wallet.batch(transactions);
        const operation = await batch.send();
        console.log(operation);
        await operation.confirmation(1);
    } catch (e) {
        console.log('Error:', e);
        return false;
    }
    return true;
}
