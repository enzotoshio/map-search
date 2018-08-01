import { combineReducers } from "redux";

import addresses from "./addresses/reducer";

const rootReducer = combineReducers({ addresses });

export default rootReducer;
