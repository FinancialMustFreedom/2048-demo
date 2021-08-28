import getConfig from '../config';
import * as nearAPI from 'near-api-js';
export const {
    networkId,
    nodeUrl,
    walletUrl,
    contractName
} = getConfig();

export const loadItems = async (accountId)=>{
    let tokens = []
    console.log("contractName",contractName)
    let near = await nearAPI.connect({
        networkId, nodeUrl, walletUrl, deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
    });
    let  contractAccount =  await near.account(accountId);
    //viewFunction 调用合约view方法
        tokens = await contractAccount.viewFunction(contractName, 'nft_tokens_for_owner', {
            account_id: accountId,
            from_index: '0',
            limit: 50
        });
    console.log(`\nget user  Account ID:\n${accountId}\n nft tokens  at ${tokens}`);
    return tokens
}
// export function loadItems(accountId){
//     let tokens = []
//     let near = await nearAPI.connect({
//         networkId, nodeUrl, walletUrl, deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
//     });
//     let  contractAccount =  await near.account(accountId);
//     //viewFunction 调用合约view方法
//         tokens =  contractAccount.viewFunction(contractName, 'nft_tokens_for_owner', {
//             account_id: accountId,
//             from_index: '0',
//             limit: 50
//         });
//     console.log(`\nget user  Account ID:\n${accountId}\n nft tokens  at ${tokens}`);
//     return tokens 
// }
