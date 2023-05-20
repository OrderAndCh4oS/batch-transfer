import {writable} from "svelte/store";
import {TezosToolkit} from "@taquito/taquito";
import {BeaconWallet} from "@taquito/beacon-wallet";
import {AccountInfo, NetworkType} from "@airgap/beacon-sdk";

export const tezosToolkit = new TezosToolkit('https://mainnet.api.tez.ie');

const wallet = new BeaconWallet({
    name: 'Order & Chaos Tools v2',
    preferredNetwork: NetworkType.MAINNET
});

export const network = {
    type: NetworkType.MAINNET,
    rpcUrl: 'https://mainnet.api.tez.ie'
};
tezosToolkit.setWalletProvider(wallet);

interface IUser {
    address: string
    wallet: BeaconWallet
    account: AccountInfo
}

// const storedTheme = localStorage.getItem("user");
// export const user = writable<IUser | null>(storedTheme ? JSON.parse(storedTheme) : null);
// user.subscribe(value => {
//     localStorage.setItem("user", JSON.stringify(value));
// });

export const user = writable<IUser | null>(null);

export const sync = async () => {
    await wallet.requestPermissions({network});
    const account = await wallet.client.getActiveAccount();
    const address = await wallet.getPKH();
    user.set({
        address,
        account,
        wallet,
    });
};

export const unsync = async () => {
    await wallet.client.clearActiveAccount();
    user.set(null);
};
