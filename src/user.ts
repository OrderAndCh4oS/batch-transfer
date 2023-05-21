import {writable} from "svelte/store";
import {TezosToolkit} from "@taquito/taquito";
import {BeaconWallet} from "@taquito/beacon-wallet";
import {NetworkType} from "@airgap/beacon-sdk";

export const tezosToolkit = new TezosToolkit('https://mainnet.api.tez.ie');

export const wallet = new BeaconWallet({
    name: 'Order & Chaos Tools v2',
    preferredNetwork: NetworkType.MAINNET
});

export const network = {
    type: NetworkType.MAINNET,
    rpcUrl: 'https://mainnet.api.tez.ie'
};
tezosToolkit.setWalletProvider(wallet);

export interface IUser {
    address: string
}


export const user = writable<IUser | null>(null);
wallet.getPKH().then(address => {
    user.set({address})
})

export const sync = async () => {
    await wallet.requestPermissions({network});
    const address = await wallet.getPKH();
    user.set({address});
};

export const unsync = async () => {
    await wallet.client.clearActiveAccount();
    user.set(null);
};
