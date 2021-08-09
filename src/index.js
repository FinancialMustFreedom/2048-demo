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


// Initializing contract
async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    },
    ...nearConfig
  });


  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);
  const amount = nearAPI.utils.format.parseNearAmount('0.01');
  let senderAccount = await near.account(walletConnection.getAccountId());

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
      senderAccount: senderAccount,
      amount: amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ['ft_total_supply', 'ft_balance_of'],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: ['ft_transfer'],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId()
  });

  return { contract, currentUser, nearConfig, walletConnection };
}

window.nearInitPromise = initContract()
  .then(({ contract, currentUser, nearConfig, walletConnection }) => {
    window.moveLeft = moveLeft;
    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider theme={DEFAULT_THEME}>
          <PersistGate loading={null} persistor={persistor}>
            <App
              contract={contract}
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
