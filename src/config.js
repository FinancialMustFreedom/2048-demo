const CONTRACT_NAME = 'dev-1628830125182-30730573456265';

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
