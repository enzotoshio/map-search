import { SEARCH_REQUESTED, SEARCH_SUCCEEDED, SEARCH_FAILED } from "./types";
import { combineReducers } from "redux";

const byIdInitialState = null;

export function byId(state = byIdInitialState, action) {
  switch (action.type) {
    case SEARCH_SUCCEEDED:
      const { animes } = action.payload.entities;
      debugger;
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

export const requestInitialState = {
  isFetching: false
};

export function request(state = requestInitialState, action) {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return { isFetching: true };
    case SEARCH_SUCCEEDED:
    case SEARCH_FAILED:
      return { isFetching: false };
    default:
      return state;
  }
}

const searchReducer = combineReducers({ byId, allIds, request });

export default searchReducer;
