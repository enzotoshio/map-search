import { combineReducers } from "redux";

import animes from "./animes/reducer";

const rootReducer = combineReducers({ animes });

export default rootReducer;
