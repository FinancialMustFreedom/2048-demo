import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import { moveLeft } from "./actions/boardActions";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./components/store";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";

window.addEventListener("DOMContentLoaded", () => {
  window.moveLeft = moveLeft;

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={DEFAULT_THEME}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
});
