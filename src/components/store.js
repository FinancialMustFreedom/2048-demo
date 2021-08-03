import { createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "../reducers/rootReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancers = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];

const composeEnhancer = compose(...enhancers);

const store = createStore(persistedReducer, composeEnhancer);

export const persistor = persistStore(store);

export default store;
