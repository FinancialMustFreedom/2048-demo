import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import { moveLeft } from "./actions/boardActions";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./components/store";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import getConfig from './config';
import * as nearAPI from 'near-api-js';
import { generateSeedPhrase } from 'near-seed-phrase';
import { KeyPair, PublicKey } from "near-api-js/lib/utils";
import { createAccessKeyAccount, postJson, postSignedJson } from "./utils/near-utils";
import { set } from "./utils/storage";

const LOCAL_KEYS = '__LOCAL_KEYS';

// Initializing contract
async function initContract() {
  const nearConfig = getConfig();

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    },
    ...nearConfig
  });


  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);
  const amount = nearAPI.utils.format.parseNearAmount('0.5');
  // let senderAccount = await near.account(walletConnection.account());
  let senderAccount = walletConnection.account();

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      account: walletConnection.account(),
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
      senderAccount: senderAccount,
      amount: amount,
    };
  }

  const getNewAccessKey = async () => {
    const keyPair = KeyPair.fromRandom('ed25519');
    console.log('------? new access key: ', keyPair)
    const result = await postJson({
      url: "http://172.18.3.1:3000/add-key",
      data: {
        token: Date.now().toString(),
        publicKey: keyPair.publicKey.toString()
      }
    });
    if (result && result.success) {
      const isValid = await checkAccessKey(keyPair);
      if (isValid) {
        let localKeys = {};
        localKeys.accessPublic = keyPair.publicKey.toString();
        localKeys.accessSecret = keyPair.secretKey;
        set(LOCAL_KEYS, localKeys);
      }
    } else {
      alert("get new access key err")
    }
    return keyPair;
  };

  const checkAccessKey = async (key) => {
    const account = createAccessKeyAccount(near, key);
    const result = await postSignedJson({
      url: 'http://172.18.3.1:3000/has-access-key',
      contractName: nearConfig.contractName,
      account: account,
    });
    return result && result.success;
  }

  const getNewAccount = async () => {
    const { seedPhrase, publicKey } = generateSeedPhrase();
    const accountId = Buffer.from(PublicKey.from(publicKey).data).toString('hex');
    console.log("---> get new account: ", accountId);
    const keyPair = await getNewAccessKey();
    if (keyPair) {
      const keys = {
        seedPhrase,
        accountId,
        accessPublic: keyPair.publicKey.toString(),
        accessSecret: keyPair.secretKey
      };
      set(LOCAL_KEYS, keys);
    } else {
      alert("Something happened, Try [Get New App] again!")
    }
  };


  // Initializing our contract APIs by contract name and configuration
  // const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
  //   // View methods are read-only – they don't modify the state, but usually return some value
  //   viewMethods: ['ft_total_supply', 'ft_balance_of'],
  //   // Change methods can modify the state, but you don't receive the returned value when called
  //   changeMethods: ['ft_transfer'],
  //   // Sender is the account ID to initialize transactions.
  //   // getAccountId() will return empty string if user is still unauthorized
  //   sender: walletConnection.getAccountId()
  // });

  return { getNewAccount, currentUser, nearConfig, walletConnection };
  // return { contract, currentUser, nearConfig, walletConnection };
}

window.nearInitPromise = initContract()
  .then(({ getNewAccount, currentUser, nearConfig, walletConnection }) => {
    window.moveLeft = moveLeft;
    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider theme={DEFAULT_THEME}>
          <PersistGate loading={null} persistor={persistor}>
            <App
              getNewAccount={getNewAccount}
              currentUser={currentUser}
              nearConfig={nearConfig}
              wallet={walletConnection}
            />
          </PersistGate>
        </ThemeProvider>
      </Provider>,
      document.getElementById("root")
    );
  });
