const CONTRACT_NAME = 'nft1.ok3.testnet';

function getConfig() {
  return {
    GAS: "200000000000000",
    contractMethods: {
      changeMethods: ["drop_transfer"],
    },
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: CONTRACT_NAME,
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org'
  };
}

module.exports = getConfig;
