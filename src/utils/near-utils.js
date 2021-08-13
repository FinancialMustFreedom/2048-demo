import getConfig from "../config";
import * as nearAPI from 'near-api-js';

export const {
    GAS,
    networkId,
    nodeUrl,
    walletUrl,
    contractMethods,
    contractName
} = getConfig();

const {
    Account,
    Contract,
} = nearAPI;

export function getContract(account) {
    return new Contract(account, contractName, { ...contractMethods });
};

export const getWallet = async () => {
    const near = await nearAPI.connect({
        networkId, nodeUrl, walletUrl, deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
    });
    const wallet = new nearAPI.WalletAccount(near);
    return { near, wallet };
};

export const postJson = async ({ url, data = {} }) => {
    console.log("------> post json, url: ", url)
    return await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ ...data })
    }).then((res) => {
        console.log(" post json result: ", res);
        return res.json();
    });
};

export const getSignature = async (account, key) => {
    const { accountId } = account;
    const block = await account.connection.provider.block({ finality: 'final' });
    const blockNumber = block.header.height.toString();
    const signer = account.inMemorySigner || account.connection.signer;
    const signed = await signer.signMessage(Buffer.from(blockNumber), accountId, networkId);
    const blockNumberSignature = Buffer.from(signed.signature).toString('base64');
    return { blockNumber, blockNumberSignature };
};

export const postSignedJson = async ({ account, contractName, url, data = {} }) => {
    return await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            ...data,
            accountId: account.accountId,
            contractName,
            ...(await getSignature(account))
        })
    }).then((res) => res.json());
};

export const createAccessKeyAccount = (near, key) => {
    key.toString = () => key.secretKey;
    near.connection.signer.keyStore.setKey(networkId, contractName, key);
    const account = new Account(near.connection, contractName);
    return account;
};