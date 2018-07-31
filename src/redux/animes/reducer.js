import { SEARCH_REQUESTED, SEARCH_SUCCEEDED, SEARCH_FAILED } from "./types";
import { combineReducers } from "redux";

const byIdInitialState = null;

export function byId(state = byIdInitialState, action) {
  switch (action.type) {
    case SEARCH_SUCCEEDED:
      const { animes } = action.payload.entities;

      return { ...state, ...animes };

    default:
      return state;
  }
}

const allIdsInitialState = [];

export function allIds(state = allIdsInitialState, action) {
  switch (action.type) {
    case SEARCH_SUCCEEDED:
      const ids = action.payload.result;

      return [...ids];

    default:
      return state;
  }
}

const searchReducer = combineReducers({ byId, allIds });

export default searchReducer;
