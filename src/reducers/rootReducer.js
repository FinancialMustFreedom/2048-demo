import { combineReducers } from "redux";

import boardReducer from "./boardReducer";

const rootReducer = combineReducers({ board: boardReducer });

export default rootReducer;
